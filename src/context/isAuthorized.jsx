import { useContext } from 'react';
import { AuthContext } from './authContext';
import { When } from 'react-if';

function IsAuthorized (props){
    let context = useContext(AuthContext);
    let loggedIn = context.loggedIn;

    return (
        <When condition={loggedIn}>
            {props.children}
        </When>
    )

};

export default IsAuthorized;