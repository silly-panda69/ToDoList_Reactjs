import React, { useContext, useState } from 'react';
import { ToDoContext } from '../contexts/ToDoContext';
import { ToDoTheme } from '../contexts/ToDoTheme';

const NewToDo = () => {
    const[title,setTitle]=useState('');
    const {theme,themeType}=useContext(ToDoTheme);
    const type=theme?themeType.dark:themeType.light;
    const{dispatch}=useContext(ToDoContext);
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch({type: 'ADD_TODO',title});
        setTitle('');
    }
    return (
        <form id='123' onSubmit={handleSubmit} className='d-flex align-items-center justify-content-center my-3 px-4'>
            <input style={{backgroundColor: type.inptbg,color: type.text2}} type="text" placeholder='Add a task....' className='form-control font-monospace' required value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <button className='btn btn-sm ms-2 font-monospace' style={{backgroundColor: type.btnbg,color: 'white'}} >Add</button>
        </form>
    );
}
 
export default NewToDo;