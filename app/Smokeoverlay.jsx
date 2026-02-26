"use client";
import { useEffect, useRef } from "react";

// Lightweight pseudo-noise — smooth, fast, no dependencies
function noise(x, y, t) {
  const X = Math.sin(x * 1.7 + t * 0.4) * 0.5;
  const Y = Math.cos(y * 1.3 - t * 0.3) * 0.5;
  const Z = Math.sin((x + y) * 0.9 + t * 0.6) * 0.5;
  return (X + Y + Z) / 1.5;
}

export default function SmokeOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId,
      W,
      H,
      t = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    class Puff {
      constructor(side, index) {
        this.side = side;
        this.index = index;
        this.reset(true);
      }

      reset(initial = false) {
        const s = this.side;
        this.x =
          s === "left"
            ? Math.random() * W * 0.06
            : W - Math.random() * W * 0.06;
        this.y = H * Math.random();
        this.baseR = 70 + Math.random() * 130;
        this.r = this.baseR;
        this.baseVx =
          s === "left"
            ? 0.18 + Math.random() * 0.22
            : -(0.18 + Math.random() * 0.22);
        this.baseVy = -(0.05 + Math.random() * 0.12);
        this.life = initial ? Math.floor(Math.random() * 600) : 0;
        this.maxLife = 500 + Math.random() * 500;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.004;
        this.scaleX = 1.6 + Math.random() * 1.2;
        this.scaleY = 0.38 + Math.random() * 0.35;
        this.nx = Math.random() * 100;
        this.ny = Math.random() * 100;
        this.targetAlpha = 0.06 + Math.random() * 0.05;
      }

      getAlpha() {
        const p = this.life / this.maxLife;
        if (p < 0.12) return (p / 0.12) * this.targetAlpha;
        if (p < 0.65) return this.targetAlpha;
        return ((1 - p) / 0.35) * this.targetAlpha;
      }

      update() {
        this.life++;
        const freq = 0.003 + this.index * 0.0001;
        const turb = noise(this.x * freq + this.nx, this.y * freq + this.ny, t);
        const turb2 = noise(
          this.x * freq * 1.4 + 50,
          this.y * freq * 1.6 + 30,
          t * 1.2,
        );
        this.x += this.baseVx + turb * 0.9;
        this.y += this.baseVy + turb2 * 0.7;
        this.rot += this.rotSpeed + turb * 0.002;
        this.r =
          this.baseR + Math.sin(t * 0.8 + this.index) * 12 + this.life * 0.18;
        if (this.life >= this.maxLife) this.reset();
      }

      draw() {
        const alpha = this.getAlpha();
        const edgeFade =
          this.side === "left"
            ? Math.max(0, 1 - this.x / (W * 0.44))
            : Math.max(0, 1 - (W - this.x) / (W * 0.44));
        const a = alpha * edgeFade;
        if (a < 0.004) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.scale(this.scaleX, this.scaleY);

        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.r);
        g.addColorStop(0, `rgba(255,255,255,${a * 0.7})`);
        g.addColorStop(0.22, `rgba(240,240,248,${a * 0.55})`);
        g.addColorStop(0.5, `rgba(220,220,235,${a * 0.3})`);
        g.addColorStop(0.78, `rgba(200,200,220,${a * 0.1})`);
        g.addColorStop(1, `rgba(200,200,220,0)`);

        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();
      }
    }

    const puffs = [];
    for (let i = 0; i < 26; i++) puffs.push(new Puff("left", i));
    for (let i = 0; i < 26; i++) puffs.push(new Puff("right", i + 26));

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;
      puffs.sort((a, b) => b.r - a.r);
      puffs.forEach((p) => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
