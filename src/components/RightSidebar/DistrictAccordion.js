// Importing external modules
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

// Importing local resources
import PieChartCpn from "./PieChartCpn";
import ElectionSelection from "../Election/ElectionSelection";

const DistrictAccordion = ({
    districtDict,
    numberOfDistricts,
    stateFocused,
}) => {
    const districtInfoItems = [];
    for (let i = 1; i < numberOfDistricts + 1; i++) {
        let population = districtDict[i]["population"];
        let electionData = districtDict[i]["electionData"];
        let pieData = districtDict[i]["demographic"];

        districtInfoItems.push(
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>District #{i}</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="populationData">
                        <h3>Population Data</h3>
                        <p>Total Population: {population}</p>
                    </div>
                    <hr />
                    <ElectionSelection electionData={electionData} />
                    <hr />
                    <div className="demographicsData">
                        <h3>Demographics Data</h3>
                        <PieChartCpn inputData={pieData}></PieChartCpn>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
        );
    }

    return (
        <Accordion allowZeroExpanded allowMultipleExpanded>
            {/* Data at the district level */}
            {districtInfoItems}
        </Accordion>
    );
};

export default DistrictAccordion;
