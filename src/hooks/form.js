import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';

const useForm = (callback, defaultValues={}) => {

  const authContext = useContext(AuthContext);
  let token = authContext.token;


  const [values, setValues] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(process.env.REACT_APP_SERVER)
    let url = 'http://localhost:3001/api/v1/tasks'
    values.complete = false;
    let jsonValues = JSON.stringify(values)
    console.log(jsonValues)
    let taskResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonValues,
    })
    console.log(taskResponse)
    callback(values);
  };

  const handleChange = (event) => {
    event.persist();

    let { name, value } = event.target;
    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value }));
  };

  useEffect( () => {
    setValues( defaultValues );
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;