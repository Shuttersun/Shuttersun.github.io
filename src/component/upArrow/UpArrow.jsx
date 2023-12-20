import { useState, useEffect } from "react";
import { useWindowScroll } from "@uidotdev/usehooks";
import "./UpArrow.scss";

const UpArrow = () => {
  const [{ y }, scroll] = useWindowScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (y >= 1200) {
      setShow(true);
      return;
    }
    setShow(false);
  }, [y]);

  return (
    <div
      onClick={() => scroll({ top: 0, behavior: "smooth" })}
      className={`up-arrow ${show ? "show" : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M10 2.5L3.75 8.75L4.63125 9.63125L9.375 4.89375V17.5H10.625V4.89375L15.3687 9.63125L16.25 8.75L10 2.5Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default UpArrow;
