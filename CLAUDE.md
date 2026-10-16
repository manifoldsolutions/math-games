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
- Card glyphs: every catalog entry may have `icon`, either a drawing from
  `GLYPHS` in `index.html` or a short text (`"f(x)"`, `"sin x"`). Without one a
  card shows its parent's glyph. New drawings follow the same family: 26×26
  grid, thin cyan lines (stroke 1.6, helper lines 1.2 and dimmer), no fills.
- Catalog ids become URL parts: short, lowercase, digits and hyphens only.
- Languages: the main page has a FI/EN switch, stored site-wide in
  localStorage `lang` (the IFS explorer uses the same key). Catalog texts are
  a string or `{fi, en}`; a one-language category has `lang: "fi"`/`"en"` and
  gets an "In Finnish"/"In English" tag in the other language. Games keep
  their own language. `kind: "tool"` (IFS explorer) says "Avaa/Explore", not
  "Pelaa/Play". A category whose sections aren't courses has `sub: "topics"`
  (Artsy Math: "1 aihe / 1 topic").
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
- IB games: English. Main page interface: Finnish and English (the switch).
- Code comments: English.

## Status of the games

- Every page uses `assets/theme.css`. Yksikköympyrä adds IBM Plex Sans as a
  fallback in `--math`, because Chakra Petch has no Greek (α, π).
- `games/artsy_math/fractals/ifs_explorer` is a tool with a side panel, not a
  game: it keeps its own layout and nav bar, and its old colour names
  (`--paper`, `--panel`, `--rule`, `--well`, `--steel` …) are aliases of the
  theme tokens at the top of its `<style>`. Its maths in the info dialog is
  typeset with MathJax 3.

## Yhtälövaaka (balance-scale equations) — design decisions

- Box = x (holds an unknown number of diamonds), diamond = 1, balloon = −1
  (from level 3). From level 4 x may be negative (the box holds balloons).
- The scale compares real weights. Removing/adding the same thing in both cups
  keeps it level; otherwise it tips and the cup breaks when it hits the floor.
- Puzzles are generated backwards from the answer x = n by adding the same
  boxes (kb) and constant (k) to both sides, so every state is solvable and
  non-negative. x is never 0, 1 or −1.
- Level 5 (added between the old 4 and 5): as hard as level 4, but one cup
  always starts with diamond–balloon pairs added (`3x + 2 − 1 = 2x`). Levels
  6–10 are the old 5–9 (`difficulty(level)`), and half their puzzles have
  such a mixed cup.
- The minimum number of moves is known at generation time (`parOf`): every
  item that has to leave or join a cup is a move, minus the items that can
  be carried straight from a cup that loses them to one that gains them
  (with a mixed cup this happens: `2x + 2 − 4 = x + 4` → move the 2 diamonds
  across). Both end states are counted, the box kept in either cup, and
  the cheaper wins (`2x + 2 − 6 = x − 2` is cheapest with the box ending on
  the right). Without mixing this is `2·kb + 2·|k|`. Never find optima by
  searching all move sequences in the game — derive them from how the
  puzzle was built (the formula was checked offline against a full search).
- The hint line under the scale starts with what is new on the level
  (`INTRO`: how to drag on levels 1–2, balloons on 3, balloons in the box on
  4; levels 5–10 have none), but only on the first two attempts at that level
  since the page was opened. A retry after a broken cup is an attempt;
  "Alusta" and a retry after a vanished x are not. After that only the goal
  ("Tavoite: …").
- 10 levels, 3 lives. Level score =
  `(50 + 100·par/moves + 50·(3 s + 1 s·moves)/time) × level`
  (time points have no cap). A broken cup costs a life and `100 × level`
  points; the third is Game Over. Finishing: +1000, +500 per life left.
- Dropping into a cup: from the shelf the whole space the cup hangs in counts
  (a normal solving move); from the other cup only the bowl itself (never a
  useful move, usually an accident when dropping something off the scale).
  The magenta highlight follows the same areas. Being trialled.
- Snap-back: releasing an item within its dashed ring puts it back (ring at
  0.6 of the original size). Releasing over its own cup elsewhere drops it to
  the floor (decided).
- Touch screens: the held item stays centred on the fingertip and grows
  (diamond 5×, balloon 4×, box 2×; `TOUCH_GROW`) so it shows around the
  finger. It used to rise above the finger; Vadim didn't like that. Being
  trialled.
- Keyboard shortcuts A/S/D/K/L/J (Shift = add) exist for automated testing;
  keep them for now even though they make play faster than dragging.

## Esittely (the intro, built)

- A guided demo on the real scale, not a game: no lives, points or clock, and
  the scale never breaks (it leans more the bigger the difference, up to about
  half the game's tilt, and waits). Inspired by Brilliant's lessons (one idea
  per screen, progress bar, answer tiles), not copied.
- "basics" (7 steps) runs before level 1 and "balloons" (3 steps) before
  level 3, the first time on a device (localStorage
  `yhtalovaaka.intro.basics` / `.balloons`). "Ohita esittely" beside
  "↺ Alusta" skips the whole intro, and that counts as seen. The
  "Esittely" button under the game replays it (basics, plus balloons from
  level 3 on); afterwards the same puzzle starts over with its time and moves
  as they were.
- basics: 3 = 3, take one diamond (tips) → take one from each (stays level,
  `| −1`) → x = 3 "how many diamonds in the box" → 2x = 6 "which equation"
  (x + 2 = 6, 2x = 6, x = 6, 2 = 6x: the left side of the equation is
  the left cup) → 2x = 6 "how many in one box" →
  2x = x + 1 (hint: take a box from each; if answered without doing it, the
  ghost hand shows it) → ghost hand solves 2x + 1 = x + 4.
- balloons: 1 − 1 = 0, take the balloon (the cup goes down) → 3 − 1 = 3 − 1,
  a balloon from each (`| +1`) → x − 1 = 2 with the shelf (add a diamond).
- A wrong number on a tile opens the box with that many diamonds, so the
  scale itself tips and shows why ("vasemmassa kupissa olisi yhteensä …").
- Vadim chose: first time + button; the final solve is watched (ghost hand),
  not done; answers are tiles; the balloon intro comes just before level 3.
- Without the shelf the intro crops the shelf band off the picture so the
  scale is bigger. On a 375×667 phone two steps scroll a little (≤ 35 px).
## Equation chain (built)

- Under the scale, where the single equation used to be. A row is written
  only when the scale is balanced again. While a step is unfinished (tipped,
  or an item in the hand) the newest row shows the change so far after each
  side with a red ≠, e.g. `x + 2 ≠ 4 − 1` (never < or >: with x unknown we
  can't say which side is bigger, e.g. after `| −x`).
- The "=" column stays in the exact middle, under the scale's post.
- The annotation (`| −1`, `| −x`, `| −x − 1`) is computed from the difference
  between two balanced states, so the order of the clicks doesn't matter.
  It goes on the right of the row it was done to.
- Consecutive steps of the same kind and sign merge (−1, −1, −1 → `| −3`);
  opposite or mixed steps are not merged, so a wasted round trip stays visible.
- A diamond and a balloon added to the same cup is a row without annotation
  (`x + 3` → `x + 4 − 1` is fine).
- The newest three rows sit under the scale; older ones rise behind the
  (transparent) scale picture at about 1/4 brightness, at most eight of them.
  A new row lifts the whole chain by one row.
- When the scale turns around (box on the right), the last row turns too:
  `2 = x` → `x = 2`.
- The win dialog has a closed "Näytä ratkaisu" section at the bottom: the
  player's chain beside a model chain with the step counts. The model comes
  from how the puzzle was built (take off the constant k, then the kb extra
  boxes), never from a search.

## Open questions (ask Vadim before deciding)

- "Weighing": the scale accepts a box removed on one side and x diamonds on the
  other. Realistic for a scale, but not an allowed step in solving an equation
  (unless the answer is already known). Postponed by Vadim. For now such a
  row in the chain simply has no annotation.
- Division (e.g. 3x = 12 with ÷2/÷3/÷4 tokens that split a cup into equal
  piles): as extra levels in this game, or a separate game "Yhtälövaaka 2"?
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
