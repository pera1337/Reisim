import React from "react";
import "ol/ol.css";
import { Map, View, Feature } from "ol";
import Point from "ol/geom/Point";
import { Style, Text, Circle, Fill, Stroke } from "ol/style";
import VectorSource from "ol/source/Vector";
import { Tile, Vector } from "ol/layer.js";
import Overlay from "ol/Overlay.js";
import { toLonLat, fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
// import axios from "axios";
import axios from "../utils/axiosProxy";
import "../css/GuideMap.css";

class GuideMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      removedNums: []
    };
    this.num = 0;
    this.locationNumber = 0;
    this.addMarker.bind(this);
    this.handleMapClick.bind(this);
  }

  addMarker(point, name = "") {
    let argNum;
    if (this.state.removedNums.length === 0) {
      this.num++;
      argNum = this.num;
    } else {
      let stateCpy = [...this.state.removedNums];
      argNum = stateCpy.pop();
      this.setState({ removedNums: stateCpy });
    }
    this.locationNumber = argNum;
    var clickedPointGeom = new Point(fromLonLat(point));
    var marker = new Feature({
      geometry: clickedPointGeom,
      name
    });

    let image = new Circle({
      fill: new Fill({
        color: "rgba(255,255,255,0.4)"
      }),
      stroke: new Stroke({
        color: "#3399CC",
        width: 1.25
      }),
      radius: 10
    });

    var iconStyle = new Style({
      image: image,
      text: new Text({
        text: `${argNum}`
      })
    });

    marker.setStyle(iconStyle);

    var vectorSource = new VectorSource({
      features: [marker]
    });
    var markerVectorLayer = new Vector({
      source: vectorSource
    });
    this.state.map.addLayer(markerVectorLayer);
  }

  async componentDidMount() {
    var featuresLayer = new Vector({
      source: new VectorSource({
        features: []
      })
    });
    let container;
    let content;
    let closer;
    let overlay;
    let map;
    if (this.props.input === "false") {
      container = document.getElementById("popup");
      content = document.getElementById("popup-content");
      closer = document.getElementById("popup-closer");
      overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });
      closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };
      map = new Map({
        target: this.refs.mapContainer,
        layers: [
          new Tile({
            source: new OSM()
          }),
          featuresLayer
        ],
        overlays: [overlay],
        view: new View({
          center: [0, 0],
          zoom: 2
        })
      });
    } else {
      map = new Map({
        target: this.refs.mapContainer,
        layers: [
          new Tile({
            source: new OSM()
          }),
          featuresLayer
        ],
        view: new View({
          center: [0, 0],
          zoom: 2
        })
      });
    }

    var that = this;
    if (this.props.edit === "true" || this.props.input === "true") {
      map.on("click", function(event) {
        let m = map.forEachFeatureAtPixel(
          event.pixel,
          (feature, layer) => {
            const featureCoords = toLonLat(
              feature.getGeometry().flatCoordinates
            );
            that.props.removePoint({
              lng: featureCoords[0],
              lat: featureCoords[1]
            });
            let style = feature.getStyle();
            let text = style.getText();
            that.setState({
              removedNums: [...that.state.removedNums, Number(text.text_)]
            });
            map.removeLayer(layer);
            layer.dispose();
            return true;
          },
          { hitTolerance: 6 }
        );
        if (!m) {
          that.handleMapClick(event);
        }
      });
    } else {
      map.on("click", function(event) {
        let m = map.forEachFeatureAtPixel(
          event.pixel,
          (feature, layer) => {
            if (feature.get("name")) {
              var coordinate = event.coordinate;
              content.innerHTML = feature.get("name");
              overlay.setPosition(coordinate);
            }
            return true;
          },
          { hitTolerance: 6 }
        );
      });
    }
    map.on("pointermove", function(evt) {
      map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel, {
        hitTolerance: 6
      })
        ? "pointer"
        : "";
    });
    this.setState({
      map: map
    });
    if (this.props.edit === "true" || this.props.input === "false") {
      const response = await axios.get(`/api/guide/${this.props.id}`);
      response.data.Locations.forEach(point => {
        const markerPoint = [];
        markerPoint.push(Number(point.lng));
        markerPoint.push(Number(point.lat));
        let name = "";
        if (point.name) name = point.name;
        this.addMarker(markerPoint, name);
      });
    }
  }

  componentWillReceiveProps(nextprops) {
    let place = [];
    if (this.props.place !== nextprops.place) {
      place.push(nextprops.place.lng);
      place.push(nextprops.place.lat);
      this.addMarker(place);
      place.push(this.locationNumber - 1);
      this.props.addPoint({
        lat: nextprops.place.lat,
        lng: nextprops.place.lng,
        locationNumber: this.locationNumber - 1,
        name: nextprops.place.name
      });
    }
  }

  handleMapClick(event) {
    var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);

    const point = toLonLat(clickedCoordinate);
    this.addMarker(point);
    point.push(this.locationNumber - 1);
    this.props.addPoint({
      lat: point[1],
      lng: point[0],
      locationNumber: this.locationNumber - 1
    });
  }
  render() {
    return (
      <div>
        <div ref="mapContainer" id="map" />
        {this.props.input === "false" ? (
          <div id="popup" className="ol-popup">
            <a href="#" id="popup-closer" className="ol-popup-closer" />
            <div id="popup-content" />
          </div>
        ) : null}
      </div>
    );
  }
}

export default GuideMap;
