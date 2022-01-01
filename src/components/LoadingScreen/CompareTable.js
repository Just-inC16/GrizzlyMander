// Importing external modules
import React from "react";
import { useTable } from "react-table";

// Importing local resources
import "../../css/LoadingTable.css";

const CompareTable = ({ tableData }) => {
    const columns = React.useMemo(
        () => [
            { Header: "Measure", accessor: "col1" },
            { Header: "Enacted", accessor: "col2" },
            { Header: "Selected", accessor: "col3" },
            { Header: "Modified", accessor: "col4" },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data: tableData });

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {" "}
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CompareTable;
