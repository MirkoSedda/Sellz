import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const CreateCategoryForm = ({ handleSubmit, name, setName }) => (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                className=""
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
            />
            <br />
            <Button className="btn btn-outline-primary">Save</Button>
            <hr />
        </Form.Group>
    </Form>
);