
import Form from "react-bootstrap/Form";

const SearchForm = ({ handleSearch, query }) => (
    <Form>
        <Form.Group>
            <Form.Control
                type="search"
                placeholder="Type to filter categories"
                className="my-4"
                onChange={handleSearch}
                value={query}
            />
        </Form.Group>
    </Form>
)

export default SearchForm