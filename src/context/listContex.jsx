import { useState, createContext} from 'react';

export const ListContext = createContext();

function ListContextProvider(props){
    const [ list, setList]  = useState([])
    const [ incomplete, setIncomplete] = useState([])
    const [ pagination, setPagination] = useState(3)
 
    return (
        <ListContext.Provider value={{ list, setList, incomplete, setIncomplete, pagination, setPagination}}>
            {props.children}
        </ListContext.Provider>
    )
}

export default ListContextProvider;