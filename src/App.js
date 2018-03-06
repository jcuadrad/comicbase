import React, { Component } from 'react';
import './App.css';

import Comic from './components/Comic/Comic.js'

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
      },
      publishersLogo: {
        'Image Comics': {
          link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Image_Comics_logo.svg/452px-Image_Comics_logo.svg.png',
          class: 'image-comics'
        },
        'Marvel Comics': {
          link:'https://vignette.wikia.nocookie.net/injusticefanon/images/a/a8/Marvel-logo.png/revision/latest/scale-to-width-down/640?cb=20160420173246',
          class: 'marvel-comics'
        },
        'Dc Comics': {
          link: 'https://www.seeklogo.net/wp-content/uploads/2013/02/new-dc-comics-vector-logo.png',
          class: 'dc-comics'
        },
        'Dark Horse Comics': {
          link: 'https://vignette.wikia.nocookie.net/prototype/images/0/02/Dark_Horse_Comics_logo.png/revision/latest?cb=20120208134542',
          class: 'darkhorse-comics'
        },
        'Vertigo Comics': {
          link: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Vertigo-Comics-Logo.svg',
          class: 'vertigo-comics'
        }
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
    .then(response => {
      console.log('Success:', response.status)
      this.getAllComics();
    });

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
          <h1>COMICBASE</h1>
          <form>
            <label htmlFor="">Comic Name</label>
            <input id="name" type="text" placeholder="Watchmen, Y: The Last Man..." value={this.state.form.name} onChange={this.handleChange}/>
            <label htmlFor="">Writer</label>
            <input id="writer" type="text" placeholder="Brian Michael Bendis" value={this.state.form.writer} onChange={this.handleChange}/>
            <label htmlFor="">Artist</label>
            <input id="artist" type="text" placeholder="Gabriel Ba" value={this.state.form.artist} onChange={this.handleChange}/>
            <label htmlFor="">Publisher</label>
            <input id="publisher" type="text" placeholder="Marvel" value={this.state.form.publisher} onChange={this.handleChange}/>
            <label htmlFor="">Volume</label>
            <input id="volume" type="text" placeholder="1, 2, 3" value={this.state.form.volume} onChange={this.handleChange}/>
            <label htmlFor="">Cover Link</label>
            <input id="cover" type="text" placeholder="" value={this.state.form.cover} onChange={this.handleChange}/>
            <button type="button" onClick={() => this.createNewComic()}>SEND</button>
          </form>
        </div>
        <div className={this.state.comicList.length ? 'comicList' : 'show-comics'}>
          {this.state.comicList.length ? 
            this.state.comicList.map(comic => {
              return (
                <Comic key={comic._id} 
                       name={comic.name} 
                       writer={comic.writer} 
                       artist={comic.artist} 
                       volume={comic.volume} 
                       cover={comic.cover} 
                       logo={this.state.publishersLogo[comic.publisher]}/>
              )
            }) : 
            <div className="show-comics">
              <button onClick={() => this.getAllComics()}>SHOW COMICS</button>
              <h1>(:</h1> 
            </div> }
          {/* <pre>
            {JSON.stringify(this.state.form, null, 2)}
          </pre> */}
        </div>
      </div>
    );
  }
}

export default App;
