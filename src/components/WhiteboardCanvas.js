import React, { useRef, useEffect } from "react";

function WhiteboardCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [e.clientX, e.clientY];
    }

    function draw(e) {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      [lastX, lastY] = [e.clientX, e.clientY];
    }

    function stopDrawing() {
      isDrawing = false;
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default WhiteboardCanvas;
