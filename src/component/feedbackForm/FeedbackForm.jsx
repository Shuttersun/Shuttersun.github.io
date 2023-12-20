import { useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import useHttp from "../../hooks/useHttp";
import useInputValid from "../../hooks/useInputValid";
import usePhoneRange from "../../hooks/usePhoneRange";
import ActionButton from "../UI/button/ActionButton";
import InputErrorMessage from "../UI/errorMessage/InputErrorMessage";

import "./FeedbackForm.scss";

/**
 * Компонент форми зворотнього зв'язку яка приймає особисті дані користувача, обробляє та відправляє на сервер.
 *
 * @param {Object} props - React властивості.
 * @param {function} props.modalHandler - Функція змінює стан модального вікна.
 * @returns {JSX.Element} - відображений елемент.
 */
const FeedbackForm = ({ modalHandler }) => {
  const phoneRef = useRef(null);
  const { request } = useHttp();

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

  const [
    question,
    setQuestion,
    questionError,
    questionInputValidation,
    questionClear,
  ] = useInputValid("question");

  const inputPhoneRange = usePhoneRange(phoneRef, phone, 4);

  const errors = nameError || phoneError || questionError;
  const fields = !!(name === "" || phone === "" || question === "");

  const options = useMemo(() => {
    return {
      maxWidth: 290,
      padding: "14px 80px",
      backgroundColor: !errors ? "#FB8C00" : "#B4BBCE",
    };
  }, [errors]);

  /**
   * Функція перевіряє наявність даних в формі та відправляє їх на сервер.
   * Якщо даних немає то викликає помилки.
   * Якщо дані є і вони валідні тоді формується об'єкт і відправляється на сервер.
   * Після відправлення форма очищається.
   *
   */
  const submitForm = (e) => {
    if (fields) {
      nameInputValidation();
      phoneInputValidation();
      questionInputValidation();
      return;
    }
    e.preventDefault();
    const data = {
      name,
      phone,
      question,
      id: uuidv4(),
    };

    request("http://localhost:3001/contactData", "POST", JSON.stringify(data))
      .then(() => {
        modalHandler(true);
      })
      .catch((e) => console.log(e));

    setTimeout(() => {
      nameClear();
      phoneClear();
      questionClear();
    }, 2000);
  };

  return (
    <form className="feedback">
      <div className="feedback__name-wrapper">
        <input
          placeholder="Ваше ім'я"
          type="text"
          value={name}
          onChange={setName}
          onBlur={nameInputValidation}
        />
        {nameError ? (
          <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
        ) : null}
      </div>
      <div className="feedback__phone-wrapper">
        <input
          ref={phoneRef}
          placeholder="Ваш телефон"
          type="text"
          value={phone}
          onChange={setPhone}
          onBlur={phoneInputValidation}
          onFocus={phoneMask}
          onClick={inputPhoneRange}
        />
        {phoneError ? (
          <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
        ) : null}
      </div>
      <div className="feedback__textarea-wrapper">
        <textarea
          placeholder="Ваше повідомлення"
          type="text"
          value={question}
          onChange={setQuestion}
          onBlur={questionInputValidation}
        />
        {questionError ? (
          <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
        ) : null}
      </div>
      <div className="feedback__submit-wrapper">
        <ActionButton
          onClick={submitForm}
          disabled={errors}
          blobColor="#2F80ED"
          options={options}
        >
          Напишіть нам
        </ActionButton>
        <span className="feedback__confidentiality-policy">
          Натискаючи на кнопку, ви погоджуєтесь з
          <span> Політикою конфіденційності</span>
        </span>
      </div>
    </form>
  );
};

FeedbackForm.propTypes = {
  modalHandler: PropTypes.func.isRequired,
};

export default FeedbackForm;
