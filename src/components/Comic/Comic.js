import React from 'react'
import './Comic.css'

const Comic = props => {

      return (
        <div className="comic">
          <div className="cover">
              <img src={props.cover} alt="cover"/>
          </div>
          <div className="info">
            <h2>{props.name}</h2>
            {props.volume > 0 ? 
              <p className="volume">V{props.volume}</p> : 
              <p className="volume">STANDALONE</p>}
            <p>{props.writer} & {props.artist}</p>
            <img src={props.logo} alt="logo"/>
          </div>
        </div>
      )
  }

  export default Comic;