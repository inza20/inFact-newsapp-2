import React, { Component } from 'react'

export function Newsitem(props) {

  
    let {title, description, imageUrl, newsUrl, author, date} = props;
    return (
      <div>

        <div className="card" style={{margin: "0rem "}}>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body" >
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toUTCString()} </small></p>
            <a href={newsUrl} className="btn btn-sm btn-success">Read more</a>
        </div>
        </div>
      </div>
    );
  }


export default Newsitem;