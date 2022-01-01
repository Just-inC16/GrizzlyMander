// Importing external modules
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";

// Importing local resources
import "../../css/Sidebar.css";
import ModifyTabs from "./ModifyTabs";

const LeftSidebar = ({
    stateFocused,
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
    return (
        <div>
            <SlidingPanel
                className={"panel"}
                type={"left"}
                isOpen={openLeftPanel && stateFocused !== "US"}
                size={23}
                noBackdrop={true}
            >
                <div className="leftSidebarContainer">
                    <button
                        className="topRightBtn"
                        onClick={() => setOpenLeftPanel(false)}
                    >
                        Close
                    </button>
                    <ModifyTabs
                        stateFocused={stateFocused}
                        displayedDistrictingType={displayedDistrictingType}
                        setDisplayedDistrictingType={
                            setDisplayedDistrictingType
                        }
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        selectedInteresting={selectedInteresting}
                        setSelectedInteresting={setSelectedInteresting}
                        setShowPrecinctBoarder={setShowPrecinctBoarder}
                        setShowCountyBoarder={setShowCountyBoarder}
                    />
                </div>
            </SlidingPanel>
        </div>
    );
};
export default LeftSidebar;
