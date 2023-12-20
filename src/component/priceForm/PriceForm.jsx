import { useMemo, useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import useHttp from "../../hooks/useHttp";
import useInputValid from "../../hooks/useInputValid";
import usePhoneRange from "../../hooks/usePhoneRange";

import SuccessContent from "../successContent/SuccessContent";
import FailureContent from "../failureContent/FailureContent";
import ActionButton from "../UI/button/ActionButton";
import InputErrorMessage from "../UI/errorMessage/InputErrorMessage";
import "./PriceForm.scss";

/**
 * Компонент форми який приймає в себе особисті дані користувача і файли.
 *
 */
const PriceForm = () => {
  const inputPhoneRef = useRef(null);
  const { request } = useHttp();
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [data, setData] = useState([]);
  const [dataError, setDataError] = useState(false);
  const [fileCheck, setFileCheck] = useState(false);

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
  const [mail, setMail, mailError, mailInputValidation, mailClear] =
    useInputValid("email");
  const [
    question,
    setQuestion,
    questionError,
    questionInputValidation,
    questionClear,
  ] = useInputValid("question");

  const inputPhoneRange = usePhoneRange(inputPhoneRef, phone, 4);

  const fileName = data[0]?.name ? data[0]?.name : "Файл не обраний";
  const fields = name === "" || phone === "" || mail === "" || data.length < 1;
  const errors = nameError || phoneError || mailError || dataError;

  const options = useMemo(
    () => ({
      padding: "13px 58px 13px 58px",
      backgroundColor: errors ? "#B4BBCE" : "#FB8C00",
      maxWidth: 290,
    }),
    [errors]
  );

  const submitHandler = useCallback((bool) => {
    setSubmitting(bool);
  }, []);

  const setFiles = (e) => {
    const files = e.target.files;
    setDataError(false);
    setData(files);
    setFileCheck(true);
  };

  /**
   * Функція перевіряє наявність даних в формі та відправляє їх на сервер.
   * Якщо даних немає то викликає помилки.
   * Якщо дані є і вони валідні тоді формується об'єкт і відправляється на сервер.
   * Після відправлення форма очищається.
   *
   */
  const submitForm = (e) => {
    e.preventDefault();

    if (fields) {
      nameInputValidation();
      phoneInputValidation();
      mailInputValidation();
      setDataError(true);
      return;
    }

    if (!data.length && fileCheck) {
      setDataError(true);
      return;
    }

    const contacts = {
      name,
      mail,
      phone,
      question,
      id: uuidv4(),
    };
    request("http://localhost:3001/priceData", "POST", JSON.stringify(contacts))
      .then(() => {
        setSubmitting(true);
        setSubmitStatus("success");
      })
      .catch(() => {
        setSubmitting(true);
        setSubmitStatus("failure");
      });

    nameClear();
    phoneClear();
    mailClear();
    questionClear();
    setData([]);
    setFileCheck(false);
  };

  const content = !isSubmitting ? (
    <div className="price-form__wrapper">
      <h2 className="price-form__title">Введіть ваші дані</h2>
      <form className="price-form__form">
        <div className="price-form__contact">
          <div className="price-form__name-wrapper">
            <input
              onChange={setName}
              onBlur={nameInputValidation}
              value={name}
              placeholder="Ваше ім'я"
              type="text"
              className="price-form__name"
            />
            {nameError ? (
              <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
            ) : null}
          </div>
          <div className="price-form__phone-wrapper">
            <input
              ref={inputPhoneRef}
              onClick={inputPhoneRange}
              onChange={setPhone}
              onBlur={phoneInputValidation}
              onFocus={phoneMask}
              value={phone}
              placeholder="Ваш телефон"
              type="text"
              className="price-form__phone"
            />
            {phoneError ? (
              <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
            ) : null}
          </div>
        </div>
        <div className="price-form__mail-wrapper">
          <input
            onChange={setMail}
            onBlur={mailInputValidation}
            value={mail}
            placeholder="Ваша пошта *"
            type="text"
            className="price-form__mail"
          />
          {mailError && mail === "" ? (
            <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
          ) : null}
          {mailError && mail.length > 0 ? (
            <InputErrorMessage>Некоректний email</InputErrorMessage>
          ) : null}
        </div>
        <div className="price-form__upload-wrapper">
          <span className="price-form__upload-text">Завантажити макет:</span>
          <div className="price-form__upload">
            <span
              className={`${data[0]?.name ? "active" : ""} ${
                dataError ? "error" : ""
              } ${!data.length && fileCheck ? "error" : ""}`}
            >
              {fileName}
            </span>
            <label className="price-form__upload-btn" htmlFor="upload">
              Оберіть файл
            </label>
            <input
              onChange={setFiles}
              accept=".jpg, .jpeg, .png, .gif, .pdf, .psd, .ai, .max, .cdr, .3ds, .stl, .igs, .model, .mxp, .obj, .wrl, .3dm, .fbx, .matpart, .matamx, .zip, .rar, .7z, .skp, .dae, .ply, .magics, .mgx, .x3d, .x3dv, .3mf, .stp, .step, .prt, .zpr"
              id="upload"
              type="file"
            />
          </div>
        </div>
        <textarea
          value={question}
          onChange={setQuestion}
          placeholder="Опишіть Ваші побажання, щоб ми максимально точно виконали Ваше замовлення."
          className="price-form__textarea"
        ></textarea>
        <ActionButton
          onClick={submitForm}
          disabled={errors}
          blobColor="#2F80ED"
          options={options}
        >
          Відправити запит
        </ActionButton>
      </form>
    </div>
  ) : null;

  const success =
    isSubmitting && submitStatus === "success" ? (
      <SuccessContent modalHandler={submitHandler} show={isSubmitting} />
    ) : null;

  const failure =
    isSubmitting && submitStatus === "failure" ? (
      <FailureContent modalHandler={submitHandler} show={isSubmitting} />
    ) : null;

  return (
    <div className="price-form">
      {content}
      {success}
      {failure}
    </div>
  );
};

export default PriceForm;
