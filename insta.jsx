import React from 'react';
import $ from 'jquery';
import Slider from 'react-slick';


var PictureList = React.createClass({

    getInitialState: function(){

        // The pictures array will be populated via AJAX, and
        // the favorites one when the user clicks on an image:

        return { pictures: [] };
    },

    componentDidMount: function(){

        // When the component loads, send a jQuery AJAX request

        var self = this;

        // API endpoint for Instagram's popular images for the day

        var url = 'https://api.instagram.com/v1/users/self/media/recent/?'+location.hash.substr(1)+'&callback=?';
        //var url = 'https://api.instagram.com/oauth/authorize/?client_id=3acac8f1ae3849118f4a4534a5e79cf4&redirect_uri=http://localhost:7070&response_type=token';
        $.getJSON(url, function(result){

            if(!result || !result.data || !result.data.length){
                return;
            }

            var pictures = result.data.map(function(p){

                return {
                    id: p.id,
                    url: p.link,
                    src: p.images.low_resolution.url,
                    title: p.caption ? p.caption.text : '',
                    favorite: false
                };

            });

            // Update the component's state. This will trigger a render.
            // Note that this only updates the pictures property, and does
            // not remove the favorites array.

            self.setState({ pictures: pictures });

        });

    },

    render: function() {

        var self = this;

        var pictures = this.state.pictures.map(function(p){
            return <div key={p.id}><img src={p.src} title={p.title} /></div>
        });

        if(!pictures.length){
            return(
            <div>
            <h1> Authentication Required </h1>
            <a href='https://api.instagram.com/oauth/authorize/?client_id=3acac8f1ae3849118f4a4534a5e79cf4&redirect_uri=http://localhost:7070&response_type=token&scope=public_content'>
            <p>Please click here to login</p>
            </a>
            </div>
            );
        }

        var settings = {
        	dots: true
        }

        return (

            <div>

                <div className='container'>
                	<Slider {...settings}>
                  {pictures}
                  </Slider>
                </div>

            </div>

        );
    }
});

export default PictureList;
