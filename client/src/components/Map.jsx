import { from } from 'form-data';
import React, { Component } from 'react';
import './Dashboard'


class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            drugstores: [],
        };
    }
    componentDidMount() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 49.260605, lng: -123.245994 },
            zoom: 10,
        });

        fetch('http://localhost:1002')
            .then(res => res.json())
            .then(data => {
                const infowindow = new window.google.maps.InfoWindow();

                const markers = data.map(result => {
                    const contentString = `<div>
                <h3>${result.name}</h3>
                <p1 >${result.vicinity}</p1>
                <a href="https://www.google.com/maps/search/?api=1&query=${result.vicinity}" target="_blank" rel="noopener noreferrer"> <br> View on Google Maps</a>
              </div>`;
                    const marker = new window.google.maps.Marker({
                        position: {
                            lat: result.geometry.location.lat,
                            lng: result.geometry.location.lng,
                        },
                        map,
                        title: result.name,
                    });
                    marker.addListener('click', () => {
                        infowindow.setContent(contentString);
                        infowindow.open(map, marker);
                    });
                    return marker;
                });

                this.setState({ markers });
                console.log(markers)
            })
            .catch(err => console.error(err));
    }

    render() {
        const { drugstores } = this.state;

        return (
            <div className="box11"

                style={{
                    // position:'absolute',
                    width: '100%',
                    height: '300px',
                    // left: '10%',
                    // rightMargin: '330.69px',
                    borderRight: '20%',

                    top: '132.35px',
                    background: '2px',

                }}
            >
                <div id="map" style={{ height: '100%', width: '100%' }} />
            </div>
        );
    }
}

export default Map;
