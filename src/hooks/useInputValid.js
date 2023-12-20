import { useState } from "react";

const useInputValid = (term) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const changeInputValues = (e) => {
    inputValidation();
    if (
      term === "phone" &&
      (e.target.value.match(/^[0-9+-]+$/) || e.target.value === "")
    ) {
      setError(false);
      setInput(e.target.value.length <= 13 ? e.target.value : input);
    }

    if (
      term === "name" &&
      (e.target.value.match(/^[A-Za-zА-ЯІЇа-яії]+$/) || e.target.value === "")
    ) {
      setError(false);
      setInput(e.target.value);
    }

    if (term === "email") {
      setError(false);
      setInput(e.target.value);
    }

    if (term === "question") {
      setError(false);
      setInput(e.target.value);
    }

    if (
      ((term === "width" ||
        term === "height" ||
        term === "length" ||
        term === "quantity") &&
        e.target.value.match(/^[0-9]+$/)) ||
      e.target.value === ""
    ) {
      setError(false);
      setInput(e.target.value);
    }
  };

  const inputValidation = () => {
    if (input === "" || (term === "phone" && input.length <= 12)) {
      setError(true);
      return;
    }
    if (!input.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && term === "email") {
      setError(true);
      return;
    }
    setError(false);
  };

  const phoneMask = () => {
    if (term === "phone" && input.length < 4) {
      setInput("+380");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  return [
    input,
    changeInputValues,
    error,
    inputValidation,
    clearInput,
    phoneMask,
  ];
};

export default useInputValid;
