import { useCallback, useState, useEffect } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useSpring } from "react-spring";
import SubPromo from "../../component/subPromo/SubPromo";
import Footer from "../../component/footer/Footer";
import FeedbackForm from "../../component/feedbackForm/FeedbackForm";
import MapWrapper from "../../component/mapWrapper/MapWrapper";
import Modal from "../../component/modal/Modal";
import SuccessContent from "../../component/successContent/SuccessContent";
import UpArrow from "../../component/upArrow/UpArrow";

import "./ContactsPage.scss";

const ContactsPage = () => {
  const [showModal, setShowModal] = useState(false);

  const modalHandler = useCallback((bool) => {
    setShowModal(bool);
  }, []);

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
  const [infoProps, infoApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [formProps, formApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [mapProps, mapApi] = useSpring(() => ({
    ...config,
    from: fromRight,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      infoApi.start({
        delay: 500,
        to,
      });
      formApi.start({
        delay: 700,
        to,
      });
      mapApi.start({
        delay: 1000,
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  return (
    <div className="contacts-page">
      <Modal show={showModal} modalHandler={modalHandler}>
        <SuccessContent show={showModal} modalHandler={modalHandler} />
      </Modal>
      <SubPromo>Контакти</SubPromo>
      <section ref={ref} className="contacts-page__wrapper">
        <div className="contacts-page__container">
          <div className="contacts-page__content">
            <div className="contacts-page__feedback-wrapper">
              <animated.div style={infoProps} className="contacts-page__info">
                <span className="contacts-page__phone">
                  +38 (097) 999-99-99
                </span>
                <span className="contacts-page__address">
                  м. Київ, вул. Гагаріна 25/68
                </span>
                <a
                  href="mailto:pochta@gmail.com"
                  className="contacts-page__mail"
                >
                  pochta@gmail.com
                </a>
                <div className="contacts-page__icon-wrapper">
                  <div className="contacts-page__icon">
                    <a
                      href="https://www.facebook.com/?locale=uk_UA"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_1_1914)">
                          <path
                            d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
                            fill="#2C2F36"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_1914">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </div>
                  <div className="contacts-page__icon">
                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_1_1919)">
                          <path
                            d="M21.543 6.498C22 8.28 22 12 22 12C22 12 22 15.72 21.543 17.502C21.289 18.487 20.546 19.262 19.605 19.524C17.896 20 12 20 12 20C12 20 6.107 20 4.395 19.524C3.45 19.258 2.708 18.484 2.457 17.502C2 15.72 2 12 2 12C2 12 2 8.28 2.457 6.498C2.711 5.513 3.454 4.738 4.395 4.476C6.107 4 12 4 12 4C12 4 17.896 4 19.605 4.476C20.55 4.742 21.292 5.516 21.543 6.498ZM10 15.5L16 12L10 8.5V15.5Z"
                            fill="#2C2F36"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_1919">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="contacts-page__divider"></div>
              </animated.div>

              <animated.div
                style={formProps}
                className="contacts-page__form-wrapper"
              >
                <h2 className="contacts-page__form-title">Зв'яжіться з нами</h2>
                <FeedbackForm modalHandler={modalHandler} />
              </animated.div>
            </div>
            <div className="contacts-page__map-wrapper">
              <animated.div style={mapProps} className="contacts-page__map">
                <MapWrapper />
              </animated.div>
              <div className="bg"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <UpArrow />
    </div>
  );
};

export default ContactsPage;
