import React from 'react';
import $ from 'jquery';
import Slider from 'react-slick';


var PictureList = React.createClass({

    getInitialState: function(){

        // Pictures array will be populated via AJAX

        return { pictures: [] };
    },

    componentDidMount: function(){

        var self = this;

        // API endpoint for Instagram's images

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
            <p>Please click here to log into your Instagram Account</p>
            </a>
            </div>
            );
        }

        var settings = {
        	dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
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
