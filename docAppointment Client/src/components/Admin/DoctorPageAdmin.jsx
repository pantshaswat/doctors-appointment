// Doctor.js
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import DoctorVerification from "../DoctorVerification";

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);
    

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        await axios.get("http://localhost:3000/doctor/getAll")
        .then(response => {
          if (Array.isArray(response.data)) {
          
            setDoctors(response.data);
            
          }
          else {
            console.error("Invalid data structure:", response.data);
          }
        })
        
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
   
  }, []);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Name", accessor: "doctorUserId.fullName" },
      { Header: "License Number", accessor: "licenseNumber" },
      { Header: "Qualification", accessor: "qualification" },
      { Header: "Specialization", accessor: "specialization" },
      { Header: "Status", accessor: "status" },

    
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: doctors,
  });

  return (
    <div className=" mx-auto mt-8 p-8 h-screen overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Doctor Management</h2>
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
    <DoctorVerification doctor= {doctors} />
    </div>

  );
};

export default Doctor;
