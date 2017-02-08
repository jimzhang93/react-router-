import React from 'react';
import Songs from '../components/Songs';
import {Link} from 'react-router';
import Albums from './Albums';
import Album from './Album';
import axios from 'axios';

export default class Artist extends React.Component {


  constructor(props){
    super(props)
    this.state={};
  }

  componentDidMount(){
    const artistId = this.props.routeParams.artistId;
    const selectArtist = this.props.selectArtist;

    selectArtist(artistId);
  }
  render() {

    console.log(this.props)
    // console.log(this.props)
    return (
      <div>
        <h3>{this.props.artist.name}</h3>
        <Albums albums={this.props.artist.albums}/>
        <Songs
        songs= {this.props.artist.songs}
        currentSong= {this.props.currentSong}
        isPlaying= {this.props.isPlaying}
        toggleOne = {this.props.toggle}
        />
      </div>
    )
  }
}
