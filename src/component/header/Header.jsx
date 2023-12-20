import { useCallback, useMemo, useState, lazy, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { NavLink } from "react-router-dom";
import ActionButton from "../UI/button/ActionButton";
import logo from "../../assets/img/3d_logo.svg";
import calcIcon from "../../assets/icons/calc-icon.svg";
import "./Header.scss";

const Modal = lazy(() => import("../modal/Modal"));
const CalcForm = lazy(() => import("../calcForm/CalcForm"));

const Header = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const size = useWindowSize();

  useEffect(() => {
    if (size.width > 851) {
      setShowSidePanel(false);
    }
  }, [size.width]);

  const options = useMemo(
    () => ({
      padding: "13px 30px 13px 58px",
      backgroundColor: "#FB8C00",
    }),
    []
  );

  const modalSize = useMemo(() => ({ width: 670 }), []);

  const modalHandler = useCallback((bool) => {
    setShowModal(bool);
  }, []);

  const sidePanelHandler = () => {
    setShowSidePanel(!showSidePanel);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to="/">
          <img src={logo} alt="Company `s logo" />
        </NavLink>
      </div>
      <nav className="header__nav">
        <NavLink className="header__link" to="/print">
          3D-друк
        </NavLink>
        <NavLink className="header__link" to="/modeling">
          3D-моделювання
        </NavLink>
        <NavLink className="header__link" to="/contacts">
          Контакти
        </NavLink>
        <ActionButton
          onClick={() => setShowModal(true)}
          icon={calcIcon}
          blobColor="#2F80ED"
          options={options}
        >
          Розрахувати вартість
        </ActionButton>
      </nav>
      <div onClick={() => sidePanelHandler(true)} className="header__hamburger">
        <div></div>
      </div>
      <div className={`side-panel ${showSidePanel ? "activePanel" : ""}`}>
        <div onClick={sidePanelHandler} className="side-panel__close"></div>
        <ul className="side-panel__list">
          <li className="side-panel__link">
            <NavLink to="/">Головна</NavLink>
          </li>
          <li className="side-panel__link">
            <NavLink to="/print">3D-друк</NavLink>
          </li>
          <li className="side-panel__link">
            <NavLink to="/modeling">3D-моделювання</NavLink>
          </li>
          <li className="side-panel__link">
            <NavLink to="/contacts">Контакти</NavLink>
          </li>
        </ul>
      </div>
      <Modal show={showModal} modalHandler={modalHandler} modalSize={modalSize}>
        <CalcForm modal={true} />
      </Modal>
    </header>
  );
};

export default Header;
