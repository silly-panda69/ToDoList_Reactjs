import React, { createContext, useEffect, useState } from 'react';

export const ToDoTheme=createContext();

const ToDoThemeProvider = (props) => {
    const[theme,setTheme]=useState(()=>{
        const localData=localStorage.getItem('theme');
        return localData?JSON.parse(localData):false;
    });
    const themeType={
        dark : {bg: '#17181B',btnbg: '#78C475 ',nav: '#212529',navheader: '#78C475',inptbg: '#212529',itmbg: '#2E3134',text: '#78C475',text2: 'white',navbtn: '78C475'},
        light: {bg: '#F7F7F7',btnbg: 'blue',nav: 'blue',navheader: 'white',inptbg: 'white',itmbg: 'white',text: '#17181B',text2: 'black',navbtn: 'white'}
    }
    useEffect(()=>{
        localStorage.setItem('theme',JSON.stringify(theme));
    },[theme]);
    const toggleTheme=(thm)=>{
        setTheme(thm);
        localStorage.setItem('theme',thm);
        console.log(theme);
    }
    return (
        <ToDoTheme.Provider value={{theme,themeType,toggleTheme}}>
            {props.children}
        </ToDoTheme.Provider>
    );
}
 
export default ToDoThemeProvider;