import React, {Component} from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import axios from 'axios';

// scenes
import Home from './components/Home';

const baseURL = `${window.location.origin}/api`;
// const baseURL = `http://192.168.1.165:5000/api`;

export default class Main extends Component{
  constructor(props){
    super(props);
    this.state = {

    }

  }

  getStatus = () => {
    axios.get(`${baseURL}/validate/session`).then(response => {
      console.log('response', response)
      if(response.data.status == false){
        window.location = response.data.data.logout_url; 
      }
    });
  }

  componentDidMount = () => {
    console.log('here')
    setInterval(this.getStatus, 60000);
  }

  render(){
    return(
    <HashRouter>
      <Switch>
        <Route exact path="/" name="Home" component={Home} />
      </Switch>
    </HashRouter>
    )
  }
}
