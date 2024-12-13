"use client";

import React, { useState, useEffect } from "react";

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/students");
      const studentData = await response.json();
      setStudents(studentData);
    };

    const fetchUserRole = async () => {
      const role = "admin"; // Replace with actual role fetching logic
      setUserRole(role);
    };

    fetchStudents();
    fetchUserRole();
  }, []);

  const handleStatusChange = async (studentId, newStatus) => {
    if (!["teacher", "admin"].includes(userRole)) return;

    const response = await fetch(`/api/students/${studentId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId ? { ...student, status: newStatus } : student
        )
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-4">
        <header className="bg-blue-300 text-white p-4 mb-4">
          <h1 className="text-xl">Attendance Dashboard</h1>
        </header>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Section</th>
              <th className="py-2">Name</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.section}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">
                  {["teacher", "admin"].includes(userRole) ? (
                    <select
                      value={student.status}
                      onChange={(e) =>
                        handleStatusChange(student.id, e.target.value)
                      }
                    >
                      <option value="Not Set">Not Set</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  ) : (
                    student.status
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AttendancePage;
