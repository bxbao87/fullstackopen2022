const Filter = ({filter, onFilterChange}) => {
    return (
        <div>
            filter show with<input value={filter} onChange={onFilterChange} />
        </div>
    )
}

export default Filter