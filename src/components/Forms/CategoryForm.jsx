export const CategoryForm = ({ handleSubmit, name, nameSetter }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Name</label>
            <input
                type="text"
                className="form-control"
                onChange={(e) => nameSetter(e.target.value)}
                value={name}
                autoFocus
                required
            />
            <br />
            <button className="btn btn-outline-primary">Save</button>
            <hr />
        </div>
    </form>
);