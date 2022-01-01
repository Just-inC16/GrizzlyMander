// Directory path to locally stored GeoJSON files
const dirPathToGeoJSON = "./static/assets/GeoJSON";

// Fetch API header to specify JSON input
const jsonHeader = {
    headers: {
        Accept: "application/json",
        "Content-Type": "text/plain",
    },
};

const ServerConn = {
    // Sets the selected state
    async setState(stateName) {
        const res = await fetch(
            `${dirPathToGeoJSON}/${stateName}/state.json`,
            jsonHeader
        );
        return res;
    },

    // Returns GeoJSON for the state boundaries of the specified state
    async getStateBoundaries(stateName) {
        const res = await fetch(
            `${dirPathToGeoJSON}/${stateName}/state.json`,
            jsonHeader
        );
        return res.json();
    },
    // Returns GeoJSON for the congressional districting boundaries of the specified state
    async getDistrictBoundaries(stateName) {
        const res = await fetch(
            `${dirPathToGeoJSON}/${stateName}/districts.json`,
            jsonHeader
        );
        return res.json();
    },
    // Returns GeoJSON for the county boundaries of the specified state
    async getCountyBoundaries(stateName) {
        const res = await fetch(
            `${dirPathToGeoJSON}/${stateName}/counties.json`,
            jsonHeader
        );
        return res.json();
    },
    // Returns GeoJSON for the precinct boundaries of the specified state
    async getPrecinctBoundaries(stateName) {
        const res = await fetch(
            `${dirPathToGeoJSON}/${stateName}/precincts.json`,
            jsonHeader
        );
        return res.json();
    },
    //Return the districting summary
    async getDistrictSummary(districtingType) {
        const res = await fetch(
            `${dirPathToGeoJSON}/districtingSummary?districtingType=${districtingType}`,
            jsonHeader
        );
        return res.json();
    },
    //Run the Algorithm
    async runAlgorithm(popEqCur, popEqTar, numMajMinDisCur, numMajMinDisTar) {
        const res = await fetch(
            `${dirPathToGeoJSON}/runAlgorithm?popEqCur=${popEqCur}&popEqTar=${popEqTar}&numMajMinDisCur=${numMajMinDisCur}&numMajMinDisTar=${numMajMinDisTar}`,
            jsonHeader
        );
        return res.json();
    },
    //Stop the Algorithm
    async stopAlgorithm() {
        const res = await fetch(
            `${dirPathToGeoJSON}/stopAlgorithm`,
            jsonHeader
        );
        return res.json();
    },
};

export default ServerConn;
