export const SearchForm = ({ handleSearch, query }) => (
    <input
        type="search"
        placeholder="Filter categories"
        className="form-control my-4"
        onChange={handleSearch}
        value={query}
    />
)
