import React from 'react';
import maplibregl from 'maplibre-gl';
import './Map.css';

class Map extends React.Component {

  updateMap = (lon, lat) => {

    let zoom = lon !== 0 ? 8 : 1;

    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: [lon, lat],
      zoom
    });

    new maplibregl.Marker().setLngLat([lon, lat]).addTo(map);
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
        <div id="map"></div>
      </div>
    </>
  }

}

export default Map