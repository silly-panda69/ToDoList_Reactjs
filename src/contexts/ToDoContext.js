import React, { createContext, useEffect, useReducer} from 'react';
import {v4 as uuidv4 } from 'uuid';

export const ToDoContext=createContext();

export const todoReducer=(state,action)=>{
    switch(action.type){
        case 'ADD_TODO':
            return [...state,{title: action.title,id: uuidv4(),createdAt: new Date(),desc: '',enabled: false}];
        case 'DELETE_TODO':
            return state.filter(item=>item.id!==action.id);
        case 'CHECK_TODO':
            const chck=state.map(item=>{
                if(item.id===action.value.id){
                   item.enabled=!action.value.enabled;
                }
                return item;
            });
            return chck;
        case 'UPDATE_TITLE':
            const updated=state.map(item=>{
                if(item.id===action.value.id){
                   item.title=action.value.title;
                }
                return item;
            });
            return updated;
        case 'SAVE_CHANGE':
            const changes=state.map(item=>{
                if(item.id===action.value.id){
                   item.title=action.value.title;
                   item.desc=action.value.desc;
                }
                return item;
            });
            return changes;
        default:
            return state;
    }
}

const ToDoContextProvider = (props) => {
    const[todo,dispatch]=useReducer(todoReducer,[],()=>{
        const localData=localStorage.getItem('todo');
        return localData?JSON.parse(localData):[];
    })
    // const[todo,setToDo]=useState(()=>{
    //     const localData=localStorage.getItem('todo');
    //     return localData?JSON.parse(localData):[];
    // });
    // const todoAdd=(title)=>{
    //     const createdAt=new Date();
    //     setToDo([...todo,{title,id: uuidv4(),createdAt}]);
    // }
    // const todoDelete=(id)=>{
    //     setToDo(todo.filter(item=>item.id!==id));
    // }
    useEffect(()=>{
        localStorage.setItem('todo',JSON.stringify(todo));
    },[todo]);
    return (
        <ToDoContext.Provider value={{todo,dispatch}}>
            {props.children}
        </ToDoContext.Provider>
    );
}
 
export default ToDoContextProvider;