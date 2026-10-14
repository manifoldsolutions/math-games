# Matikkapelit — math games site

Static site on GitHub Pages (custom domain in `CNAME`). No build step, no
framework, no npm: plain HTML/CSS/JS. Every game is one self-contained
`index.html`.

## Layout

```
index.html                         main page; the CATALOG array near the bottom lists everything
assets/theme.css                   shared look for the whole site (colours, fonts, header, dialogs, buttons)
assets/celebrate.js                shared streamers + confetti: celebrate({x, y}); usage in its header comment
games/<category>/<course>/<game>/index.html
```

- Every game is exactly four folders deep, so every game links the theme as
  `../../../../assets/theme.css` and links back to its course page as
  `../../../../#/<category>/<course>` (e.g. `#/lukio/maa1-2`).
- Adding a game: create its folder, then add an entry to the right course in
  `CATALOG` in `index.html` (`game: null` shows it as "Coming soon").
- Catalog ids become URL parts: short, lowercase, digits and hyphens only.
- Shared JS goes in `assets/` too, loaded with a plain `<script src>` before the
  game's own script (no modules). Yhtälövaaka and Yksikköympyrä use
  `assets/celebrate.js`; a game must not define its own `celebrate` function.

## Look and feel ("Techno" theme)

- Audience: Finnish upper-secondary students, 15–19. Phones first (test at
  390 px wide, touch dragging), desktop second.
- All colours and fonts come from tokens in `assets/theme.css`. Use the tokens
  (`var(--accent)`, `var(--green-ink)` …); don't hard-code new colours in a game.
- Fixed meanings of colour, the same in every game:
  - variables / x: green (`--green`, `--green-ink`)
  - positive constants: yellow (`--brown-ink`, `--gold`)
  - negative constants: magenta (`--magenta`, `--magenta-ink`)
  - cyan (`--accent`) = things you interact with; magenta = highlights; `--red` = danger / errors
- Fonts: Orbitron (`--display`) for titles only; Chakra Petch (`--ui`, `--math`) for everything else.
- Glow is applied to whole groups (one filter per cup/panel), never to
  hundreds of small shapes — it must stay smooth on old phones.
- No sounds (decided for now).
- A game page uses `<body class="game">` and the shared pieces from the theme:
  header (`.back` "← Takaisin", `.title`, `.hud`), `.statusrow` with `.lives`,
  `.hint`, `.subctrl`, and the result dialog `.overlay > .win`
  (`h2`, `.result`, `p`, `.score`, `.btns` with the primary button first and a
  "Palaa kurssiin" link last).

## Language

- Lukio games: interface entirely in Finnish.
- IB games: English. Main page interface: English.
- Code comments: English.

## Status of the games

- `yhtalovaaka`, `yhtalo1`, `yhtalo2` and `games/lukio/maa5/yksikkoympyra`
  use `assets/theme.css`. Yksikköympyrä adds IBM Plex Sans as a fallback in
  `--math`, because Chakra Petch has no Greek (α, π).
- `games/artsy_math/fractals/ifs_explorer` still carries its own old light
  styles. To convert one: link the theme, add `class="game"` to `<body>`,
  delete its own `:root{…}` block and the rules the theme already provides
  (steps are in the comment at the top of `assets/theme.css`).

## Yhtälövaaka (balance-scale equations) — design decisions

- Box = x (holds an unknown number of diamonds), diamond = 1, balloon = −1
  (from level 3). From level 4 x may be negative (the box holds balloons).
- The scale compares real weights. Removing/adding the same thing in both cups
  keeps it level; otherwise it tips and the cup breaks when it hits the floor.
- Puzzles are generated backwards from the answer x = n by adding the same
  boxes (kb) and constant (k) to both sides, so every state is solvable and
  non-negative. x is never 0, 1 or −1.
- The minimum number of moves is known at generation time:
  `par = 2·kb + 2·|k|`. Never find optima by searching all move sequences —
  derive them from how the puzzle was built.
- 9 levels, 3 lives. Level score =
  `(50 + 100·par/moves + 50·(3 s + 1 s·moves)/time) × level`
  (time points have no cap). A broken cup costs a life and `100 × level`
  points; the third is Game Over. Finishing: +1000, +500 per life left.
- Keyboard shortcuts A/S/D/K/L/J (Shift = add) exist for automated testing;
  keep them for now even though they make play faster than dragging.

## Plans for Yhtälövaaka (agreed, not built yet)

- **Intro demo at the start of level 1:** a semi-transparent ghost hand drags a
  diamond out of one cup (scale tips), then the same from the other cup (scale
  levels), with the text "Ota sama esine kummastakin kupista". About 5 s, a tap
  skips it, and its time doesn't count. Possibly a similar short demo when
  balloons first appear at level 3.
- **Equation chain:** the legend (box = x, diamond = 1, balloon = −1) sits
  directly under the scale, and under it a growing chain of equations, one row
  each time the scale comes back to balance, annotated with what was done to
  both sides, e.g. `2x + 3 = x + 7  | −x`. Consecutive steps of the same kind
  and sign merge (−1, −1, −1 → `| −3`); opposite steps are not merged, so a
  wasted round trip stays visible. The newest rows stay visible and older ones
  fade. If the scale turns around, the last row shows `x = n`.

## Yksikköympyrä (unit circle) — design decisions

- No "Tarkista" button: a task is solved the moment every solution is marked
  (within 5°) and no wrong point is left. If all solutions are marked but
  there is an extra point, the hint line says so after about 1 s.
- Levels 0–7, 6 tasks each. Level 0 shows the angle (arc + degrees) while
  aiming and next to placed points; level 7 mixes levels 3–6 and is the last.
- Scoring like Yhtälövaaka, 3 lives. Task score =
  `(50 + 100·solutions/clicks + 50·(5 s + 2 s·clicks)/time − 30·hints) × level`
  (level 0 counts as ×1, time points have no cap, a task never goes below 0).
  A wrong "Ei ratkaisuja"/"Jokainen piste" costs a life and `100 × level`
  points; "Näytä ratkaisu" (appears after the last hint step) costs a life
  and gives 0 points. Third lost life = Game Over. Finishing level 7: +1000,
  +500 per life left.
- Vihje, one step per press: memory triangle (only where the solutions are
  special angles the triangle shows), method hint (levels 0–2 split hard
  angles into easy parts, radians stay in radians), hint about the placed
  points, then the helper line. With part of the answer found and nothing
  wrong, the hint jumps straight to the placed points (mirror-image hint).

## Site-wide plans

- **Math typesetting with MathJax (eventually):** games will typeset maths
  (Greek letters, fractions, roots) with MathJax instead of hand-built HTML
  such as `.frac`/`.rad` in Yksikköympyrä. The theme colours must survive
  (`\class{xterm}{…}` etc.). Until then Yksikköympyrä uses IBM Plex Sans as
  the Greek fallback. Not decided: which version and font, and whether a game
  that re-renders on every click (yhtalo1/2) uses it too.

## Open questions (ask Vadim before deciding)

- "Weighing": the scale accepts a box removed on one side and x diamonds on the
  other. Show such a step as a red "not an allowed transformation" row in the
  chain, or forbid it?
- Division (e.g. 3x = 12 with ÷2/÷3/÷4 tokens that split a cup into equal
  piles): as extra levels in this game, or a separate game "Yhtälövaaka 2"?
- Intro demo: every time level 1 starts, or only the first time on a device?
- Unlockable visual skins (e.g. a "Metalli" skin for finishing the game):
  liked as an idea, not decided.

## Not now (decided)

- Sounds and vibration, saving high scores, fading out the scale on later
  levels ("concreteness fading").

## Testing

- Folder links like `games/…/yhtalovaaka/` only open `index.html` through a
  web server, not via `file://`. From the repo root:
  `python3 -m http.server 8000` → http://localhost:8000/
- Check pages at phone size (390×844) as well as desktop.
- Deploy = commit and push. When a game starts using `assets/theme.css`, push
  the theme file in the same commit.
