import { useEffect, useState } from "react";
import { animated, useTrail, useSpring } from "react-spring";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import useHttp from "../../hooks/useHttp";
import ProductItem from "../productItem/ProductItem";

import "./ProductList.scss";

const config = { mass: 5, tension: 2000, friction: 200 };

const ProductList = () => {
  const { request } = useHttp();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    request("http://localhost:3001/products").then((data) => {
      setCards(data);
    });
    // eslint-disable-next-line
  }, []);

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const fromLeft = { opacity: 0, transform: "translateX(-100px)" };
  const fromRight = { opacity: 0, transform: "translateX(100px)" };
  const to = { opacity: 1, transform: "translate(0)" };

  //Анімація компонента.
  const [titleProps, titleApi] = useSpring(() => ({
    ...config,
    from: fromLeft,
  }));
  const [trails, trailsApi] = useTrail(cards.length, () => ({
    ...config,
    from: fromRight,
  }));

  useEffect(() => {
    if (entry?.isIntersecting) {
      titleApi.start({
        config: { mass: 2, tension: 2000, friction: 900 },
        to,
      });
      trailsApi.start({
        delay: 500,
        to,
      });
    }
    // eslint-disable-next-line
  }, [entry?.isIntersecting]);

  const items = trails.map((props, index) => (
    <animated.div key={cards[index].id} style={props}>
      <ProductItem {...cards[index]} />
    </animated.div>
  ));

  return (
    <section ref={ref} className="product">
      <div className="product__container">
        <animated.h2 style={titleProps} className="product__title">
          Виготовимо будь-що
        </animated.h2>
        <ul className="product__list">{items}</ul>
      </div>
    </section>
  );
};

export default ProductList;
