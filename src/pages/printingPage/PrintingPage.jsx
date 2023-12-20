import PrintPromo from "../../component/printPromo/PrintPromo";
import ExampleWork from "../../component/exampleWork/ExampleWork";
import OurAdvantages from "../../component/ourAdvantages/OurAdvantages";
import HowWork from "../../component/howWork/HowWork";
import CalcFormModule from "../../component/calcFormModule/CalcFormModule";
import Price from "../../component/price/Price";
import QuestionForm from "../../component/questionForm/QuestionForm";
import Footer from "../../component/footer/Footer";
import UpArrow from "../../component/upArrow/UpArrow";

import "./PrintingPage.scss";

const PrintingPage = () => {
  return (
    <>
      <PrintPromo />
      <ExampleWork />
      <OurAdvantages />
      <section className="printing-page__how-work">
        <div className="printing-page__how-work-container">
          <HowWork />
        </div>
      </section>
      <section className="printing-page__price">
        <div className="printing-page__price-container">
          <div className="printing-page__price-body">
            <Price />
            <CalcFormModule />
          </div>
        </div>
      </section>
      <section className="printing-page__question-form">
        <div className="printing-page__question-form-container">
          <QuestionForm />
        </div>
      </section>
      <Footer />
      <UpArrow />
    </>
  );
};

export default PrintingPage;
