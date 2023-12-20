import PropTypes from "prop-types";
import "./ProductItem.scss";

/**
 * Компонент карток зі списку карток, який приймає в себе властивості для відображення.
 *
 * @param {Object} props - React властивості.
 * @param {string} props.imgPath - Шлях зображення.
 * @param {string} props.title - Заголовок елемента.
 * @param {string} props.description - опис елемента.
 * @returns {JSX.Element} - відображений елемент.
 */
const ProductItem = ({ imgPath, title, description }) => {
  // отримуємо назву карточки із imgPath, шляхом регулярного виразу.
  const productName = imgPath.match(/\/([^/]+)\./)[1];

  return (
    <li className="card-item">
      <div className="card-img-container">
        <img
          className={`card-img ${productName}`}
          src={imgPath}
          alt={productName}
        />
      </div>
      <div className="card-description-container">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
      </div>
    </li>
  );
};

ProductItem.propTypes = {
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductItem;
