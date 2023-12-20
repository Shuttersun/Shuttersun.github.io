import { useState, useEffect, useRef } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useSpring } from "react-spring";
import useHttp from "../../hooks/useHttp";
import "./ExampleWork.scss";

/**
 * Компонент слайдер карусель.
 * Слайдер перемикається за допомогою кнопок та повертається на початкову позицію коли доходить до останнього слайда.
 * При маленькому розмірі екрану слайдер можна гортати за допомогою свайпів.
 *
 */
const ExampleWork = () => {
  const { request } = useHttp();
  const sliderBodyRef = useRef(null);
  const slideRef = useRef(null);
  const wrapperRef = useRef(null);
  const [slidesData, setSlidesData] = useState([]);
  const [wrapperSlider, setWrapperSlider] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideQuantity, setSlideQuantity] = useState(0);
  const [offset, setOffset] = useState(0);
  const [inMove, setInMove] = useState(false);
  const [touchStartX, setTouchStartX] = useState();
  const [touchEndX, setTouchEndX] = useState();

  // Змінна яка фіксує кількість слайдів які ми пропускаємо перед тим як слайдер повернеться на поточну позицію.
  let skipSlide = 2;

  if (typeof wrapperSlider === "number" && wrapperSlider < 769) {
    skipSlide = 1;
  }

  const loadingWidth =
    (offset / ((slideQuantity - skipSlide) * slideWidth)) * 100 + "%";

  const touchStartHandler = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const touchMoveHandler = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Функція яка визначає в яку сторону користувач гортає слайдер.
  const touchEndHandler = () => {
    if (touchEndX + 50 < touchStartX) {
      moveSlide("next");
      return;
    }
    if (touchEndX + 50 > touchStartX) {
      moveSlide("prev");
      return;
    }
  };

  useEffect(() => {
    request("http://localhost:3001/slides")
      .then((res) => {
        setSlidesData(res);
        setSlideQuantity(res.length);
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Отримуємо поточну ширину слайдера та слайдів. Для того щоб отримати коректну ширину виконуємо ці дії з таймаутом.
    setTimeout(() => {
      if (sliderBodyRef.current) {
        const sliderComputedWidth = window.getComputedStyle(
          sliderBodyRef.current
        ).width;
        setSliderWidth(sliderComputedWidth.slice(0, -2));
      }

      if (slideRef.current) {
        const slideComputedWidth = window.getComputedStyle(
          slideRef.current
        ).width;
        setSlideWidth(slideComputedWidth.slice(0, -2));
      }
    }, 400);
  }, []);

  /**
   * Функція отримує ширину слайдера і слайдів при зміні розміру екрану користувача.
   * Це потрібно для коректного відображення слайдів на різних екранах при динамічній зміні ширини.
   */
  const resizeWindow = () => {
    if (slideRef.current) {
      const slideComputedWidth = window.getComputedStyle(
        slideRef.current
      ).width;
      setSlideWidth(slideComputedWidth.slice(0, -2));
    }

    if (sliderBodyRef.current) {
      const sliderComputedWidth = window.getComputedStyle(
        sliderBodyRef.current
      ).width;
      setSliderWidth(sliderComputedWidth.slice(0, -2));
    }
    setWrapperSlider(window.innerWidth);
  };

  useEffect(() => {
    // Слідкуємо за зміною ширини вікна браузера користувача.
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  });

  /**
   * Функція рухає слайдер у заданому напрямку, розраховуючи за формулою поточний стан слайдера.
   * При русі слайдера блокується можливість користувачу рухати слайдер далі, поки він ще в процесі.
   *
   * @param {string} direction
   * @returns {void}
   */
  const moveSlide = (direction) => {
    switch (direction) {
      case "next":
        setInMove(true);
        if (offset >= +sliderWidth - slideWidth * skipSlide) {
          setOffset(0);
          setTimeout(() => {
            setInMove(false);
          }, 400);
          return;
        }
        setOffset(offset + +slideWidth);
        setTimeout(() => {
          setInMove(false);
        }, 400);
        break;

      case "prev":
        setInMove(true);
        if (offset < slideWidth / 2) {
          setOffset(slideWidth * (slideQuantity - skipSlide));
          setTimeout(() => {
            setInMove(false);
          }, 400);
          return;
        }
        setOffset(offset - +slideWidth);
        setTimeout(() => {
          setInMove(false);
        }, 400);
        break;

      default:
        throw new Error("not the right direction");
    }
  };

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
  const [titleProps, titleApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [sliderProps, sliderApi] = useSpring(() => ({
    ...config,
    from: fromRight,
  }));
  const [buttonsProps, buttonsApi] = useSpring(() => ({
    ...config,
    from: fromRight,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      titleApi.start({
        config: { mass: 2, tension: 2000, friction: 900 },
        to,
      });
      sliderApi.start({
        delay: 500,
        to,
      });
      buttonsApi.start({
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  const slides = slidesData.map(({ id, title, technology, imgPath }) => {
    return (
      <li ref={slideRef} key={id} className="example-work__swiper-item">
        <img src={imgPath} alt="company product" />
        <h3 className="example-work__item-title">{title}</h3>
        <span className="example-work__item-technology">
          Технологія: <span>{technology}</span>
        </span>
      </li>
    );
  });

  return (
    <section ref={ref} className="example-work">
      <div className="example-work__mask">
        <div className="example-work__container">
          <div className="example-work__content-wrapper">
            <div className="example-work__top">
              <animated.h2 style={titleProps} className="example-work__title">
                Приклади робот
              </animated.h2>
              <animated.div
                style={buttonsProps}
                className="example-work__swiper-buttons"
              >
                <button
                  disabled={inMove}
                  onClick={() => moveSlide("prev")}
                  className="example-work__prev-btn"
                ></button>
                <button
                  disabled={inMove}
                  onClick={() => moveSlide("next")}
                  className="example-work__next-btn"
                ></button>
              </animated.div>
            </div>
            <animated.div
              style={sliderProps}
              ref={wrapperRef}
              className="example-work__swiper-wrapper"
            >
              <ul
                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler}
                ref={sliderBodyRef}
                style={{ transform: `translateX(-${offset}px)` }}
                className="example-work__swiper-body"
              >
                {slides}
              </ul>
            </animated.div>
          </div>
          <div className="loading-scale">
            <div
              style={{ width: `${loadingWidth}` }}
              className="loading-body"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleWork;
