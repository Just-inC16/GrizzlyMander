// Importing local resources
import "../../css/Sidebar.css";
import "../../css/LoadingModule.css";
import Buffer from "./Buffer";
import BufferTable from "./BufferTable";
import bufferData from "../../static/JSON/SampleTableData.json";
import ResultTable from "./ResultTable";
import resultData from "../../static/JSON/resultData.json";
import CompareTable from "./CompareTable";
import compareData from "../../static/JSON/compareData.json";
import BoxAndWhiskerSelection from "../BoxAndWhisker/BoxAndWhiskerSelection";
import FetchRepeater from "./FetchRepeater";
import ALGORITHM_STATE from "../../static/JSON/AlgorithmState.json";
import ServerConn from "../../services/index";

const LoadingModule = ({
    stateFocused,
    selectedInteresting,
    algorithmState,
    setAlgorithmState,
}) => {
    // algorithmState Values:
    // 0 = ALGORITHM_STATE.RUNNING
    // 1 = ALGORITHM_STATE.FINISHED
    // 2 = ALGORITHM_STATE.TERMINATED
    const onTerminate = () => {
        setAlgorithmState(ALGORITHM_STATE.FINISHED);
        ServerConn.stopAlgorithm();
    };
    return (
        <div>
            <button
                onClick={() =>
                    setAlgorithmState(
                        algorithmState >= ALGORITHM_STATE.FINISHED
                            ? ALGORITHM_STATE.RUNNING
                            : ALGORITHM_STATE.FINISHED
                    )
                }
            >
                {" "}
                Algorithm State: {algorithmState}
            </button>
            {algorithmState === ALGORITHM_STATE.RUNNING && (
                <div className="generate-style">
                    <div className="generate-description-style">
                        <Buffer />
                        <h3>Generating New Districting</h3>
                    </div>
                    <br />
                    <BufferTable tableData={bufferData} />
                    <FetchRepeater
                        algorithmState={algorithmState}
                        setAlgorithmState={setAlgorithmState}
                    />
                    <button className="btn" onClick={onTerminate}>
                        Terminate
                    </button>
                </div>
            )}
            {algorithmState === ALGORITHM_STATE.FINISHED && (
                <div className="result-style">
                    <div className="result-description-style">
                        <h3>Result</h3>
                    </div>
                    <br />
                    <ResultTable tableData={resultData} />

                    <br />
                    <hr />
                    <br />
                    <div className="result-description-style">
                        <h3>Compare</h3>
                    </div>
                    <br />
                    <CompareTable tableData={compareData} />
                    <br />
                    <hr />
                    <br />
                    <div className="result-description-style">
                        <h3>Box and Whisker Plot Graph</h3>
                    </div>
                    <br />
                    <BoxAndWhiskerSelection
                        stateFocused={stateFocused}
                        selectedInteresting={selectedInteresting}
                    />
                </div>
            )}
            {algorithmState === ALGORITHM_STATE.TERMINATED && (
                <div className="algo-not-ran-style">
                    'Start Redistricting'
                    <br />
                    has not been initalized.
                </div>
            )}
        </div>
    );
};

export default LoadingModule;
