// Importing external modules
import { useState } from "react";
import Select from "react-select";

// Importing local resources
import ElectionBarGraph from "./ElectionBarGraph.js";

const ElectionSelection = ({ electionData }) => {
    // Options for the dropdown of which data to view
    const electionOptions = [
        { value: "congressional", label: "Congressional" },
        { value: "presidential", label: "Presidential" },
    ];
    // View election's data
    const [electionType, setElectionType] = useState({
        value: "congressional",
        label: "Congressional",
    });

    return (
        <div className="electionData">
            <h3>Election Data</h3>
            <Select
                value={electionType}
                onChange={(selectedOption) => {
                    setElectionType(selectedOption);
                }}
                options={electionOptions}
            />
            <ElectionBarGraph
                electionData={electionData[electionType["value"]]}
            />
        </div>
    );
};

export default ElectionSelection;
