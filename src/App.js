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
    this.setState({
      form: {
        ...this.state.form,
        [event.target.id]: event.target.value
      }
    });
  }

  createNewComic = () => {
    fetch('http://localhost:3000/comics', {
      method: 'POST',
      body: JSON.stringify(this.state.form), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error.status))
    .then(response => console.log('Success:', response.status));

    this.setState({
      form: {
        name: '',
        writer: '',
        artist: '',
        publisher: '',
        volume: 0,
        cover: ''
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="form">
          <form>
            <label htmlFor="">Comic Name</label>
            <input id="name" type="text" placeholder="Watchmen, Y: The Last Man..." value={this.state.form.name} onChange={this.handleChange}/>
            <label htmlFor="">Writer</label>
            <input id="writer" type="text" placeholder="Brian Michael Bendis" value={this.state.form.writer} onChange={this.handleChange}/>
            <label htmlFor="">Artist</label>
            <input id="artist" type="text" placeholder="Gabriel Ba" value={this.state.form.artist} onChange={this.handleChange}/>
            <label htmlFor="">Publisher</label>
            <input type="text" id="publisher" type="text" placeholder="Marvel" value={this.state.form.publisher} onChange={this.handleChange}/>
            <label htmlFor="">Volume</label>
            <input id="volume" type="text" placeholder="1, 2, 3" value={this.state.form.volume} onChange={this.handleChange}/>
            <label htmlFor="">Cover Link</label>
            <input id="cover" type="text" placeholder="" value={this.state.form.cover} onChange={this.handleChange}/>
            <button type="button" onClick={() => this.createNewComic()}>Send</button>
          </form>
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
            }) : <p>:)</p> }
          <pre>
            {JSON.stringify(this.state.form, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
