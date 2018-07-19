import React, { Component } from 'react';
import axios from 'axios';
import HikingSpot from './hikingspot';


class App extends Component {
constructor(props){
  super(props);

  this.state = {
    items: [],
    isLoaded: false,
  }


  }
  
  componentWillMount(){
    // var url = 'https://origin-top-spots-api.herokuapp.com/api/topspots'
    // fetch(url)
    var url = 'https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=hiking&q[city_cont]=San+Diego&q[country_cont]=United+State&q[state_cont]=California';
    fetch(url,{
      headers: {
      'X-Mashape-Key': '8sA8nYa7yZmshokUG4ilCILw0rhcp1XsmV7jsn7RzaD9uSiTtw'
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        isLoaded: true,
        items: json,
      })
    });

  
  } // componentWillMount
 

 

  render() {
    var {isLoaded, items } = this.state;

    if(!isLoaded){
      return <div>Loading...</div>
    }
    else {

    return (
      <div className='App'>

      <ul>
        {items.map(item => (
          <li key={item.id}>
          Name:{item.name}
          </li>
          ))}
        </ul>
      </div>
     
    )
  }
  }
}

export default App;