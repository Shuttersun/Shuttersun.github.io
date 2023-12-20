import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { animated, useSpring } from "react-spring";

import useHttp from "../../hooks/useHttp";
import useInputValid from "../../hooks/useInputValid";
import usePhoneRange from "../../hooks/usePhoneRange";
import ActionButton from "../UI/button/ActionButton";
import Modal from "../modal/Modal";
import SuccessContent from "../successContent/SuccessContent";
import FailureContent from "../failureContent/FailureContent";
import InputErrorMessage from "../UI/errorMessage/InputErrorMessage";
import "./QuestionForm.scss";

/**
 * Компонент форми який отримує особисті дані користувача та його питання, формує дані та відправляє на сервер.
 *
 * @returns {JSX.Element} - відображений елемент.
 */
const QuestionForm = () => {
  const inputPhoneRef = useRef(null);

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
  const [showModal, setShowModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState("success");

  const errors = nameError || phoneError || questionError;
  const fields = !!(name === "" || phone === "" || question === "");
  const options = useMemo(() => {
    return {
      padding: "14px 55px",
      backgroundColor: !errors ? "#FB8C00" : "#B4BBCE",
    };
  }, [errors]);

  const inputPhoneRange = usePhoneRange(inputPhoneRef, phone, 4);

  const modalHandler = useCallback((bool) => {
    setShowModal(bool);
  }, []);

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
    setRequestStatus(null);
    const data = {
      name,
      phone,
      question,
      id: uuidv4(),
    };
    request("http://localhost:3001/questionData", "POST", JSON.stringify(data))
      .then((res) => {
        setRequestStatus("success");
        setShowModal(true);
        console.log(res);
      })
      .catch((e) => {
        setRequestStatus("failure");
        setShowModal(true);

        console.log(e);
      });

    setTimeout(() => {
      nameClear();
      phoneClear();
      questionClear();
    }, 2000);
  };

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const fromLeft = { opacity: 0, transform: "translateX(-100px)" };
  const to = { opacity: 1, transform: "translate(0)" };
  const config = { mass: 5, tension: 2000, friction: 200 };

  //Анімація компонента.
  const [formProps, formApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      formApi.start({
        ...config,
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  const success =
    requestStatus === "success" ? (
      <SuccessContent
        show={requestStatus === "success"}
        modalHandler={modalHandler}
      />
    ) : null;
  const failure =
    requestStatus === "failure" ? (
      <FailureContent
        show={requestStatus === "failure"}
        modalHandler={modalHandler}
      />
    ) : null;

  const requestContent = success || failure;

  return (
    <>
      <animated.div ref={ref} style={formProps} className="question-form">
        <div className="question-form__wrapper">
          <div className="question-form__description">
            <h2 className="question-form__title">Залишились питання?</h2>
            <p className="question-form__text">
              Оформіть заявку на сайті та ми зв'яжемося з вами найближчим часом.
            </p>
          </div>
          <form className="question-form__form">
            <div className="question-form__info-input">
              <div>
                <label htmlFor="name">Ім'я</label>
                <input
                  onChange={setName}
                  onBlur={nameInputValidation}
                  value={name}
                  type="text"
                  id="name"
                />
                {nameError ? (
                  <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
                ) : null}
              </div>
              <div>
                <label className="fade" htmlFor="phone">
                  Номер
                </label>
                <input
                  ref={inputPhoneRef}
                  onClick={inputPhoneRange}
                  onFocus={phoneMask}
                  onChange={setPhone}
                  onBlur={phoneInputValidation}
                  value={phone}
                  placeholder="Ваш телефон"
                  type="text"
                  id="phone"
                />
                {phoneError ? (
                  <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
                ) : null}
              </div>
            </div>
            <div className="question-form__question">
              <textarea
                onChange={setQuestion}
                onBlur={questionInputValidation}
                value={question}
                placeholder="Ваше запитання"
              ></textarea>
              {questionError ? (
                <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
              ) : null}
            </div>

            <div className="question-form__submit-panel">
              <ActionButton
                disabled={errors}
                onClick={submitForm}
                blobColor="#2F80ED"
                options={options}
              >
                Відправити
              </ActionButton>
              <div className="question-form__privacy-policy">
                <p>
                  Натискаючи на кнопку, ви погоджуєтесь з
                  <span> Політикою конфіденційності</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </animated.div>
      <Modal show={showModal} modalHandler={modalHandler}>
        {requestContent}
      </Modal>
    </>
  );
};

export default QuestionForm;
