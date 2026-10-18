# Matikkapelit — math games site

Static site on GitHub Pages (custom domain in `CNAME`). No build step, no
framework, no npm: plain HTML/CSS/JS. Every game is one self-contained
`index.html`.

## Working rule (Vadim)

- Never implement anything unless the prompt explicitly asks for it.
  Otherwise always stay in brainstorm mode: answer, propose, discuss, but
  don't change files. If unsure whether something is a request to
  implement, ask.

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
  how they set up the board stay in each game.
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
  the brick's count goes down (start 4/4/4/4, at most 9). The fall never slows,
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
  a level only lists what is its own): 0.55 → 0.8 rows/s, gaps 16 → 5.6 s
  (on a 19-row phone well about 2 → 4 equations on the screen, fewer in a
  shorter desktop well), positive answers 80 % → 30 % over the level (more
  negative bombs, which clear trash, towards the end), the zero bomb's shot
  0 → 0.5. Level 1 is the old levels 1 and 2 merged (Vadim). Level 2 (the
  old level 3) starts with the well emptied of trash (counts kept) and brings
  `:2` with count 3 (see below). Everything else starts over per level: the
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
  could teach that one may not divide when a term isn't divisible): odd
  numbers give fractions, 2x + 1 = 5 → x + ½ = 2½, written with ½ ¼ ⅛ …
  (3/16 beyond eighths, `numText`), and ±1 can never take them away, so the
  equation is lost unless ·2 or a joker saves it. Dividing first is fine when
  everything is even (4x + 2 = 2x + 8). par counts :2 too; the difficulty
  ramp's PAR counts only +x −x +1 −1 (Vadim's measure). Positive bombs refill
  :2 like any brick; zero bombs don't give it.
- `·2` multiplies both sides by 2 (the key is `"*2"`). From level 2 on it is a
  sixth zero-bomb gift (`GIFT_FROM`, Vadim), so a zero bomb on level 2
  brings it if the player has all five others. Nothing needs it yet (it
  undoes a :2 that gave fractions; Vadim: later levels may need it). Its
  dot is drawn bigger (`.mul`), the font's · is tiny.
- Slots (Vadim, `OP_AT`): the floor is 8 bricks of 1.5 × 2 cells, as big as
  an operation brick (the corners under the walls too), and holds the ±
  operations: −2x −x +x +2x | −2 −1 +1 +2 (x on the left, numbers on the
  right, number-line order). A slot whose operation the player doesn't have
  yet is a plain floor brick. The rest go in the walls near the floor: the
  joker on the left, :2 and above it ·2 on the right (later levels, with more
  than 8 operations, will need the walls more). Bricks are dragged up from
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
  red 1, grey 0.
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
  bomb always brings a missing one (Vadim); only when all five are there does
  it add one use to one of them (one with room). Picked at random, the joker
  half as often as each of the others (`GIFTS`). A new brick appears in its
  slot (see Slots); after that positive bombs can refill it too, the joker
  included (Vadim). From level 2 ·2 is a sixth gift (below).
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
  ("no solution", key `"N"`, a drawn red lightning bolt, as in maths for a
  contradiction) sits in the left wall above the joker; it starts with 2 on
  level 2 and bombs never refill it (`NO_REFILL`). The ⚡ on a contradiction:
  it glows red 0.5 s, then blows up at once: every equation still falling
  unsolved goes without becoming a bomb, 100 points each ("Räjäytetyt
  yhtälöt n × 100" in the result). The contradiction itself counts as a
  solved equation everywhere (100 in "Ratkaistut yhtälöt"; Vadim: "no
  solution" is its solution). Glowing ones, bombs and the
  trash stay; bricks flying to the ones that went come back. A red flash
  over the well, a big red ring, a shake; red because a contradiction is an
  error (Vadim). The ⚡ on an equation with a solution, or the joker on a
  contradiction, is wasted (Vadim: bouncing back would let students test
  every equation). Normal operations work on a contradiction but never
  solve it (3 = 5 does nothing by itself, Vadim: declaring "no solution" is
  the student's job); unsolved it lands as trash. A zero bomb's shot
  that hits a contradiction (it is the lowest equation) blows it up the same
  way, with the same points, and the player keeps the ⚡ (Vadim: cascades are
  cool, and it is rare). The joker stays wasted on one.
- Level 3: x² (Vadim). A mix: the share of equations with x² grows 30 % →
  80 % over the level (measured 35 / 48 / 63 / 74 % by quarter). They are
  built from x² = n² (n ≥ 0), with kb·x and k on both sides (x² + 2 = 11,
  x² + x = x + 9, 16 − x = x² − x); a growing share (10 % → 50 %, `scaled`)
  from 2x² = 2n² or ½x² = ½n², which need :2 or ·2 before √. x² is only on
  one side (there is no ±x² brick). √ works only on exactly "x² = a number
  ≥ 0" and gives x = ±n (x² = 0: x = 0); anywhere else it is wasted, like
  the ⚡. x = ±n glows gold and magenta and becomes two bombs, n and −n,
  knocked apart (one equation: 100 points; the bombs do what bombs do). The
  joker and the zero bomb's shot also give ±n. par counts √ and :2 / ·2.
  The level's contradictions are x² = a negative number (x² + 5 = 1).
  Bricks (Vadim): only ±1, ±x, √, :2, ·2, the joker and ⚡. When it starts
  (`drop`), ±2, ±2x, :2 and ·2 go away and their uses become points (10 each,
  "Poistuneet operaatiot" in the dialog before it); √ starts with 4 (bombs
  refill it), ⚡ with 2, and the well is emptied. :2 and ·2 come from zero
  bombs (the gifts there: the joker, :2, ·2, `gifts`; a missing one first),
  so the generator gives no :2, ·2 or √ equation before the player has that
  brick (Vadim: no bad luck); measured: :2 and ·2 arrive around the 11th
  equation, and in 14 % of levels never. Slots there (`slots`, `slotOf`):
  ±x and ±1 where they were, the joker and √ in the floor corners, :2 and ·2
  in the middle of the floor, ⚡ low in the left wall. Checked: 0 stalls in
  3 000 perfect level-3 games, a joker needed for 1.8 % of the equations.
- Solved → the equation locks and glows for 0.5 s in its bomb's colour (gold,
  magenta, cyan; Vadim) with a burst of sparks, still falling, then turns
  into the bomb.
- Solved (x = n or n = x) → it locks and becomes a bomb "n" (yellow if
  positive, magenta if negative) in a flickering ring of flames of its own
  colour, bigger for a bigger |n| (`fireSize`). A positive bomb gives n back:
  n splits at random (fair shuffle) into 1 … 4 parts that fly to different
  bricks; a part that would take a brick past 9 goes on to a random brick
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
- No explanations in the game for now (Vadim): no hint line under the well,
  no messages in the dialogs (what the next level brings, why the game
  ended, the start dialog's how-to), no notes on new operations. They come
  later with the tutorial (Esittely). The notes on the equations themselves
  (`| + 1`) and the flying rewards stay.
- Unsolved on landing → trash: single grey bricks, the equation's text faded
  on them while the block is whole. Trash above the red line → Game Over.
- Points (Vadim): 100 per solved equation; a perfect solve (no more
  operations than the fewest, no joker) +50 and +1 operation to the
  emptiest basic brick; a negative bomb 25 × |n| even in an empty well
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
  the other dialogs, leaves the page as usual.
- Start dialog (Vadim): when the page opens, the game waits behind "Taso 1",
  "30 yhtälöä" and Aloita. The tap on Aloita is the touch
  that lets the pause catch back from the first swipe on (without it, a
  first drag caught by the gesture left the page). "Pelaa uudestaan" and
  "↺ Alusta" start at once.

## Open questions (ask Vadim before deciding)

- "Weighing": the scale accepts a box removed on one side and x diamonds on the
  other. Realistic for a scale, but not an allowed step in solving an equation
  (unless the answer is already known). Postponed by Vadim. For now such a
  row in the chain simply has no annotation.
- Division (e.g. 3x = 12 with ÷2/÷3/÷4 tokens that split a cup into equal
  piles): as extra levels in this game, or a separate game "Yhtälövaaka 2"?
- Yhtälösade: what comes after level 3 (x²) is not designed yet.
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
  In Yhtälösade it ends the level at once: what is in the air goes away, the
  trash and counts go on. Keep it hidden from students.
- Deploy = commit and push. When a game starts using `assets/theme.css`, push
  the theme file in the same commit.
