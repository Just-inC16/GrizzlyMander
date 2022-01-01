// Importing external modules
import { useState } from 'react'
// Importing local resources
import Map from './components/Map/Map';
import RightSidebar from './components/RightSidebar/RightSidebar';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import LEFT_TAB_STATE from './static/JSON/LeftTabState.json'

// import APP_STATE from './static/JSON/AppState.json';
import DISTRICTING_TYPE from './static/JSON/DistrictingTypes.json';

const App = () => {
    /*
     * The appState represents the current stage in the typical user flow
     * It helps determine which components should be shown/hidden and enabled/disabled,
     * what text to be displayed, which tabs are the default, etc.
     * 
     * TODO: Implement usage of appState
     */
    // const [appState, setAppState] = useState(APP_STATE.INIT);

    // Which state is currently being focused on
    const [stateFocused, setStateFocused] = useState('US');

    // Indicate for the left panel to open
    const [openLeftPanel, setOpenLeftPanel] = useState(false);

    /*
     * Specifies whether the currently enacted, interesting, or modified interesting districting
     * is currently being displayed 
     * [hook path 1: app -> leftside -> modifytab -> SelectDistricting]
     * [hook path 2: app -> rightside -> SelectedStateTabs]
     */
    const [displayedDistrictingType, setDisplayedDistrictingType] = useState(DISTRICTING_TYPE.ENACTED)
    // const [displayedDistrictingType, setDisplayedDistrictingType] = useState(DISTRICTING_TYPE.CURRENT);

    // which tab is being show on the left sidebar [app -> left -> modifytab]
    const [tabIndex, setTabIndex] = useState(LEFT_TAB_STATE.SELECT);

    // indicates which interesting district has been selected [app --> left -> modifytab]
    const [selectedInteresting, setSelectedInteresting] = useState(1);

    // indicates to show precinct borders or not
    const [showPrecinctBoarder, setShowPrecinctBoarder] = useState(false);

    // indicates to show county borders or not
    const [showCountyBoarder, setShowCountyBoarder] = useState(false);

    return (
        <div className="App">

            <Navbar stateFocused={stateFocused} setStateFocused={setStateFocused}
                showPrecinctBoarder={showPrecinctBoarder} setShowPrecinctBoarder={setShowPrecinctBoarder}
                showCountyBoarder={showCountyBoarder} setShowCountyBoarder={setShowCountyBoarder}
                displayedDistrictingType={displayedDistrictingType}/>
            {/* Summary statistics about the selected state/county/district/precinct */}
            <RightSidebar
                stateFocused={stateFocused} setStateFocused={setStateFocused}
                openLeftPanel={openLeftPanel} setOpenLeftPanel={setOpenLeftPanel}
                displayedDistrictingType={displayedDistrictingType} setDisplayedDistrictingType={setDisplayedDistrictingType}
                tabIndex={tabIndex} setTabIndex={setTabIndex}
                selectedInteresting={selectedInteresting} setSelectedInteresting={setSelectedInteresting}
                setShowPrecinctBoarder={setShowPrecinctBoarder}
                setShowCountyBoarder={setShowCountyBoarder}
            />
            
            {/*
                Leaflet map of US with selectable states for which GeoJSON data can be loaded
                to display boundaries for counties/districts/precincts/census blocks
            */}
            <Map stateFocused={stateFocused} setStateFocused={setStateFocused}
                showPrecinctBoarder={showPrecinctBoarder}
                showCountyBoarder={showCountyBoarder}
                displayedDistrictingType={displayedDistrictingType}
                selectedInteresting = {selectedInteresting}/>

            <LeftSidebar
                stateFocused={stateFocused} setStateFocused={setStateFocused} 
                openLeftPanel={openLeftPanel} setOpenLeftPanel={setOpenLeftPanel}
                displayedDistrictingType={displayedDistrictingType} setDisplayedDistrictingType={setDisplayedDistrictingType}
                tabIndex={tabIndex} setTabIndex={setTabIndex}
                selectedInteresting={selectedInteresting} setSelectedInteresting={setSelectedInteresting}
                setShowPrecinctBoarder={setShowPrecinctBoarder}
                setShowCountyBoarder={setShowCountyBoarder}
            />
        </div>
        
    );
}

export default App;
