const Persons = ({people, deletePerson}) => {
    return (
        <ul>
        {people.map(person =>
        <div key={person.id}>
          <li>{person.name} {person.number}</li>
          <button onClick={() => {
            if (window.confirm("Delete?")){
              deletePerson(person.id)}
            }
          }
          >delete</button>
        </div>
        )}
      </ul>
    )
}

export default Persons