import React, { Component } from 'react';

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
                const markers = data.map(result => {
                    const marker = new window.google.maps.Marker({
                        position: {
                            lat: result.geometry.location.lat,
                            lng: result.geometry.location.lng,
                        },
                        map,
                        title: result.name,
                    });
                    return marker;
                });

                const drugstores = data.map(result => ({
                    name: result.name,
                    url: `https://www.google.com/maps/search/?api=1&query=${result.vicinity}`,
                }));

                this.setState({ markers, drugstores });
            })
            .catch(err => console.error(err));
    }

    render() {
        const { drugstores } = this.state;

        return (
            <div>
                <div id="map" style={{ height: '100%', width: '100%' }} />

                <ul>
                    {drugstores.map((drugstore, index) => (
                        <li key={index}>
                            <a href={drugstore.url} target="_blank" rel="noopener noreferrer">{drugstore.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Map;
