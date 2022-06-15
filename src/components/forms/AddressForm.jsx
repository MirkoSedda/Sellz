
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddressForm = ({ saveAddressInDb, setAddress, address }) => (
    <Form onSubmit={saveAddressInDb}>
        <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
                type="text"
                className=""
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                autoFocus
                required
            />
            <br />
            <Button
                onClick={saveAddressInDb}
                className="btn btn-primary">
                Save
            </Button>
            <hr />
        </Form.Group>
    </Form>
)

export default AddressForm;