import React, { useContext, useState } from 'react';
import { ToDoContext } from '../contexts/ToDoContext';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ToDoListItem from './ToDoListItem';
import { ToDoTheme } from '../contexts/ToDoTheme';

const ToDoList = () => {
    TimeAgo.addDefaultLocale(en);
    const{todo}=useContext(ToDoContext);
    const[title_n,setTitle_n]=useState([]);
    let oneTime=false;
    let cnt=0;
    const {theme,themeType}=useContext(ToDoTheme);
    const type=theme?themeType.dark:themeType.light;
    const[chckop,setChckop]=useState(false);
    const completed=()=>{
        if(oneTime===false){
            oneTime=true;
        }
    }
    const countItem=()=>{
        cnt+=1;
    }
    const handleChck=()=>{
        chckop?setChckop(false):setChckop(true);
    }
    return todo.length?(
        <div className='container-fluid px-4'>
            {todo && todo.map(item=>{
                return !item.enabled?(
                    <ToDoListItem key={item.id} item={item} type={type} title_n={title_n} setTitle_n={setTitle_n}></ToDoListItem>
                ):(
                    <div>
                        {completed()}
                        {countItem()}
                    </div>
                )
            })}
            {oneTime && <div  onClick={()=>handleChck()} style={{color: type.text,borderBottom: '1px solid'}} className='d-flex justify-content-between font-monospace' data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                <a style={{textDecoration: 'none',color: type.text}}>
            {chckop && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill='currentColor'><path d="M5.22 8.22a.749.749 0 0 0 0 1.06l6.25 6.25a.749.749 0 0 0 1.06 0l6.25-6.25a.749.749 0 1 0-1.06-1.06L12 13.939 6.28 8.22a.749.749 0 0 0-1.06 0Z"></path></svg>}
            {!chckop && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill='currentColor'><path d="M8.72 18.78a.75.75 0 0 1 0-1.06L14.44 12 8.72 6.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z"></path></svg>}
            Completed
            </a>
            <p>{cnt}</p>
                </div>}
            <div className="collapse pb-3" id='collapseExample'>
                {todo && todo.map(item=>{
                    return item.enabled?(
                        <ToDoListItem key={item.id} item={item} title_n={title_n} setTitle_n={setTitle_n}></ToDoListItem>
                    ):(
                        <div></div>
                    )
                })}
            </div>
        </div>
    ):(
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center'>
            <img src={require("../assets/todoempty.png")}/>
            <h4 className='text-secondary font-monospace'>Enjoy your day</h4>
            <h4 className='text-secondary font-monospace'>or</h4>
            <h4 className='text-secondary font-monospace'>add some task </h4>
        </div>
    );
}
 
export default ToDoList;