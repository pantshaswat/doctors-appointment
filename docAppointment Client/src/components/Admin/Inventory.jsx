// Inventory.js
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/medicine/getAll");
        console.log(response.data)
        if (Array.isArray(response.data)) {
        
          setInventory(response.data);
        } else {
          console.error("Invalid data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Product Name", accessor: "name" },
      { Header: "Quantity", accessor: "amount" },
      { Header: "Brand", accessor: "brand" },
    
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: inventory,
  });

  return (
    <div className="container mx-auto mt-8 p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Medical Equipment</h2>
      </div>

      <table className="table-auto w-full border-collapse border">
        <thead className="bg-gray-800 text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="py-2 px-4 border">
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
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="py-2 px-4 border">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
