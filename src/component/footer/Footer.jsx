import { useWindowScroll } from "@uidotdev/usehooks";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/3d_logo.svg";
import "./Footer.scss";

const Footer = () => {
  const [pos, scrollTo] = useWindowScroll();

  const scrollToTop = () => {
    if (pos.y !== 0) {
      scrollTo({ top: 0 });
    }
  };
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__wrapper">
          <div className="footer__left">
            <div className="footer__logo">
              <NavLink onClick={scrollToTop} to="/">
                <img src={logo} alt="Company `s logo" />
              </NavLink>
            </div>
            <div className="footer__nav-links">
              <NavLink
                onClick={scrollToTop}
                to="/print"
                className="footer__nav-link"
              >
                3D-друк
              </NavLink>
              <NavLink
                onClick={scrollToTop}
                to="/modeling"
                className="footer__nav-link"
              >
                3D-моделювання
              </NavLink>
              <NavLink
                onClick={scrollToTop}
                to="/contacts"
                className="footer__nav-link"
              >
                Контакти
              </NavLink>
            </div>
          </div>
          <div className="footer__right">
            <div className="footer__phone">+38 (097) 999-99-99</div>
            <div className="footer__contacts">
              <address className="footer__address">
                м. Київ, вул. Гагаріна 25/68
              </address>
              <a className="footer__mail" href="mailto:post@gmail.com">
                post@gmail.com
              </a>
              <div className="footer__social">
                <div className="footer__social-icon">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/?locale=uk_UA"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1_1914)">
                        <path
                          d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
                          fill="#2C2F36"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_1914">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
                <div className="footer__social-icon">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.youtube.com/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1_1919)">
                        <path
                          d="M21.543 6.498C22 8.28 22 12 22 12C22 12 22 15.72 21.543 17.502C21.289 18.487 20.546 19.262 19.605 19.524C17.896 20 12 20 12 20C12 20 6.107 20 4.395 19.524C3.45 19.258 2.708 18.484 2.457 17.502C2 15.72 2 12 2 12C2 12 2 8.28 2.457 6.498C2.711 5.513 3.454 4.738 4.395 4.476C6.107 4 12 4 12 4C12 4 17.896 4 19.605 4.476C20.55 4.742 21.292 5.516 21.543 6.498ZM10 15.5L16 12L10 8.5V15.5Z"
                          fill="#2C2F36"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_1919">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
