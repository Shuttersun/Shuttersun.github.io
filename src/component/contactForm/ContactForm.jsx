import { useMemo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useInputValid from "../../hooks/useInputValid";
import usePhoneRange from "../../hooks/usePhoneRange";
import ActionButton from "../UI/button/ActionButton";
import InputErrorMessage from "../UI/errorMessage/InputErrorMessage";
import "./ContactForm.scss";

/**
 * Компонент форми обчислює особисті дані передані в неї та повертає в батьківський компонент.
 *
 * @param {Object} props - React властивості.
 * @param {function} props.typeFormHandler - Функція для зміни поточного стану батьківського компоненту.
 * @param {boolean} props.show - Стан який відображає чи є компонент видимим.
 * @param {string} props.formStatus - Поточний статус батьківського компоненту.
 * @returns {JSX.Element} - відображений елемент.
 */
const ContactForm = ({ typeFormHandler, show, formStatus }) => {
  const inputPhoneRef = useRef(null);
  const [name, setName, nameError, nameInputValidation, nameClear] =
    useInputValid("name");
  const [
    phone,
    setPhone,
    phoneError,
    phoneInputValidation,
    phoneClear,
    phoneMask,
  ] = useInputValid("phone");
  const inputPhoneRange = usePhoneRange(inputPhoneRef, phone, 4);

  const showClass = show ? "show" : "";

  const fields = name === "" || phone === "";
  const errors = nameError || phoneError;
  const mainOptions = useMemo(
    () => ({
      padding: "14px 55px",
      backgroundColor: !errors ? "#FB8C00" : "#B4BBCE",
    }),
    [errors]
  );
  const secondOptions = useMemo(
    () => ({ padding: "14px 55px", backgroundColor: "#B4BBCE" }),
    []
  );

  useEffect(() => {
    if (formStatus === "clear") {
      nameClear();
      phoneClear();
    }
    // eslint-disable-next-line
  }, [formStatus]);

  /**
   * Функція перевіряє наявність даних в формі, передає дані в батьківський компонент та змінює його поточний статус.
   * Якщо даних в формі немає - викликає помилки.
   * Через 40мс очищає форму.
   */
  const submitFormHandler = (e) => {
    e.preventDefault();

    if (fields) {
      nameInputValidation();
      phoneInputValidation();
      return;
    }
    const contacts = {
      name,
      phone,
    };
    typeFormHandler("post_form", contacts);

    setTimeout(() => {
      typeFormHandler("clear");
    }, 40);
  };

  const prevFormHandler = (e) => {
    e.preventDefault();
    typeFormHandler("size_form");
  };

  return (
    <form className={`contact-form ${showClass}`}>
      <h3 className="contact-form__title">Шаг 3 из 3</h3>
      <div className="contact-form__dividers">
        <div></div>
        <div className="contact-form__circle"></div>
        <div></div>
        <div className="contact-form__circle"></div>
        <div></div>
      </div>
      <h3 className="contact-form__subtitle">Залишіть ваші дані </h3>
      <div className="contact-form__contact-inputs">
        <div>
          <input
            value={name}
            onChange={setName}
            onBlur={nameInputValidation}
            placeholder="Ваше имя"
            type="text"
          />
          {nameError ? (
            <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
          ) : null}
        </div>

        <div>
          <input
            ref={inputPhoneRef}
            value={phone}
            onChange={setPhone}
            onBlur={phoneInputValidation}
            onFocus={phoneMask}
            onClick={inputPhoneRange}
            placeholder="Телефон"
            type="text"
          />
          {phoneError ? (
            <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
          ) : null}
        </div>
      </div>
      <div className="contact-form__buttons">
        <ActionButton
          onClick={prevFormHandler}
          blobColor="#2C2F36"
          options={secondOptions}
        >
          Назад
        </ActionButton>

        <ActionButton
          disabled={errors}
          onClick={submitFormHandler}
          blobColor="#2F80ED"
          options={mainOptions}
        >
          Далі
        </ActionButton>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  typeFormHandler: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  formStatus: PropTypes.string.isRequired,
};

export default ContactForm;
