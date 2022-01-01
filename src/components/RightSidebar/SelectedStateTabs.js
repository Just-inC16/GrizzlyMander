// Importing external modules
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";
import "react-accessible-accordion/dist/fancy-example.css";

// Importing local resources
import DistrictAccordion from "./DistrictAccordion";
import PieChartCpn from "./PieChartCpn";
import ElectionSelection from "../Election/ElectionSelection";
import SelectPopulation from "./SelectPopulation";
import LEFT_TAB_STATE from "../../static/JSON/LeftTabState.json";
import DISTRICTING_TYPE from "../../static/JSON/DistrictingTypes.json";
import ServerConn from "../../services/index";
import StateData from "../../static/JSON/StateData.json";

const SelectedStateTabs = ({
    openLeftPanel,
    setOpenLeftPanel,
    displayedDistrictingType,
    setDisplayedDistrictingType,
    tabIndex,
    setTabIndex,
    stateFocused,
    selectedInteresting,
    setSelectedInteresting,
}) => {
    const [selectPopulation, setSelectPopulation] = useState("total");
    const districtSummary = ServerConn.getDistrictSummary(
        displayedDistrictingType
    );
    console.log(districtSummary);

    /*Knowing that state information has been retrieved
        We can access specific information based on 
        district selected (displayedDistrictingType) with
        type of population selected (selectPopulation) 
    */

    const getRightSidebarHeader = () => {
        switch (displayedDistrictingType) {
            case DISTRICTING_TYPE.ENACTED:
                return "Currently Enacted Districting";
            case DISTRICTING_TYPE.INTERESTING:
                return "Selected Districting #" + selectedInteresting;
            case DISTRICTING_TYPE.MODIFIED:
                return "Newly Modified Districting";
            default:
                return "Currently Enacted Districting";
        }
    };
    const getRightSidebarHeaderBtnText = () => {
        /*Dynamically decide the header button text*/
        switch (displayedDistrictingType) {
            case DISTRICTING_TYPE.ENACTED:
                return "View Interesting Districting";
            case DISTRICTING_TYPE.INTERESTING:
                return "Set Constraints";
            case DISTRICTING_TYPE.MODIFIED:
                return "Compare Districtings";
            default:
                return "View Interesting Districting";
        }
    };
    const onOpenLeftPanel = () => {
        setOpenLeftPanel(true);
        switch (displayedDistrictingType) {
            case DISTRICTING_TYPE.ENACTED:
                setTabIndex(LEFT_TAB_STATE.SELECT); // View Interesting Districting
                break;
            case DISTRICTING_TYPE.INTERESTING:
                setTabIndex(LEFT_TAB_STATE.CONSTRAINT); // Set Constraints
                break;
            case DISTRICTING_TYPE.MODIFIED:
                setTabIndex(LEFT_TAB_STATE.COMPARE); // Compare Districtings
                break;
            default:
                setTabIndex(LEFT_TAB_STATE.SELECT);
        }
    };
    const getFocusedDistricting = () => {
        /*Dynamically decide the header button text*/
        switch (displayedDistrictingType) {
            case DISTRICTING_TYPE.ENACTED:
                return DISTRICTING_TYPE.ENACTED;
            case DISTRICTING_TYPE.INTERESTING:
                return selectedInteresting;
            case DISTRICTING_TYPE.MODIFIED:
                return DISTRICTING_TYPE.MODIFIED;
            default:
                return "View Interesting Districting";
        }
    };

    return (
        <Tabs>
            {/* The names of the tabs that can be selected */}
            <TabList>
                <Tab>State</Tab>
                <Tab>Districts</Tab>
            </TabList>
            {/* The actual contents of the tabs */}
            <TabPanel>
                <div
                    className="tabHeaderSection"
                    style={{
                        marginLeft: "5px",
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <h2 style={{ margin: "10px" }}>
                            {getRightSidebarHeader()}
                        </h2>
                        <button
                            className="btn"
                            onClick={() => onOpenLeftPanel()}
                        >
                            {getRightSidebarHeaderBtnText()}
                        </button>
                    </div>
                    <SelectPopulation
                        selectPopulation={selectPopulation}
                        setSelectPopulation={setSelectPopulation}
                    />
                </div>
                <hr />
                <div
                    className="tabContentSection"
                    style={{ marginLeft: "5px" }}
                >
                    <div className="populationData">
                        <h3>Districting Data</h3>
                        <p>
                            Total Population:{" "}
                            {StateData[stateFocused]["totalPopulation"]}
                        </p>
                        <p>
                            Avg. District Population:{" "}
                            {StateData[stateFocused]["avgDistrictPop"]}
                        </p>
                        <p>Population Equality: 0.47%</p>
                        <p>
                            Number of District:{" "}
                            {StateData[stateFocused]["numberOfDistrict"]}
                        </p>
                    </div>
                    <hr />
                    <ElectionSelection
                        electionData={StateData[stateFocused]["electionData"]}
                    />
                    <hr />
                    <div className="demographicsData">
                        <h3>Demographics Data</h3>
                        <PieChartCpn
                            inputData={StateData[stateFocused]["demographic"]}
                        ></PieChartCpn>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <div
                    className="tabHeaderSection"
                    style={{
                        marginLeft: "5px",
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <h2 style={{ margin: "10px" }}>
                            {getRightSidebarHeader()}
                        </h2>
                        <button
                            className="btn"
                            onClick={() => onOpenLeftPanel()}
                        >
                            {getRightSidebarHeaderBtnText()}
                        </button>
                    </div>
                    <SelectPopulation
                        selectPopulation={selectPopulation}
                        setSelectPopulation={setSelectPopulation}
                    />
                </div>
                <hr />
                <DistrictAccordion
                    districtDict={
                        StateData[stateFocused][getFocusedDistricting()][
                            "district"
                        ]
                    }
                    numberOfDistricts={
                        StateData[stateFocused]["numberOfDistrict"]
                    }
                    stateFocused={stateFocused}
                />
            </TabPanel>
            <br style={{ marginBottom: "100px" }} />
        </Tabs>
    );
};

export default SelectedStateTabs;
