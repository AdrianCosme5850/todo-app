import { useContext, useState } from "react";
import { ListContext } from "../../context/listContex";
import { Button, Collapse, Switch} from "@blueprintjs/core";

const Settings = function(){

    let context = useContext(ListContext);
    let setPagination = context.setPagination;
    let setIndex = context.setIndex;
    let [isCollapsed, setIsCollapsed] = useState(false);
    let sortA = context.sortA;
    let setSortA = context.setSortA;
    let setShowComplete = context.setShowComplete;
    let showComplete = context.showComplete;

let handleSubmit = (e) => {
    e.preventDefault();
    setIndex(0)
    setPagination(e.target.text.value)

}
let handleClick = () => {
    setIsCollapsed(!isCollapsed)
}
let showCompleteHandler = () => {
    setShowComplete(!showComplete);
    console.log(showComplete)
}
let setSortHandlerA = () => {
    if(sortA === false){setSortA(true);}
    else{setSortA(true)}
}


return (<>
<Button onClick={handleClick}>Show/Hide Settings</Button>
<Collapse isOpen={isCollapsed}>
<Switch onChange={() => setSortHandlerA()} checked={sortA}>Alphabetical</Switch>

<Switch onChange={showCompleteHandler} checked={showComplete}>Show Completed</Switch>
    <form onSubmit={handleSubmit}>
        <label for='text'>Pagination</label>
        <input name="text" type="text"></input>
        <button type="submit">Submit</button>
    </form>
</Collapse>
</>)
}

export default Settings;