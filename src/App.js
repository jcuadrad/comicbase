import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comicList: [],
      form: {
        name: '',
        writer: '',
        artist: '',
        publisher: '',
        volume: 0,
        cover: ''
      }
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

  handleChange = (event) => {
    console.log(event.target.id)
    this.setState({
      form: {
        ...this.state.form,
        [event.target.id]: event.target.value
      }
    });
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <div className="Form">
          <label htmlFor="">Comic Name</label>
          <input id="name" type="text" placeholder="Watchmen, Y: The Last Man..." value={this.state.form.name} onChange={this.handleChange}/>
          <label htmlFor="">Writer</label>
          <input id="writer" type="text" placeholder="Brian Michael Bendis" value={this.state.form.writer} onChange={this.handleChange}/>
          <label htmlFor="">Artist</label>
          <input id="artist" type="text" placeholder="Gabriel Ba" value={this.state.form.artist} onChange={this.handleChange}/>
          <label htmlFor="">Publisher</label>
          <input type="text" />
          <label htmlFor="">Volume</label>
          <input id="volume" type="text" placeholder="1, 2, 3" value={this.state.form.volume} onChange={this.handleChange}/>
          <label htmlFor="">Cover Link</label>
          <input id="cover" type="text" placeholder="" value={this.state.form.cover} onChange={this.handleChange}/>
        </div>
        <div className="comicList">
          <button onClick={() => this.getAllComics()}>Show Comics</button>
          {this.state.comicList.length ? 
            this.state.comicList.map(comic => {
              return (
                <div key={comic._id}>
                  <h2>{comic.name} V{comic.volume}</h2>
                  <p>{comic.writer} & {comic.artist}</p>
                  <img src={comic.cover} alt="cover"/>
                </div>
              )
            }) : null }
          <pre>
            {JSON.stringify(this.state.form, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
