import { useMemo } from "react";
import PropTypes from "prop-types";
import ActionButton from "../UI/button/ActionButton";
import "./SuccessContent.scss";

import emoji from "../../assets/icons/emoji-smile-icon.jpg";

/**
 * Компонент успіху.
 * Відображаємо при успішному відправлені на сервер.
 *
 * @param {Object} props - React властивості.
 * @param {function} props.typeFormHandler - Функція змінює стан батьківського компоненту.
 * @param {function} props.modalHandler - Функція змінює стан модального вікна.
 * @param {boolean} props.show - Логічне значення яке відображає видимість компоненту.
 * @returns {JSX.Element} - відображений елемент.
 */
const SuccessContent = ({ typeFormHandler, modalHandler, show }) => {
  const btnOptions = useMemo(
    () => ({ padding: "14px 55px", backgroundColor: "#B4BBCE" }),
    []
  );

  const showClass = show ? "show" : "";

  const onClickHandler = () => {
    if (typeFormHandler) {
      typeFormHandler("upload_form");
      return;
    }
    if (modalHandler) {
      modalHandler(false);
      return;
    }
  };

  return (
    <div className={`success-wrapper ${showClass}`}>
      <div className="success-content">
        <img className="success-content__image" src={emoji} alt="smile emoji" />
        <div className="success-content__description">
          <h3 className="success-content__title">Дякуємо за заявку! </h3>
          <p className="success-content__text">
            Скоро наш менеджер зв'яжеться з вами та уточнить вартість вашого
            виробу
          </p>
        </div>
        <ActionButton
          blobColor="#2C2F36"
          options={btnOptions}
          onClick={onClickHandler}
        >
          Назад
        </ActionButton>
      </div>
    </div>
  );
};

SuccessContent.propTypes = {
  typeFormHandler: PropTypes.func,
  modalHandler: PropTypes.func,
  show: PropTypes.bool,
};

export default SuccessContent;
