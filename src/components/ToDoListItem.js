import React, { useContext, useState} from 'react';
import { ToDoContext } from '../contexts/ToDoContext';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from 'react-time-ago';
import { ToDoTheme } from '../contexts/ToDoTheme';

const ToDoListItem = ({item,title_n,setTitle_n}) => {
    TimeAgo.addDefaultLocale(en);
    const{dispatch}=useContext(ToDoContext);
    const {theme,themeType}=useContext(ToDoTheme);
    const type=theme?themeType.dark:themeType.light;
    const[txtbox,setTxtbox]=useState('');
    const handleClick=(id,enabled)=>{
        dispatch({type: 'CHECK_TODO',value: {id,enabled}});
        console.log(id);
    }
    const handleSubmit=(id,title,txtbox)=>{
        dispatch({type: 'SAVE_CHANGE',value: {id,title,desc: txtbox}});
    }
    return (
        <div id='todolist' className={'rounded shadow p-3 my-3 d-flex align-items-center font-monospace'} style={{backgroundColor: type.itmbg}}>
            {item.enabled && <button className='btn btn-sm me-1 rounded-circle' style={{backgroundColor: type.itmbg,color: type.text}} onClick={()=>handleClick(item.id,item.enabled)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg></button>}
{!item.enabled && <button className='btn btn-sm me-1' style={{backgroundColor: type.itmbg,color: type.text}} onClick={()=>handleClick(item.id,item.enabled)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
</svg></button>}
                        {item.enabled && <label className='text-truncate flex-grow-1 d-flex align-self-center text-secondary' style={{textDecorationLine: 'line-through'}} >{item.title}</label>}
                        {!item.enabled && <label className='text-truncate flex-grow-1 d-flex align-self-center' >{item.title}</label>}
                        <div><button style={{color: type.text}} onClick={()=>{setTitle_n(item.title);setTxtbox(item.desc);}} className='btn btn-sm' type="button" data-bs-toggle="modal" data-bs-target={"#exampleModal"+item.id}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='currentColor' width="24" height="24"><path d="M9 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg></button></div>
                        <div class="modal fade" id={"exampleModal"+item.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div style={{backgroundColor: type.bg}} class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                                    <button type="button" style={{color: type.text2}} className='btn btn-sm' data-bs-dismiss="modal" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg></button>
                                </div>
                                <div class="modal-body">
                                    <div >
                                        <p>Task :</p>
                                        <input type="text" style={{backgroundColor: type.itmbg,color: type.text2}}  placeholder='Add a task....' onChange={(e)=>setTitle_n(e.target.value)} required value={title_n} className='form-control'/>
                                    </div>
                                    <div className='mt-2'>
                                        <p>Description :</p>
                                        <textarea style={{resize: 'none',backgroundColor: type.itmbg,color: type.text2}} onChange={(e)=>setTxtbox(e.target.value)} type="text-box"  value={txtbox} className='form-control'/>
                                    </div>
                                    <label className='me-1 mt-1 pe-1'>Created <ReactTimeAgo date={item.createdAt} locale="en-US"/></label>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" onClick={()=>{dispatch({type:'DELETE_TODO',id: item.id})}} class="btn btn-danger btn-sm font-monospace" data-bs-dismiss="modal">Delete</button>
                                    <button type="button" style={{backgroundColor: type.btnbg,color: 'white'}} onClick={()=>{handleSubmit(item.id,title_n,txtbox)}} class="btn btn-sm font-monospace" data-bs-dismiss="modal">Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
    );
}
 
export default ToDoListItem;