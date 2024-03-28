// Doctor.js
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);
    
    //add dummy setDoctors data
    useEffect(() => {
        setDoctors([
            {
                _id: "1",
                doctorUserId: "1",
                licenseNumber: "123456",
                qualification: "MBBS",
                specialization: "General Physician",
                status: "Pending",
            },
            {
                _id: "2",
                doctorUserId: "2",
                licenseNumber: "654321",
                qualification: "MD",
                specialization: "Cardiologist",
                status: "Pending",
            },
            {
                _id: "3",
                doctorUserId: "3",
                licenseNumber: "987654",
                qualification: "MS",
                specialization: "Orthopedic",
                status: "Verified",
            },
        ])
        }, []);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/doctors");
//         if (Array.isArray(response.data)) {
//           setDoctors(response.data);
//         } else {
//           console.error("Invalid data structure:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };

//     fetchDoctors();
//   }, []);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Doctor User ID", accessor: "doctorUserId" },
      { Header: "License Number", accessor: "licenseNumber" },
      { Header: "Qualification", accessor: "qualification" },
      { Header: "Specialization", accessor: "specialization" },
      { Header: "Status", accessor: "status" },

      {
        Header: "Actions",
        accessor: "hello",
        Cell: ({ row }) => (
          <Link to={`/doctors/delete/${row.original._id}`} className="btn btn-danger btn-sm bg-red-500 text-white rounded-full px-2">
            Delete
          </Link>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: doctors,
  });

  return (
    <div className="container mx-auto mt-8 p-8">
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
    </div>
  );
};

export default Doctor;
