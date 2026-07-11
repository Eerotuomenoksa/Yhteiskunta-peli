#!/usr/bin/env node
// Automaattinen esteettömyystarkistus axe-core:lla jsdomin sisällä (D4/D10).
// Huom: jsdom ei tue canvas-renderöintiä, joten "color-contrast"-sääntö palautuu
// aina "incomplete"-tilaan (ei pystytä laskemaan) — se EI ole tässä tiedostossa
// virhe. Kontrastit on tarkistettu erikseen käsin (ks. CHANGELOG.md, vk3 ti).
// Tämä testi kaatuu VAIN axe-coren varmoista "violations"-löydöksistä
// (rakenteelliset asiat: puuttuvat aria-attribuutit, nimettömät napit, jne.).
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");
const fs = require("fs");

const repo = path.join(__dirname, "..");
const htmlPath = path.join(repo, "game", "yhteiskunta.html");
const fileUrl = "file:///" + htmlPath.split(path.sep).join("/");
const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
function byText(d, sel, re) { return [...d.querySelectorAll(sel)].find((el) => re.test(el.textContent || "")); }

async function openDom() {
  const vc = new VirtualConsole();
  vc.on("jsdomError", (e) => console.error("JSDOM ERROR:", e.message));
  const dom = await JSDOM.fromFile(htmlPath, {
    runScripts: "dangerously", resources: "usable", url: fileUrl, pretendToBeVisual: true,
    beforeParse(w) { w.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} }; },
  });
  const w = dom.window, d = w.document;
  w.eval(axeSource);
  const click = (el) => el.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  await new Promise((res, rej) => {
    let t = 0;
    const c = () => { t++; if (typeof w.TIETOLAATIKOT !== "undefined") return res(); if (t > 100) return rej(new Error("timeout")); setTimeout(c, 50); };
    c();
  });
  await sleep(400);
  return { w, d, click };
}

async function runAxe(w, label, allViolations) {
  const results = await w.axe.run(w.document, {
    rules: { "color-contrast": { enabled: false } }, // jsdom ei osaa laskea tätä (ei canvasia) — tarkistettu käsin erikseen
  });
  console.log(`\n[${label}] violations: ${results.violations.length}, incomplete: ${results.incomplete.length}`);
  for (const v of results.violations) {
    console.log(`  VIOLATION [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} kohdetta)`);
    allViolations.push({ label, ...v });
  }
}

(async () => {
  const allViolations = [];

  console.log("=== Sivu 1: Sivilisaation valintaruutu ===");
  {
    const { w } = await openDom();
    await runAxe(w, "civ-selection", allViolations);
    w.close();
  }

  console.log("\n=== Sivu 2: Pelinäkymä + hallintomuoto-modaali auki ===");
  {
    const { w, d, click } = await openDom();
    let cands = [...d.querySelectorAll("*")].filter((el) => el.textContent && el.textContent.trim().startsWith("🏺 Sumer"));
    cands.sort((a, b) => a.querySelectorAll("*").length - b.querySelectorAll("*").length);
    for (const el of cands.slice(0, 3)) { click(el); await sleep(150); }
    await sleep(300);
    let btns = [...d.querySelectorAll("button")];
    const sk = btns.filter((b) => !/▲|▼/.test(b.textContent || "") && /Kastelujärjestelmä|Kirjanpito/i.test(b.textContent || ""));
    click(sk[0]); await sleep(100); click(sk[1]); await sleep(100);
    btns = [...d.querySelectorAll("button")];
    click(btns.find((b) => /Perusta kylä/i.test(b.textContent || "")));
    await sleep(600);
    await runAxe(w, "pelinäkymä (ei modaalia)", allViolations);

    click(byText(d, "button", /Hallintomuoto/i));
    await sleep(250);
    await runAxe(w, "hallintomuoto-modaali auki", allViolations);
    w.close();
  }

  console.log("\n=== Sivu 3: Tietopankki-paneeli auki ===");
  {
    const { w, d, click } = await openDom();
    let cands = [...d.querySelectorAll("*")].filter((el) => el.textContent && el.textContent.trim().startsWith("🏺 Sumer"));
    cands.sort((a, b) => a.querySelectorAll("*").length - b.querySelectorAll("*").length);
    for (const el of cands.slice(0, 3)) { click(el); await sleep(150); }
    await sleep(300);
    let btns = [...d.querySelectorAll("button")];
    const sk = btns.filter((b) => !/▲|▼/.test(b.textContent || "") && /Kastelujärjestelmä|Kirjanpito/i.test(b.textContent || ""));
    click(sk[0]); await sleep(100); click(sk[1]); await sleep(100);
    btns = [...d.querySelectorAll("button")];
    click(btns.find((b) => /Perusta kylä/i.test(b.textContent || "")));
    await sleep(600);
    click(byText(d, "button", /Tietopankki ▸/));
    await sleep(300);
    await runAxe(w, "tietopankki-modaali auki", allViolations);
    w.close();
  }

  if (allViolations.length > 0) {
    console.error(`\nVIRHE: ${allViolations.length} axe-core-löydöstä yhteensä. Ks. yllä.`);
    process.exit(1);
  }
  console.log("\nOK: axe-core ei löytänyt rakenteellisia esteettömyysvirheitä (color-contrast tarkistettu erikseen käsin).");
})().catch((e) => { console.error("VIRHE:", e.message, e.stack); process.exit(1); });
