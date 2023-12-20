import { useEffect } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useSpring } from "react-spring";
import SelectTechnologyWrapper from "../selectTechnologyWrapper/SelectTechnologyWrapper";
import CalcForm from "../calcForm/CalcForm";

import "./CalcFormModule.scss";

const CalcFormModule = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "-150px 0px 0px 0px",
  });

  const fromLeft = { opacity: 0, transform: "translateX(-100px)" };
  const fromRight = { opacity: 0, transform: "translateX(100px)" };
  const to = { opacity: 1, transform: "translate(0)" };

  const config = { mass: 5, tension: 2000, friction: 200 };

  //Анімація компоненту
  const [titleProps, titleApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [accordionProps, accordionApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [formProps, formApi] = useSpring(() => ({
    ...config,
    from: fromRight,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      titleApi.start({
        config: { mass: 2, tension: 2000, friction: 900 },
        to,
      });
      accordionApi.start({
        delay: 500,
        to,
      });
      formApi.start({
        delay: 500,
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  return (
    <div ref={ref} className="calc-form-module">
      <div className="calc-form-module__container">
        <animated.h2 style={titleProps} className="calc-form-module__title">
          Розрахувати вартість <span>3D</span>-друку
        </animated.h2>
        <div className="calc-form-module__content">
          <animated.div style={accordionProps}>
            <SelectTechnologyWrapper />
          </animated.div>
          <animated.div style={formProps} className="calc-form-module__form">
            <CalcForm />
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default CalcFormModule;
