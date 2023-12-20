import Promo from "../../component/promo/Promo";
import ProductList from "../../component/productList/ProductList";
import HowWork from "../../component/howWork/HowWork";
import CalcFormModule from "../../component/calcFormModule/CalcFormModule";
import QuestionForm from "../../component/questionForm/QuestionForm";
import Footer from "../../component/footer/Footer";
import UpArrow from "../../component/upArrow/UpArrow";

import "./MainPage.scss";

const MainPage = () => {
  return (
    <>
      <Promo />
      <ProductList />
      <HowWork />
      <section className="section-calc-form">
        <div className="section-calc-form__container">
          <CalcFormModule />
          <div className="section-calc-form__small-ellipse"></div>
        </div>
      </section>
      <section className="section-question-form">
        <div className="section-question-form__container">
          <QuestionForm />
        </div>
      </section>
      <Footer />
      <UpArrow />
    </>
  );
};

export default MainPage;
