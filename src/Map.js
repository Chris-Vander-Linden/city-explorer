import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

class Map extends React.Component {
  constructor (props) {
    super(props);
    this.state = { mapFormHeight: null }
  }

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

    return <>
      {/* display static map 
        {this.state.results.length === 1 && <img src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.state.results[0]?.lat},${this.state.results[0]?.lon}&zoom= 1-18`} alt={this.state.results[0]?.display_name} />}
        */}

      <div id="mapContainer">
        {/* #map needs the ref from #formContainer, so I can dynamically update the height */ }
        <div id="map" style={ { minHeight: `calc(100vh - ${(136 + this.props.mapFormElemHeight)}px)` } }></div>
      </div>
    </>
  }

}

export default Map