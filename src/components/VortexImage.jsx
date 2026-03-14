import React, { useRef, useEffect, useState } from "react";
import fx from "glfx";

export default function VortexImage({ image, top = -35, left = -35, swirl = 15, x, y }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [data, setData] = useState({})

  useEffect(() => {
    if (!image) return;
    if (!containerRef.current) return;

    // ensure image is actually loaded
    if (!image.complete || image.naturalWidth === 0) return;

    const rect = containerRef.current.getBoundingClientRect();

    let canvas = canvasRef.current;

    if (!canvas) {
      canvas = fx.canvas();
      canvasRef.current = canvas;
      containerRef.current.appendChild(canvas);
    }

    canvas.width = rect.width;
    canvas.height = rect.height;

    const texture = canvas.texture(image);

    canvas
      .draw(texture)
      .swirl(
        (x || canvas.width) / 2,
        (y || canvas.height) / 2,
        Math.min(canvas.width, canvas.height),
        swirl
      )
      .update();

      const dataUrl = canvas.toDataURL("image/png")
      setData({
        width: canvas.width,
        height: canvas.height,
        data: dataUrl
      })

  }, [image, swirl, x, y]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: `${left}%`,
        top: `${top}%`
      }}
    >
      <img src={data.data} width={data.width} height={data.height} />
    </div>
  );
}