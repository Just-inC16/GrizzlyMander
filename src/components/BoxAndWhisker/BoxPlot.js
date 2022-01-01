// Importing external modules
import Plot from "react-plotly.js";

// Importing local resources
import StateData from "../../static/JSON/StateData.json";

const BoxPlot = ({
    stateFocused,
    selectedInteresting,
    basisType,
    basisTypeTitle,
}) => {
    console.log(basisType);
    let numberOfDistricts = StateData[stateFocused]["numberOfDistrict"];

    /*** 1] Creating the Box Plot for each districts ***/
    let data = [];
    let boxPlotData = StateData[stateFocused]["boxPlot"][basisType];
    for (let i = 0; i < numberOfDistricts; i++) {
        data[i] = {
            y: boxPlotData[i],
            name: i + 1,
            type: "box",
            showlegend: false,
            line: { color: "rgb(151, 192, 255)" },
        };
    }

    /*** 2] Retreive the information for <Enacted | Selected | Modified>***/
    let plotDataColor = [
        "rgb(109, 146, 255)",
        "rgb(255, 109, 148)",
        "rgb(255, 214, 0)",
    ];
    let plotDataNames = ["enacted", "selected", "modified"];

    let counter = [];
    for (let j = 0; j < numberOfDistricts; j++) {
        counter[j] = j + 1;
    }
    // a) Enacted scatter plot
    let enactedScatter =
        StateData[stateFocused]["enactedDistricting"]["plot"][basisType];
    data.push({
        x: counter,
        y: enactedScatter.sort(),
        type: "scatter",
        name: plotDataNames[0],
        mode: "markers",
        marker: { color: plotDataColor[0], size: 13 },
    });

    // b) selected scatter plot
    let selectedScatter =
        StateData[stateFocused][selectedInteresting]["plot"][basisType];
    data.push({
        x: counter,
        y: selectedScatter.sort(),
        type: "scatter",
        name: plotDataNames[1],
        mode: "markers",
        marker: { color: plotDataColor[1], size: 13 },
    });

    // c) modified scatter plot
    let modifiedScatter =
        StateData[stateFocused]["modified"]["plot"][basisType];
    data.push({
        x: counter,
        y: modifiedScatter.sort(),
        type: "scatter",
        name: plotDataNames[2],
        mode: "markers",
        marker: { color: plotDataColor[2], size: 13 },
    });

    let layout = {
        title: "Box Plot of Average Districting of " + basisTypeTitle,
        yaxis: {
            title: "percentage",
            autorange: true,
            showgrid: true,
            zeroline: true,
            gridcolor: "rgb(194, 194, 194)",
            zerolinecolor: "rgb(0, 0, 0)",
        },
        xaxis: {
            title: "Indexed Districts",
            zerolinecolor: "rgb(0, 0, 0)",
            autotick: false,
            gridcolor: "rgb(227, 227, 227)",
            showgrid: true,
        },
        paper_bgcolor: "rgb(243, 243, 243)",
        plot_bgcolor: "rgb(243, 243, 243)",
    };

    return (
        <Plot
            style={{ width: "100%", height: "100%" }}
            data={data}
            layout={layout}
        />
    );
};

export default BoxPlot;
