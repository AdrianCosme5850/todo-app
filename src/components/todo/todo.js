import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { ListContext } from '../../context/listContex';
import { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../../context/authContext';

const ToDo = () => {

const context = useContext(ListContext);
let list = context.list;
let incomplete = context.list;
let setList = context.setList;
let setIncomplete = context.setIncomplete;
const authContext = useContext(AuthContext);
let capabilities = authContext.capabilities;
let [write, setWrite] = useState(true);

useEffect(() => {
if(capabilities.includes('write')){
  setWrite(false);
}
}, [])


  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  return (
    <>

      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input data-testid="itemInput" onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input data-testid="assigneeInput" onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button data-testid="taskSubmitButton" type="submit" disabled={write}>Add Item</button>
        </label>
      </form>
    </>
  );
};

export default ToDo;