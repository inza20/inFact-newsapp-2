import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {HashRouter , Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
// import Newsitem from './components/Newsitem';

import React, { Component } from 'react'

export default class App extends Component {
  pageSize = 60;
  // apiKey = process.env.REACT_APP_NEWS_API;
  apiKey = "078def2b67564bf0ae8c5ea47a195d13";
  // to be hidden

  state = {
    progress : 0
  }

  setProgress = (progress)=>{
    this.setState({ progress: progress })
  }

  render() {
    return (
      
        <HashRouter>

        <div>
          <Navbar />

          <LoadingBar  height={3} color={"rgb(49, 162, 106)"} progress={this.state.progress} onLoaderFinished={() => {this.setProgress(100)}} />

          <Routes>
            <Route exact path='/' element={<News  apiKey={this.apiKey}setProgress={this.setProgress} key='general' pageSize={this.pageSize} country='us' category='general' />}></Route>
            <Route exact path='/business' element={<News  apiKey={this.apiKey}setProgress={this.setProgress} key='business' pageSize={this.pageSize} country='us' category='business' />}></Route>
            <Route exact path='/entertainment' element={<News  apiKey={this.apiKey}setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} country='us' category='entertainment' />}></Route>
            <Route exact path='/health' element={<News  apiKey={this.apiKey}setProgress={this.setProgress} key='health' pageSize={this.pageSize} country='us' category='health' />}></Route>
            <Route exact path='/science' element={<News  apiKey={this.apiKey}setProgress={this.setProgress} key='science' pageSize={this.pageSize} country='us' category='science' />}></Route>
            <Route exact path='/sports' element={<News  apiKey={this.apiKey}setProgress={this.setProgress} key='sports' pageSize={this.pageSize} country='us' category='sports' />}></Route>
            <Route exact path='/technology' element={<News  apiKey={this.apiKey}setProgress={this.setProgress} key='technology' pageSize={this.pageSize} country='us' category='technology' />}></Route>
          </Routes>
          </div>
        </HashRouter>
      
    );
  }
}




