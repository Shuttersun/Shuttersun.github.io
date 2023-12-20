import { useMemo } from "react";
import PropTypes from "prop-types";
import ActionButton from "../UI/button/ActionButton";

import icon from "../../assets/icons/failure-icon.svg";

import "./FailureContent.scss";

/**
 * Компонент помилки.
 * Відображаємо при помилці на сервері.
 *
 * @param {Object} props - React властивості.
 * @param {function} props.typeFormHandler - Функція змінює стан батьківського компоненту.
 * @param {function} props.modalHandler - Функція змінює стан модального вікна.
 * @param {boolean} props.show - Логічне значення яке відображає видимість компоненту.
 * @returns {JSX.Element} - відображений елемент.
 */
const FailureContent = ({ typeFormHandler, modalHandler, show }) => {
  const btnOptions = useMemo(
    () => ({ padding: "14px 55px", backgroundColor: "#B4BBCE" }),
    []
  );

  const showClass = show ? "show" : "";

  const onClickHandler = () => {
    if (modalHandler) {
      modalHandler(false);
      return;
    }

    if (typeFormHandler) {
      typeFormHandler("upload_form");
      return;
    }
  };

  return (
    <div className={`failure-wrapper ${showClass}`}>
      <div className="failure-content">
        <img className="failure-content__image" src={icon} alt="error icon" />
        <div className="failure-content__description">
          <h3 className="failure-content__title">Упс..! Щось пішло не так</h3>
          <p className="failure-content__text">Повторіть спробу пізніше</p>
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

FailureContent.propTypes = {
  typeFormHandler: PropTypes.func,
  modalHandler: PropTypes.func,
  show: PropTypes.bool,
};

export default FailureContent;
