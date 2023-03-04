const SearchBar = ({query, onChange}) => {
    return (
        <form>
            find countries<input value={query} onChange={onChange} />
        </form>
    )
}

export default SearchBar