const Person = ({id, name, number, onDelete}) => {
    const handleDeletion = () => {
        if (window.confirm(`Delete ${name}`)) {
            onDelete(id)
        }
    }

    return (
        <div key={id}>
            {name} {number} <button onClick={handleDeletion}>delete</button>
        </div>
    )
}

export default Person