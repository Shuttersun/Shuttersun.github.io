import { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useSpring } from "react-spring";
import "./Price.scss";

const Price = () => {
  const size = useWindowSize();
  const [activeTab, setActiveTab] = useState({ fdm: true, sla: false });

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const config = { mass: 5, tension: 2000, friction: 500 };
  const fromLeft = { opacity: 0, transform: "translateX(-100px)" };
  const to = { opacity: 1, transform: "translateX(0)" };

  // Анімація компонента.
  const [textProps, textApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [priceProps, priceApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      textApi.start({
        config: { mass: 2, tension: 2000, friction: 900 },
        to,
      });
      priceApi.start({
        delay: 500,
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  //Умовний рендеринг компонентів в залежності від їх ширини.
  const desktopTableFDM =
    size.width >= 972 ? (
      <div className={`price__table price__table--fdm`}>
        <div className="price__table-head">
          <div className="price__table-material">
            <p className="price__table-title">Материал/Высота слоя</p>
            <p className="price__table-title">
              Стандартное качество 300 микрон
            </p>
            <p className="price__table-title">
              Оптимальное качество 200 микрон
            </p>
            <p className="price__table-title">
              Высокое качество
              <br /> 100 микрон
            </p>
          </div>
        </div>
        <div className="price__table-row price__table-row--standart">
          <div className="price__table-item">
            <p className="price__table-subtitle">Стандартные (ABS, PLA)</p>
            <p className="price__table-text">от 4 грн/грамм</p>
            <p className="price__table-text">от 5,6 грн/грамм</p>
            <p className="price__table-text">от 8,9 грн/грамм</p>
          </div>
        </div>
        <div className="price__table-row price__table-row--lasting">
          <div className="price__table-item">
            <p className="price__table-subtitle">
              Высокопрочные и ударостойкие
            </p>
            <p className="price__table-text">от 4,2 грн/грамм</p>
            <p className="price__table-text">от 5,8 грн/грамм</p>
            <p className="price__table-text">от 8,9 грн/грамм</p>
          </div>
        </div>
        <div className="price__table-row price__table-row--flexable">
          <div className="price__table-item">
            <p className="price__table-subtitle">Гибкие и резиноподобные</p>
            <p className="price__table-text">от 5,5 грн/грамм</p>
            <p className="price__table-text">от 7,1 грн/грамм</p>
            <p className="price__table-text">от 10,4 грн/грамм</p>
          </div>
        </div>
        <div className="price__table-row price__table-row--decorative">
          <div className="price__table-item">
            <p className="price__table-subtitle">Декоративные и специальные</p>
            <p className="price__table-text">от 4,5 грн/грамм</p>
            <p className="price__table-text">от 6,1 грн/грамм</p>
            <p className="price__table-text">от 9,4 грн/грамм</p>
          </div>
        </div>
      </div>
    ) : null;

  const mobileTableFDM =
    size.width < 972 ? (
      <div className={`price__table--s `}>
        <div className="price__table-wrapper-left--s">
          <div className="price__table-content-card">
            <div className="price__table-head--s">
              <p className="price__table-title--s">Материал/Высота слоя</p>
              <p className="price__table-title--s">
                Стандартное качество
                <br /> 300 микрон
              </p>
              <p className="price__table-title--s">
                Оптимальное качество
                <br /> 200 микрон
              </p>
              <p className="price__table-title--s">
                Высокое качество
                <br /> 100 микрон
              </p>
            </div>
            <div className="price__table-body--s">
              <p className="price__body-title--s">Стандартные (ABS, PLA)</p>
              <p className="price__body-text--s">от 4 грн/грамм</p>
              <p className="price__body-text--s">от 5,6 грн/грамм</p>
              <p className="price__body-text--s">от 8,9 грн/грамм</p>
            </div>
          </div>

          <div className="price__table-content-card">
            <div className="price__table-head--s">
              <p className="price__table-title--s">Материал/Высота слоя</p>
              <p className="price__table-title--s">
                Стандартное качество
                <br /> 300 микрон
              </p>
              <p className="price__table-title--s">
                Оптимальное качество
                <br /> 200 микрон
              </p>
              <p className="price__table-title--s">
                Высокое качество
                <br /> 100 микрон
              </p>
            </div>
            <div className="price__table-body--s">
              <p className="price__body-title--s">
                Высокопрочные и ударостойкие{" "}
              </p>
              <p className="price__body-text--s">от 4,2 грн/грамм</p>
              <p className="price__body-text--s">от 5,8 грн/грамм</p>
              <p className="price__body-text--s">от 8,9 грн/грамм</p>
            </div>
          </div>
        </div>

        <div className="price__table-wrapper-right--s">
          <div className="price__table-content-card">
            <div className="price__table-head--s">
              <p className="price__table-title--s">Материал/Высота слоя</p>
              <p className="price__table-title--s">
                Стандартное качество
                <br /> 300 микрон
              </p>
              <p className="price__table-title--s">
                Оптимальное качество
                <br /> 200 микрон
              </p>
              <p className="price__table-title--s">
                Высокое качество
                <br /> 100 микрон
              </p>
            </div>
            <div className="price__table-body--s">
              <p className="price__body-title--s">Гибкие и резиноподобные</p>
              <p className="price__body-text--s">от 5,5 грн/грамм</p>
              <p className="price__body-text--s">от 7,1 грн/грамм</p>
              <p className="price__body-text--s">от 10,4 грн/грамм</p>
            </div>
          </div>

          <div className="price__table-content-card">
            <div className="price__table-head--s">
              <p className="price__table-title--s">Материал/Высота слоя</p>
              <p className="price__table-title--s">
                Стандартное качество
                <br /> 300 микрон
              </p>
              <p className="price__table-title--s">
                Оптимальное качество
                <br /> 200 микрон
              </p>
              <p className="price__table-title--s">
                Высокое качество
                <br /> 100 микрон
              </p>
            </div>
            <div className="price__table-body--s">
              <p className="price__body-title--s">Декоративные и специальные</p>
              <p className="price__body-text--s">от 4,5 грн/грамм</p>
              <p className="price__body-text--s">от 6,1 грн/грамм</p>
              <p className="price__body-text--s">от 9,4 грн/грамм</p>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  const desktopTabSLA =
    size.width >= 972 ? (
      <div className={`price__table price__table--sla`}>
        <div className="price__table-head">
          <div className="price__table-material">
            <p className="price__table-title">Материал/Высота слоя</p>
            <p className="price__table-title">
              Стандартное качество 300 микрон
            </p>
            <p className="price__table-title">
              Оптимальное качество 200 микрон
            </p>
            <p className="price__table-title">
              Высокое качество
              <br /> 100 микрон
            </p>
          </div>
        </div>
        <div className="price__table-row price__table-row--lasting">
          <div className="price__table-item">
            <p className="price__table-subtitle">
              Высокопрочные и ударостойкие
            </p>
            <p className="price__table-text">от 4,2 грн/грамм</p>
            <p className="price__table-text">от 5,8 грн/грамм</p>
            <p className="price__table-text">от 8,9 грн/грамм</p>
          </div>
        </div>
        <div className="price__table-row price__table-row--flexable">
          <div className="price__table-item">
            <p className="price__table-subtitle">Гибкие и резиноподобные</p>
            <p className="price__table-text">от 5,5 грн/грамм</p>
            <p className="price__table-text">от 7,1 грн/грамм</p>
            <p className="price__table-text">от 10,4 грн/грамм</p>
          </div>
        </div>
        <div className="price__table-row price__table-row--decorative">
          <div className="price__table-item">
            <p className="price__table-subtitle">Декоративные и специальные</p>
            <p className="price__table-text">от 4,5 грн/грамм</p>
            <p className="price__table-text">от 6,1 грн/грамм</p>
            <p className="price__table-text">от 9,4 грн/грамм</p>
          </div>
        </div>
      </div>
    ) : null;

  const mobileTableSLA =
    size.width < 972 ? (
      <div className={`price__table--s `}>
        <div className="price__table-wrapper-left--s">
          <div className="price__table-content-card">
            <div className="price__table-head--s">
              <p className="price__table-title--s">Материал/Высота слоя</p>
              <p className="price__table-title--s">
                Стандартное качество
                <br /> 300 микрон
              </p>
              <p className="price__table-title--s">
                Оптимальное качество
                <br /> 200 микрон
              </p>
              <p className="price__table-title--s">
                Высокое качество
                <br /> 100 микрон
              </p>
            </div>
            <div className="price__table-body--s">
              <p className="price__body-title--s">
                Высокопрочные и ударостойкие{" "}
              </p>
              <p className="price__body-text--s">от 4,2 грн/грамм</p>
              <p className="price__body-text--s">от 5,8 грн/грамм</p>
              <p className="price__body-text--s">от 8,9 грн/грамм</p>
            </div>
          </div>
        </div>

        <div className="price__table-wrapper-right--s">
          <div className="price__table-content-card">
            <div className="price__table-head--s">
              <p className="price__table-title--s">Материал/Высота слоя</p>
              <p className="price__table-title--s">
                Стандартное качество
                <br /> 300 микрон
              </p>
              <p className="price__table-title--s">
                Оптимальное качество
                <br /> 200 микрон
              </p>
              <p className="price__table-title--s">
                Высокое качество
                <br /> 100 микрон
              </p>
            </div>
            <div className="price__table-body--s">
              <p className="price__body-title--s">Гибкие и резиноподобные</p>
              <p className="price__body-text--s">от 5,5 грн/грамм</p>
              <p className="price__body-text--s">от 7,1 грн/грамм</p>
              <p className="price__body-text--s">от 10,4 грн/грамм</p>
            </div>
          </div>

          <div className="price__table-content-card">
            <div className="price__table-head--s">
              <p className="price__table-title--s">Материал/Высота слоя</p>
              <p className="price__table-title--s">
                Стандартное качество
                <br /> 300 микрон
              </p>
              <p className="price__table-title--s">
                Оптимальное качество
                <br /> 200 микрон
              </p>
              <p className="price__table-title--s">
                Высокое качество
                <br /> 100 микрон
              </p>
            </div>
            <div className="price__table-body--s">
              <p className="price__body-title--s">Декоративные и специальные</p>
              <p className="price__body-text--s">от 4,5 грн/грамм</p>
              <p className="price__body-text--s">от 6,1 грн/грамм</p>
              <p className="price__body-text--s">от 9,4 грн/грамм</p>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div ref={ref} className="price">
      <animated.h2 style={textProps} className="price__title">
        Ціни
      </animated.h2>
      <animated.div style={priceProps} className="price__content">
        <div className="price__content-top">
          <div className="price__links-wrapper">
            <div className="price__links-body">
              <div
                onClick={() =>
                  setActiveTab({ ...activeTab, fdm: true, sla: false })
                }
                className={`price__link ${activeTab.fdm ? "active" : ""}`}
              >
                FDM
              </div>
              <div
                onClick={() =>
                  setActiveTab({ ...activeTab, fdm: false, sla: true })
                }
                className={`price__link ${activeTab.sla ? "active" : ""}`}
              >
                SLA
              </div>
            </div>
            <div className="price__divider"></div>
          </div>
          <p className="price__description">
            Метод пошарового наплавлення, застосовується для широкого спектру
            матеріалів.
          </p>
        </div>
        {activeTab.fdm ? desktopTableFDM : null}
        {activeTab.fdm ? mobileTableFDM : null}
        {activeTab.sla ? desktopTabSLA : null}
        {activeTab.sla ? mobileTableSLA : null}
      </animated.div>
    </div>
  );
};

export default Price;
