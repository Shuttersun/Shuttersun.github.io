import { Children, cloneElement, useEffect } from "react";
import "./Modal.scss";

/**
 * Компонент модального вікна.
 *
 * @param {Object} props - React властивості.
 * @param {Object} props.children - Дочірні елемент(и) або компонент(и).
 * @param {Object} props.modalSize - Об'єкт розміру вікна, за замовчуванням пустий.
 * @param {boolean} props.show - Логічне значення яке відображає видимість компоненту.
 * @param {function} props.modalHandler - Функція тригер яка відкриває або закриває модальне вікно.
 * @returns {JSX.Element} - відображений елемент.
 */
const Modal = ({ children, modalSize = {}, show, modalHandler }) => {
  useEffect(() => {
    if (show) {
      modalHandler(true);
    }
    // eslint-disable-next-line
  }, [show]);

  const showModalHandler = (e) => {
    if (
      e.target.className === "modal show" ||
      e.target.className === "modal__close"
    ) {
      modalHandler(false);
    }
  };

  //Перебираємо дочірні компоненти та добавляємо кожному функцію тригер яка закриває модальне вікно.
  const childrenWithProps = Children.map(children, (child) => {
    return cloneElement(child, { modalHandler });
  });

  return (
    <div onClick={showModalHandler} className={`modal ${show ? "show" : ""}`}>
      <div style={modalSize} className="modal__wrapper">
        <div className="modal__close"></div>
        {childrenWithProps}
      </div>
    </div>
  );
};

export default Modal;
