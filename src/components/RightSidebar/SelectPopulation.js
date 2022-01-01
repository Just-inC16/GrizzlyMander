import React from "react";
import ToggleSwitch from "../LeftSidebar/ToggleSwitchButton";

const SelectPopulation = ({ selectPopulation, setSelectPopulation }) => {
    const onTotal = () => {
        setSelectPopulation("total");
    };
    const onCVAP = () => {
        setSelectPopulation("CVAP");
    };
    const onVAP = () => {
        setSelectPopulation("VAP");
    };

    return (
        <div>
            <div>
                <ToggleSwitch
                    id="total"
                    small
                    checked={selectPopulation === "total"}
                    onChange={onTotal}
                />
                <label htmlFor="total">Total Pop</label>
            </div>
            <div>
                <ToggleSwitch
                    disabled
                    id="cvap"
                    small
                    checked={selectPopulation === "CVAP"}
                    onChange={onCVAP}
                />
                <label htmlFor="cvap">CVAP</label>
            </div>
            <div>
                <ToggleSwitch
                    disabled
                    id="vap"
                    small
                    checked={selectPopulation === "VAP"}
                    onChange={onVAP}
                />
                <label htmlFor="vap">VAP</label>
            </div>
        </div>
    );
};

export default SelectPopulation;
