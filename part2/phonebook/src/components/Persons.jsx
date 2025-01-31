
function Persons({ persons, filter, deletePerson }) {
    return (
        <div>
            {filter.length > 0 ?
                filter.map(person =>
                    <p key={`${person.id}-${person.name}`}>
                        {person.name} {person.number}
                        <button onClick={() => deletePerson(person.id)}>delete</button>
                    </p>
                ) :
                persons.map(person =>
                    <p key={`${person.id}-${person.name}`}>
                        {person.name} {person.number}
                        <button onClick={() => deletePerson(person.id)}>delete</button>
                    </p>
                )
            }
        </div>
    )
}

export default Persons