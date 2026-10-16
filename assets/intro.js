/* ══════════════════════════════════════════════════════════════════════
   MATIKKAPELIT — shared pieces of a game's "Esittely" (guided intro)
   ──────────────────────────────────────────────────────────────────────
   An intro comes every time before its level (nothing is remembered:
   "Ohita esittely" skips it, Vadim). A game's intro is a list of steps on
   the game's own board: a question at the top (.prompt), a progress bar
   (.introbar > .progress), feedback
   in .hint, answer tiles or a Jatka button in .answers. The steps and how
   they set up the board stay in the game; this file has what is the same
   everywhere. Styles are in theme.css ("Esittely").

   Load before the game's own script:
     <script src="../../../../assets/intro.js"></script>

   IntroKit.nb(text)                    no line breaks inside "x − 1 = 2"
   IntroKit.timing(alive)               {wait(ms, tok), tween(ms, f, tok)}:
       alive(tok) says whether the step that started the animation is
       still on; both resolve to false (and a tween stops) when it isn't
   IntroKit.ease(e)                     ease-in-out, 0 … 1
   IntroKit.HAND_PATH                   a pointing hand, fingertip at (0, 0)
   IntroKit.progress(el, n, i)          n segments, the first i done
   IntroKit.tiles(el, tiles, onPick)    one .op-btn per {html, cls}
   IntroKit.next(el, last, onClick)     the Jatka (or, last, Valmis) button
   IntroKit.menu(el, list, onPick)      the Esittely button's menu: one button
       per {html, sub, latest}, all alike; "latest" only marks the one to focus
   ══════════════════════════════════════════════════════════════════════ */
"use strict";
const IntroKit = (() => {
  const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nb = t => t.replace(/ ([=−+|]) /g, " $1 ");
  const ease = e => e < .5 ? 2*e*e : 1 - (2 - 2*e)**2/2;

  function timing(alive){
    const wait = (ms, tok) => new Promise(r => setTimeout(() => r(alive(tok)), ms));
    const tween = (ms, f, tok) => new Promise(r => {
      if(!motion){ f(1); return r(alive(tok)); }
      const t0 = performance.now();
      const go = now => {
        if(!alive(tok)) return r(false);
        const e = Math.min(1, (now - t0)/ms); f(e);
        if(e < 1) requestAnimationFrame(go); else r(true);
      };
      requestAnimationFrame(go);
    });
    return {wait, tween};
  }

  const HAND_PATH = "M-7,7 A7,7 0 0 1 7,7 L7,34 Q7,29 13,29 Q19,29 19,35 L19,38 Q19,33 25,33 Q31,33 31,39 L31,42 " +
                    "Q31,38 36,38 Q41,39 41,45 L41,62 Q41,80 26,84 L10,84 Q-2,84 -8,72 L-18,55 Q-22,47 -16,44 Q-10,42 -7,49 Z";

  function progress(el, n, i){
    el.innerHTML = Array.from({length:n}, (_, k) => `<span class="${k < i ? "done" : k === i ? "now" : ""}"></span>`).join("");
    el.setAttribute("aria-label", `Vaihe ${i + 1}/${n}`);
  }
  function tiles(el, list, onPick){
    el.innerHTML = "";
    for(const t of list){
      const b = document.createElement("button");
      b.className = "op-btn " + (t.cls || "n");
      b.innerHTML = t.html;
      b.addEventListener("click", () => onPick(t, b));
      el.appendChild(b);
    }
  }
  function next(el, last, onClick){
    el.innerHTML = `<button class="btn primary">${last ? "Valmis" : "Jatka"}</button>`;
    const b = el.firstChild;
    b.addEventListener("click", onClick);
    b.focus({preventScroll:true});
  }
  function menu(el, list, onPick){
    el.innerHTML = `<div class="intro-menu"></div>`;
    const box = el.firstChild;
    for(const it of list){
      const b = document.createElement("button");
      b.className = "btn" + (it.latest ? " latest" : "");
      b.innerHTML = `<span>${it.html}</span>` + (it.sub ? `<small>${it.sub}</small>` : "");
      b.addEventListener("click", () => onPick(it));
      box.appendChild(b);
    }
  }
  return {nb, ease, timing, HAND_PATH, progress, tiles, next, menu};
})();
