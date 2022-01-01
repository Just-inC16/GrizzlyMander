// Importing external modules
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "react-accessible-accordion/dist/fancy-example.css";

// Importing local resources
import "../../css/Sidebar.css";
import RangeSlider from "./RangeSilder";
import SelectDistricting from "./SelectDistricting";
import DistrictingList from "./DistrictingList";
import LoadingModule from "../LoadingScreen/LoadingModule";
import ALGORITHM_STATE from "../../static/JSON/AlgorithmState.json";
import LEFT_TAB_STATE from "../../static/JSON/LeftTabState.json";
import ServerConn from "../../services/index";

const ModifyTabs = ({
    stateFocused,
    displayedDistrictingType,
    setDisplayedDistrictingType,
    tabIndex,
    setTabIndex,
    selectedInteresting,
    setSelectedInteresting,
    setShowPrecinctBoarder,
    setShowCountyBoarder,
}) => {
    const [algorithmState, setAlgorithmState] = useState(
        ALGORITHM_STATE.TERMINATED
    ); // For loadingModule
    const [constraintValue, setConstraintValue] = useState({
        PopulationEquality: 4.75,
        MajMin: 4,
    });

    // state for sliders
    const [popEqTar, setPopEqTar] = useState(
        constraintValue["PopulationEquality"]
    );
    const [numMajMinDisTar, setNumMajMinDisTar] = useState(
        constraintValue["MajMin"]
    );

    const startAlgo = (e) => {
        setTabIndex(LEFT_TAB_STATE.COMPARE);
        setAlgorithmState(ALGORITHM_STATE.RUNNING);
        //Tell the server to start running
        console.log("Current Pop Eq:" + constraintValue["PopulationEquality"]);
        console.log("TARGET Pop Eq:" + popEqTar);
        ServerConn.runAlgorithm(
            constraintValue["PopulationEquality"],
            popEqTar,
            constraintValue["MajMin"],
            numMajMinDisTar
        );
        e.preventDefault();
    };
    return (
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            {/* The names of the tabs that can be selected */}
            <TabList>
                <Tab>Select</Tab>
                <Tab>Constraints</Tab>
                <Tab>Compare</Tab>
            </TabList>

            {/* The actual contents of the tabs */}
            <TabPanel>
                <h2 className="tabTitle">Interesting Districtings</h2>
                <DistrictingList
                    stateFocused={stateFocused}
                    setTabIndex={setTabIndex}
                    setDisplayedDistrictingType={setDisplayedDistrictingType}
                    setSelectedInteresting={setSelectedInteresting}
                    setConstraintValue={setConstraintValue}
                    setShowPrecinctBoarder={setShowPrecinctBoarder}
                    setShowCountyBoarder={setShowCountyBoarder}
                />
            </TabPanel>

            <TabPanel>
                <h2 className="tabTitle">Set Constraints</h2>
                <div className="interestingTitle">
                    Choosen: Districting #{selectedInteresting}
                </div>
                <br />
                <RangeSlider
                    title={"Population Equality: (In Percentage)"}
                    min={0}
                    max={constraintValue["PopulationEquality"]}
                    step={0.01}
                    val={constraintValue["PopulationEquality"]}
                    statePerserve={setPopEqTar}
                />
                <RangeSlider
                    title={"Number of Majority-Minority Districts:"}
                    min={0}
                    max={constraintValue["MajMin"]}
                    step={1}
                    val={constraintValue["MajMin"]}
                    statePerserve={setNumMajMinDisTar}
                />
                <button className="btn" onClick={startAlgo}>
                    Start Redistricting
                </button>
            </TabPanel>
            <TabPanel>
                <h2 className="tabTitle">Comparing Districtings</h2>
                <SelectDistricting
                    displayedDistrictingType={displayedDistrictingType}
                    setDisplayedDistrictingType={setDisplayedDistrictingType}
                    setShowPrecinctBoarder={setShowPrecinctBoarder}
                    setShowCountyBoarder={setShowCountyBoarder}
                />
                <br />
                <LoadingModule
                    stateFocused={stateFocused}
                    selectedInteresting={selectedInteresting}
                    algorithmState={algorithmState}
                    setAlgorithmState={setAlgorithmState}
                />
            </TabPanel>
            <br style={{ marginBottom: "100px" }} />
        </Tabs>
    );
};

export default ModifyTabs;
