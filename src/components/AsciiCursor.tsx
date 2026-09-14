"use client";
import { useEffect, useRef } from "react";

export default function AsciiCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const charSize = 14; 
    let cols = Math.floor(width / charSize);
    let rows = Math.floor(height / charSize);
    let grid = new Float32Array(cols * rows);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.floor(width / charSize);
      rows = Math.floor(height / charSize);
      grid = new Float32Array(cols * rows);
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000 };
    const lastMouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Character mapping array exactly matching the video degradation
    const chars = ["", "_", "-", ">", "o", "O"];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${charSize}px monospace`;
      ctx.textBaseline = "top";
      
      // Dynamic color inheritance for light/dark mode parity
      // In Next.js with the setup, the attribute might be data-theme="dark"
      const isDark = document.documentElement.getAttribute("data-theme") === "dark" || document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark ? "rgba(228, 208, 208, 0.7)" : "rgba(134, 112, 112, 0.7)";

      // Interpolation prevents gaps when the mouse moves rapidly
      const distance = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
      const steps = Math.max(1, Math.floor(distance / (charSize / 2)));
      
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i <= steps; i++) {
          const interpX = lastMouse.x + (mouse.x - lastMouse.x) * (i / steps);
          const interpY = lastMouse.y + (mouse.y - lastMouse.y) * (i / steps);
          const cx = Math.floor(interpX / charSize);
          const cy = Math.floor(interpY / charSize);
          const radius = 2.5; 

          // Deposit intensity into the grid
          for (let y = -Math.ceil(radius); y <= Math.ceil(radius); y++) {
            for (let x = -Math.ceil(radius); x <= Math.ceil(radius); x++) {
              const idx = (cy + y) * cols + (cx + x);
              if (idx >= 0 && idx < grid.length) {
                const dist = Math.sqrt(x * x + y * y);
                if (dist < radius) {
                  const intensity = 1 - (dist / radius);
                  grid[idx] = Math.min(grid[idx] + intensity * 0.45, 1);
                }
              }
            }
          }
        }
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
      }

      // Render and Decay Loop
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] > 0.01) {
          grid[i] *= 0.90; // Adjust this multiplier to change fade speed
          
          const val = grid[i];
          let charIdx = 0;
          if (val > 0.8) charIdx = 5;
          else if (val > 0.6) charIdx = 4;
          else if (val > 0.4) charIdx = 3;
          else if (val > 0.2) charIdx = 2;
          else if (val > 0.05) charIdx = 1;

          if (charIdx > 0) {
            const x = (i % cols) * charSize;
            const y = Math.floor(i / cols) * charSize;
            ctx.fillText(chars[charIdx], x, y);
          }
        }
      }

      requestAnimationFrame(draw);
    };
    const frameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}