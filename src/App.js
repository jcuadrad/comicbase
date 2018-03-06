import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comicList: []
    }
  }

  getAllComics = () => {
    fetch('http://localhost:3000/comics')
      .then(data => {
        return data.json()
      })
      .then(info => {
        this.setState({comicList: info});
        console.log(this.state)
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.getAllComics()}></button>
        <pre>
          {JSON.stringify(this.state.comicList, null, 2)}
        </pre>
      </div>
    );
  }
}

export default App;
