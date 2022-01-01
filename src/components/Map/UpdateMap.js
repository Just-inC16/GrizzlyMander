// Importing external modules
import L from "leaflet";
import { useMap } from "react-leaflet";

// Importing local resources
import StateDisplayData from "../../static/JSON/StateDisplayData.json";
import ServerConn from "../../services";

const UpdateMap = ({
    stateFocused,
    setStateFocused,
    showPrecinctBoarder,
    showCountyBoarder,
    displayedDistrictingType,
    selectedInteresting,
}) => {
    // Initializes center, bounds, zoom level, and min zoom level of the map
    const initializeMapDisplay = (mapRef) => {
        let stateDisplayData = StateDisplayData[stateFocused];
        if (stateFocused === "N/A") {
            stateDisplayData = StateDisplayData["US"];
        }
        // Setting the general viewing options for the map
        mapRef.setView(stateDisplayData["center"], stateDisplayData["zoom"]);
        mapRef.setMaxBounds(stateDisplayData["bounds"]);
        mapRef.setZoom(stateDisplayData["zoom"]);
        mapRef.setMinZoom(stateDisplayData["zoom"]);
    };

    // Waits for all promises to fulfill and adds a GeoJSON layer for each file with the specified properties
    const loadGeoJSONLayers = (jsonPromises, layerGroup, layerProps) => {
        // Waiting for all GeoJSON files to load
        Promise.all(jsonPromises)
            .then((result) => {
                result.forEach((json_text) => {
                    // Creating a GeoJSON layer for each GeoJSON file
                    let geoJSONlayer = L.geoJSON(json_text, layerProps);
                    // Adding GeoJSON layer to layer group
                    layerGroup.addLayer(geoJSONlayer);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Binding event handlers for GeoJSON components of state boundaries
    const onStateEvent = (feature, layer) => {
        let stateName = layer.feature.properties.name;
        let stateData = {};
        switch (stateName) {
            case "Alabama":
                stateData = {
                    name: "Alabama",
                    capital: "Montgomery",
                    population: "4,903,257",
                    governor: "Kay Ivey (R)",
                    senators: ["Richard Shelby (R)", "Tommy Tuberville (R)"],
                    numDistricts: 7,
                };
                break;
            case "Louisiana":
                stateData = {
                    name: "Louisiana",
                    capital: "Baton Rouge",
                    population: "4,657,757",
                    governor: "John Bel Edwards (D)",
                    senators: ["Bill Cassidy (R)", "John Neely Kennedy (R)"],
                    numDistricts: 6,
                };
                break;
            case "Utah":
                stateData = {
                    name: "Utah",
                    capital: "Salt Lake City",
                    population: "3,271,616",
                    governor: "Spencer Cox (R)",
                    senators: ["Mike Lee (R)", "Mitt Romney (R)"],
                    numDistricts: 7,
                };
                break;
            default:
                stateData = {
                    name: "Alabama",
                    capital: "Montgomery",
                    population: "5,030,053",
                    governor: "Kay Ivey (R)",
                    senators: ["Richard Shelby (R)", "Tommy Tuberville (R)"],
                    numDistricts: 4,
                };
        }

        layer.bindTooltip(
            `
        <div>
            State: ${stateData["name"]} <br/>
            Capital: ${stateData["capital"]} <br/>
            Population: ${stateData["population"]} <br/>
            Governor: ${stateData["governor"]} <br/>
            Senators:
            <ul>
                <li>${stateData["senators"][0]} </li>
                <li>${stateData["senators"][1]} </li>
            </ul>                              
            Number of Congressional Districts: ${stateData["numDistricts"]} <br/>
        </div>`,
            {
                permanent: false,
            }
        );
        layer.on({
            click: onStateClick,
        });
    };

    // On click event handler for GeoJSON components of state boundaries
    const onStateClick = (e) => {
        // Extracting data about the state from the event object
        let layer = e.target;
        let stateName = layer.feature.properties.name;
        // Focusing map on selected state
        setStateFocused(stateName);
    };

    // Displays state boundaries for all 3 states on map of US
    const showStateBoundaries = (layerGroup) => {
        loadGeoJSONLayers(
            // Retrieving Promises for the GeoJSON for all 3 states' boundaries
            [
                ServerConn.getStateBoundaries("Alabama"),
                ServerConn.getStateBoundaries("Louisiana"),
                ServerConn.getStateBoundaries("Utah"),
            ],
            // The layer group in which the GeoJSON layers are to be added
            layerGroup,
            // Binding and defining the onClick event handler for each state
            {
                onEachFeature: onStateEvent,
            }
        );
    };

    // Getting a color for any particular district of any of the three states
    const getDistrictColor = (stateId, districtId) => {
        let colorVal = 0;

        if (stateId === "01") {
            colorVal = parseInt(districtId) / 7;
        } else if (stateId === "22") {
            colorVal = parseInt(districtId) / 6;
        } else if (stateId === "49") {
            colorVal = parseInt(districtId) / 4;
        }

        return colorVal <= 1 && colorVal > 0.9
            ? "#B3B6FF"
            : colorVal <= 0.9 && colorVal > 0.8
            ? "#752964"
            : colorVal <= 0.8 && colorVal > 0.7
            ? "#5156E8"
            : colorVal <= 0.7 && colorVal > 0.6
            ? "#F266B1"
            : colorVal <= 0.6 && colorVal > 0.5
            ? "#F78E71"
            : colorVal <= 0.5 && colorVal > 0.4
            ? "#FAF67D"
            : colorVal <= 0.4 && colorVal > 0.3
            ? "#AAFD8A"
            : colorVal <= 0.3 && colorVal > 0.2
            ? "#97FFC8"
            : colorVal <= 0.2 && colorVal > 0.1
            ? "#A5EDFF"
            : "#B3B6FF";
    };

    // Styling of GeoJSON layers for a districting
    const getDistrictStyle = (feature) => {
        return {
            color: "black",
            fillColor: getDistrictColor(
                feature.properties.STATEFP20,
                feature.properties.CD116FP
            ),
            opacity: 1,
            weight: 1.5,
        };
    };

    // Displays district boundaries for a specific state
    const showDistrictBoundaries = (layerGroup) => {
        var focusedDistrict = displayedDistrictingType;
        if (displayedDistrictingType === "interesting") {
            focusedDistrict = selectedInteresting;
        }
        console.log("Showing Map of: " + focusedDistrict);
        loadGeoJSONLayers(
            // Retrieving Promise for the GeoJSON for the state's districting boundaries
            [ServerConn.getDistrictBoundaries(stateFocused)],
            // The layer group in which the GeoJSON layer is to be added
            layerGroup,
            // Setting the styling of the GeoJSON layer
            {
                style: getDistrictStyle,
            }
        );
    };

    // Displays county boundaries for a specific state
    const showCountyBoundaries = (layerGroup) => {
        loadGeoJSONLayers(
            // Retrieving Promise for the GeoJSON for the state's county boundaries
            [ServerConn.getCountyBoundaries(stateFocused)],
            // The layer group in which the GeoJSON layer is to be added
            layerGroup,
            // Setting the styling of the GeoJSON layer
            {
                style: {
                    color: "purple",
                    fillColor: "transparent",
                    opacity: 0.5,
                    fillOpcaity: 0.1,
                    weight: 1.2,
                },
            }
        );
    };

    // // Displays precinct boundaries for a specific state
    const showPrecinctBoundaries = (layerGroup) => {
        loadGeoJSONLayers(
            // Retrieving Promise for the GeoJSON for the state's precinct boundaries
            [ServerConn.getPrecinctBoundaries(stateFocused)],
            // The layer group in which the GeoJSON layer is to be added
            layerGroup,
            // Setting the styling of the GeoJSON layer
            {
                style: {
                    fillColor: "transparent",
                    color: "grey",
                    opacity: 1,
                    fillOpcaity: 0,
                    weight: 0.3,
                },
            }
        );
    };

    console.log("I clicked on " + stateFocused);

    // Getting a reference to the Leaflet map object
    const mapRef = useMap();
    // Setting initial map settings
    initializeMapDisplay(mapRef);

    // On first load, layer group is not found so must add temporary layer group to highlight the 3 states
    let GeoJSON_layers_found = false;
    mapRef.eachLayer((layer) => {
        // Making sure that the layer is not undefined
        if (layer) {
            // Extracting ID of layer
            let layerId = layer.options.id;
            /*
             * Making sure that the layer ID is not undefined
             * The layer group with id GeoJSON_layers is the parent container of all GeoJSON layers
             */
            if (layerId && layerId === "GeoJSON_layers") {
                GeoJSON_layers_found = true;

                // Clearing all existing GeoJSON layers
                layer.clearLayers();

                // If not focused on a state, then show state boundaries for all 3 states
                if (stateFocused === "US") {
                    showStateBoundaries(layer);
                } else {
                    if (showPrecinctBoarder) {
                        showPrecinctBoundaries(layer);
                    }
                    if (showCountyBoarder) {
                        showCountyBoundaries(layer);
                    }
                    showDistrictBoundaries(layer);
                }
            } else if (layerId && layerId === "temp_GeoJSON_layers") {
                // Deleting the temporary layer group
                mapRef.removeLayer(layer);
            }
        }
    });

    // If this is the first time the page is loaded then create a temporary layer group with GeoJSON for state boundaries
    if (!GeoJSON_layers_found) {
        let layerGroup = L.layerGroup().addTo(mapRef);
        layerGroup.options.id = "temp_GeoJSON_layers";
        showStateBoundaries(layerGroup);
    }

    return null;
};

export default UpdateMap;
