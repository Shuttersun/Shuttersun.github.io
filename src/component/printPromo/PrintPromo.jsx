import React, { useEffect, useState } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useSpring } from "react-spring";
import { useMeasure } from "@uidotdev/usehooks";
import PropTypes from "prop-types";
import SubPromo from "../subPromo/SubPromo";

import "./PrintPromo.scss";

/**
 * Компонент Акордеон, який відображає список елементів у стилі акордеону.
 * Кожен елемент розгортається, щоб показати свій опис.
 *
 * @param {Object} props - React властивості.
 * @param {Object} props.children - Дочірній елемент(и) або компонент(и).
 * @param {string} props.title - Заголовок елемента.
 * @param {boolean} props.active - Логічне значення для відображення елемента, за замовченням false.
 * @returns {JSX.Element} - відображений елемент.
 */
const AccordionItem = ({ children, title, active = false }) => {
  const [showItem, setShowItem] = useState(false);
  const [itemHeight, setItemHeight] = useState(null);
  const [checkHeight, setCheckHeight] = useState(true);
  const [ref, { height }] = useMeasure();

  useEffect(() => {
    if (typeof height === "number" && checkHeight) {
      setItemHeight(height);
      setCheckHeight(false);
    }
    // eslint-disable-next-line
  }, [height]);

  useEffect(() => {
    if (active) {
      setShowItem(true);
    }
  }, [active]);

  const showItemHandler = () => {
    setShowItem(!showItem);
  };

  const config = { mass: 1 };

  //Анімація компонента.
  const [textHeightProps, textHeightApi] = useSpring(() => ({
    ...config,
    paddingLeft: 24,
    paddingRight: 24,
    from: { height: itemHeight, paddingTop: 16, paddingBottom: 30 },
  }));

  useEffect(() => {
    textHeightApi.start({
      to: { height: 0, paddingTop: 0, paddingBottom: 0 },
    });

    if (itemHeight && showItem) {
      textHeightApi.start({
        to: { height: itemHeight, paddingTop: 16, paddingBottom: 30 },
      });
    }
    // eslint-disable-next-line
  }, [showItem, itemHeight]);

  return (
    <div
      onClick={showItemHandler}
      className={`print-promo__accordion-item ${showItem ? "active" : ""}`}
    >
      <div className="print-promo__accordion-top">
        <h3 className="print-promo__accordion-title">{title}</h3>
        <div
          className={`print-promo__accordion-toggle ${showItem ? "open" : ""}`}
        ></div>
      </div>
      <animated.p
        ref={ref}
        style={textHeightProps}
        className="print-promo__accordion-content"
      >
        {children}
      </animated.p>
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

const PrintPromo = () => {
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
  const [servicesProps, servicesApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [technologyProps, technologyApi] = useSpring(() => ({
    ...config,
    from: fromRight,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      servicesApi.start({
        delay: 500,
        to,
      });
      technologyApi.start({
        delay: 500,

        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  return (
    <>
      <SubPromo>
        <span>3D</span>-друк
      </SubPromo>
      <section ref={ref} className="print-promo">
        <div className="print-promo__container">
          <div className="print-promo__content-wrapper">
            <animated.div
              style={servicesProps}
              className="print-promo__services-wrapper"
            >
              <p className="print-promo__services-text">
                Пропонуємо послуги 3D-друку для виробництва прототипів або
                готових виробів будь-якої форми, кольору та міцності. Готові
                виробляти як поодинокі екземпляри, так і цілі партії для дрібних
                та великих виробництв.
              </p>
            </animated.div>
            <animated.div
              style={technologyProps}
              className="print-promo__technology-wrapper"
            >
              <p className="print-promo__technology-text">
                У нашій студії використовуються дві основні технології друку:
              </p>
              <div className="print-promo__accordion-wrapper">
                <AccordionItem active={true} title={`FDM`}>
                  Друк методом адитивного виробництва: розплавлений пластик (або
                  інший філамент) наноситься шар за шаром для побудови об'єкт.
                  Для створення виробів з широкого спектру матеріалів з різними
                  характеристиками та властивостями.
                </AccordionItem>
                <AccordionItem title="SLA">
                  У SLA друку, об'єкт створюється шляхом селективного
                  затвердіння полімерної смоли, шар за шаром, з використанням
                  ультрафіолетового (УФ) лазерного променя.
                </AccordionItem>
              </div>
              <p className="print-promo__technology-text">
                Завдяки високій точності опрацювання та якості матеріалів можемо
                бути корисними для цілого ряду галузей: промислових стартапів,
                автомобільного виробництва, сфери архітектури та медицини,
                сувенірів та творів мистецтва.
              </p>
            </animated.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrintPromo;
