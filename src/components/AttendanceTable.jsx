"use client"

import { useState } from "react"
import { Table, Form } from "react-bootstrap"

export function AttendanceTable({ students, date }) {
  const [attendance, setAttendance] = useState({})

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  return (
    <div className="table-responsive">
      <Table bordered hover>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Alumno</th>
            <th className="text-center">Presente</th>
            <th className="text-center">Ausente</th>
            <th className="text-center">Retardo</th>
            <th className="text-center">Justificado</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="fw-medium">{student.name}</td>
              <td className="text-center">
                <Form.Check
                  type="radio"
                  name={`attendance-${student.id}`}
                  checked={attendance[student.id] === "present"}
                  onChange={() => handleAttendanceChange(student.id, "present")}
                />
              </td>
              <td className="text-center">
                <Form.Check
                  type="radio"
                  name={`attendance-${student.id}`}
                  checked={attendance[student.id] === "absent"}
                  onChange={() => handleAttendanceChange(student.id, "absent")}
                />
              </td>
              <td className="text-center">
                <Form.Check
                  type="radio"
                  name={`attendance-${student.id}`}
                  checked={attendance[student.id] === "late"}
                  onChange={() => handleAttendanceChange(student.id, "late")}
                />
              </td>
              <td className="text-center">
                <Form.Check
                  type="radio"
                  name={`attendance-${student.id}`}
                  checked={attendance[student.id] === "justified"}
                  onChange={() => handleAttendanceChange(student.id, "justified")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

