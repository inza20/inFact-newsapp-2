import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {HashRouter , Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
// import Newsitem from './components/Newsitem';

import React, { Component } from 'react'

export default function App () {
  const pageSize = 60;
  // apiKey = process.env.REACT_APP_NEWS_API;
  const apiKey = "078def2b67564bf0ae8c5ea47a195d13";
  // to be hidden

  const [progress, setProgress] = useState(10);

    
    return (
      
        <HashRouter>

        <div>
          <Navbar />

          <LoadingBar  height={3} color={"rgb(49, 162, 106)"} progress={progress} onLoaderFinished={() => {setProgress(100)}} />

          <Routes>
            <Route exact path='/' element={<News  apiKey={apiKey} setProgress={setProgress} key='general' pageSize={pageSize} country='us' category='general' />}></Route>
            <Route exact path='/business' element={<News  apiKey={apiKey} setProgress={setProgress} key='business' pageSize={pageSize} country='us' category='business' />}></Route>
            <Route exact path='/entertainment' element={<News  apiKey={apiKey} setProgress={setProgress} key='entertainment' pageSize={pageSize} country='us' category='entertainment' />}></Route>
            <Route exact path='/health' element={<News  apiKey={apiKey} setProgress={setProgress} key='health' pageSize={pageSize} country='us' category='health' />}></Route>
            <Route exact path='/science' element={<News  apiKey={apiKey} setProgress={setProgress} key='science' pageSize={pageSize} country='us' category='science' />}></Route>
            <Route exact path='/sports' element={<News  apiKey={apiKey} setProgress={setProgress} key='sports' pageSize={pageSize} country='us' category='sports' />}></Route>
            <Route exact path='/technology' element={<News  apiKey={apiKey} setProgress={setProgress} key='technology' pageSize={pageSize} country='us' category='technology' />}></Route>
          </Routes>
          </div>
        </HashRouter>
      
    );
  }





