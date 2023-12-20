import { useEffect } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useSpring } from "react-spring";

import Header from "../header/Header";
import "./SubPromo.scss";

const SubPromo = ({ children }) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const fromLeft = { opacity: 0, transform: "translateX(-100px)" };
  const to = { opacity: 1, transform: "translateX(0)" };

  const [titleProps, titleApi] = useSpring(() => ({
    from: fromLeft,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      titleApi.start({
        config: { mass: 2, tension: 2000, friction: 900 },
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  return (
    <div ref={ref} className="sub-promo">
      <div className="sub-promo__container">
        <Header />
        <animated.h2 style={titleProps} className="sub-promo__title">
          {children}
        </animated.h2>
      </div>
    </div>
  );
};

export default SubPromo;
