// Importing local resources
import "../../css/DistrictingCard.css";
import LEFT_TAB_STATE from "../../static/JSON/LeftTabState.json";
import DISTRICTING_TYPE from "../../static/JSON/DistrictingTypes.json";

const DistrictingCard = ({
    id,
    desc,
    data,
    setSelectedInteresting,
    setTabIndex,
    setDisplayedDistrictingType,
    setConstraintValue,
}) => {
    const onSelected = (id) => {
        setTabIndex(LEFT_TAB_STATE.CONSTRAINT); // constraint tab
        setSelectedInteresting(id);
        setDisplayedDistrictingType(DISTRICTING_TYPE.INTERESTING);
        setConstraintValue({
            PopulationEquality: data[0],
            MajMin: data[4],
        });
    };

    return (
        <div className="card">
            <div>
                <div className="card-title-group">
                    <h5 className="card-title">{"Districting #" + id}</h5>
                    <div className="description">{desc}</div>
                </div>
            </div>
            <br />
            <div className="flexbox">
                <div className="card-text">
                    <div>Population Equality: {data[0]}%</div>
                    <hr />
                    <div>
                        Deviation from Avg. District Population: {data[1]}%
                    </div>
                    <hr />
                    <div># of Republican Districts: {data[2]}</div>
                    <hr />
                    <div># of Democratic Districts: {data[3]}</div>
                    <hr />
                    <div># of Majority-Minority Districts: {data[4]}</div>
                    <hr />
                    <div>Compactness (Polsby-Popper): {data[5]}</div>
                    <hr />
                    <div># of Split Counties: {data[6]}</div>
                </div>
            </div>
            <br />
            <button className="btn" onClick={() => onSelected(id)}>
                Select
            </button>
        </div>
    );
};

export default DistrictingCard;
