import "../assets/SectionEditorGrid.css";
import { useState, useEffect } from "react";

const placementDictWide = {
  0: [4, 2],
  1: [7, 10],
  2: [4, 18],
};

const placementDictMid = {
  0: [4, 2],
  1: [7, 14],
};

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function SectionEditorGrid({ editors }) {
  const updateSize = (width) => {
    let res;
    if (width > 768) {
      res = "wide";
    } else if (width > 425) {
      res = "mid";
    } else {
      res = "narrow";
    }

    // Only update if the size has changed
    return res;
  };
  const [size, setSize] = useState(updateSize(window.innerWidth));

  const handleResize = () => {
    let res = updateSize(window.innerWidth);

    // Only update if the size has changed
    if (res !== size) {
      setSize(res);
    }
  };

  const debouncedHandleResize = debounce(handleResize, 200);

  const getPlacementStyles = (i) => {
    if (size === "wide") {
      return {
        gridRowStart: placementDictWide[i % 3][0] + 10 * Math.floor(i / 3),
        gridRowEnd: placementDictWide[i % 3][0] + 10 * Math.floor(i / 3) + 10,
        gridColumnStart: placementDictWide[i % 3][1],
        gridColumnEnd: placementDictWide[i % 3][1] + 8,
      };
    } else if (size === "mid") {
      return {
        gridRowStart: placementDictMid[i % 2][0] + 10 * Math.floor(i / 2),
        gridRowEnd: placementDictMid[i % 2][0] + 10 * Math.floor(i / 2) + 10,
        gridColumnStart: placementDictMid[i % 2][1],
        gridColumnEnd: placementDictMid[i % 2][1] + 12,
      };
    } else {
      return {
        gridRowStart: 4 + 8 * i,
        gridRowEnd: 4 + (8 * i + 8),
        gridColumnStart: 2,
        gridColumnEnd: 26,
      };
    }
  };

  useEffect(() => {}, [size]);

  useEffect(() => {
    window.addEventListener("resize", debouncedHandleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  return (
    <div id="section-editor-grid">
      <h1 id="editors-header">Section Editors</h1>
      {editors.map((editor, i) => {
        return (
          <div
            className="editor-card"
            style={{
              ...getPlacementStyles(i),
            }}
            key={editor.name}
          >
            <div className="editor-img-wrapper">
              <img src={editor.profile_img} alt={editor.name} />
            </div>
            <div className="editor-details">
              <h3>{editor.name}</h3>
              <p id="editor-blurb">{editor.blurb}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
