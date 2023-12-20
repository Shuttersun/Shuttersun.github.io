import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import AccordionItem from "../accordionItem/AccordionItem";

import "./Accordion.scss";

/**
 * Компонент Акордеон, який відображає список елементів у стилі акордеону.
 * Розгортається один елемент, щоб показати свій опис. Інші елементи сховані.
 *
 * @param {Object} props - React властивості.
 * @param {Array} props.itemsData - Масив об'єктів, які представляють елементи.
 * @param {number} props.itemsData[].id - Унікальний ідентифікатор для елемента.
 * @param {string} props.itemsData[].title - Заголовок елемента.
 * @param {string} props.itemsData[].description - Опис елемента.
 *
 * @returns {JSX.Element} - відображений елемент.
 */

const Accordion = ({ itemsData }) => {
  const [openItemIndex, setOpenItemIndex] = useState(0);

  /**
   * Мемоізована функція для обробки кліків по елементах та зміни їх видимості.
   *
   * @param {number} index - Індекс вибраного елемента.
   * @returns {void}
   */

  const itemIndexHandler = useCallback(
    (index) => {
      if (openItemIndex !== index) {
        setOpenItemIndex(index);
      }
      return;
    },
    [openItemIndex]
  );

  const items = itemsData.map(({ id, title, description }, i) => {
    return (
      <AccordionItem
        key={id}
        title={title}
        description={description}
        itemIndexHandler={() => itemIndexHandler(i)}
        isOpen={openItemIndex === i}
      />
    );
  });

  return <ul className="accordion">{items}</ul>;
};

Accordion.propTypes = {
  /**
   * Масив об'єктів, які представляють елементи в акордеоні.
   * Кожен об'єкт повинен мати `id`, `title`, та `description`.
   */
  itemsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Accordion;
