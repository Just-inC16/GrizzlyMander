// Importing local resources
import ToggleSwitch from "./ToggleSwitchButton";
import DISTRICTING_TYPE from "../../static/JSON/DistrictingTypes.json";

const SelectDistricting = ({
    displayedDistrictingType,
    setDisplayedDistrictingType,
    setShowPrecinctBoarder,
    setShowCountyBoarder,
}) => {
    const onEnacted = () => {
        setDisplayedDistrictingType(DISTRICTING_TYPE.ENACTED);
    };
    const onInteresting = () => {
        setDisplayedDistrictingType(DISTRICTING_TYPE.INTERESTING);
    };
    const onModified = () => {
        setDisplayedDistrictingType(DISTRICTING_TYPE.MODIFIED);
    };

    return (
        <div>
            <div>
                <ToggleSwitch
                    id="enacted"
                    small
                    checked={
                        displayedDistrictingType === DISTRICTING_TYPE.ENACTED
                    }
                    onChange={onEnacted}
                />
                <label htmlFor="enacted">Currently Enacted Districting</label>
            </div>
            <div>
                <ToggleSwitch
                    id="interesting"
                    small
                    checked={
                        displayedDistrictingType ===
                        DISTRICTING_TYPE.INTERESTING
                    }
                    onChange={onInteresting}
                />
                <label htmlFor="interesting">
                    Selected Interesting Districting
                </label>
            </div>
            <div>
                <ToggleSwitch
                    id="modified"
                    small
                    checked={
                        displayedDistrictingType === DISTRICTING_TYPE.MODIFIED
                    }
                    onChange={onModified}
                />
                <label htmlFor="modified">Newly Modified Districting</label>
            </div>
        </div>
    );
};

export default SelectDistricting;
