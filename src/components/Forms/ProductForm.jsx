import { Select } from "antd";
const { Option } = Select;

export const ProductForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  valuesSetter,
  values,
  subCategoryOption,
  showSubCategories,
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    subCategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <form>
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </form>

      <form>
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </form>

      <form>
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </form>

      <form>
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </form>

      <form>
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </form>

      <form>
        <label>Color</label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </form>

      <form>
        <label>Brand</label>
        <select name="brand" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </form>

      <form>
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option>Please select a category</option>
          {categories.length > 0 &&
            categories.map((c) => <option key={`category_${c.id}`} value={c._id} >
              {c.name}
            </option>
            )
          }
        </select>
      </form>

      {showSubCategories && (
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subCategories}
            onChange={(value) => valuesSetter({ ...values, subCategories: value })}
          >
            {subCategoryOption.length > 0 &&
              subCategoryOption.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      <button className="btn btn-outline-dark">Save</button>
    </form>
  );
};


