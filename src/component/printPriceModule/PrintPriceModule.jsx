import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useSpring } from "react-spring";
import useHover from "../../hooks/useHover";
import PriceForm from "../priceForm/PriceForm";
import "./PrintPriceModule.scss";

const PrintPriceModule = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const isHovering = useHover(tooltipRef);

  useEffect(() => {
    if (isHovering) {
      setShowTooltip(true);
      return;
    }
    setShowTooltip(false);
  }, [isHovering]);

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
  const [cardProps, cardApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [formProps, formApi] = useSpring(() => ({
    ...config,
    display: "flex",
    flex: "1 auto",
    from: fromRight,
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
      formApi.start({
        delay: 500,
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  return (
    <section ref={ref} className="print-price-module">
      <div className="print-price-module__container">
        <div className="print-price-module__wrapper">
          <animated.h2 style={titleProps} className="print-price-module__title">
            Розрахувати вартість <span>3D</span>-друку
          </animated.h2>
          <div className="print-price-module__price-content">
            <animated.div
              style={cardProps}
              className="print-price-module__info-card"
            >
              <div
                className={`print-price-module__tooltip-message ${
                  showTooltip ? "show" : ""
                }`}
              >
                <div>Для уточнення ціни та термінів зв'яжіться з нами</div>
              </div>
              <div ref={tooltipRef} className="print-price-module__tooltip">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_1282)">
                    <path
                      d="M16 29.3334C8.63596 29.3334 2.66663 23.3641 2.66663 16.0001C2.66663 8.63608 8.63596 2.66675 16 2.66675C23.364 2.66675 29.3333 8.63608 29.3333 16.0001C29.3333 23.3641 23.364 29.3334 16 29.3334ZM14.6666 14.6667V22.6667H17.3333V14.6667H14.6666ZM14.6666 9.33342V12.0001H17.3333V9.33342H14.6666Z"
                      fill="#B4BBCE"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_1282">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="print-price-module__price">
                <span className="print-price-module__text">Вартість: </span>
                <div className="print-price-module__price-info">
                  <span className="print-price-module__text">від 500 грн </span>
                  <span className="print-price-module__info-small">
                    (залежить від ступеня складності)
                  </span>
                </div>
              </div>
              <div className="print-price-module__divider"></div>
              <div className="print-price-module__deadlines">
                <span className="print-price-module__text">Терміни:</span>
                <span className="print-price-module__text">от 2х днів</span>
              </div>
            </animated.div>

            <animated.div style={formProps}>
              <PriceForm />
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrintPriceModule;
