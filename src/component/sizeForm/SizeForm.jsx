import { useState, useMemo, useEffect, useRef } from "react";
import { CirclePicker } from "react-color";
import PropTypes from "prop-types";
import useInputValid from "../../hooks/useInputValid";
import ActionButton from "../UI/button/ActionButton";
import InputErrorMessage from "../UI/errorMessage/InputErrorMessage";
import "./SizeForm.scss";

/**
 * Компонент форми обчислює дані передані в неї та повертає в батьківський компонент.
 *
 * @param {Object} props - React властивості.
 * @param {function} props.typeFormHandler - Функція для зміни поточного стану батьківського компоненту.
 * @param {boolean} props.show - Стан який відображає чи є компонент видимим.
 * @param {string} props.formStatus - Поточний статус батьківського компоненту.
 * @returns {JSX.Element} - відображений елемент.
 */
const SizeForm = ({ typeFormHandler, show, formStatus }) => {
  const colorInputRef = useRef(null);
  const [width, setWidth, widthError, widthInputValidation, widthClear] =
    useInputValid("width");
  const [height, setHeight, heightError, heightInputValidation, heightClear] =
    useInputValid("height");
  const [length, setLength, lengthError, lengthInputValidation, lengthClear] =
    useInputValid("length");
  const [
    quantity,
    setQuantity,
    quantityError,
    quantityInputValidation,
    quantityClear,
  ] = useInputValid("quantity");
  const [color, setColor] = useState("");
  const [colorError, setColorError] = useState(false);

  const showClass = show ? "show" : "";

  const fields =
    width === "" ||
    height === "" ||
    length === "" ||
    quantity === "" ||
    color === "";
  const errors =
    widthError || heightError || lengthError || quantityError || colorError;

  const mainBtnOptions = useMemo(
    () => ({
      padding: "14px 55px",
      backgroundColor: !errors ? "#FB8C00" : "#B4BBCE",
    }),
    [errors]
  );
  const secondBtnOptions = useMemo(
    () => ({ padding: "14px 55px", backgroundColor: "#B4BBCE" }),
    []
  );

  useEffect(() => {
    if (formStatus === "clear") {
      widthClear();
      heightClear();
      lengthClear();
      quantityClear();
      setColor("");
      setSketchColor("#ff5722");
    }
    // eslint-disable-next-line
  }, [formStatus]);

  const [sketchColor, setSketchColor] = useState("#ff5722");
  const [showColorSketch, setShowColorSketch] = useState(false);

  const showColorSketchHandler = (e) => {
    e.stopPropagation();
    setShowColorSketch(!showColorSketch);
  };

  /**
   * Функція встановлює дані які передаються від компонента бібліотеки react-color в стан компоненту.
   *
   * @param {Object} color - Об'єкт кольору який містить властивості кодування кольору та їх значення.
   */
  const sketchColorHandler = (color) => {
    setSketchColor(color.hex);
    setColor(color.hex);
    setShowColorSketch(false);

    if (colorInputRef.current) {
      setTimeout(() => {
        colorInputRef.current.focus();
      });
    }
  };

  const inputColorHandler = (val) => {
    setColor(val);
  };

  const colorInputValidation = (e) => {
    if (color === "") {
      setColorError(true);
    } else {
      setColorError(false);
    }

    if (
      e.target.value.match(/^[A-Za-zА-ЯІЇа-яії0-9#]+$/) ||
      e.target.value === ""
    ) {
      inputColorHandler(e.target.value);
    }
  };

  /**
   * Функція перевіряє чи заповнені всі поля форми - викликає помилки якщо поля не заповнені.
   * Якщо поля форми заповнені тоді формується об'єкт за даними користувача, передається батьківському компоненту та змінює його поточний статус.
   *
   * @returns {void}
   */
  const nextFormHandler = (e) => {
    e.preventDefault();
    if (fields) {
      widthInputValidation();
      heightInputValidation();
      lengthInputValidation();
      quantityInputValidation();
      setColorError(true);
      return;
    }
    const sizes = {
      width,
      height,
      length,
      quantity,
      color,
    };
    typeFormHandler("contact_form", sizes);
  };

  const prevFormHandler = (e) => {
    e.preventDefault();
    typeFormHandler("upload_form");
  };

  return (
    <form autoComplete="off" className={`size-form ${showClass}`}>
      <div className={`sketchColor ${showColorSketch ? "show" : ""}`}>
        <CirclePicker
          disableAlpha
          onChange={sketchColorHandler}
          color={sketchColor}
        />
      </div>
      <h3 className="size-form__title">Шаг 2 з 3</h3>
      <div className="size-form__dividers">
        <div></div>
        <div className="size-form__circle"></div>
        <div></div>
        <div className="size-form__circle"></div>
        <div></div>
      </div>
      <h3 className="size-form__subtitle">Введіть розмір фігури</h3>
      <div className="size-form__size-inputs">
        <div>
          <label htmlFor="width">Ширина, мм</label>
          <input
            className={widthError ? "error" : ""}
            value={width}
            onBlur={widthInputValidation}
            onChange={setWidth}
            id="width"
            type="text"
          />
          {widthError ? (
            <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
          ) : null}
        </div>
        <div>
          <label htmlFor="height">Висота, мм</label>
          <input
            className={heightError ? "error" : ""}
            value={height}
            onBlur={heightInputValidation}
            onChange={setHeight}
            id="height"
            type="text"
          />
          {heightError ? (
            <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
          ) : null}{" "}
        </div>
        <div>
          <label htmlFor="length">Довжина, мм</label>
          <input
            className={lengthError ? "error" : ""}
            value={length}
            onBlur={lengthInputValidation}
            onChange={setLength}
            id="length"
            type="text"
          />
          {lengthError ? (
            <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
          ) : null}
        </div>
      </div>
      <div className="size-form__custom-inputs">
        <div>
          <label htmlFor="quantity"></label>
          <input
            className={quantityError ? "error" : ""}
            value={quantity}
            onBlur={quantityInputValidation}
            onChange={setQuantity}
            placeholder="Кількість"
            id="quantity"
            type="text"
          />
          {quantityError ? (
            <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
          ) : null}
        </div>
        <div className="color-input">
          <div>
            <div
              style={{ backgroundColor: sketchColor }}
              onClick={showColorSketchHandler}
              className="color-sketch-btn"
            ></div>
            <label htmlFor="color">Колір</label>
            <input
              className={colorError ? "error" : ""}
              ref={colorInputRef}
              value={color}
              onFocus={colorInputValidation}
              onBlur={colorInputValidation}
              onChange={colorInputValidation}
              id="color"
              type="text"
            />
          </div>

          {colorError ? (
            <InputErrorMessage>Обов'язкове поле</InputErrorMessage>
          ) : null}
        </div>
      </div>
      <div className="size-form__buttons">
        <ActionButton
          onClick={prevFormHandler}
          blobColor="#2C2F36"
          options={secondBtnOptions}
        >
          Назад
        </ActionButton>
        <ActionButton
          disabled={errors}
          onClick={nextFormHandler}
          blobColor="#2F80ED"
          options={mainBtnOptions}
        >
          Далі
        </ActionButton>
      </div>
    </form>
  );
};

SizeForm.propTypes = {
  typeFormHandler: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  formStatus: PropTypes.string.isRequired,
};

export default SizeForm;
