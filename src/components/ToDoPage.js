import React, { useContext } from 'react';
import { ToDoTheme } from '../contexts/ToDoTheme';
import ToDoContextProvider from '../contexts/ToDoContext';
import Navbar from './Navbar';
import NewToDo from './NewToDo';
import ToDoList from './ToDoList';

const ToDoPage = () => {
    const {theme,themeType}=useContext(ToDoTheme);
    const type=theme?themeType.dark:themeType.light;
    return (
        <div className="container-fluid min-vh-100" style={{backgroundColor: type.bg,color: type.text}}>
            <ToDoContextProvider>
            <Navbar></Navbar>
            <p id='goTo' style={{paddingTop: '65px'}}></p>
            {<NewToDo></NewToDo>}
            <ToDoList></ToDoList>
            </ToDoContextProvider>
        </div>
    );
}
 
export default ToDoPage;