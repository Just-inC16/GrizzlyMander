// Importing external modules
import { useState } from "react";
import Select from "react-select";
import SlidingPanel from "react-sliding-side-panel";

// Importing local resources
import "../../css/Sidebar.css";
import BoxPlot from "./BoxPlot";

const BoxAndWhiskerSelection = ({ stateFocused, selectedInteresting }) => {
    // Options for the dropdown of which basis's data to view
    const basisOptions = [
        { value: "AA", label: "African American Population %" },
        { value: "Asian", label: "Asian Population %" },
        { value: "Hispanic", label: "Hispanic Population %" },
    ];
    // View basis's data
    const [basisType, setBasisType] = useState({
        value: "AA",
        label: "African American Population %",
    });

    // Open the panel to display box and whisker plot
    const [showBoxPlot, setShowBoxPlot] = useState(false);

    return (
        <div>
            <div className="basisData">
                <Select
                    value={basisType}
                    onChange={(selectedOption) => {
                        setBasisType(selectedOption);
                    }}
                    options={basisOptions}
                />
            </div>

            <button className="btn" onClick={() => setShowBoxPlot(true)}>
                Show Plot
            </button>
            <br style={{ marginBottom: "100px" }} />
            <SlidingPanel
                type="top"
                isOpen={showBoxPlot}
                size={90}
                backdropClicked={() => setShowBoxPlot(false)}
            >
                <BoxPlot
                    stateFocused={stateFocused}
                    selectedInteresting={selectedInteresting}
                    basisTypeTitle={basisType["label"]}
                    basisType={basisType["value"]}
                />
            </SlidingPanel>
        </div>
    );
};

export default BoxAndWhiskerSelection;
