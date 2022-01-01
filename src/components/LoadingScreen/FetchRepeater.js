// Importing external modules
import { useState, useEffect } from "react";

// Importing local resources
import ALGORITHM_STATE from "../../static/JSON/AlgorithmState.json";
import ServerConn from "../../services/index";

const FetchRepeater = ({ algorithmState, setAlgorithmState }) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        let counterId;
        if (algorithmState === ALGORITHM_STATE.RUNNING) {
            counterId = setTimeout(() => setCounter(counter + 1), 1000);
        }

        if (Math.floor(counter / 15) >= 50) {
            //when the algo is done running (fetch gave us "finished")
            setAlgorithmState(ALGORITHM_STATE.FINISHED);
            ServerConn.stopAlgorithm();
        }

        return () => {
            clearTimeout(counterId);
        };
    }, [counter, algorithmState, setAlgorithmState]);

    return (
        <div>
            <div>Time Passed: {counter} seconds</div>
            <div>Number of updates: {Math.floor(counter / 15)} </div>
        </div>
    );
};

export default FetchRepeater;
