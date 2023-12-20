import ModelingPromo from "../../component/modelingPromo/ModelingPromo";
import ExampleWork from "../../component/exampleWork/ExampleWork";
import CreationStages from "../../component/creationStages/CreationStages";
import PrintPriceModule from "../../component/printPriceModule/PrintPriceModule";
import QuestionForm from "../../component/questionForm/QuestionForm";
import Footer from "../../component/footer/Footer";
import UpArrow from "../../component/upArrow/UpArrow";

import "./ModelingPage.scss";

const ModelingPage = () => {
  return (
    <>
      <ModelingPromo />
      <ExampleWork />
      <CreationStages />
      <PrintPriceModule />
      <section className="modeling-page__question-form">
        <div className="modeling-page__question-form-container">
          <QuestionForm />
        </div>
      </section>
      <Footer />
      <UpArrow />
    </>
  );
};

export default ModelingPage;
