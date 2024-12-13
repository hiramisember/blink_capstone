"use client";

import React, { useState, useEffect } from "react";
import FormContainer from "@/components/FormContainer"; // Ensure this is a client-safe import
import Pagination from "@/components/Pagination"; // Assuming you have a Pagination component
import Table from "@/components/Table"; // Assuming you have a Table component
import TableSearch from "@/components/TableSearch"; // Assuming you have a TableSearch component

const AttendancePage = () => {
  const [attendance, setAttendance] = useState({}); // Track attendance state
  const [students, setStudents] = useState([]); // State to hold student data
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const studentsPerPage = 10; // Number of students per page

  // Fetch students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/students"); // Fetch from the API route
      const studentData = await response.json(); // Parse the JSON response
      setStudents(studentData); // Set the fetched students to state
    };

    fetchStudents();
  }, []); // Empty dependency array to run once on mount

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-300 text-white p-4">
        <h1 className="text-xl">Attendance Dashboard</h1>
      </header>
      <div className="flex flex-1">
        <main className="flex-1 p-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Section</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{student.classId}</td>
                  <td className="py-2 px-4 border">{student.name}</td>
                  <td className="py-2 px-4 border">
                    <select
                      value={attendance[student.id] || ""}
                      onChange={(e) =>
                        handleAttendanceChange(student.id, e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      <option value="">Select</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default AttendancePage;
