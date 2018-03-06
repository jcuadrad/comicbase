import React from 'react'
import './Comic.css'

const Comic = props => {

      return (
        <div className="comic">
          <div className="cover-container">
              <img className="cover" src={props.cover} alt="cover"/>
          </div>
          <div className="info">
            <h2>{props.name}</h2>
            {props.volume > 0 ? 
              <p className="volume">V{props.volume}</p> : 
              <p className="volume">STANDALONE</p>}
            <p>{props.writer} & {props.artist}</p>
            <img className={props.logo.class} src={props.logo.link} alt="logo"/>
          </div>
        </div>
      )
  }

  export default Comic;