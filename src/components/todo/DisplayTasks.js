import { useContext, useEffect, useState } from 'react';
import { ListContext } from '../../context/listContex';
import { Button, Icon } from '@blueprintjs/core';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

const DisplayTasks = () => {
    const context = useContext(ListContext);
    const authContext = useContext(AuthContext);
    let list = context.list;
    let setList = context.setList;
    let pagination = context.pagination;
    let index = context.index;
    let setIndex = context.setIndex;
    let sortA = context.sortA;
    let showComplete = context.showComplete;
    let [showButtonLeft, setShowButtonLeft] = useState(true)
    let [showButtonRight, setShowButtonRight] = useState(true);
    let capabilities = authContext.capabilities;

function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
    axios.delete("http://localhost:3001/api/v1/tasks/" + id)
    };

    function toggleComplete(item) {
      const items = list.map( item => {
        if ( item.id == [item.id] ) {
          item.complete = ! item.complete;
        }
        return item;
      });
      setList(items);
      axios.put("http://localhost:3001/api/v1/tasks/" + item.id, item)
    }

function showTask(idx){
    let tasksToShow = [...list];
    if(!showComplete){
      tasksToShow = tasksToShow.filter(tasks => tasks.complete === false)
    }
    if(sortA){
      if(sortA === true){
        tasksToShow.sort((a, b) => {
          if(a.assignee.toLowerCase() < b.assignee.toLowerCase()){ return -1};
          if(a.assignee.toLowerCase() > b.assignee.toLowerCase()){ return 1};
          return 0;
        })
      }
    }
  let task = tasksToShow.slice(idx, idx + pagination);
  return task.map(item => (
          <div key={item.id}>
            <p data-testid="itemDescription">{item.text}</p>
            <p data-testid="itemAssignee"><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
            <hr />
            <Button intent='success' text='Complete Task' onClick={() => toggleComplete(item)}></Button>
            <Button intent='danger' text='X' onClick={() => deleteItem(item.id)}></Button>
           </div>
        ))
}
useEffect(() => {
if(index + pagination > list.length){
  setShowButtonRight(true);
}
if(index + pagination < list.length){
  setShowButtonRight(false)
  }
if(index === 0){
  setShowButtonLeft(true)
}
  if(index !== 0){
    setShowButtonLeft(false)
  }
  console.log(index, list)
}, [list, index])
useEffect( async () => {
  let recordedTasks = await axios.get("http://localhost:3001/api/v1/tasks");
  console.log(recordedTasks.data)
  setList(recordedTasks.data)
}, [])

function paginationAdd(){
  setIndex(index + pagination);
}
function paginationSubtract(){
  setIndex(index - pagination);
}

return(<>
{showTask(index)}
<Button rightIcon='arrow-left' onClick={() => paginationSubtract()} disabled={showButtonLeft}></Button>
<Button rightIcon='arrow-right' onClick={() => paginationAdd()} disabled={showButtonRight}></Button>
  </>)
}

export default DisplayTasks;