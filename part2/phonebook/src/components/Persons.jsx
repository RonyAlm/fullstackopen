
function Persons({ persons, filter }) {
    return (
        <div>
            {filter.length > 0 ?
                filter.map(person => <p key={person.name}>{person.name} {person.number}</p>) :
                persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)
            }
        </div>
    )
}

export default Persons