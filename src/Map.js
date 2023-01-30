import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'

class Map extends React.Component {



  updateMap = (lon, lat) => {

    // zoom in more after location is found.
    let zoom = lon !== 0 ? 12 : 1;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: [lon, lat],
      zoom
    });

    new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
  }

  componentDidMount() {
    this.updateMap(0, 0);
  }

  render() {

    // update if only 1 result
    this.props.results.length === 1 && this.updateMap(this.props?.results[0]?.lon, this.props?.results[0]?.lat);

    return <div id="map" style={ !this.props.show ? { visibility: 'hidden' } : {} }></div>;
  }
}

export default Map;