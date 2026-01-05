function PeopleList({ people, onRemovePerson}) {
  return (
    <div>
      <h2>People List:</h2>
      {people.length === 0 ? (
        <p>No people added yet. Add a person using the input above.</p>
      ) : (
        <ul>
          {people.map((person, index) => (
            <li key={index}>
              {person}
              <button onClick={() => onRemovePerson(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PeopleList;
