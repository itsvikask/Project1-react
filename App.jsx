import React from 'react';
import Slider from 'react-slick';

var ReactSlickDemo = React.createClass({
  render: function() {
  	var settings = {
    	dots: true
    }
    return (
    	<div className='container'>
      	<Slider {...settings}>
        	<div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
        </Slider>
      </div>
    );
  }
});

export default ReactSlickDemo;
