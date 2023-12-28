import { useEffect, useState, useContext, memo } from "react";
import { animated, useSpring } from "react-spring";
import { useMeasure } from "@uidotdev/usehooks";
import PropTypes from "prop-types";
import { AccordionTypesContext } from "../../context/context";
import "./AccordionItem.scss";

/**
 * Елемент компонента Акордеон, який приймає в себе властивості для відображення.
 *
 * @param {Object} props - React властивості.
 * @param {string} props.title - Заголовок елемента.
 * @param {string} props.description - Опис елемента.
 * @param {function} props.itemIndexHandler - Функція обробник яка фіксує індекс елемента для відкриття або закриття компоненту.
 * @param {boolean} props.isOpen - Стан для фіксування чи є компонент відкритим.
 * @returns {JSX.Element} - відображений елемент.
 */

const AccordionItem = memo(function AccordionItem({
  title,
  description,
  itemIndexHandler,
  isOpen,
}) {
  const [cardHeight, setCardHeight] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [ref, { height }] = useMeasure();

  // console.log("render");

  const accordionType = useContext(AccordionTypesContext);

  useEffect(() => {
    if (typeof height === "number" && !isReady) {
      setCardHeight(height);
      setIsReady(true);
    }
  }, [height, isReady]);

  //Анімація компонента
  const config = { mass: 1 };

  const [textProps, textApi] = useSpring(() => ({
    ...config,
    from: { height: cardHeight },
  }));

  useEffect(() => {
    if ((isReady && cardHeight) || accordionType) {
      textApi.start({
        ...config,
        to: { height: 0 },
      });
    }
    if (cardHeight && isOpen) {
      textApi.start({
        ...config,
        to: { height: cardHeight },
      });
    }
    // eslint-disable-next-line
  }, [isOpen, cardHeight, accordionType]);

  return (
    <li
      onClick={itemIndexHandler}
      className={`accordion-item ${isOpen ? "active" : ""}`}
    >
      {isOpen ? (
        <div className="accordion-item__toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.6667 8H8.33333H3"
              stroke="#2F80ED"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : (
        <div className="accordion-item__toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M7.99984 13.3334V8.00002M7.99984 8.00002V2.66669M7.99984 8.00002H13.3332M7.99984 8.00002H2.6665"
              stroke="#2C2F36"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      <div className="accordion-item__title">{title}</div>
      <animated.p
        style={textProps}
        ref={ref}
        className="accordion-item__description"
      >
        {description}
      </animated.p>
      <span className="accordion-item__divider"></span>
    </li>
  );
});

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  itemIndexHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default AccordionItem;
