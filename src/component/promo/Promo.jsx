import { useEffect, lazy } from "react";
import { animated, useSpring, useTrail } from "react-spring";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import Header from "../header/Header";

import "./Promo.scss";

import penIcon from "../../assets/icons/pen-icon.svg";
import boxIcon from "../../assets/icons/box-icon.svg";
import printIcon from "../../assets/icons/print-icon.svg";
import scrollIcon from "../../assets/icons/scroll-icon.svg";

import rocket from "../../assets/animations/rocket.json";

const Lottie = lazy(() => import("react-lottie-player"));

const cards = [
  {
    id: 1,
    img: penIcon,
    text: "Використовуємо готову модель або допоможемо з проектуванням",
  },
  {
    id: 2,
    img: boxIcon,
    text: "Виробляємо як поодинокі екземпляри, так і випускаємо тиражі.",
  },
  { id: 3, img: printIcon, text: "Друкуємо за технологією FDM і SLA" },
];

const Promo = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const fromLeft = { opacity: 0, transform: "translateX(-100px)" };
  const to = { opacity: 1, transform: "translate(0)" };
  const config = { mass: 5, tension: 2000, friction: 200 };

  //Анімація компонента.
  const [titleProps, titleApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));

  const [trails, cardApi] = useTrail(cards.length, () => ({
    from: fromLeft,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      titleApi.start({
        config: { mass: 2, tension: 2000, friction: 900 },
        to,
      });
      cardApi.start({
        delay: 500,
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  const items = trails.map((props, index) => (
    <animated.li
      key={cards[index].id}
      style={props}
      className="promo__info-card"
    >
      <div className="promo__info-icon">
        <img src={cards[index].img} alt="icon" />
      </div>
      <p className="promo__info-text">{cards[index].text}</p>
    </animated.li>
  ));

  return (
    <section ref={ref} className="promo">
      <div className="promo__wrapper">
        <div className="promo__container">
          <Header />
          <div className="promo__content-wrapper">
            <div className="promo__content-description">
              <animated.h1 style={titleProps} className="promo__main-title">
                <span>Послуги</span> <span>3D</span>-друку
              </animated.h1>
              <ul className="promo__info-list">{items}</ul>
            </div>

            <div className="promo__content-animation">
              <div
                className="promo__animation-box
              "
              >
                <Lottie
                  loop
                  animationData={rocket}
                  play
                  className="animation"
                />
              </div>
            </div>
          </div>

          <div className="promo__scroll-prompt">
            <img
              src={scrollIcon}
              alt="prompt scroll icon"
              className="promo__scroll-icon"
            />
            <span className="promo__scroll-text">Гортайте вниз</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
