import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

export const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subCategories,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (

    <ListGroup className="">
      <ListGroup.Item className="d-flex justify-content-between">
        Price{" "}
        <span className="">
          $ {price}
        </span>
      </ListGroup.Item>

      {category && (
        <ListGroup.Item className="d-flex justify-content-between">
          Category{" "}
          <Link
            to={`/categories/${category.slug}`}
            className=""
          >
            {category.name}
          </Link>
        </ListGroup.Item>
      )}

      {subCategories && (
        <ListGroup.Item className="d-flex justify-content-between">
          Sub Categories
          {" "}
          {subCategories.map((s) => (
            <Link
              key={s._id}
              to={`/subCategories/${s.slug}`}
              className=""
            >
              {s.name}
            </Link>
          ))}
        </ListGroup.Item>
      )}

      <ListGroup.Item className="d-flex justify-content-between">
        Shipping{" "}
        <span className="">
          {shipping}
        </span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Color{" "}
        <span className="">
          {color}
        </span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Brand{" "}
        <span className="">
          {brand}
        </span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Available{" "}
        <span className="">
          {quantity}
        </span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Sold{" "}
        <span className="">
          {sold}
        </span>
      </ListGroup.Item>
    </ListGroup>
  );
};

