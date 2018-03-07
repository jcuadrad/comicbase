import React, { Component } from 'react';
import Select from 'react-select';

import 'react-select/dist/react-select.css';
import './App.css';

import Comic from './components/Comic/Comic.js';

const dotenv = require('dotenv');

dotenv.config();

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      comicList: [],
      form: {
        name: '',
        writer: '',
        artist: '',
        publisher: 'Marvel Comics',
        volume: {
          volumeNumber: 0,
          volumeName: ''
        },
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
    fetch(process.env.REACT_APP_SERVER_URI + '/comics')
      .then(data => {
        return data.json()
      })
      .then(info => {
        this.setState({comicList: info});
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleChange = (event) => {
    if (event.target.id === 'volumeNumber' || event.target.id === 'volumeName') {
      this.setState({
        form: {
          ...this.state.form,
          volume: {
            ...this.state.form.volume,
            [event.target.id]: event.target.value
          }
        }
      })
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [event.target.id]: event.target.value
        }
      });
    }
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ 
      form: {
        ...this.state.form,
        publisher: selectedOption.value 
      }
    });
  }

  createNewComic = () => {
    fetch(process.env.REACT_APP_SERVER_URI + '/comics', {
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
        publisher: 'Marvel Comics',
        volume: {
          volumeNumber: 0,
          volumeName: ''
        },
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
            <Select
              className="publisher-select"
              id="publisher"
              name="publisher"
              value={this.state.form.publisher}
              onChange={this.handleSelectChange}
              clearable={false}
              options={[
                { value: 'Marvel Comics', label: 'Marvel Comics', className: 'option' },
                { value: 'DC Comics', label: 'DC Comics', className: 'option' },
                { value: 'Image Comics', label: 'Image Comics', className: 'option' },
                { value: 'Dark Horse Comics', label: 'Dark Horse Comics', className: 'option' },
                { value: 'Vertigo Comics', label: 'Vertigo Comics', className: 'option' },
              ]}
            />
            {/* <input id="publisher" type="text" placeholder="Marvel" value={this.state.form.publisher} onChange={this.handleChange}/> */}
            {this.state.form.volume.volumeNumber == 0 || this.state.form.volume.volumeNumber == null ? (
              <div className="volumes"> 
                <label htmlFor="">Volume</label>
                <input id="volumeNumber" type="number" placeholder="1, 2, 3" value={this.state.form.volume.volumeNumber} onChange={this.handleChange}/>
              </div>
            ) : (
              <div className="volumes-with-name">
                <div className="volume-number">
                  <label htmlFor="">Volume</label>
                  <input className="number-fit" id="volumeNumber" type="number" placeholder="1, 2, 3" value={this.state.form.volume.volumeNumber} onChange={this.handleChange}/>
                </div>
                <div className="volume-name">
                  <label htmlFor="">Volume Name</label>
                  <input className="name-fit" id="volumeName" type="text" placeholder="1, 2, 3" value={this.state.form.volume.volumeName} onChange={this.handleChange}/>
                </div>
               </div>
            )}
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
