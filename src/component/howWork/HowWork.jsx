import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useTrail, useSpring } from "@react-spring/web";
import { useEffect } from "react";

import workers from "../../assets/img/workers.svg";
import "./HowWork.scss";

const cards = [
  {
    id: 1,
    classes: "how-work__item horizontal-item",
    text: "Складання заявки на прорахунок вартості та строків",
  },
  { id: 2, classes: "how-work__item", text: "Передплата роботи" },
  {
    id: 3,
    classes: "how-work__item",
    text: "Створення та узгодження 3D-моделі",
  },
  { id: 4, classes: "how-work__item", text: "Передплата роботи" },
  {
    id: 5,
    classes: "how-work__item",
    text: "Надсилання клієнту після оплати залишку",
  },
];

const HowWork = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "-150px 0px 0px 0px",
  });

  const fromLeft = { opacity: 0, transform: "translateX(-100px)" };
  const fromRight = { opacity: 0, transform: "translateX(100px)" };
  const to = { opacity: 1, transform: "translate(0)" };
  const config = { mass: 5, tension: 3000, friction: 500 };

  //Анімація компонента.
  const [trails, cardsApi] = useTrail(cards.length, () => ({
    ...config,
    from: fromRight,
  }));
  const [imgProps, imgApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [titleProps, titleApi] = useSpring(() => ({
    config: { mass: 2, tension: 2000, friction: 900 },
    from: fromLeft,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      cardsApi.start({
        delay: 1000,
        to,
      });
      imgApi.start({
        delay: 500,
        to,
      });
      titleApi.start({
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  return (
    <section ref={ref} className="how-work">
      <div className="how-work__container">
        <animated.h2 style={titleProps} className="how-work__title">
          Як ми працюємо
        </animated.h2>
        <div className="how-work__content">
          <animated.div style={imgProps} className="how-work__image">
            <img src={workers} alt="people at work" />
          </animated.div>
          <ul className="how-work__list">
            {trails.map((props, index) => (
              <animated.li
                key={index}
                style={props}
                className={cards[index].classes}
              >
                <div>{cards[index].id}</div>
                <span>{cards[index].text}</span>
              </animated.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowWork;
