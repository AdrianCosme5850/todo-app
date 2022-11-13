import { useContext, useEffect, useState } from 'react';
import { ListContext } from '../../context/listContex';
import { Button, Icon } from '@blueprintjs/core';
import { AuthContext } from '../../context/authContext';

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
  if(capabilities.includes('delete')){
    const items = list.filter( item => item.id !== id );
    setList(items);};
    }

    function toggleComplete(id) {
      if(capabilities.includes('update')){
      const items = list.map( item => {
        if ( item.id == id ) {
          item.complete = ! item.complete;
        }
        return item;
      });
      setList(items);}
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
    console.log(tasksToShow)
  let task = tasksToShow.slice(idx, idx + pagination);
  return task.map(item => (
          <div key={item.id}>
            <p data-testid="itemDescription">{item.text}</p>
            <p data-testid="itemAssignee"><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
            <hr />
            <Button intent='success' text='Complete Task' onClick={() => toggleComplete(item.id)}></Button>
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
}, [list, index])

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