import React from 'react';
import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './component/Navbar';
import MyRouter from './router/MyRouter';

function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <MyRouter/>
   </BrowserRouter>
    </div>
  );
}

export default App;
