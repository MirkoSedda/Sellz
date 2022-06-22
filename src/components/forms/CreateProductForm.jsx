
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Select } from "antd";
const { Option } = Select;

const CreateProductForm = ({
    handleSubmit,
    handleChange,
    handleCategoryChange,
    setValues,
    values,
    subCategoryOption,
    showSubCategories,
}) => {
    const {
        title,
        description,
        price,
        categories,
        subCategories,
        quantity,
        colors,
        brands,
    } = values;

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    placeholder="Provide a title..."
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
                    placeholder="Provide a description..."
                    className=""
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    name="price"
                    placeholder="Provide a price..."
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
                    onChange={handleChange}
                >
                    <option>Please select a shipping option...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Provide a quantity..."
                    className=""
                    value={quantity}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Color</Form.Label>
                <Form.Select name="color" className="" onChange={handleChange}>
                    <option>Please select a color...</option>
                    {colors.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>


            <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Select name="brand" className="" onChange={handleChange}>
                    <option>Please select a brand...</option>
                    {brands.map((b) => (
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
                    onChange={handleCategoryChange}
                >
                    <option>Please select a category...</option>
                    {categories.length > 0 &&
                        categories.map((c) => <option key={`category_${c.id}`} value={c._id} >
                            {c.name}
                        </option>
                        )
                    }
                </Form.Select>
            </Form.Group>

            {
                showSubCategories && (
                    <Form.Group>
                        <Form.Label>Sub Categories</Form.Label>
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Please select a sub category..."
                            value={subCategories}
                            onChange={(value) => setValues({ ...values, subCategories: value })}
                        >
                            {subCategoryOption.length > 0 &&
                                subCategoryOption.map((s) => (
                                    <Option key={s._id} value={s._id}>
                                        {s.name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Group>
                )
            }
            <Button
                className="text-center btn-dark text-white btn-block my-4"
                onClick={handleSubmit}
            >Save product</Button>
        </Form >
    );
};

export default CreateProductForm