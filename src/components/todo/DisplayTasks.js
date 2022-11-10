import { useContext, useEffect, useState } from 'react';
import { ListContext } from '../../context/listContex';
import { Button, Icon } from '@blueprintjs/core';

const DisplayTasks = () => {
    const context = useContext(ListContext);
    let list = context.list;
    let setList = context.setList;
    let pagination = context.pagination;
    let [renderedTasks, renderTasks] = useState([])
    let [index, setIndex] = useState(0);

function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
    }

function showTasks(index) {
    let newArr = [];
    for(let i = index; i < pagination+index; i++){
        console.log(i)
        newArr[newArr.length] = renderedTasks[i];
    }
    console.log(newArr)
    return newArr;
}

function paginationAdd(){
  if(index + pagination > renderedTasks.length){
    setIndex(index + pagination)
  } else {
    let total = index + pagination;
    let leftOver = renderedTasks.length - total;
    setIndex(total - leftOver)
  }
}
function paginationSubtract(){
  if(index - pagination > 0){
    setIndex(index - pagination)
  } else {
    setIndex(0)
  }
}

useEffect(() => {
    let tasks = list.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
          <Button intent='success' text='Complete Task'></Button>
          <Button intent='danger' text='X' onClick={() => deleteItem(item.id)}></Button>
        </div>
      ))
    renderTasks(tasks);
}, [list])

return(<>
{showTasks(index)}
<Button rightIcon='arrow-left' onClick={() => paginationSubtract()}></Button>
<Button rightIcon='arrow-right' onClick={() => paginationAdd()}></Button>
  </>)
}

export default DisplayTasks;