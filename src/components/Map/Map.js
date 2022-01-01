// Importing external modules
import { MapContainer, TileLayer, LayerGroup } from "react-leaflet";
import { memo } from "react";

// Importing local resources
import UpdateMap from "./UpdateMap";
import "../../css/Map.css";

const Map = memo((props) => {
    const {
        stateFocused,
        setStateFocused,
        showPrecinctBoarder,
        showCountyBoarder,
        displayedDistrictingType,
        selectedInteresting,
    } = props;
    return (
        <div className="Map">
            <MapContainer scrollWheelZoom={true}>
                {/* The actual map being displayed */}
                <TileLayer
                    id="baseMap"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Sub-component to access the MapContainer object and assign properties */}
                <UpdateMap
                    stateFocused={stateFocused}
                    setStateFocused={setStateFocused}
                    showPrecinctBoarder={showPrecinctBoarder}
                    showCountyBoarder={showCountyBoarder}
                    displayedDistrictingType={displayedDistrictingType}
                    selectedInteresting={selectedInteresting}
                />

                {/* Where all GeoJSON layers will be loaded */}
                <LayerGroup id="GeoJSON_layers" />
            </MapContainer>
        </div>
    );
});

export default Map;
