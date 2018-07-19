import React, { Component } from 'react';



class HikingSpot extends Component{
    constructor(props){
        super(props);


}//constructor
    


render(){
    return(
    
    <div id='home' className='tab-pane fade in active'>
    <div className='col-sm-4'>
    <h2>{this.props.name}</h2>
    <p className='a'>{this.props.hike.directions}</p>
    <a target ='_blank' href={'https://maps.google.com/?q='+this.props.location[0] + ','+
    this.props.location[1]}>
    <button type='button' className='btn btn-primary pull-right'>Google Map</button>
    </a>
    </div>

    <div className='col-sm-8 align-right'>
    <h1> SOME IMAGE HERE </h1>
    </div>

    </div>
    )
    }//render
}//component
export default HikingSpot;