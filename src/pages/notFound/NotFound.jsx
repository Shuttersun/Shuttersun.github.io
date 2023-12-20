import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../component/UI/button/ActionButton";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const options = useMemo(
    () => ({
      backgroundColor: "#FB8C00",
      padding: "14px 80px",
      maxWidth: 290,
    }),
    []
  );

  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__body">
          <h2 className="not-found__title">404</h2>
          <div className="not-found__description">
            <p className="not-found__text">Сторінка не знайдена</p>
            <p className="not-found__text not-found__text--small">
              Поверніться назад і спробуйте щось ще
            </p>
          </div>
          <ActionButton
            onClick={onClickHandler}
            blobColor="#2F80ED"
            options={options}
          >
            Повернутися назад
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
