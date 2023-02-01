import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'

class Map extends React.Component {

  updateMap = (lon = 0, lat = 0) => {

    // zoom in more after location is found.
    let zoom = lon !== 0 ? 12 : 1;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: [lon, lat],
      zoom
    });

    new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);

    // update sat with this map, so I can only invoke function if the lat and lon have changed.
  }

  componentDidMount() {
  // default map setting on mount
    this.updateMap(0, 0);
  }

  componentDidUpdate(prevProps){
    // THE ONLY TIME YOU WANT TO CALL THE API IS WHEN THERE IS A CITY UPDATE!!!
    this.props.callAPIs && !prevProps.callAPIs && this.updateMap(this.props?.results[0]?.lon, this.props?.results[0]?.lat);
  }

  render() {
    return <div id="map" style={ !this.props.show ? { visibility: 'hidden' } : {} }></div>;
  }
}

export default Map;