import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import ActionButton from "../UI/button/ActionButton";
import InputErrorMessage from "../UI/errorMessage/InputErrorMessage";
import "./UploadForm.scss";

const VALID_EXTENSION = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".pdf",
  ".psd",
  ".ai",
  ".max",
  ".cdr",
  ".3ds",
  ".stl",
  ".igs",
  ".model",
  ".mxp",
  ".obj",
  ".wrl",
  ".3dm",
  ".fbx",
  ".matpart",
  ".matamx",
  ".zip",
  ".rar",
  ".7z",
  ".skp",
  ".dae",
  ".ply",
  ".magics",
  ".mgx",
  ".x3d",
  ".x3dv",
  ".3mf",
  ".stp",
  ".step",
  ".prt",
  ".zpr",
];

/**
 * Компонент форми обчислює файли передані в неї та повертає в батьківський компонент.
 *
 * @param {Object} props - React властивості.
 * @param {function} props.typeFormHandler - Функція для зміни поточного статусу батьківського компоненту.
 * @param {boolean} props.show - Стан який відображає чи є компонент видимим.
 * @param {string} props.formStatus - Поточний статус батьківського компоненту.
 * @returns {JSX.Element} - відображений елемент.
 */

const UploadForm = ({ typeFormHandler, show, formStatus }) => {
  const [files, setFiles] = useState(null);
  const [cloudLink, setCloudLink] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [extensionError, setExtensionError] = useState(false);
  const [requiredError, setRequiredError] = useState(false);
  const [drag, setDrag] = useState(false);

  const showClass = show ? "show" : "";

  const errors = sizeError || extensionError || requiredError;

  const options = useMemo(
    () => ({
      padding: "14px 55px",
      backgroundColor: !errors ? "#FB8C00" : "#B4BBCE",
    }),
    [errors]
  );

  useEffect(() => {
    if (formStatus === "clear") {
      setFiles(null);
      setCloudLink("");
    }
  }, [formStatus]);

  /**
   * Функція приймає файли передані в форму, обробляє їх, передає їх в стан компоненту та перевіряє валідність.
   * Якщо файли не валідні - викликає помилки.
   *
   * @param {Object} files - файли передані користувачем.
   * @returns {void}
   */
  const filesHandler = (files) => {
    if (!files) {
      setExtensionError(false);
      setSizeError(false);
      setFiles(null);
      return;
    }
    setRequiredError(false);
    setFiles(files);
    const extension = files?.name.match(/.[^.]+$/)[0];
    setExtensionError(!VALID_EXTENSION.includes(extension));
    setSizeError(files?.size > 10485760);
  };

  /**
   * Функція валідації перевіряє відсутність даних в формі.
   * Якщо даних немає - викликає помилку.
   * Якщо дані є - передає файли в батьківський компонент та змінює його поточний статус.
   *
   * @returns {void}
   */
  const checkValidation = () => {
    if (!files && !cloudLink) {
      setRequiredError(true);
      return;
    }
    setRequiredError(false);
    typeFormHandler("size_form", { files, cloudLink });
  };

  const cloudLinkHandler = (e) => {
    setCloudLink(e.target.value);
    setRequiredError(false);
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    filesHandler(files[0]);
    setDrag(false);
  };

  let uploadStyleClass = files ? "uploaded" : "";
  uploadStyleClass += sizeError || extensionError ? " error" : "";
  const requiredErrorStyle = requiredError ? "required-error" : "";

  return (
    <form className={`upload-form ${showClass}`}>
      <h3 className="upload-form__title">Шаг 1 з 3</h3>
      <div className="upload-form__dividers">
        <div></div>
        <div className="upload-form__circle"></div>
        <div></div>
        <div className="upload-form__circle"></div>
        <div></div>
      </div>
      <div
        className={`upload-form__input ${uploadStyleClass} ${requiredErrorStyle} ${
          drag ? "drag" : ""
        }`}
      >
        <label
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => dropHandler(e)}
          className={`upload ${drag ? "drag" : ""}`}
        >
          <span>
            {files
              ? files.name
              : drag
              ? "Відпустіть, щоб прикріпити файл"
              : "Клацніть або перетягніть в цю область 3D модель або фото"}
          </span>
          <input
            onChange={(e) => filesHandler(e.target.files[0])}
            type="file"
            accept=".jpg, .jpeg, .png, .gif, .pdf, .psd, .ai, .max, .cdr, .3ds, .stl, .igs, .model, .mxp, .obj, .wrl, .3dm, .fbx, .matpart, .matamx, .zip, .rar, .7z, .skp, .dae, .ply, .magics, .mgx, .x3d, .x3dv, .3mf, .stp, .step, .prt, .zpr"
          />
        </label>
      </div>
      {extensionError ? (
        <InputErrorMessage>Неприпустиме розширення</InputErrorMessage>
      ) : null}

      {sizeError ? (
        <InputErrorMessage>Занадто великий файл</InputErrorMessage>
      ) : null}
      <div className="upload-form__file-info">
        <div className="upload-form__extension-wrapper">
          <span className="upload-form__extension-title">
            Допустимі розширення:
          </span>
          <p className="upload-form__extensions">
            .jpg, .jpeg, .png, .gif, .pdf, .psd, .ai, .max, .cdr, .3ds, .stl,
            .igs, .model, .mxp, .obj, .wrl, .3dm, .fbx, .matpart, .matamx, .zip,
            .rar, .7z, .skp, .dae, .ply, .magics, .mgx, .x3d, .x3dv, .3mf, .stp,
            .step, .prt, .zpr
          </p>
        </div>
        <div className="upload-form__size-wrapper">
          <span className="upload-form__size-title">
            Максимальний розмір файлу:
          </span>
          <span className="upload-form__size">10 Мб</span>
        </div>
      </div>
      <textarea
        onChange={(e) => cloudLinkHandler(e)}
        className={`upload-form__cloud-link ${requiredErrorStyle}`}
        placeholder="Або додайте посилання на макет у хмарі (Dropbox, Mega, Google Drive и т.п.)"
        value={cloudLink}
      ></textarea>

      <div className="upload-form__buttons">
        <ActionButton
          disabled={errors}
          onClick={(e) => {
            e.preventDefault();
            checkValidation();
          }}
          blobColor="#2F80ED"
          options={options}
        >
          Далі
        </ActionButton>
      </div>
      {requiredError ? (
        <InputErrorMessage>Не заповнені обов'язкові поля</InputErrorMessage>
      ) : null}
    </form>
  );
};

UploadForm.propTypes = {
  typeFormHandler: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  formStatus: PropTypes.string.isRequired,
};

export default UploadForm;
