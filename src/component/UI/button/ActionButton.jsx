import { useState, memo } from "react";
import PropTypes from "prop-types";
import "./ActionButton.scss";

const ActionButton = memo(
  /**
   * Компонент кнопки з анімацією.
   *
   * @param {Object} props - React властивості.
   * @param {Object} props.children - Текст елементу.
   * @param {string} props.icon - Іконка елемента.
   * @param {string} props.blobColor - Колір анімації.
   * @param {Object} props.options - Додаткові властивості елементу.
   * @returns {JSX.Element}
   */
  ({ blobColor, options, icon, children, ...otherProps }) => {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [hover, setHover] = useState(false);
    const [blobSize, setBlobSize] = useState(0);

    /**
     * Функція обчислює координати миші користувача та записує в стан компонента.
     * Функція встановлює розмір ефекту анімації та змінює стан компоненту.
     *
     */
    const mouseCoordinates = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();

      setMouseX(e.clientX - rect.left);
      setMouseY(e.clientY - rect.top);

      setHover(true);
      setBlobSize(rect.width * 2.5);
    };

    let showStyles = {
      left: mouseX,
      top: mouseY,
      backgroundColor: blobColor,
      width: blobSize,
      height: blobSize,
    };

    let hideStyles = {
      left: mouseX,
      top: mouseY,
      backgroundColor: blobColor,
      width: 0,
      height: 0,
    };
    return (
      <button
        {...otherProps}
        onMouseEnter={(e) => {
          mouseCoordinates(e);
        }}
        onMouseLeave={() => setHover(false)}
        style={options}
        className="action__button"
      >
        {icon ? <img src={icon} alt="calc-icon" /> : null}
        <div
          className={hover ? "blob" : ""}
          style={hover ? showStyles : hideStyles}
        ></div>
        {children}
      </button>
    );
  }
);

ActionButton.propTypes = {
  blobColor: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  icon: PropTypes.string,
};

export default ActionButton;
