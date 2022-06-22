import { useState, useEffect } from "react";
import { getProducts, getProductsByFilter } from "../../functions/products";
import { getCategories } from "../../functions/categories";
import { getSubCategories } from "../../functions/subCategories";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../components/cards/ProductCard";
import Rating from "../../components/forms/Rating";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Menu, Slider, Checkbox, Radio } from "antd";
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import "../../App.css"

const { SubMenu } = Menu;

//TODO perfectly align icons and filters text

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 5000]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "Asus",
  ]);
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([
    "Black", "Silver", "Gold", "White", "Red", "Blue", "Green"]);
  const dispatch = useDispatch();
  const text = useSelector((state) => state?.search?.text);
  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubCategories().then((res) => setSubCategories(res.data));
  }, []);
  const getFilteredProducts = (query) => {
    getProductsByFilter(query).then((res) => {
      setProducts(res.data);
    });
  };
  // 1. load all products on page load
  const loadAllProducts = () => {
    getProducts().then((p) => {
      setProducts(p.data);
      // console.log("🚀 ~ file: Shop.jsx ~ line 21 ~ getProducts.then ~ p.data", p.data)
      setLoading(false);
    });
  };
  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      getFilteredProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);
  // 3. load products based on price range
  useEffect(() => {
    getFilteredProducts({ price });
    // eslint-disable-next-line 
  }, [ok]);
  // handler for the price slider
  const handlePriceSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setStar("");
    setSubCategory("");
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  // 4. load products based on category
  // show all of the categories in a list of checkboxes
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCategoriesCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ))
  // handler for the categories checkboxes  
  const handleCategoriesCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSubCategory("");
    let inTheState = [...categoryIds];
    let checkedCategories = e.target.value;
    // foundInTheState is an array so indexOf returns the index or -1
    let foundInTheState = inTheState.indexOf(checkedCategories);
    //if the category its not in the state we add it to the array
    if (foundInTheState === -1) {
      inTheState.push(checkedCategories);
    } else {
      // else if the category is already in the foundInTheState array we remove it 
      inTheState.splice(foundInTheState, 1);
    }
    //this set the selected categories in local state 
    setCategoryIds(inTheState);
    //this finally fetches the selected categories <3
    getFilteredProducts({ category: inTheState });
  };
  // 5. show products based on star rating
  const handleStarClick = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    getFilteredProducts({ stars: num });
  };
  // handler for the star ratings
  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Rating starClick={handleStarClick} numberOfStars={5} />
      <Rating starClick={handleStarClick} numberOfStars={4} />
      <Rating starClick={handleStarClick} numberOfStars={3} />
      <Rating starClick={handleStarClick} numberOfStars={2} />
      <Rating starClick={handleStarClick} numberOfStars={1} />
    </div>
  );
  // 6. show products by sub category
  const handleSubCategory = (subCategory) => {
    console.log("SUB", subCategory);
    setSubCategory(subCategory);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    getFilteredProducts({ subCategory });
  };
  const showSubCategories = () =>
    subCategories.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSubCategory(s)}
        className="p-1 m-1 badge badge-secondary text-black"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));
  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));
  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSubCategory("");
    setColor("");
    setShipping("");
    setBrand(e.target.value);
    getFilteredProducts({ brand: e.target.value });
  };
  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));
  const handleColor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setSubCategory("");
    setShipping("");
    setColor(e.target.value);
    getFilteredProducts({ color: e.target.value });
  };
  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );
  const handleShippingchange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setSubCategory("");
    setShipping(e.target.value);
    getFilteredProducts({ shipping: e.target.value });
  };
  return (
    <Container className="mt-5">
      <Row className="">
        <Col md={3} className="mb-4">
          <h3>Search & Filter</h3>
          <hr />
          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline"
            className="py-2"
          >
            {/* price */}
            <SubMenu
              key="1"
              className="py-2"
              title={
                <span className="h6 ps-0 d-flex align-items-center">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4 d-flex align-items-center"
                  tipFormatter={(v) => `$ ${v}`}
                  range
                  value={price}
                  onChange={handlePriceSlider}
                  max="5000"
                />
              </div>
            </SubMenu>
            {/* brands */}
            <SubMenu
              key="5"
              className="py-2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>
            {/* category */}
            <SubMenu
              key="2"
              className="py-2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>
            {/* sub category */}
            <SubMenu
              key="4"
              className="py-2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pl-4 pr-4">
                {showSubCategories()}
              </div>
            </SubMenu>
            {/* stars */}
            <SubMenu
              key="3"
              className="py-2"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showStars()}</div>
            </SubMenu>
            {/* colors */}
            <SubMenu
              key="6"
              className="py-2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>
            {/* shipping */}
            <SubMenu
              key="7"
              className="py-2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </Col>
        <Col md={9} className="">
          {loading ? (
            <h3 className="text-black text-center">Loading...</h3>
          ) : (
            <h3 className="text-black text-center">Products</h3>
          )}
          {products.length < 1 && <p>No products found</p>}
          <Row className="row pb-5">
            {products.map((p) => (
              <Col md={6} lg={4} key={p._id} className="mt-3">
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop