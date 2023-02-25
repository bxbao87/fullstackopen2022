import Person from './Person'

const Persons = ({persons, filter, onDelete}) => {
    return (
        <div>
            {persons.filter(person => 
                person.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(person => 
                        <Person key={person.id} id={person.id} name={person.name} number={person.number} onDelete={onDelete}/>
                    )
            }
        </div>
    )
}

export default Persons