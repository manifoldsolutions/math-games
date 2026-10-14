/* ══════════════════════════════════════════════════════════════════════
   MATIKKAPELIT — shared celebration (streamers and confetti)
   ──────────────────────────────────────────────────────────────────────
   IN A GAME, before the game's own <script>:
     <script src="../../../../assets/celebrate.js"></script>
   then call
     celebrate()                     two bursts at 40 % of the screen height
     celebrate({y: 300})             two bursts at that height (screen px)
     celebrate({x: 200, y: 300})     one burst at that point
     celebrate({x: [100, 300], y})   one burst at each x

   Drawn on a temporary full-screen canvas just below dialogs (z-index 9, the
   .overlay is 10). It lets clicks through and removes itself after about
   3 s. Colours come from --party-colors in assets/theme.css. Does nothing
   when the viewer prefers reduced motion.
   ══════════════════════════════════════════════════════════════════════ */
"use strict";

function celebrate(opts = {}){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = (getComputedStyle(document.documentElement).getPropertyValue("--party-colors") || "")
    .split(",").map(c => c.trim()).filter(Boolean);
  if(!colors.length) colors.push("#00e5ff","#ff3df2","#ffe14d","#39ff9e","#a78bff","#ffffff");

  const cv = document.createElement("canvas");
  cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9";
  document.body.appendChild(cv);
  const dpr = Math.min(2, window.devicePixelRatio || 1), W = innerWidth, H = innerHeight;
  cv.width = W*dpr; cv.height = H*dpr;
  const ctx = cv.getContext("2d"); ctx.scale(dpr, dpr);
  const rnd = (a,b) => a + Math.random()*(b-a), col = () => colors[Math.floor(Math.random()*colors.length)];

  const xs = opts.x === undefined ? [W*0.28, W*0.72] : [].concat(opts.x);
  const cy = opts.y === undefined ? H*0.4 : opts.y;
  const power = Math.max(W, H);
  const pieces = [];
  // a single burst gets the pieces of two, so it looks as full
  const k = xs.length === 1 ? 2 : 1;
  for(const cx of xs){
    for(let i=0; i<16*k; i++){                           // streamers: curly ribbons with a trail
      const a = rnd(0, Math.PI*2), v = rnd(0.3, 0.7)*power;
      pieces.push({kind:"s", x:cx, y:cy, vx:Math.cos(a)*v, vy:Math.sin(a)*v*0.7 - 0.25*power,
        trail:[], color:col(), w:rnd(4,7), phase:rnd(0,6.3), freq:rnd(9,15), amp:rnd(5,11), delay:rnd(0,0.08)});
    }
    for(let i=0; i<45*k; i++){                           // confetti flakes
      const a = rnd(0, Math.PI*2), v = rnd(0.2, 0.75)*power;
      pieces.push({kind:"c", x:cx, y:cy, vx:Math.cos(a)*v, vy:Math.sin(a)*v*0.7 - 0.2*power,
        color:col(), size:rnd(6,11), rot:rnd(0,6.3), vr:rnd(-12,12), flip:rnd(0,6.3), delay:rnd(0,0.1)});
    }
  }

  const T = 3.2, g = power*0.9;                          // lifetime (s), gravity (px/s²)
  const t0 = performance.now(); let last = t0;
  (function step(now){
    const t = (now - t0)/1000, dt = Math.min(0.033, (now - last)/1000); last = now;
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = Math.min(1, Math.max(0, (T - t)/0.8));
    for(const p of pieces){
      if(t < p.delay) continue;
      // air resistance: light on the way up, heavy on the way down so pieces flutter
      const drag = p.vy < 0 ? (p.kind === "s" ? 1.2 : 1.6) : (p.kind === "s" ? 3.0 : 3.6);
      const h = p.vy < 0 ? dt*2 : dt;                    // the burst plays at double speed
      p.vx -= p.vx*drag*h; p.vy += g*h; p.vy -= p.vy*drag*h;
      p.x += p.vx*h; p.y += p.vy*h;
      if(p.kind === "s"){
        // the ribbon wiggles sideways to its motion, which curls it
        const sp = Math.hypot(p.vx, p.vy) || 1, nx = -p.vy/sp, ny = p.vx/sp;
        const wob = Math.sin(t*p.freq + p.phase)*p.amp;
        p.trail.push({x:p.x + nx*wob, y:p.y + ny*wob}); if(p.trail.length > 26) p.trail.shift();
        ctx.strokeStyle = p.color; ctx.lineWidth = p.w; ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.beginPath(); p.trail.forEach((q,i) => i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)); ctx.stroke();
      } else {
        p.rot += p.vr*dt; p.flip += dt*9;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.scale(1, Math.cos(p.flip));                  // tumbling paper
        ctx.fillStyle = p.color; ctx.fillRect(-p.size/2, -p.size*0.3, p.size, p.size*0.6);
        ctx.restore();
      }
    }
    if(t < T) requestAnimationFrame(step); else cv.remove();
  })(t0);
}
