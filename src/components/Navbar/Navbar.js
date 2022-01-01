// Importing local resources
import "../../css/Navbar.css";
import AlabamaGeoJSON from "../../static/JSON/districts.json";

const Navbar = ({
    stateFocused,
    setStateFocused,
    showPrecinctBoarder,
    setShowPrecinctBoarder,
    showCountyBoarder,
    setShowCountyBoarder,
    displayedDistrictingType,
}) => {
    var obj = AlabamaGeoJSON;
    var JSONdata =
        "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

    const clickedPrecinct = () => {
        console.log("Show Precint" + !showPrecinctBoarder);
        setShowPrecinctBoarder(!showPrecinctBoarder);
    };

    const clickedCounty = () => {
        console.log("Show County" + !showCountyBoarder);
        setShowCountyBoarder(!showCountyBoarder);
    };

    return (
        <div className="Navbar">
            <div className="TitleLi">
                <button className="Title">GrizzlyMander</button>
            </div>
            {stateFocused !== "US" && (
                <div>
                    <div className="viewBorder">
                        View Borders: Precinct
                        <input
                            type="checkbox"
                            defaultChecked={showPrecinctBoarder}
                            onClick={clickedPrecinct}
                            checked={showPrecinctBoarder}
                        ></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;County
                        <input
                            type="checkbox"
                            defaultChecked={showCountyBoarder}
                            onClick={clickedCounty}
                            checked={showCountyBoarder}
                        ></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <a
                        className="export"
                        href={"data: " + JSONdata}
                        download={stateFocused + ".json"}
                    >
                        Download GeoJSON
                    </a>
                </div>
            )}

            <div className="dropdown">
                <button className="Statebtn">
                    {stateFocused === "US" ? "Select a State" : stateFocused}
                </button>
                <div className="dropdown-content">
                    <div onClick={() => setStateFocused("Alabama")}>
                        Alabama
                    </div>
                    <div onClick={() => setStateFocused("Louisiana")}>
                        Louisiana
                    </div>
                    <div onClick={() => setStateFocused("Utah")}>Utah</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
