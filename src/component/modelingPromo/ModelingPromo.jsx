import { useEffect } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useSpring } from "react-spring";
import SubPromo from "../subPromo/SubPromo";
import "./ModelingPromo.scss";

const items = [
  { id: 1, text: "створення прототипів технічних виробів" },
  { id: 2, text: "візуалізація конструкцій та інженерних споруд" },
  { id: 3, text: "проектування архітектури, інтер'єрів та меблів" },
  { id: 4, text: "візуалізація ювелірних виробів" },
  { id: 5, text: "використання 3D-моделей для презентації чи реклами" },
  { id: 6, text: "моделювання персонажів та локацій в ігровій індустрії" },
];

const ModelingPromo = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const config = { mass: 5, tension: 2000, friction: 500 };
  const fromLeft = { opacity: 0, transform: "translateX(-100px)" };
  const fromRight = { opacity: 0, transform: "translateX(100px)" };
  const to = { opacity: 1, transform: "translateX(0)" };

  // Анімація компонента.
  const [developProps, developApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [sphereProps, sphereApi] = useSpring(() => ({
    ...config,
    from: fromRight,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      developApi.start({
        delay: 500,
        to,
      });
      sphereApi.start({
        delay: 500,
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  const liItems = items.map(({ id, text }) => {
    return (
      <li key={id} className="modeling-promo__sphere-item">
        {text}
      </li>
    );
  });

  return (
    <>
      <SubPromo>
        <span>3D</span>-моделювання та промисловий дизайн
      </SubPromo>
      <section ref={ref} className="modeling-promo">
        <div className="modeling-promo__container">
          <div className="modeling-promo__content">
            <animated.div
              style={developProps}
              className="modeling-promo__develop"
            >
              <p className="modeling-promo__description">
                Розробимо тривимірну модель об'єкта в цифровому форматі,
                допоможемо спроектувати та красиво піднести майбутній виріб.
              </p>
              <p className="modeling-promo__description-info">
                Для створення необхідно якнайбільше інформації: це можуть бути
                креслення, фотографії, ескізи з розмірами.
              </p>
            </animated.div>
            <animated.div
              style={sphereProps}
              className="modeling-promo__sphere"
            >
              <span className="modeling-promo__sphere-title">
                Сфера застосування
              </span>
              <ul className="modeling-promo__sphere-list">{liItems}</ul>
            </animated.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModelingPromo;
