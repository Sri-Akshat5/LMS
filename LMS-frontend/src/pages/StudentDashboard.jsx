import React, { useEffect, useState } from "react";
import axios from "axios";

import MyCourses from "../components/student/MyCourses";
import MyQuizzes from "../components/student/MyQuizzes";
import MyAssignments from "../components/student/MyAssignments";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const studentData = JSON.parse(localStorage.getItem("student"));
  const studentId = studentData?.id;
  const studentName = studentData?.name;

  useEffect(() => {
    if (!studentId) {
      setError("No student logged in.");
      setLoading(false);
      return;
    }

    const fetchStudentData = async () => {
      try {
        const studentRes = await axios.get(`/api/students/${studentId}`);
        const performanceRes = await axios.get(`/api/students/performance/${studentId}`);

        setStudent(studentRes.data);
        setPerformance(performanceRes.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) return <p className="text-center text-gray-600 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {studentName}!</h1>
        <p className="text-gray-600 mt-2">View your courses, quizzes, and assignments here.</p>

        {/* Student Dashboard Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <MyCourses courses={student?.enrolledCourses || []} />
          <MyQuizzes quizzes={performance?.quizScores || []} />
          <MyAssignments assignments={performance?.assignmentsSubmitted || []} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
