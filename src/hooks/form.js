import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const useForm = (callback, defaultValues={}) => {

  const authContext = useContext(AuthContext);
  let token = authContext.token;


  const [values, setValues] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(process.env.REACT_APP_SERVER)
    let url = 'http://localhost:3001/api/v1/tasks'
    values.complete = false;
    let taskResponse = await axios.post(url, values)
    console.log(taskResponse.data)
    callback(taskResponse.data);
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