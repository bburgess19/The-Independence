import { useState, useRef, useEffect } from "react";
import "../assets/Brackets.css";

export const useContainerDimensions = (myRef, genre) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, genre]); // Force a refresh if the genre (url) changes

  return dimensions;
};

export default function Brackets({ children, genre }) {
  const contentRef = useRef(null);
  const { width, height } = useContainerDimensions(contentRef, genre);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const innerDist = 40;
    const outerDist = 30;

    if (contentRef.current !== null) {
      contentRef.current.style.backgroundImage = "";
    }

    canvas.width = width;
    canvas.height = height;

    // Make the canvas transparent
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set line color
    if (genre) {
      let color = getComputedStyle(document.documentElement).getPropertyValue(
        `--${genre.class_name}`,
      );
      context.fillStyle = `rgb(${color})`;
    } else {
      context.fillStyle = "#fff";
    }
    context.fillRect(2, 2, 2, 35); // Outer top left vertical
    context.fillRect(10, 10, 4, 45); // Inner top left vertical
    context.fillRect(2, 2, 35, 2); // Outer top left horizontal
    context.fillRect(10, 10, 45, 4); // Inner top left horizontal

    context.fillRect(width - 2, height - 2, -outerDist, -2); // Outer bottom right horizontal
    context.fillRect(width - 10, height - 10, -innerDist, -4); // Inner bottom right horizontal
    context.fillRect(width - 2, height - 2, -2, -outerDist); // Outer bottom right vertical
    context.fillRect(width - 10, height - 10, -4, -innerDist); // Inner bottom right vertical

    contentRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
  }, [width, height, genre]);

  return (
    <div className="brackets-wrapper" ref={contentRef}>
      {children}
    </div>
  );
}
