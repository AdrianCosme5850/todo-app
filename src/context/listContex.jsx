import { useState, createContext, useEffect} from 'react';

export const ListContext = createContext();

function ListContextProvider(props){
    const [ list, setList]  = useState([])
    const [ incomplete, setIncomplete] = useState([])
    const [ pagination, setPagination] = useState(3)
    const [index, setIndex] = useState(0);
    const [ sortA, setSortA] = useState(false)
    const [showComplete, setShowComplete] = useState(false)
    
    useEffect(() => {
        let savedSettings = localStorage.getItem('settings');
        let parsedSettings = JSON.parse(savedSettings)
        setPagination(parsedSettings.pagination);
        setShowComplete(parsedSettings.showComplete);
        setSortA(parsedSettings.sortA)
    }, [])
    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify({ pagination, sortA, showComplete }));
    }, [pagination, sortA, showComplete])
 
    return (
        <ListContext.Provider value={{ list, setList, incomplete, setIncomplete, pagination, setPagination, index, setIndex, sortA, setSortA, showComplete, setShowComplete}}>
            {props.children}
        </ListContext.Provider>
    )
}

export default ListContextProvider;