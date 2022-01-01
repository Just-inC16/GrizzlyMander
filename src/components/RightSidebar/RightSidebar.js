// Importing external modules
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";

// Importing local resources
import SelectedStateTabs from "./SelectedStateTabs";
import "../../css/Sidebar.css";
import DISTRICTING_TYPE from "../../static/JSON/DistrictingTypes.json";
// import APP_STATE from './../../static/JSON/AppState.json';
import ServerConn from "../../services/index";

const RightSidebar = ({
    stateFocused,
    setStateFocused,
    openLeftPanel,
    setOpenLeftPanel,
    displayedDistrictingType,
    setDisplayedDistrictingType,
    tabIndex,
    setTabIndex,
    selectedInteresting,
    setSelectedInteresting,
    setShowPrecinctBoarder,
    setShowCountyBoarder,
}) => {
    const setStateResponse = ServerConn.setState(stateFocused);
    console.log(setStateResponse);
    const closeRightSidebar = () => {
        // /*
        //  * If the algorithm to modify a interesting districting was run on the server,
        //  * then user confirmation is required to close the RightSidebar
        //  * since doing so would erase the modified districting
        //  *
        //  *
        //  */
        setDisplayedDistrictingType(DISTRICTING_TYPE.ENACTED);
        setStateFocused("US");
        setOpenLeftPanel(false);
        setSelectedInteresting(1);
        setShowPrecinctBoarder(false);
        setShowCountyBoarder(false);
    };

    return (
        <div className="sidebar">
            {/* The actual sidebar with tabs for the states and their data */}
            <SlidingPanel
                className="panel"
                type="right"
                isOpen={stateFocused !== "US"}
                size={30}
                noBackdrop={true}
            >
                <div className="container">
                    <button className="topRightBtn" onClick={closeRightSidebar}>
                        Reset
                    </button>
                    {/* The tabs to select which state's data to view */}
                    <SelectedStateTabs
                        openLeftPanel={openLeftPanel}
                        setOpenLeftPanel={setOpenLeftPanel}
                        displayedDistrictingType={displayedDistrictingType}
                        setDisplayedDistrictingType={
                            setDisplayedDistrictingType
                        }
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        stateFocused={stateFocused}
                        selectedInteresting={selectedInteresting}
                        setSelectedInteresting={setSelectedInteresting}
                    />
                </div>
            </SlidingPanel>
        </div>
    );
};

export default RightSidebar;
