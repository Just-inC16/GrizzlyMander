// Importing external modules
import { Bar } from "react-chartjs-2";

const ElectionBarGraph = ({ electionData }) => {
    const data = {
        labels: ["Republican Party", "Democratic Party"],
        datasets: [
            {
                label: "Number of Votes",
                data: electionData,
                backgroundColor: [
                    "rgb(255, 99, 132, 0.5)",
                    "rgb(54, 162, 235, 0.5)",
                ],
                borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            },
        ],
    };

    const options = {
        indexAxis: "y",
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: { borderWidth: 2 },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Election Statistics",
            },
        },
    };
    return <Bar data={data} options={options} />;
};

export default ElectionBarGraph;
