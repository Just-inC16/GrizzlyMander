// Importing external modules
import { Pie } from "react-chartjs-2";

const PieChartCpn = ({ inputData }) => {
    const pieChartData = {
        labels: [
            "White (Non-Hispanic)",
            "African American",
            "Asian",
            "Hispanic",
            "Native American",
            "Other",
        ],
        datasets: [
            {
                label: "% of Population",

                data: [
                    inputData["White"],
                    inputData["AA"],
                    inputData["Asian"],
                    inputData["Hispanic"],
                    inputData["Native"],
                    inputData["Other"],
                ],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Pie data={pieChartData} />
        </div>
    );
};

export default PieChartCpn;
