import { useEffect } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useSpring, useTrail } from "react-spring";
import servicesIcon from "../../assets/icons/services-card-icon.svg";
import accuracyIcon from "../../assets/icons/accuracy-card-icon.svg";
import productionIcon from "../../assets/icons/production-card-icon.svg";
import speedIcon from "../../assets/icons/speed-card-icon.svg";
import deliveryIcon from "../../assets/icons/delivery-card-icon.svg";

import "./OurAdvantages.scss";

const cards = [
  {
    id: 1,
    img: servicesIcon,
    title: "Повний спектр послуг",
    text: "3D-моделювання, друк виробів, постобробка",
  },
  {
    id: 2,
    img: accuracyIcon,
    title: "Висока точність",
    text: "Від 20 до 300 мікронів",
  },
  {
    id: 3,
    img: productionIcon,
    title: "Виробництво тиражами",
    text: "Друкуємо у кількості від 1 до 1000 штук",
  },
  {
    id: 4,
    img: speedIcon,
    title: "Швидкість виконання",
    text: "На виробництво виробів йде від 1 до 3 днів",
  },
  {
    id: 5,
    img: deliveryIcon,
    title: "Доставка по всій Україні",
    text: "Здійснюємо доставку Новою Поштою",
  },
];

const OurAdvantages = () => {
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
  const [titleProps, titleApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));

  const [trails, trailsApi] = useTrail(cards.length, () => ({
    ...config,
    from: fromRight,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      titleApi.start({
        ...config,
        to,
      });
      trailsApi.start({
        delay: 500,
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  const items = trails.map((props, index) => (
    <animated.li
      style={props}
      key={cards[index].id}
      className="our-advantages__advantages-card"
    >
      <img src={cards[index].img} alt="icon" />
      <div className="our-advantages__card-description">
        <h3 className="our-advantages__card-title">{cards[index].title}</h3>
        <p className="our-advantages__card-text">{cards[index].text}</p>
      </div>
    </animated.li>
  ));

  return (
    <section ref={ref} className="our-advantages">
      <div className="our-advantages__container">
        <ul className="our-advantages__advantages-list">
          <li className="our-advantages__advantages-card">
            <animated.h2 style={titleProps} className="our-advantages__title">
              Наші переваги
            </animated.h2>
          </li>
          {items}
        </ul>
      </div>
    </section>
  );
};

export default OurAdvantages;
