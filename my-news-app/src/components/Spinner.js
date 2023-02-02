import React, { Component } from 'react';

import loading from './loading.svg';


const Spinner = ()=> {
  
    return (
        <div className='row'>
        <img className='my-3' src={loading} style={{height: "5rem"}} />
    </div>
    )
  }


export default Spinner;
