import { useCallback, useEffect, useReducer, useState, lazy } from "react";
import { v4 as uuidv4 } from "uuid";
import { Oval } from "react-loader-spinner";
import useHttp from "../../hooks/useHttp";
import SuccessContent from "../successContent/SuccessContent";
import FailureContent from "../failureContent/FailureContent";
import "./CalcForm.scss";

const UploadForm = lazy(() => import("../uploadForm/UploadForm"));
const SizeForm = lazy(() => import("../sizeForm/SizeForm"));
const ContactForm = lazy(() => import("../contactForm/ContactForm"));

//Поточне значення для функції редюсер.
const initialState = [
  { formStatus: "UploadForm" },
  { files: {}, sizes: {}, contacts: {} },
];

/**
 * Компонент містить логіку переходу і обробки даних між іншими вкладеними в цей компонент формами.
 *
 * @returns {JSX.Element} - відображений елемент.
 */

const CalcForm = () => {
  const [formsData, setFormsData] = useState(null);
  const [files, setFiles] = useState(null);

  // Функція редюсер яка перемикає відображення вкладених форм, збирає дані з цих форм в загальний об'єкт.
  const reducer = (state, action) => {
    switch (action.type) {
      case "size_form": {
        return [
          { ...state[0], formStatus: "SizeForm" },
          { ...state[1], files: action.payload },
        ];
      }
      case "contact_form": {
        return [
          { ...state[0], formStatus: "ContactForm" },
          { ...state[1], sizes: action.payload },
        ];
      }
      case "upload_form": {
        return [
          { ...state[0], formStatus: "UploadForm" },
          { ...state[1], files: {}, sizes: {}, contacts: {} },
        ];
      }
      case "post_form": {
        const data = {
          ...action.payload,
          ...state[1].sizes,
          cloudLink: state[1].files.cloudLink,
          id: uuidv4(),
        };

        const files = {
          ...state[1].files,
          ...action.payload,
          id: uuidv4(),
        };
        setFiles(files);
        setFormsData(data);

        return [{ ...state[0], formStatus: "clear" }, { ...state[1] }];
      }
      case "clear": {
        return [
          { ...state[0], formStatus: "RequestContent" },
          { ...state[1], files: {}, sizes: {}, contacts: {} },
        ];
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  };

  const { request } = useHttp();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [requestStatus, setRequestStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const status = state[0].formStatus;

  const typeFormHandler = useCallback((term, data) => {
    dispatch({ type: term, payload: data });
  }, []);

  useEffect(() => {
    if (formsData !== null) {
      const data = JSON.stringify(formsData);
      setIsLoading(true);
      setRequestStatus(null);
      request("http://localhost:3001/formData", "POST", data)
        .then(() => {
          setFormsData(null);
          setFiles(null);
          setIsLoading(false);
          setRequestStatus("success");
          console.log(files);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
          setRequestStatus("failure");
        });
    }
    // eslint-disable-next-line
  }, [formsData]);

  const success =
    requestStatus === "success" ? (
      <SuccessContent
        show={status === "RequestContent"}
        typeFormHandler={typeFormHandler}
      />
    ) : null;
  const failure =
    requestStatus === "failure" ? (
      <FailureContent
        showClass={status === "RequestContent"}
        typeFormHandler={typeFormHandler}
      />
    ) : null;

  const loading = isLoading ? (
    <Oval
      height={80}
      width={80}
      color="#BBD8FA"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#BBD8FA"
      strokeWidth={4}
      strokeWidthSecondary={2}
    />
  ) : null;

  return (
    <div className="calc-form">
      <UploadForm
        show={status === "UploadForm"}
        formStatus={status}
        typeFormHandler={typeFormHandler}
      />

      <SizeForm
        show={status === "SizeForm"}
        formStatus={status}
        typeFormHandler={typeFormHandler}
      />

      <ContactForm
        show={status === "ContactForm"}
        formStatus={status}
        typeFormHandler={typeFormHandler}
      />
      {loading}
      {success}
      {failure}
    </div>
  );
};

export default CalcForm;
