import { useEffect, useRef } from "react";

const GrainedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Grain options
    const options = {
      animate: true,
      patternWidth: 100,
      patternHeight: 100,
      grainOpacity: 0.1, // More visible grain opacity
      grainDensity: 1,
      grainWidth: 1,
      grainHeight: 1,
    };

    // Create grain pattern
    const createGrain = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const grain = Math.random() * 200; // Much brighter grain (0-200)
        data[i] = grain; // Red
        data[i + 1] = grain; // Green
        data[i + 2] = grain; // Blue
        data[i + 3] = options.grainOpacity * 255; // Alpha
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      createGrain();
      if (options.animate) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        mixBlendMode: "normal",
        opacity: 1,
      }}
    />
  );
};

export default GrainedBackground;
