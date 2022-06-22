
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreateCategoryForm = ({ handleSubmit, name, setName }) => (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Please provide a name..."
                className=""
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
            />
            <br />
            <Button onClick={handleSubmit} className="text-center btn-dark text-white btn-block">Save</Button>
            <br />
        </Form.Group>
    </Form>
);

export default CreateCategoryForm