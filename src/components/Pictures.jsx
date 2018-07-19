import React, { Component } from 'react';



class Pictures  extends Component{
    constructor(props){
        super(props);


}//constructor

    


    render(){
        return(
        
        <figure className="mx-auto" data-width= "220">
       <img src={this.props.userImageURL} />
        </figure>
        )
        
    }//render




}//component
export default Pictures;