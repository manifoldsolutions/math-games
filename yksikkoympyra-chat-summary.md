# Chat summary: new math games (October 2026)

Context: new games for the math education site, in the same style as the earlier balance-scale equation game (same palette, fonts, header, overlay, Finnish UI).

## 1. Circumference estimation game (on hold)

**Original idea:** a circle with a string attached to its circumference. The player pulls the string to a length they think equals the circumference; the string then wraps around the circle (animated) to show how close they were.

**Contexts discussed to make the task feel natural** (key insight: the player must commit to a length *before* they can check it):

- Cutting ribbon for a cake or round gift box (snip = commit moment; gap or overhang is visible)
- A cooper forging a barrel hoop
- Fencing a round pond or garden (order fence, then it gets laid)
- **Rolling wheel:** place a flag where a painted mark on the wheel touches the ground again after one turn. Same mathematics as wrapping, in reverse.

**Pedagogical payoff:** show the diameter laid along the string, about three diameters and a bit every time, so players discover π.

Later extensions: the inverse task (given a ribbon, draw the cake), the rope-around-the-Earth puzzle.

**Portrait phones:** web pages can't reliably force landscape (iOS Safari doesn't allow orientation lock). Vertical alternatives: a **well with a winch** (chosen), a paint roller on a wall, a toilet-paper roll. Constraint: the circle must be at most about ¼ of the screen height, or the camera follows the bucket.

**Chosen direction: the well.** Side view, winch drum at the top with the rope wound exactly once. Open question was why overshooting should be bad. The suggested answer: water is scarce (drought setting), so the player fills the well to a chosen level using as little water as possible:

- Too low: empty bucket
- Slightly low: partly filled bucket (graded feedback)
- Too high: full bucket but visible wasted water
- Ideal: water surface at the bucket's rim

Alternative: the player digs the well to a chosen depth. **Status: put on hold.**

## 2. Unit-circle trigonometry game "Yksikköympyrä" (built)

**File:** `yksikkoympyra/index.html`, self-contained, Finnish UI. The "Takaisin" link currently points to `../../../../#/lukio`; set `COURSE_URL` near the top of the script to the right course path.

### Gameplay

- An equation about α is shown above the unit circle with axes.
- A ray follows the mouse (hover) or the finger (drag). Click or lift the finger to place a point; placing on an existing point removes it.
- The player marks **all** points where the equation holds, then presses **Tarkista**.
- From level 3 there are also **Ei ratkaisuja** and **Jokainen piste** answers.
- A point counts if it is within 5° of a solution.
- Live helpers while aiming: cos α (green segment on the x-axis), sin α (brown segment on the y-axis), and from level 4 tan α as a height on the dashed tangent line x = 1. A faint grid with spacing ½ helps with non-special angles like arctan 2.
- After checking: correct points turn green, wrong ones red, missed solutions pulse as dashed rings. The geometry behind the answer is drawn (y = ½ line, slope line, rays), with an explanation and the solutions listed in degrees and/or radians.
- Keyboard: ←/→ turn the ray 15° (Shift: 1°), Space places/removes, Enter checks/next, r clears.

### Levels (6 tasks each, 5 correct to advance)

1. Angles in degrees (−45°, ±30°, 390°, −270°, ±150°, …)
2. Radians (2π ± π/2, 7π/6, 3π, …)
3. sin and cos values, including no-solution equations
4. Tangent, sin α = cos α, squares (sin²α = ¼), sin²α + cos²α = 1, sin α · cos α = 0
5. Inverse functions vs plain equations (tan⁻¹(½) vs tan α = ½, sin⁻¹, cos⁻¹ ranges)
6. Multiple angles (cos 2α = 0, sin 3α = 1, tan 2α = 1, sin(α/2) = 0, …)
7. Mix of levels 3–6

### Help features (added after feedback that it was too hard from level 4)

- **Memory triangle buttons** (from level 3): *30°–60°-kolmio* (equilateral triangle halved, sides 1, 2, √3) and *45°-kolmio* (sides 1, 1, √2). Each opens a card with the classic triangle, a note on scaling the hypotenuse to 1, and a table of sin, cos, tan values in degrees and radians.
- **💡 Vihje button**, one step per press:
  1. **Memory triangle first** for the 22 tasks where it helps: "Tutki tasasivuista muistikolmiota!" (anything with √3 or ½) or "Tutki tasakylkistä muistikolmiota!" (√2/2 or 45°). The triangle name is a link that opens the card.
  2. **Method hint.** Levels 1–2 decompose the angle into easy parts:
     - Degrees: "Huomaa, että 150° = 90° + 60°", "270° = 180° + 90°", "390° = 360° + 30°"
     - Radians, without converting to degrees: "Huomaa, että 7π/6 = π + π/6, ja π on tasan puoli kierrosta"
     - Already-easy angles (60°, ±30°, …) keep the generic "start from the positive x-axis" hint.
     - Later levels have task-specific method hints (both signs for squares, solve 2α first, inverse function ranges, …).
  3. **State hint** based on the placed points: wrong points, how many solutions there are, how many are missing.
  4. **Helper line** drawn into the circle (y = c, x = c, or the slope line) without revealing the points.
- **Progress first:** if the player has found some solutions, has no wrong points, and some are still missing, the hint skips straight to the state hint. With two solutions: "Olet jo löytänyt yhden oikean ratkaisun. Toinen ratkaisu löytyy symmetrisesti: se on löytämäsi pisteen peilikuva x-akselin suhteen." The symmetry (x-axis, y-axis, y = ±x, or "origon toisella puolella, 180° / π päässä") is computed from the solutions. A reason sentence is added only when true (sine: α and 180° − α; cosine: α and −α; tangent: α and α + 180°).
- Hints don't affect the score.

### Possible next steps

- Split level 4 into a tangent-only level and a relations/squares level to smooth the difficulty jump.
- Fix the course link path.
- Return to the well game.
