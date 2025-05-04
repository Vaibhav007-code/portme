
import React, { useEffect, useState } from "react";

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" || 
        target.tagName === "A" || 
        target.tagName === "BUTTON"
      );
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <>
          {/* Main cursor */}
          <div
            className="custom-cursor"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: isClicking ? "12px" : isPointer ? "24px" : "16px",
              height: isClicking ? "12px" : isPointer ? "24px" : "16px",
              opacity: isClicking ? "0.6" : "0.4",
              mixBlendMode: "screen",
            }}
          />
          
          {/* Cursor trail */}
          <div
            className="custom-cursor animate-pulse"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: "8px",
              height: "8px",
              opacity: "0.2",
              transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
            }}
          />
        </>
      )}
    </>
  );
};

export default Cursor;
