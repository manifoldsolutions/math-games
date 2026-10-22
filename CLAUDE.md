# Matikkapelit — math games site

Static site on GitHub Pages (custom domain in `CNAME`). No build step, no
framework, no npm: plain HTML/CSS/JS. Every game is one self-contained
`index.html`.

## Working rule (Vadim)

- Never implement anything unless the prompt explicitly asks for it.
  Otherwise always stay in brainstorm mode: answer, propose, discuss, but
  don't change files. If unsure whether something is a request to
  implement, ask.
- Even after an explicit request to implement: if questions had to be asked
  first, confirm once more after the answers ("Shall I build it now?")
  before changing any file.

## Layout

```
index.html                         main page; the CATALOG array near the bottom lists everything
assets/theme.css                   shared look for the whole site (colours, fonts, header, dialogs, buttons)
assets/celebrate.js                shared streamers + confetti: celebrate({x, y}); usage in its header comment
assets/intro.js                    shared pieces of a game's "Esittely" (guided intro): IntroKit; usage in its header
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
  Both have an Esittely built on `assets/intro.js` (progress bar, tiles, Jatka,
  the Esittely menu, timing, ghost hand) with its styles in theme.css; the steps and
  how they set up the board stay in each game. Yhtälösade has one too.
- An intro must never look like the game (Vadim): while it runs the page is
  lighter (`body.intro` redefines `--bg`, so label halos and cut-outs follow),
  an "ESITTELY" tag stands before the progress bar, and "Ohita esittely" is a
  neutral framed `.btn` (Vadim chose quiet: clearly a button, but students
  shouldn't be invited to skip). Not red (danger, costs something) nor green
  (x, cos α, right answers).

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
  - orange (`--orange`, `--orange-ink`) = ⚡, "no solution": a power move, not
    an error (Vadim; red looked like "not allowed")
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
- Inverse trig functions are always written arcsin, arccos, arctan, never
  sin⁻¹ (Vadim). In Yksikköympyrä `inv("sin")` gives "arcsin".
- They are always talked about in radians, with the ranges of Vadim's graphs:
  arcsin [−1, 1] → [−π/2, π/2], arccos [−1, 1] → [0, π], arctan
  ℝ → (−π/2, π/2) (`RANGE`). The answer is the function's value
  (arcsin(−√3/2) = −π/3, arctan ½ ≈ 0,46), not the point on the circle
  (5π/3); the note says which point it is. The highlighted arc has filled
  ends, open ones for arctan. Intervals are written with `iv()`, whose
  brackets are in IBM Plex Sans: Chakra Petch's "(" looks like "[".
- Yksikköympyrä writes 1/√2 and 1/√3 (as the memory triangles give them),
  never √2/2 and √3/3, except on level 7, where half of the tasks with them
  use the harder forms (`hardForm`, Vadim). The triangle cards show both.
- Yksikköympyrä's tangent picture (the line x = 1, the extended ray, the blue
  segment, "tan α" in the legend) shows in the game only after a hint has
  brought it in (`hintFx.tan`), and goes with the task (Vadim). The intro
  shows it in its tan steps.
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
- "basics" (7 steps) runs before level 1 (also after "Aloita alusta") and
  "balloons" (3 steps) before level 3, every time: nothing is remembered
  (Vadim dropped the localStorage flags; "Ohita esittely" beside
  "↺ Alusta" skips it, so it doesn't get in the way). The
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
- Vadim chose: every time + button; the final solve is watched (ghost hand),
  not done; answers are tiles; the balloon intro comes just before level 3.
- Without the shelf the intro crops the shelf band off the picture so the
  scale is bigger. On a 375×667 phone two steps scroll a little (≤ 35 px).

## Yksikköympyrä Esittely (built)

- Same frame as Yhtälövaaka's (IntroKit): on the real circle with the game's
  own aiming and placing, no lives, points or clock. A chapter runs before
  the level that brings its idea in (`INTRO_AT`), every time (nothing is
  remembered, see Yhtälövaaka). The Esittely button opens a
  menu of the chapters up to the current level, all alike (Vadim tried the
  latest in green: too loud); the latest is last and has the focus
  (`IntroKit.menu`). The chosen chapter runs, then the same task goes
  on with its clicks, hints and time.
- kulmat (before 0): 90°, 210°, ghost sweep π and 2π, tiles "π/2 in degrees",
  3π/2. sincostan (before 3): sin α = 1, all points with sin α = 0,
  tiles "how many points with sin α = ½" (the line y = ½ shows why), both
  points, tiles for sin α = 2 (the band −1 … 1, then "Ei ratkaisuja"),
  tan α = 1, ghost turns the ray 180° while the tiles ask what happens to
  the value of tan (Pysyy samana / Muuttuu; the turn holds 3 s at its end and
  starts over until answered, a wrong answer restarts it, only the right one
  gives Jatka), both points.
  arc (before 5, in radians): which angle arcsin ½ gives (π/6, 5π/6 or both;
  the arc [−π/2, π/2]), arccos(−½) and arctan(−1) with their arcs.
  sisakulma (before 6): the ray is always α, also here (Vadim); a dashed ray
  shows the angle inside the function. Shifted angles first:
  sin(α − 30°) = 0 (the ghost turns the ray once, the dashed ray 30° behind,
  then the student marks the points), place cos(α + 45°) = 0. Then 2α: tiles
  "how many turns does 2α make while α makes one", tiles "where is α when
  sin 2α = 1" (90° / 45° / 45° ja 225°; the turn loops and rests where the
  dashed ray points up), place cos 2α = −1; then α/2: tiles ½ / 1 / 2, place
  sin(α/2) = 1. Looping turns go on until answered. A wrong point says where
  the dashed angle is ("Tässä 2α = 360° …").
  Levels 1, 2, 4 and 7 have no chapter: Vadim dropped the radians and
  "no angle readout" chapters and merged sin/cos with tan.
- A wrong point turns red and the text says its angle (or why, e.g. "240°:n
  kosini on myös −½, mutta se ei ole korostetulla kaarella"); it goes at the
  next try. A wrong tile draws what it means.
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
- The win dialog has a "Näytä ratkaisu" section at the bottom, open by
  default (it can be folded away): the player's chain beside a model chain
  with the step counts. The model comes from how the puzzle was built (take
  off the constant k, then the kb extra boxes), never from a search.

## Yhtälösade (falling equations) — first draft, 3 levels

- A Tetris-like well (9 columns, brick walls and floor). 30 equations per
  level; they come on a timetable (see Levels), in columns that don't
  overlap one still falling, so usually two to four fall at once. The player throws an operation brick from
  the floor (+x, −x, +1, −1 at the start) at it: it's done to both sides and
  the brick's count goes down (start 4/4/4/4, at most 99, `CAP`; Vadim, it
  was 9). The fall never slows,
  not even while dragging (Vadim).
- Levels (Vadim, `LEVELS`): the next level goes on with the counts and the
  operations left by the previous one (the well keeps its rows). Each level
  speeds up from its first equation to its last (Vadim, `ramp`): the fall in
  rows/s grows linearly, and the gap in seconds from one equation to the
  next shrinks linearly (`wantSpawn`), the same on every screen and however
  fast the player is. Only an empty well (no unsolved equation falling)
  brings the next one at once (Vadim), and the timetable goes on from there:
  the gap from n to n + 1 is min(the timetable's gap, the time until the
  well is empty). For now every level has the same settings (Vadim, `LEVEL`;
  a level only lists what is its own): the fall from the chosen speed (see
  Speed), gaps 16 → 5.6 s at the fall 0.55 → 0.8 (`REF_FALL`), scaled with
  the speed's fall
  (on a 19-row phone well about 2 → 4 equations on the screen, fewer in a
  shorter desktop well), positive answers 80 % → 30 % over the level (more
  negative bombs, which clear trash, towards the end), the zero bomb's shot
  0 → 0.5. Level 1 is the old levels 1 and 2 merged (Vadim). Level 2 (the
  old level 3) starts with the well emptied of trash (counts kept); its new
  bricks come from zero bombs (see New bricks). Everything else starts over per level: the
  difficulty ramp, the early zeros, the equation count.
  Between levels a dialog shows the level's points ("Taso 1 läpi!", "Seuraava
  taso"). Trash
  left costs 20 a brick only when it goes away: at the end of the game (or
  Game Over), or in the dialog before a level that empties the well. Game
  Over and "Pelaa uudestaan" start again from level 1. The header shows Taso
  and Pisteet; Yhtälö n/30 is in the status row.
- `:2` (level 2; Finnish notation for division) divides both sides by 2. About a third of
  level 2's equations (`div`) are built from 2x = 2n instead of x = n, with
  the same boxes and constant (x + 1 = 9 − x, 3x − 1 = x − 5), so they end
  with :2; the generator offers them only while the player has :2 (or a
  joker), so in practice about 30 %. :2 always works (Vadim: refusing it
  could teach that one may not divide when a term isn't divisible): a side
  whose terms are all even is halved (2x + 2 → x + 1); any other side
  becomes a fraction over 2 (Vadim, `timesSide`: x + 1 = 2 → (x + 1)/2 = 1,
  x + 1 = 5 → (x + 1)/2 = 5/2; it used to be ½x + ½ = 2½). ±1 can't take
  a fraction away, so the equation is lost unless ·2 (or a joker) saves it.
  Dividing first is fine when
  everything is even (4x + 2 = 2x + 8). par counts :2 too; the difficulty
  ramp's PAR counts only +x −x +1 −1 (Vadim's measure). It comes from a zero
  bomb with 3 uses (see New bricks); positive bombs refill it like any brick.
- Big equations (Vadim, levels 2 and 3, `big`, `bigEquation`; not "jackpot":
  that name is kept for x = 100 later): x = 8, or x = 10 in 4 of 10
  (`BIG_TEN`), built from 2x = 2n or 4x = 4n (equal chance; 4x needs :2
  twice, 4x = 32 → 2x = 16 → x = 8) with a constant −4 … 4 on both sides
  (4x + 4 = 44, 2x − 3 = 17), sides swapped half the time. Cheap, and they
  fill the arsenal. Chance 5 % an equation, up to 25 % as the ±1 and ±x left
  after what the falling equations need go from 8 to 0 (`BIG_P`, `BIG_LOW`);
  only if the player can afford one (:2 included), no repeats. When no
  equation of the level can be afforded (200 tries), a big one comes if
  possible; only then the old last resort: one throw of the fullest brick,
  x = 8. Simulated (500 games, perfect / 80 % / 50 % play): 2.2–3.2 big
  equations a level, about 40 % of them x = 10 and half 4x; the last resort
  fell from 0.6 / 1.1 to 0.2 a level on levels 2 / 3 (perfect play; 2.4 /
  4.0 → 0.8 / 1.2 at 50 %), equations that can't be solved on level 3 from
  0.15 to 0.07 (3.5 → 2.2 at 50 %).
- `·2` multiplies both sides by 2 (the key is `"*2"`). It is one of level 2's
  new bricks (a zero bomb, 3 uses, see New bricks); from level 2 on zero
  bombs may also add single uses (`GIFT_FROM`). The fraction equations need
  it (below); it also undoes a :2 that gave fractions. Its
  dot is drawn bigger (`.mul`), the font's · is tiny.
- Fraction equations (Vadim, levels 2 and 3, `frac`, `fracEquation`): 15 %
  of the equations (`FRAC_P`; measured 14.5 %, about 4 a level), only while
  the player has ·2 (the generator reserves the ·2 a falling one still
  needs, `toGo`): x/2 = 4 (an even x), (x ± 1)/2 = m (an odd x; no brackets
  on screen, the top over a bar over 2; the bar always spans the wider of
  top and bottom, Vadim: 1/(x − 2)), and on level 3, as often as its
  squares, x²/2 = 8 (x = ±2 … ±8), and where x⁴ may come x⁴/2 = 8 or 128
  (·2, √, √; Vadim; about 0.5 a level). Otherwise ·2 and at most one more throw (−1, √);
  ·2 counts in "Täydellinen" (`mul`). A side is then {…, f, fd}: its top
  f over fd, the side's other terms beside it. The equation (and its trash,
  `ht`, `hasFrac`, the text faded on it) is two rows tall, one again once
  the bottom is gone (its bottom edge stays). Bricks (`timesSide`): ±1, ±x,
  ±x² go beside the fraction, (x + 1)/2 + 1 = 5, and ·2 merges them, x + 3
  = 10; ·2 halves the bottom (gone at 1), :2 doubles it (x/2 → x/4),
  ·(−1) changes the top's sign. √ goes around a fraction side (lost),
  except x² alone over a square (Vadim): x²/2 = 8 → :2 → x²/4 = 4 → √ →
  ±x/2 = 2 → ·2 → x = ±4; and x⁴/4 → x²/2 (no ±: x² ≥ 0). Simulated (500 games): perfect play needs fewer
  jokers (level 3: 4.3 → 3.6), and at 50 % play fewer equations can't be
  solved (level 3: 2.0 → 1.2 a level).
- `·(−1)` (Vadim, key `"*-1"`) multiplies every term on both sides by −1: a
  rescue, e.g. with many +x and no −x (2x + 1 = x + 4 → −2x − 1 = −x − 4,
  then +x and +1), and the school step −x = −3 → x = 3 (−x = −3 is not
  solved). A zero-bomb gift on all three levels, half as often as ±2 (like
  the joker), with 3 uses (Vadim: like :2 and ·2; the first throw is often
  an experiment); bombs refill it. The generator never counts on it
  (`plan` ignores it, and its count is left out of the total that must stay
  ≥ 4), so nothing needs it; a solve with it rarely gets a bonus (one more
  step). Its brackets are in IBM Plex Sans (`.paren`, loaded for them; the
  notes' brackets too), its label a bit smaller so that it fits.
- Slots (Vadim, `OP_AT`): the floor is 8 bricks of 1.5 × 2 cells, as big as
  an operation brick (the corners under the walls too), and holds the ±
  operations: −2x −x +x +2x | −2 −1 +1 +2 (x on the left, numbers on the
  right, number-line order). A slot whose operation the player doesn't have
  yet is a plain floor brick. The rest go in the walls near the floor, from
  the bottom up: the joker, ⚡, −x², +x² on the left; :2, ·2, ·(−1), √ on
  the right. Every brick keeps its place on every level (Vadim: nothing
  moves when a level starts; √ and ±x² may come on level 2, while ±2 and
  ±2x still hold the floor). Bricks are dragged up from
  the floor so that Android's back gesture (sideways from the edge) doesn't
  catch them; the wall bricks still can be caught.
- Throwing (Vadim), the same for every brick, by the direction of the swipe
  (the target used to be decided by where the brick was let go, but then a
  new equation could take over mid-swipe). A flick is the finger's move over
  the last 0.1 s, at least 0.4 cells and 10 cells/s (`FLICK`). Let go with a
  flick, the brick goes along it: to the equation the line from that point
  passes through (equations 0.3 cells bigger all round, `MISS`; the first
  along the line), else to the one with the smallest angle off the line, up
  to 45° (`AIM_MAX`). Let go without one (dragged slowly, or stopped first),
  it lands on the equation it is on. Anything else (a tap, put back, a flick
  away from every equation) flies back to its slot. So the player may first
  drag a brick anywhere and then flick it. The held brick is centred on the
  finger. A thrown brick flies to the equation's middle in 0.1–0.3 s,
  following it as it falls, and the operation is done when it arrives (the
  count goes down then); if the equation was solved or landed meanwhile, the
  brick flies back unused. The magenta frame shows where a release would go
  now (the equation under the brick while dragging slowly, the one the flick
  points at while swiping) and what bricks are flying to, checked every
  frame.
- Dragging must never get stuck (a friend's Windows Chrome, 2026-10-21):
  Chrome may refuse pointer capture ("No active pointer with the given id
  is found"); the old code then never listened for the move and the release,
  so the brick froze and no brick could be thrown again. Now capture is only
  tried, the drag listens on the whole window, a new press with the same
  pointer ends a drag or pull whose release was lost (the brick flies back),
  and `aim` copes with no position yet (an error there stopped the frame
  loop). The well has `translate="no"`: a page translation (his Chrome
  turned "↺ Alusta" into "↺ Platform") leaves equations and bricks alone.
  Tested with Chrome's own mouse and touch input and with events sent into
  the page (Chrome refuses capture for those).
- Pull area: a rectangle 80 % of the interior width (between the walls) wide
  and 1.2 times that tall, centred across the interior and on the equation's
  middle up and down, clipped to the interior. An equation nearer a wall than
  10 % of the interior width moves its rectangle so that the rectangle's edge
  is the equation's edge. A point belongs to the nearest equation (distance
  to the equation itself) if it is in that one's rectangle. Operations used
  to land by this rule too.
- Dropping an equation (Vadim), for one that can't be solved with what is
  left: a swipe that starts in its pull area pulls it down with
  the finger, never up; pulled ≥ 1.5 cells, it falls fast (15 rows/s) when let
  go, less and it just goes on falling. A double click / double tap in the
  area (only a real tap counts as the first half) or ↓ / space (the lowest
  equation) drops it at once. No "this can't be solved" hint (Vadim).
- Each count is shown as a number and a battery bar: green > 2, yellow 2,
  red 1, grey 0. The bar is full from 9 up (`BAT`); two digits fit on a phone.
- Equations are built backwards from x = n with kb boxes (−2 … 2, so +x is
  needed too) and a constant k (−3 … 3) added to both sides, at most 5
  basic operations (Vadim; it was 3). Negative answers cost the same as positive (Vadim: flip the
  constants).
- The game gets harder from the first equation to the last (Vadim): |x| and
  the number of basic operations needed (+x −x +1 −1, `par`) grow, and the
  answers are more often positive at first. Each has a target that moves
  linearly over the level's equations (`SIZE` |x| 2 → 7, `PAR` 1 → 4 (Vadim;
  it was 1 → 3), the level's `pos`, the positive share), and values near the
  target are preferred (a bell curve). Measured: mean |x| 3.6 / 4.2 / 5.0 /
  5.8 in the four quarters of a level; basic operations, in a perfect
  player's game (the counts limit what is offered), 1.7 / 2.3 / 2.9 / 3.5,
  5 in 4 % of the last quarter (`:2` adds one on level 2). The positive share
  falls over the whole level (to 30 %, measured 74 / 62 / 50 / 37 % by
  quarter).
- Economy (Vadim chose, from the white paper `yhtalosade-economy.pdf` in the
  game's folder: D1 with the adaptive generator G₄): answers −6 … −1 and
  3 … 8, and 0 with probability 10 % (Vadim). The generator looks at the
  counts and only gives an equation the player can afford now (`plan`: by
  hand with ±x, ±1 if possible, else with ±2x / ±2 too, else a joker) whose bomb
  leaves at least 4 in total, so a player who wastes nothing never gets
  stuck, whatever the split. If waste empties every brick nothing special
  happens. No "this can't be solved" signal (Vadim). With two equations in
  the air the generator takes off what the falling ones still need, so they
  never count on the same operations. Checked with the game's own code: 0
  stalls in 20 000 perfect 20-equation games; about 10 % zero, 45 %
  negative. Again with up to 5 operations and 30 % positive at the end:
  0 stalls in 3 000 perfect two-level games, a joker needed for 2.4 % of
  the equations. In the first 5 equations x = 0 has probability 0.17, so 60 % of
  games have a zero there (Vadim: it makes the start exciting).
- x = 0 → a cyan zero bomb (bounces like the others, clears nothing). It
  gives one use of a new operation: +2, −2, +2x, −2x or a joker "x = ?" that
  solves any equation at once. As long as one of the five is missing, a zero
  bomb always brings a missing one (Vadim). With nothing new to bring it
  bursts (`coinBurst`, Vadim; it used to add one use to one brick): +1 for
  every brick the player has, ⚡ and the joker (up to 4) too; a gold "+1"
  flies to each. In practice only on level 3,
  where the next level's bricks no longer keep coming: simulated 2.3 / 1.9
  / 1.2 bursts there (perfect / 80 % / 50 % play), and with them level 3
  has 1.3 contradictions instead of 0.8 (more ⚡), the perfect player needs
  4.3 jokers instead of 5.3, and holds 94 bricks at the end instead of 74.
  Picked at random, the joker
  half as often as each of the others (`GIFTS`; ·(−1) is a sixth gift, see
  above, so on level 1 there are six to collect). A new brick appears in its
  slot (see Slots); after that positive bombs can refill it too, the joker
  included (Vadim), but the joker never holds more than 4 (`JOKER_CAP`,
  Vadim: too many at the end of level 3; bombs and bursts pass it by when it
  is full; simulated, perfect play ends level 3 with 2.7 jokers instead of
  8.7, at most 4 instead of 34). Near the end of a level they bring the next level's new
  bricks first (below).
- New bricks (Vadim): a brick never just appears when a level starts; every
  new one comes from a zero bomb. Each level lists its new bricks in groups
  (`first`): level 2 :2, ·2 and the joker, then ⚡ (no use before the
  contradictions); level 3 √, then ±x² (every square needs √). A zero bomb
  brings a random missing one of the first group that still has one, before
  any other missing gift: from the previous level's 20th equation on
  (`NEXT_FROM`), or earlier once none of that level's own gifts is missing;
  those that haven't come by its end come at the start of their own level.
  Meanwhile x = 0 has a 30 % chance (`ZERO_NEW`; else 10 %, 17 % in the
  first 5). A new brick comes with :2 3, ·2 3, ·(−1) 3, ⚡ 2, √ 4, ±x² 3 uses
  (`FIRST_COUNT`; the others 1, later gifts 1). It works at once, even where
  it is no use yet (Vadim chose: ⚡ on level 1 is always wasted, :2 gives
  fractions there, √ makes a linear equation trash). Estimated from the zero
  rules alone (20 000 runs): :2 and ·2 arrive on level 1 in 89 % of games
  (median: its 23rd equation), ⚡ in 55 %, the rest early on level 2
  (median its 4th equation, 90 % by the 12th); √ arrives on level 2 in 98.5 %
  (before its 20th equation in a third of games, by the early rule), ±x² in
  85 %.
- Zero bomb's shot (Vadim, every level): besides its gift,
  a zero bomb shoots down the lowest equation in the air with a chance that
  grows over the level's equations from 0 to 0.5 (`shoot` in `LEVELS`). A
  cyan ball flies to it in 0.4 s (`SHOT_T`; one not already aimed at by
  another shot) and solves it as a joker would: 100 points, no perfect
  bonus, and it turns into its own bomb (which then does what bombs do).
- Contradictions (Vadim, level 2): equations with no solution, the same x on
  both sides and different constants (x + 3 = x + 5, 2x − 1 = 2x + 4,
  4 − x = 1 − x). They come only from the 20th equation on, at most 2 a
  level, 1.5 on average (chance 0.18 each, `contra`; measured 1.51, mostly
  around the 24th), and only while the player has a ⚡ left. The ⚡ brick
  ("no solution", key `"N"`, a drawn orange lightning bolt, as in maths for a
  contradiction) sits in the left wall above the joker; it comes from a zero
  bomb with 2 uses (see New bricks), bombs never refill it (`NO_REFILL`), and
  what is left goes on to level 3 (it used to be set to 2 on each level). The ⚡ on a contradiction:
  lightning strikes it from the top of the well (0.25 s), it glows orange
  0.5 s with crackling sparks, then blows up at once: every equation still falling
  unsolved goes without becoming a bomb, 100 points each ("Räjäytetyt
  yhtälöt n × 100" in the result). The contradiction itself counts as a
  solved equation everywhere (100 in "Ratkaistut yhtälöt"; Vadim: "no
  solution" is its solution). Glowing ones, bombs and the
  trash stay; bricks flying to the ones that went come back. Lightning jumps
  from it to each one that goes (`bolts`: one SVG, one glow), which flashes
  orange and bursts; an orange flash over the well, a big orange ring, a
  shake (no flash or shake with reduced motion). Orange, not red (Vadim:
  red looked like "not allowed"; it was red as "an error"); red stays for
  what is refused (√ of a negative number, the minus of x² = ±4: `.sparks.no`).
  The same when a zero bomb's shot hits a contradiction. The ⚡ on an equation with a solution, or the joker on a
  contradiction, is wasted (Vadim: bouncing back would let students test
  every equation). Normal operations work on a contradiction but never
  solve it (3 = 5 does nothing by itself, Vadim: declaring "no solution" is
  the student's job); unsolved it lands as trash. A zero bomb's shot
  that hits a contradiction (it is the lowest equation) blows it up the same
  way, with the same points, and the player keeps the ⚡ (Vadim: cascades are
  cool, and it is rare). The joker stays wasted on one.
- Level 3: x² (Vadim). A mix: the share of equations with x² grows 30 % →
  80 % over the level (measured 36 / 46 / 55 / 60 % by quarter, fewer at the
  end where contradictions take their turn). They are built from x² = n²,
  n = 0 … 9 with its own size ramp (`SQ_SIZE` 2 → 7: x² = 1, 4, 9 early,
  up to 81 late; measured 0: 11 %, 1: 4 %, 2: 8 % … 9: 2 %), with kq·x², kb·x
  and k on both sides (2x² + 3 = x² + 12, 3 = 12 − x², x² + x = x + 9; `KQ`,
  `SHAPES2`); ±x² count in the PAR ramp. Vadim prefers ones that still need
  √ after ±x² (x² = 2x² − 4) to ones where x² cancels into a linear
  equation (x² + x = x² + 2x + 1); the generator makes only the first kind.
  A quarter of the x² ones (`div`, as many as the linear ones) are built
  from 2x² = 2n² and need :2 before the √ (x² = −x² + 8; only while the
  player has :2). From the 4th equation to the 20th (Vadim: early, while the
  fall is slow; none in the last 10) 60 % of them are x⁴ = n⁴ instead (n ≤
  3: 0, 1, 16, 81; `fourth`, `fourthNow`), always the long kind: 2–4 basic
  operations besides the two √ (`X4_PAR`; x⁴ + 2x² = 2x² + 16), measured 3.6
  a level for perfect play (it was 3.9, from the 10th on), 4.8 throws each: √ gives
  x² = ±n² at first, then the minus of ± gets small red brackets and bursts
  away (x² can't be negative), leaving x² = n² (`dropMinus`, `.pmgo`,
  `PM_T`, about 1.4 s; the equation works normally meanwhile). A second √
  gives x = ±n. x⁴ is only on one side.
- √ (level 3) always works on both sides, like :2 (Vadim): exactly x² = n²
  gives x = ±n (x² = 0: x = 0), √(k·x⁴) = √k·x² (x⁴ → x², 4x⁴ → 2x²; no ±), a square number its root,
  k·x² alone on a side ±√k·x (Vadim; `pa`, `pr`: 64 = 4x² → 8 = ±2x, then
  :2 → 4 = ±x, solved as x = ±4 with two bombs; 128 = 4x² → √128 = ±2x and
  128 = 2x² → √128 = ±√2x can't be finished; x² = 2 → ±x = √2), and
  anything else gets √ around it. The ±x term is its own term: ±1, ±x, ±x²
  go beside it and can be taken off again (8 + x = ±2x + x → −x), :2, ·2,
  ·(−1) scale it (−(±2x) = ±2x), √ on a side with it is refused (it may be
  negative). Anything else: x² + 1 = 2 → √(x² + 1) = √2 (drawn with a
  bar over what is under the root, `rootHTML`; Chakra Petch's "(" looks like
  "["). Nothing squares, so such an equation can't be solved any more and
  ends as trash, though bricks still work on it (−1: √(x² + 1) − 1 = √2 − 1;
  a second √ nests) and the joker or the zero bomb's shot still solve it.
  Only √ of a negative number (or of a ±x side) is refused: the brick is wasted, that
  side flashes red and the root bursts in red sparks (`fizzle`). x = ±n glows
  gold and magenta and becomes two bombs, n and −n, knocked apart (one
  equation: 100 points). par counts each √. Sides are {p4, q, a, b, root,
  rc}: a root has a factor rc, so ·(−1), ·2 and :2 give −√(x² + 1),
  2√(x² + 1), ½√(x² + 1) (·2 used to leave a root unchanged), and √ of a
  side that is clearly negative (−√2 − 1) is refused like a negative number.
- Squared binomials (Vadim, level 3, `bin`, `binEquation`): (x + k)² = n²,
  k = ±1, ±2, n = 0 … 3, 12 % of the equations (`BIN_P`; measured about 2 a
  level, the slots they take leave x⁴ at 2.9 a level instead of 3.6). √
  gives x + k = ±n (`binRoot`; x + k = 0 for n = 0), the ± on the number
  side (`pn`), then −k gives x = ±n − k, solved as two bombs, n − k and
  −n − k (`pnAnswers`, `p.two`; (x + 1)² = 4 → x + 1 = ±2 → x = ±2 − 1 →
  1 and −3). The brackets are real here, in IBM Plex Sans. Before the √,
  bricks go beside the square ((x + 1)² + 1 = 5; √ then goes around it,
  lost), ·2 and ·(−1) put a factor before it (2(x + 1)², −(x + 1)²), :2
  makes a fraction of an odd one. √ on a side with ±n is refused. The
  joker writes x = ±n − k. "Täydellinen": √ and −k (`fewestThrows`).
- Level 3's contradictions: x² = a negative number in any dress (x² + 5 = 1,
  x² = −2, 2x² + 5 = x² + 1).
- Level 3's bricks (Vadim): ±1, ±x, ±x², √, :2, ·2, ·(−1), the joker, ⚡,
  ±2 and ±2x. ±2 and ±2x stay to the end, refilled by every kind of bomb
  as on the earlier levels (Vadim changed his mind; for a while they stopped
  being refilled once √ or ±x² came and vanished at 0, and before that they
  became points, then uses of √ and ±x², when level 3 started). Every brick
  keeps its count (Vadim), and the well is emptied. √ and ±x² also
  come from zero bombs (see New bricks; the gifts there after them: the
  joker, −x², +x², :2, ·2, ·(−1), ±2, ±2x, `gifts`); bombs refill √. The generator never gives an equation that needs a ±x²
  (or √, :2) the player hasn't got (Vadim: no bad luck), and once they have
  one, squares that need it come 3 times as often (`X2_MORE`; measured: 73 %
  of the squares need ±x² then, it was 51 %). Running out sometimes is fine
  (Vadim): with chance 0.2 (`short`) an equation may need more ±x² than are
  left, if the player has that brick (measured 0.4 a level). Checked with a perfect
  player over levels 1–3 (3 000 games, before the New bricks rules, the
  ±2 and ±2x leaving and the cap 99): stuck 0.01 times a level, a joker
  needed 3.3 times a level (11 %, it was 0.9): mostly ±1 runs short (more
  zero bombs, which pay nothing back; more x⁴, which need two √; rewards
  spread over more bricks).
- Solved → the equation locks and glows for 0.5 s in its bomb's colour (gold,
  magenta, cyan; Vadim) with a burst of sparks, still falling, then turns
  into the bomb.
- Solved (x = n or n = x) → it locks and becomes a bomb "n" (yellow if
  positive, magenta if negative) in a flickering ring of flames of its own
  colour, bigger for a bigger |n| (`fireSize`). A positive bomb gives n back:
  n splits at random (fair shuffle) into 1 … 4 parts that fly to different
  bricks: 1 part 15 %, 2 30 %, 3 30 %, 4 25 % (`PARTS`, Vadim; it was 25 %
  each, so a 10 went whole into one brick a quarter of the time), scaled when
  the bomb or the bricks allow fewer (a 3: 20 / 40 / 40 %). Empty bricks come first (Vadim): each part goes to an empty one
  (count 0, not the joker; ⚡ never) with the chance max(1/3, empty/all)
  (`EMPTY_MIN`), half the time to one this bomb hasn't refilled yet, else to
  any empty one; the other parts go to their random brick as before, which
  may be empty too. Measured share of a bomb that lands on empty bricks
  (it was about empty/all): 1 of 4 empty 50 % (25), 1 of 10 40 % (10), 2 of
  10 47 % (20), half of them empty 75 % (50). A part that would take a brick past 99 goes on to a random brick
  with room (Vadim), and only when all are full is the rest lost. A negative
  bomb clears trash within a radius growing with |n|. Then (Vadim) only the
  columns whose middle is within that radius across collapse, the whole
  column (everything above a hole falls in). Elsewhere trash stays where it
  is, even over a hole, while it hangs on to the floor through bricks that
  share a side (corners don't count). A group that no longer does falls as
  one solid piece, keeping its shape, until any of its bricks lands
  (`settle`, `looseBricks`). So overhangs and tunnels stay. A positive bomb
  clears nothing.
- A bomb moves like a ping-pong ball (Vadim): the solving operation knocks it
  sideways, away from where it was dropped (a parabola under gravity), it
  bounces off walls, floor and trash, can drop into a 1-cell valley or roll
  under an overhang (radius 0.4 cell), and explodes at its first touch 1.5 s
  after it first touched something. Settings at the top (`GRAVITY`, `VMAX`,
  `BOUNCE`, `KICK`, `FUSE`), tuned by eye. Tunnels under overhangs are
  entered rarely: the ball has to land beside the entrance and roll in.
- No explanations in the game itself (Vadim): no hint line under the well,
  no messages in the dialogs (what the next level brings, why the game
  ended, the start dialog's how-to), no notes on new operations. The
  Esittely (below) explains. The notes on the equations themselves
  (`| + 1`) and the flying rewards stay.
- Unsolved on landing → trash: single grey bricks, the equation's text faded
  on them while the block is whole. Trash above the red line → Game Over.
- Points (Vadim): 100 per solved equation, and without a joker two kinds of
  bonus, points only (Vadim dropped the +1 operation to the emptiest basic
  brick that a perfect solve used to give). "Täydellinen!" +100: no more
  throws than the fewest the player's bricks allow (`fewestThrows`): a ±2 or
  ±2x is one throw, so x − 2 = 0 needs one +2 if the player had a +2 when
  they started on the equation (or used one on it); without a +2, two +1
  is the best. "Siisti!" +50: otherwise no wasted step: steps ≤ par, where
  a ±2 or ±2x is two steps (`STEPS`), so two +1 when there is a +2. It is
  derived from how the equation was built, not by a search: each kind (x,
  number, x²) is taken off in parts before, between and after the halvings
  (`split`, sharing the bricks), so dividing first counts (Vadim: 2x + 2 = 4
  → −1, −1, :2 got "Täydellinen"; now "Siisti", and :2, −1 is
  "Täydellinen"; 4x + 6 = 46 → :2, −1, :2, −1). Checked offline against a
  search of all throws (1 232 shapes and brick sets): equal for every shape
  the game makes; only with a constant ±4 and ±2 boxes (never made) does
  halving and ·2 back save a throw. The result dialog has both rows. Dropping the +1 costs the
  economy: in perfect games (3 000, levels 1–3) a joker is needed 1.4 / 4.1
  / 8.3 times a level (it was 0.1 / 0.2 / 3.2), and on level 3 an equation
  can't be solved at all 0.4 times a level (it was 0.01); the measurements
  above were made with the +1. A negative bomb 25 × |n| even in an empty well
  ("plus bombs give operations, minus bombs give points") and +20 per trash
  brick it clears; 10 per reward unit that fits nowhere. Each trash brick
  left at the end costs 20. No height bonus (Vadim). The result dialog lists
  each kind. All numbers are to be balanced later; no Esittely yet.
- Pause (Vadim): Android's back gesture (a swipe in from the screen's edge)
  can't be switched off by a page, and it comes by accident when a brick is
  dragged from a wall. So the page keeps one extra step in the browser's
  history (added at the first touch or key: Chrome skips steps a page adds
  without one); a back during play only takes that step away and opens
  "Peli on tauolla" with "Jatka peliä" (primary) and "Valikkoon" (the course
  page). Everything stops meanwhile. A second back in the pause, or a back in
  the other dialogs, leaves the page as usual. The same pause also comes
  from "⏸ Tauko" under the well (beside "↺ Alusta", on every screen) and
  from P or Esc (Vadim: for PCs); P or Esc also goes on again.
- Start dialog (Vadim): when the page opens, the game waits behind "Taso 1",
  "30 yhtälöä" and Aloita. The tap on Aloita is the touch
  that lets the pause catch back from the first swipe on (without it, a
  first drag caught by the gesture left the page). Aloita, "Pelaa
  uudestaan" and "↺ Alusta" go to the Esittely's basics first (below).
- Speed (Vadim, `SPEEDS`): a slider with three stops, Hidas / Keskinopea /
  Nopea (the labels can be tapped; "Pisteet ×1,5" under them), in the start
  dialog and the end dialog (not between levels); Keskinopea at first, kept
  for "↺ Alusta" and "Pelaa uudestaan", nothing saved. The fall over each
  level: 0.25 → 0.5, 0.4 → 0.65, 0.6 → 0.85 rows/s (it was 0.55 → 0.8 for
  everyone, then briefly 0.75); the gaps scale with it (35 → 9, 22 → 7,
  15 → 5.3 s), so a well holds about as many equations at every speed.
  Every point ×1, ×1,5, ×2 as it is earned, the trash left at the end too;
  the result rows show the points as earned, then "Nopeus: Keskinopea ×1,5"
  and the total (whole points).

## Yhtälösade Esittely (built)

- Yksikköympyrä's frame (`assets/intro.js`, Vadim): on the real well with
  the real bricks and throwing; nothing falls or comes by itself, no
  points (`intro` stops the fall, the timetable, `points`); the lighter
  page, ESITTELY tag, progress bar and question above the well, the hint
  and Jatka under it, "↺ Alusta" (the step again) and "Ohita esittely".
  The well is a few rows shorter meanwhile (`chooseRows`). The game as it
  was is put away and comes back afterwards (`startIntro`'s stash): its
  equations, trash, bricks, counts, score, pies. A chapter comes every time
  before its level (`INTRO_AT`; nothing is remembered): the basics after
  Aloita, "Pelaa uudestaan" and "↺ Alusta" (`restartGame`), chapter 2 when
  level 4 starts. None before levels 2, 3, 5, 6 (Vadim), so these two cover
  it all. The "Esittely" button under the well (beside Tauko and Alusta)
  opens a menu of the chapters up to this level (`openIntroMenu`; the game
  waits), and the game goes on as it was. Every step sets up its own
  equations, trash and bricks (`bricks`, `counts`, `setup`), so a step can
  start over.
- Steps (`INTRO_STEPS`): a demo (the ghost hand throws a brick from its
  slot with the game's own flight, `ghostThrow`, or pulls an equation down,
  `ghostPull`; then maybe the player's turn, `after`), a throw by the
  player (`check` says when it is done, every frame: `introTick`), or a
  picture with a sentence (bombs drawn still, twice their size, with a word
  under each: `introBomb`; a brick glowing: `glow`), or a table of bricks
  in the well's place (`table`, `introTable`: the bricks as they look,
  what they do, the level they come on; the empty hint and a one-line
  question make room, so they fit a 390 × 844 phone, a 375 × 667 one
  scrolls a little). Words (Vadim): "palikka" for a brick, "jäte" for the
  trash, also in the game ("Jätettä", "Siivottu jäte", "Jätettä jäi");
  "puolittain" for both sides.
- Perusteet (7 steps, Vadim): x + 1 = 4, the player throws at once ("Ota
  lattiasta operaatiopalikka ja heitä se yhtälöön. Tällöin operaatiota
  sovelletaan puolittain."): −1 blinks (`blink`), and if nothing has been
  thrown in 4 s the hand shows the move once without throwing (`nudge`;
  the brick flies back); Jatka only after the throw, when x = 3 has
  exploded into bricks; 3x = 7, the ghost pulls it down ("Jos yhtälöä ei
  pysty ratkaisemaan olemassa olevilla palikoilla, tai et muusta syystä
  halua ratkaista sitä, voit vetää yhtälön alas.") and it lands as jäte
  (the red line); a gold 3 and a magenta −2 bomb ("Positiivinen pommi
  antaa palikoita. Negatiivinen raivaa jätettä ja antaa pisteitä."); a
  zero bomb ("0 on erikoispommi, joka tuo bonuksen."); x + 3 = x + 5 with
  another equation beside it: the ghost throws −x, 3 = 5, the player
  throws ⚡ and both go ("Jos yrität heittää salaman yhtälöön, jolla on
  ratkaisu, salama menee hukkaan."); the joker glowing ("…ristiriitaan se
  ei käy: siihen se menee hukkaan."); the table of levels 1–3's bricks
  (`TABLE1`, Vadim's texts).
- Luku 2 (8 steps, Vadim): 12/x = 3 (the ghost throws ·x, the player :3);
  4x = 6 → :4 → x = 3/2 into the five pies (+2 for every brick when all are
  full); 2x = −1 → x = −1/2 shatters into the tallest trash; the table of
  level 4's bricks (`TABLE2`); avaa on (x +
  1)² = x² + 7 (the ghost); x² + 2x + 1 = 9 with neliö, √, −1 (the player:
  two bombs); x² − 3x = 0, the ghost throws x(□), the player ab=0 and it
  splits ("ab=0 käy vain tuloon"); the table of levels 5–6's bricks
  (`TABLE3`; one table of 18 rows didn't fit on a phone). Level 5's bricks
  are shown here because there is no Esittely before level 5.
- The ⚡ and the joker come only on level 2, but the basics show them
  (Vadim); they go again when the Esittely ends.

## Yhtälösade, chapter 2 (levels 4–6, built)

- Chapter 2 (Vadim): a fresh start after level 3. The dialog after level 3
  pays every brick left 10 points ("Poistuneet operaatiot") and says
  "Seuraavaksi: Luku 2 · Taso 4"; level 4 starts with an empty well, its own
  bricks (`start`) and its own places (`OP_AT2`, `slotOf`). A zero bomb never
  brings the next chapter's bricks (`firstGroups`). Tag `luku1-valmis` is the
  game just before chapter 2.
- Look (Vadim chose, from mockups in `temp/`): the "Metalli" skin,
  `body.metal` in `assets/theme.css`: an ember background, walls and floor
  of iron bars (`--iron-*`), trash of rusty plates (`--rust-*`). The maths
  colours, cyan, ⚡ orange and the red line stay. Not a lighter page: lighter
  means Esittely.
- Level 4 (Vadim): only multiplying and dividing, no ±1. Bricks ·2 :2 ·3 :3
  ·x ·4 :4, 4 each at the start (floor: :3 :2 ·2 ·3 ·x, then ·(−1) √ joker;
  :4 and above it ·4 in the right wall, where ±1 come on level 5; ⚡ in the
  left wall); zero bombs bring ·(−1), √, the joker, then ⚡ (`first`).
  Equations (`multEquation`, `multBuild`): x = n, or x² = n² (about 42 %,
  `MULT_SQ`, once √ is there), with both sides divided by ±2^a·3^b·x^c, so
  each side stays one term: 3x = 12, x/2 = 4, 2x/3 = 4, 12/x = 3, 4 = 12/x,
  x²/2 = 8, x/6 = 6/x. 1–4 throws, each as likely, mixed over the whole
  level (Vadim: the speed already makes it harder). At most one of ·2, :2,
  ·4, :4 and one of ·3, :3 (Vadim: else it is prime factoring, 24x = k, and
  those bricks run out; no 9, so no 9x or x/9), so 4 is as common as 2 and 3
  (measured: ·4 or :4 in 40 % of the equations). Both the same way (6x =
  18, x/6 = 2, 12 = 18/x: a 6 or 12 to split into 2·3 or 4·3, beside the
  point, Vadim) only once or twice a level (`MULT_SIX`; measured 6.5 % of
  the equations, it was 26 %); 2x/3 = 4 and 3x/4 = 6, where both factors
  are written, stay at a quarter (`MULT_MIX`); ·(−1) less often. The
  recipe is drawn first, then an answer that keeps the number side whole
  (near the level's size). Its "no solution" (⚡, from the 20th equation):
  k/x = 0 and x/k = −j/x (`multContradiction`). "Täydellinen": the bricks
  commute, so the fewest is one throw for each brick of the recipe (√ first
  halves the 2s: x/4 = 4/x → ·x → x²/4 = 4 → √ → ±x/2 = 2 → ·2). ·4 and :4
  are two steps in one throw (`STEPS`), like ±2: 4x = 12 → :2, :2 is
  "Siisti", and "Täydellinen" only if the player had no :4 (`four`,
  `fewestThrows`). Where :4 runs short the generator plans :2 twice
  (`FOUR`, `plan`).
- Fraction answers (Vadim, level 4): a quarter of the answers (`FRAC_ANS`;
  measured 25 %) are ±1/2, 3/2, 5/2, 1/3, 2/3, 4/3, 5/3, 1/4, 3/4, 5/4
  (`FRACS`), whichever the drawn recipe takes with a whole number side:
  2x = 1, 3x = −2, 4x = 6, 4 = 6/x, −10/x = 4, 4x² = 1 and 9/x = 4x
  (x = ±1/2, ±3/2). x = 3/2 counts as solved (`solvedValue`, `numVal`);
  fractions are always in lowest terms (4x = 6 → :4 → x = 3/2, `low` in
  `timesSide`) and drawn stacked, never 1½. √ takes square fractions
  (x² = 1/4 → x = ±1/2; 4x² = 1 → √ → ±2x = 1 → :2). The joker writes
  them too. Level 5 has them too (Vadim), in the two kinds that needed no
  new arithmetic: its level 4 recipes (2x = 3, −2x = −3: one scaling) and
  avaa with a half answer ((x + 1)² = x² + 4 → avaa, −x², −1 → 2x = 3 →
  :2 → x = 3/2), each a quarter of the time: about 2 a level. Not 1/□
  (x + 2 = 1/2 → −1, −1 would need 1/2 − 2 = −3/2 done by the game) nor
  the zero-product rule with (2x − 1) (a new kind of factor); later,
  maybe. A fraction beside x can always be cleared on level 5 (Vadim: x +
  1/2 = 1 → ·2, −1, :2). Not on levels 1–3 (Vadim); level 6 has log₂ x =
  −1 or −2 (below).
- Fraction bombs (Vadim: no rounding, something of their own): a bomb
  x = 3/4 is a pie around its ball, 4 slices with 3 lit, turning slowly
  (`pieHTML`); 3/2 is a full ring with a half ring outside it. A positive
  one's fraction flies to the pies in the status row (`pieBox`, from level
  4 on, kept to the end of the game): 5 circles side by side, empty at
  first, filled from the left; the one filling shows its slices (¾: 4, 3
  lit), and a note gives the sum (3/4 + 1/2 = 5/4: one full, ¼ in the
  next). When all 5 are full (Vadim: `PIE_GOAL`; it paid +1 at every
  whole for a while), every brick gets +2 (`PIE_BONUS`; ⚡ and the joker,
  up to 4, too), and they empty again, what was over starting the first
  (`pie` in twelfths). Simulated (500 games; perfect / 80 % / 50 % play):
  the bonus comes in 53 / 49 / 35 % of games over levels 4–6, in 31 / 26 /
  18 % already on level 4 (level 4 brings about 3.9 in fractions, level 5
  about 1, level 6 about 0.3). A negative one shatters (`shatter`): its
  slices fly out, the lit ones (the numerator: −3/4 three, −3/2 three)
  each to one of the tallest trash columns, a different one each, and
  knock 2 bricks off its top (`SHARD_HIT`); what hung on them falls. 25 ×
  |x| points, 20 a brick. With no trash the slices just fade.
- Sides gain x³ (`p3`) and n/x (`m`, drawn as a fraction, two rows);
  ·x (`timesX`) raises every power (12/x → 12; a side it can't take, ±x or a
  root, wastes the brick); :3 and ·3 work as :2 and ·2 (`timesSide`: a side
  that doesn't divide becomes a fraction, 2x → 2x/3; ·3 on x/2 → 3x/2). The
  generator plans level 4 from the recipe (`need`), and for an equation in
  the air from its sides (`mono`, `multNeeds`).
- Simulated (500 games; perfect / 50 % play): jokers 0.2 / 1.0 a level
  (1.3 / 1.8 before the bricks were spread over the recipes), unsolvable 0 /
  0.5, no fallback, about 6 zeros (they come often while the new bricks are
  missing), 1.5 contradictions, 2 bursts, 2.1 throws an equation. With ·4,
  :4 and the fractions: 2.5 throws an equation, 5 fraction answers and 3.5
  pie bursts a level, jokers 0 / 0.5, unsolvable 0 / 0.3, and level 4
  ends with 77 / 53 bricks instead of 50 / 34. With the bonus at 5 pies
  only (perfect / 80 % / 50 %): level 4 ends with 50 / 44 / 33 bricks,
  jokers 0 / 0.3 / 0.7; level 5 jokers 2.6 / 2.8 / 2.7, unsolvable 0 /
  0.08 / 1.0 (it was 0.3 at 50 % play: level 4 no longer pays a burst at
  every whole).
- Level 5 (Vadim): brackets and reciprocals. Level 4's bricks stay
  (Vadim), except ·4 and :4 (`drop`: their uses become 10 points each, as
  in "Poistuneet operaatiot"), +1 and −1 come at the start (`add`, 4 each), and from zero bombs
  (from level 4's 20th equation on) ab=0, 1/□ and x(□), then neliö and
  avaa, then ±x² (3 each): 18 bricks. New ones in the walls (`OP_AT2`):
  left avaa, ⚡, neliö, ab=0, 1/□; right −1, +1, −x², +x², x(□). Labels are
  words ("avaa", "neliö", "ab=0") and 1/□ and x(□) with a drawn box
  (`.word`, `.box`).
  Equations (`bracketEquation`, about equally often): avaa sulut ((x + 1)² =
  x² + 7: avaa, −x², −1, :2; for (x − 1)² also ·(−1)), neliöksi (x² + 2x +
  1 = 9: neliö, √, −1; two bombs, ±m − k), the zero-product rule (x(x − 3)
  = 0, (x + 2)(x + 1) = 0, always as products, never x² + 3x + 2 = 0
  (Vadim: in Finland one doesn't factor without solving, and one can't);
  half of the x(x − 3) kind is x² − 3x = 0, which needs x(□) first, only
  once the player has it), 1/□ (1/(x + 2) = 1/5,
  3/(x + 1) = 1, 2/(x − 1) = 2/3: 1/□, ·k, ∓a) and levels 3–4's ((x + 1)² =
  9, −(x + 1)² = −9, level 4 recipes with at most one scaling; they keep
  ·x and ·(−1) in use). Each needs at most one of ·2, :2, ·3, :3 (Vadim:
  never two in a row; measured 0 in 1 500). A zero is a level 4 one, half
  as often as on other levels (the x = 0 parts of the rule are zero bombs
  too). "No solution": 1/(x + a) = 0 (1/□ refuses 1/0, red as √ of a
  negative), (x + a)² = −4 and x² + 2x + 1 = −4 (√ refuses).
- Level 5's sides: 1/(…) (`rec` over a factor `rk`: 3 over x + 1, two rows;
  :2 on it doubles the inside, 3/(2x + 2)) and products (`fac`, x(x − 3),
  (x − 2)(x + 1), real brackets in IBM Plex Sans). avaa (`openSide`) writes
  out (x + k)² and products, neliö (`squareSide`) makes x² + 2kx + k² a
  square, 1/□ (`recSide`) turns a side over (k/(x + 1) → (x + 1)/k,
  numbers, x/4 → 4/x, anything else 1/(…)); a brick that changes no side
  is wasted (a bump). x(□) ("x yhteiseksi tekijäksi", `xOut`) takes x out
  of a side qx² + ax: x² − 3x → x(x − 3), 2x² + 6x → x(2x + 6). ab=0
  (`zpParts`) works only on a product (Vadim): one side 0, the other a
  product or (x + k)²; on x² + 3x + 2 = 0 (made with avaa, say) it is
  wasted. (For a while it factored a written-out side itself and showed
  the factors for 0.6 s; Vadim dropped that with the products only.) The
  factor with the smaller root stays (x = 0 is solved at once), the other falls beside it as an
  equation of its own (`spawnChild`): it gives its bomb and 100 points
  ("Nollasäännön osat"), isn't counted as an equation, no bonus. The joker
  (and a zero bomb's shot) on one gives both answers that way
  (`jokerAnswer`). "Täydellinen" from the recipe (`p.fewest`; for the rule:
  x(□) if needed, ab=0 and the first part's throws); the generator plans from the recipe
  less what was thrown (`toGo`).
- Simulated (400 games; perfect / 80 % / 50 % play): jokers 2.5 / 2.5 /
  2.8 a level, unsolvable 0 / 0.04 / 0.4, no fallback, about 3 throws an
  equation, 4.5 bursts (each +1 for 17 bricks: 126 bricks at the end).
- Level 6 (Vadim): roots, powers and logarithms (base 2 only, no
  fractional powers for now) with lean bricks. Only +1, −1, :2, √, the
  joker and ⚡ stay (`keep`; the others are paid 10 points each, as at a
  chapter's start), and ±1 get +4 each at the start (`add`; Vadim: too
  little ±1). Zero bombs bring the new ones in three groups (`first`):
  log₂ and ∛, then □² and 2^□, then □³, 3 each. After that a zero bomb
  gives one of them or √, never the joker (`gifts`; Vadim: too much
  joker), and once all are there, +1 to every brick (the joker too). The new ones go in the floor slots that
  level 5's bricks left: ∛ :2 □² □³ 2^□ log₂ √ joker. ±1 stay in the
  right wall and ⚡ in the left. ∛ is drawn as √ with a small 3 (`CBRT`):
  the font's ∛ is cramped.
- Equations (`powEquation`) come in five families, about equally often,
  with 1–3 throws mixed (measured 22 / 46 / 32 %):
  - cubes: x³ = −8 (∛), x³ + 1 = 9, 2x³ = 16 (:2, ∛);
  - roots undone: √x = 3 (□²), ∛x = −2 (□³), √(x + 1) = 3, ∛(x − 2) = 1;
  - exponents: 2^x = 16 (log₂), 2^(x + 1) = 8, 2^(2x) = 64 (log₂, :2),
    2^(x²) = 16 (log₂, √: two bombs, ±2);
  - logarithms: log₂ x = 3 (2^□), log₂(x − 1) = 2, log₂ x + 1 = 4; in the
    first and last now and then m = −1 or −2 (`LOG_FRAC`): log₂ x = −1 →
    x = 1/2, a pie bomb (about one a level; not log₂(x − 1) = −1, which
    would need 1/2 + 1);
  - level 3's (x + a)² = m².
  Answers −9 … 10. The generator first looks for one the player can solve
  by hand, and only then takes one that needs a joker (`find` with
  `hand`). Its zeros use the new bricks or the kept ones
  (x + 1 = 1, 2x = 0, x² = 0), so a player without the new bricks can
  still earn them. When nothing else can be afforded: x ± 1 = 8 ± 1
  (`powLifeline`).
- Sides gain 2^(…) (`ex`, factor `ec`), log₂(…) (`lg`, `lc`) and ∛(…)
  (`cr`, `cc`).
  - ∛ (`cbrtSide`) always works, negatives too: a cube gives its root,
    8x³ → 2x, anything else gets ∛(…).
  - □² and □³ (`powerSide`) raise both sides: √(…) and ∛(…) lose their
    root, numbers and kx get the power, x + k → (x + k)², 2^u → 2^(2u). A
    side they can't write (x² + 1, log₂ x) wastes the brick.
  - 2^□ (`exp2Side`) undoes log₂, turns a number into its power
    (2^−2 = 1/4), and anything else into 2^(…).
  - :2 (and ·2, both ways; level 6 has no ·2) moves a power of 2's
    exponent (`pow2` in `scale`; Vadim): 2^x → 2^(x − 1), 2^(x + 1) →
    2^x, 2^x + 2 → 2^(x − 1) + 1, 3·2^x → 3·2^(x − 1). So 2^(x + 1) = 8
    → :2 → 2^x = 4 → log₂ is as short as log₂, −1. (It used to give
    2^x/2, which nothing could finish.)
  - log₂ (`log2Side`) undoes 2^, turns a power of 2 into its exponent
    (1/4 → −2), and anything else into log₂(…). A number ≤ 0 is refused,
    like √ of a negative number.
- False roots: □² can give answers the equation doesn't have (√x = −3 →
  x = 9; x + 1 = 4 → (x + 1)² = 16 → √ → x = 3 or −5). Every equation
  knows its true answers (`truth`, `truthOf`). A bomb that isn't one of
  them bursts in red sparks instead and gives nothing. A contradiction
  never counts as solved, so √x = −3 → x = 9 isn't a solve: the ⚡ is the
  way.
- "No solution" (⚡, from the 20th equation, at most 2): √x = −3,
  √(x + 1) = −2, 2^x = −4, 2^(x + 1) = 0 (`powContradiction`).
- Simulated (500 games; perfect / 80 % / 50 % play):
  - level 6 starts with 26 / 24 / 18 kept bricks (±1 about 2–3 each,
    then +4);
  - jokers 0 / 0.4 / 1.2 a level (1.4 / 2.1 / 2.8 before the ±1 at the
    start, by hand first and no joker gifts);
  - unsolvable 0 / 0.01 / 0.05 (it was 0 / 0.05 / 0.55), no fallback;
  - about 7 zeros, since the new bricks come through them (medians:
    log₂ and ∛ by the 4th equation, □² and 2^□ by the 8th, □³ by the
    11th);
  - 3.8 bursts, 2 throws an equation, 83 / 75 / 60 bricks at the end.
  An auto-player in headless Chrome played levels 1–6 through with no
  errors.

## Open questions (ask Vadim before deciding)

- "Weighing": the scale accepts a box removed on one side and x diamonds on the
  other. Realistic for a scale, but not an allowed step in solving an equation
  (unless the answer is already known). Postponed by Vadim. For now such a
  row in the chain simply has no annotation.
- Division (e.g. 3x = 12 with ÷2/÷3/÷4 tokens that split a cup into equal
  piles): as extra levels in this game, or a separate game "Yhtälövaaka 2"?
- Yhtälösade: ⚡ is no longer reset to 2 on level 3 and nothing refills it,
  so a player who used both on level 2 gets no level 3 contradictions
  (x² = a negative number). Should zero bombs on level 3 be able to give ⚡?
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
- Skipping levels (Vadim's testing, all three games): type `xyz` on the page, or
  open it with `?testi` (works on phones), and a "⏭ Ohita taso (testi)"
  button appears under the game. In the two older games it goes through
  `nextLevel()`/`enterLevel()`, so a level's intro chapter still comes first.
  In Yhtälösade it ends the level at once (level 4's Esittely still comes): what is in the air goes away, the
  trash and counts go on, and every brick the player could have by the end
  of that level gets +3 (Vadim: the basic ones, its gifts, the next level's
  new ones, ⚡). Keep it hidden from students.
- Deploy = commit and push. When a game starts using `assets/theme.css`, push
  the theme file in the same commit.
