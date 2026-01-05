import {useState} from 'react';

function AddPerson({people, onAddPerson}){
  const [newPerson, setNewPerson] = useState('');

  const formatName = (name) => {
    const lower = name.trim().toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const addPerson = () => {
    if(!newPerson.trim()) return;

    const formattedName = formatName(newPerson);

    const alreadyExists = people.some(
      person => person.toLowerCase() === formattedName.toLowerCase()
    );

    if (!alreadyExists) {
      onAddPerson([...people, formattedName]);
      setNewPerson('');
    }

  };

  return (
    <>
      <input type="text" 
        placeholder="Enter person's name"
        value={newPerson}
        onChange={(e) => setNewPerson(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addPerson()}
      />
      <button onClick={addPerson}>+</button>
    </>
  );
}

export default AddPerson;