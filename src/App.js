import React, { useContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoPage from './components/ToDoPage';
import ToDoThemeProvider from './contexts/ToDoTheme';

function App() {
  return (
    <ToDoThemeProvider>
       <ToDoPage></ToDoPage>
    </ToDoThemeProvider>
  );
}

export default App;
