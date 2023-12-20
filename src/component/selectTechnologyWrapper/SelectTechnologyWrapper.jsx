import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import Accordion from "../accordion/Accordion";
import { AccordionTypesContext } from "../../context/context";

import "./SelectTechnologyWrapper.scss";

const SelectTechnologyWrapper = () => {
  const [accordionType, setAccordionType] = useState("materials");
  const [materialsData, setMaterialsData] = useState([]);
  const [printersData, setPrintersData] = useState([]);

  const { request } = useHttp();

  useEffect(() => {
    request("http://localhost:3001/materials").then((data) => {
      setMaterialsData(data);
    });
    request("http://localhost:3001/printers").then((data) => {
      setPrintersData(data);
    });
    // eslint-disable-next-line
  }, []);

  const { Provider } = AccordionTypesContext;

  return (
    <Provider value={accordionType}>
      <div className="technology-wrapper">
        <div className="technology-wrapper__select-links">
          <div
            onClick={() => setAccordionType("materials")}
            className={`technology-wrapper__select-link ${
              accordionType === "materials" ? "active" : ""
            }`}
          >
            Матеріали
          </div>
          <div
            onClick={() => setAccordionType("printers")}
            className={`technology-wrapper__select-link ${
              accordionType === "printers" ? "active" : ""
            }`}
          >
            Принтери
          </div>
        </div>
        {accordionType === "materials" ? (
          <Accordion itemsData={materialsData} />
        ) : null}
        {accordionType === "printers" ? (
          <Accordion itemsData={printersData} />
        ) : null}
      </div>
    </Provider>
  );
};

export default SelectTechnologyWrapper;
