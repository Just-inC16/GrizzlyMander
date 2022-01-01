// Importing local resources
import DistrictingCard from "./DistrictingCard";

// Importing local resources
import StateData from "../../static/JSON/StateData.json";

const DistrictingList = ({
    stateFocused,
    setTabIndex,
    setDisplayedDistrictingType,
    setSelectedInteresting,
    setConstraintValue,
    setShowPrecinctBoarder,
    setShowCountyBoarder,
}) => {
    const districtings = [];
    const descriptions = [
        "Selected for Low Population Equality",
        "Selected for High Majority-Minority Districts",
        "Selected for Poltical Party Equality",
        "Selected for High Compactness",
    ];
    for (let i = 1; i < 30 + 1; i++) {
        districtings.push(
            <DistrictingCard
                setTabIndex={setTabIndex}
                setDisplayedDistrictingType={setDisplayedDistrictingType}
                id={i}
                desc={descriptions[i % descriptions.length]}
                data={StateData[stateFocused][i]["cardInfo"]}
                setSelectedInteresting={setSelectedInteresting}
                setConstraintValue={setConstraintValue}
                setShowPrecinctBoarder={setShowPrecinctBoarder}
                setShowCountyBoarder={setShowCountyBoarder}
            />
        );
    }

    return <div>{districtings}</div>;
};

export default DistrictingList;
