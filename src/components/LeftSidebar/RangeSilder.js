// Importing external modules
import { useState } from "react";

// Importing local resources
import "../../css/RangeSlider.css";

const RangeSlider = ({ title, min, max, step, val, statePerserve }) => {
    const [rangeval, setRangeval] = useState(val);
    return (
        <div className="outerContainer">
            <div className="constraintName">{title}</div>
            <div className="rangeContainer">
                <div className="minMax">{min}</div>
                <input
                    type="range"
                    className="range"
                    min={min}
                    max={max}
                    step={step}
                    onChange={(event) => {
                        setRangeval(event.target.value);
                        statePerserve(event.target.value);
                    }}
                    value={rangeval}
                />
                <div className="minMax">{max}</div>
                <input
                    className="input"
                    type="number"
                    onChange={(event) => {
                        setRangeval(event.target.value);
                        statePerserve(event.target.value);
                    }}
                    min={min}
                    max={max}
                    step={step}
                    value={rangeval}
                />
            </div>
        </div>
    );
};

export default RangeSlider;
