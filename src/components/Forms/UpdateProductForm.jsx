
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Select } from "antd"
const { Option } = Select

export const UpdateProductForm = ({
  values,
  categories,
  selectedCategory,
  subCategoryOptions,
  arrayOfSubCategories,
  setArrayOfSubCategories,
  handleSubmit,
  handleChange,
  handleCategoryChange,
}) => {

  const {
    title,
    description,
    price,
    category,
    shipping,
    quantity,
    subCategories,
    images,
    colors,
    brands,
    color,
    brand,
  } = values

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          className=""
          value={title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          className=""
          value={price}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Shipping</Form.Label>
        <Form.Select
          name="shipping"
          className=""
          value={shipping === "Yes" ? "Yes" : "No"}
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          className=""
          value={quantity}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Color</Form.Label>
        <Form.Select
          name="color"
          className=""
          value={color}
          onChange={handleChange}
        >
          <option>Please select</option>
          {colors.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Brand</Form.Label>
        <Form.Select
          name="brand"
          className=""
          value={brand}
          onChange={handleChange}
        >
          <option>Please select</option>
          {brands.map(b => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="category"
          className=""
          value={selectedCategory ? selectedCategory : category._id}
          onChange={handleCategoryChange}
        >
          {console.log('selected category', selectedCategory)}
          {console.log('category', category)}
          {categories.length &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Sub Categories</Form.Label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubCategories}
          onChange={value => setArrayOfSubCategories(value)}>
          {subCategoryOptions.length &&
            subCategoryOptions.map(s => (
              <Option key={s._id} value={s.id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </Form.Group>

      <br />
      <Button onClick={handleSubmit} className="btn btn-outline-info">Save</Button>
    </Form>
  )
}
