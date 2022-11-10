import { useContext, useEffect } from 'react';
import { ListContext } from '../../context/listContex';

const Header = () => {

    let context = useContext(ListContext);
    let incomplete = context.incomplete;
    let list = context.list;
    let setIncomplete = context.setIncomplete;

    useEffect(() => {
        let incompleteCount = list.filter(item => !item.complete).length;
        setIncomplete(incompleteCount);
        document.title = `To Do List: ${incomplete}`;
      }, [list]);

    return (<>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>
    </>)
}

export default Header;