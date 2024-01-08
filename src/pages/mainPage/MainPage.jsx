import { lazy } from "react";
import UpArrow from "../../component/upArrow/UpArrow";
import "./MainPage.scss";

const Promo = lazy(() => import("../../component/promo/Promo"));
const ProductList = lazy(() =>
  import("../../component/productList/ProductList")
);
const HowWork = lazy(() => import("../../component/howWork/HowWork"));
const CalcFormModule = lazy(() =>
  import("../../component/calcFormModule/CalcFormModule")
);
const QuestionForm = lazy(() =>
  import("../../component/questionForm/QuestionForm")
);
const Footer = lazy(() => import("../../component/footer/Footer"));

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
