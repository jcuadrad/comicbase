import React from 'react'
import './Comic.css'

const Comic = props => {

      return (
        <div className="comic">
          <div className="cover-container">
              <img className="cover" src={props.cover} alt="cover"/>
          </div>
          <div className="info">
            <h2 className={props.name.length > 36 ? 'medium' : null}>{props.name}</h2>
            {props.volume.number > 0 ? (
              <div className="detail">
                <p className="volume">V{props.volume.number}{props.volume.name.length > 0 ? <p style={{color:'black', marginLeft: '3px'}}> {' - ' + props.volume.name}</p>: null} </p> 
              </div>
            ) : 
              <p className="volume">STANDALONE</p>}
            <p>{props.writer} & {props.artist}</p>
            <img className={props.logo.class} src={props.logo.link} alt="logo"/>
          </div>
        </div>
      )
  }

  export default Comic;