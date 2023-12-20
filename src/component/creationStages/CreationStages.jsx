import { useEffect } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useTrail, useSpring } from "react-spring";
import "./CreationStages.scss";

const cards = [
  {
    id: 1,
    num: "01",
    title: "Створення форми об'єкту",
    text: "Побудова об'ємної геометричної фігури без урахування фізичних характеристик.",
    classes: "stages-item",
  },
  { id: 2, classes: "divider" },
  {
    id: 3,
    num: "02",
    title: "Текстурування",
    text: "Надання кольору та рельєфу, відтворення дрібних деталей.",
    classes: "stages-item",
  },
  { id: 4, classes: "divider" },
  {
    id: 5,
    num: "03",
    title: "Освітлення",
    text: "Надання більшої реалістичності завдяки наявності джерела світла та тіней.",
    classes: "stages-item",
  },
];

const CreationStages = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  const config = { mass: 5, tension: 2000, friction: 500 };
  const fromLeft = { opacity: 0, transform: "translateX(-100px)" };
  const fromRight = { opacity: 0, transform: "translateX(100px)" };
  const to = { opacity: 1, transform: "translateX(0)" };

  //Анімація компонента.
  const [trails, trailsApi] = useTrail(cards.length, () => ({
    ...config,
    from: fromRight,
  }));
  const [titleProps, titleApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      trailsApi.start({
        delay: 500,
        to,
      });
      titleApi.start({
        config: { mass: 2, tension: 2000, friction: 900 },
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  const items = trails.map((props, index) => {
    if (cards[index].classes === "divider") {
      return (
        <animated.li
          style={props}
          key={cards[index].id}
          className="creation-stages__divider"
        >
          <div></div>
        </animated.li>
      );
    }
    return (
      <animated.li
        style={props}
        key={cards[index].id}
        className="creation-stages__stages-item"
      >
        <div className="creation-stages__num">{cards[index].num}</div>
        <div className="creation-stages__card">
          <h3 className="creation-stages__card-title">{cards[index].title}</h3>
          <p className="creation-stages__card-description">
            {cards[index].text}
          </p>
        </div>
      </animated.li>
    );
  });

  return (
    <section ref={ref} className="creation-stages">
      <div className="creation-stages__container">
        <div className="creation-stages__wrapper">
          <animated.h2 style={titleProps} className="creation-stages__title">
            Етапи створення <span>3D</span>-моделі
          </animated.h2>
          <ul className="creation-stages__stages-list">{items}</ul>
        </div>
      </div>
    </section>
  );
};

export default CreationStages;
