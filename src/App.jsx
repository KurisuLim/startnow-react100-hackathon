import React, { Component } from 'react';
import axios from 'axios';
import HikingSpot from './components/HikingSpot';
import Pictures from './components/Pictures';


class App extends Component {
constructor(props){
  super(props);

  this.state = {
    selected: '',
    selectedHike: null,
    hikes: null,
    isLoaded: false,
    img: null
  }

    this.selectOnChange = this.selectOnChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getPictures = this.getPictures.bind(this);
  }
  
  componentWillMount(){
    var url = 'https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=hiking&q[city_cont]=San+Diego&q[country_cont]=United+State&q[state_cont]=California';
    axios.get(url,{
      headers: {
      'X-Mashape-Key': '8sA8nYa7yZmshokUG4ilCILw0rhcp1XsmV7jsn7RzaD9uSiTtw'
      }
    })

    .then((response) => {
        var hikeData = [];

        response.data.places.forEach((place) =>{
          const hikeInfo = {
          id: place.unique_id,
          name: place.name,
          directions: place.directions,
          lat: place.lat,
          lon: place.lon,
          city: place.city,
          state: place.state,
        }

        hikeData.push(hikeInfo);
    });
    this.setState({
    hikes: hikeData
  });

});

  
  } // componentWillMount
 

  /* Method or Function Here */
  selectOnChange(event){
    this.setState({selected: event.currentTarget.value});
  }

  handleClick(event){
    event.preventDefault();
    const hike = this.state.hikes.find((hike) => hike.id === parseInt(this.state.selected));
    this.setState({
      selectedHike: hike,
      isLoaded: true,
    });
   this.getPictures();
 

  }

  getPictures(event){
    // const api_key = 'dc6zaTOxFJmzC';
    // const url = `http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}`;
    var url = 'https://pixabay.com/api/?key=9596245-871decf9c53fe06db271a0eb8&q=hiking+trails&image_type=photo';
  //  var api_key = '9596245-871decf9c53fe06db271a0eb8';
    axios.get(url)
  .then((response) =>{
   var imageData = [];
    console.log("test",response)
    response.data.hits.forEach((hits) =>{
      const picData = {
        id: hits.id,
        webformatHeight: hits.webformatHeight,
        webformatWidth: hits.webformatWidth,
        type: hits.type,
        userImageURL: hits.userImageURL

      }
      
      imageData.push(picData);
    });
    this.setState({
      img: imageData[0].userImageURL
    });
  
  });

  }
  /* Style the tab */

  render() {
  console.log(this.state.img)
    return (
      <div className='App'>
          <div className='page-header'>
            <h1 name='title'  id='title' htmlFor='description' className='text-center'> Greater San Diego's Hiking Trails</h1>
              <h6 name='description'className='text-center'>An App for Hiking Trails in Greater San Diego.</h6>
              {/* page-header */}
              </div>
                {/* Search Input & tabbed menu*/}
                <nav className='navbar navbar-inverse'>
                  <div className='container-fluid'>
                    <ul className='nav navbar-nav'>
                      <li className='active'><a data-toggle='tab' href='#home'>Home</a></li>
                      
                    </ul>

                    {/* This is for the Search Bar */}
                    <form className='navbar-form navbar-right' >
                      <div className='input-group'>
                        <select className='form-control' onChange={this.selectOnChange} >
                        <option value = {''}>Select Hiking Location</option>
                        {
                          this.state.hikes &&
                          this.state.hikes.map((hike) => {
                          return <option value={hike.id} key={hike.id}>{ hike.name }</option>
                           })

                        }
                        </select>
                          <div className='input-group-btn'>
                            <button className='btn btn-default' type='submit' onClick={this.handleClick}>
                              <i className='glyphicon glyphicon-search'></i>
                              </button>
                            </div>
                        </div>
                      </form>
                    {/* container-fluid */}
                    </div>
                  {/* navigation tab */}
                  </nav>
        <div className='container'>
          <div className='panel panel-default'>
          <div className='panel-body'>
          <div className='row'>
        <div className='tab-content'>
        <div id='home' className='tab-pane fade in active'>   
          
         {/* <pre> */}
            { 
              this.state.selectedHike &&
              <HikingSpot
                isLoaded = {this.state.isLoaded}
                key={this.state.selectedHike.id}
                name={this.state.selectedHike.name}
                hike={this.state.selectedHike}
                description={this.state.selectedHike.description}
                location={[this.state.selectedHike.lat, this.state.selectedHike.lon]}
              />
            }
        {/* </pre> */}
          
         < div >
        { this.state.img &&
          <Pictures 
            userImageURL = {this.state.img}
            />
        }
          </div>
  
        {/* home here */}
        </div>
        </div>

          {/* tab-content */}
          </div>
              </div>
            </div>
          </div> 
      {/* div for App below */}
      </div>
    );

  }
}

export default App;