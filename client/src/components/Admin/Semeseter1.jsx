import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExamDashboard() {
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");
  const [selectedExam, setSelectedExam] = useState(null);

  const examData = {
    "Semester 1": [
      {
        name: "Mid Exam",
        status: "Completed",
        date: "2024-02-18",
        notes: "Syllabus up to Unit 2.",
        attended: 35,
        total: 50,
      },
      {
        name: "Internal Exam",
        status: "Completed",
        date: "2024-03-05",
        attended: 40,
        total: 50,
      },
      {
        name: "Final Sem Exam",
        status: "Completed",
        date: "2024-04-29",
        attended: 45,
        total: 50,
      },
    ],
    "Semester 2": [
      {
        name: "Mid Exam",
        status: "Not Started",
        date: "2025-10-15",
        attended: 0,
        total: 50,
      },
      {
        name: "Internal Exam",
        status: "Not Started",
        date: "2025-11-01",
        attended: 0,
        total: 50,
      },
      {
        name: "Final Sem Exam",
        status: "Not Started",
        date: "2026-01-05",
        notes: "Schedule TBA.",
        attended: 0,
        total: 50,
      },
    ],
    "Semester 3": [
      {
        name: "Mid Exam",
        status: "Not Started",
        date: "2025-09-10",
        notes: "Lab components included.",
        attended: 20,
        total: 50,
      },
      {
        name: "Internal Exam",
        status: "Not Started",
        date: "2025-09-25",
        notes: "Project review.",
        attended: 0,
        total: 50,
      },
      {
        name: "Final Sem Exam",
        status: "Not Started",
        date: "2025-12-20",
        notes: "Comprehensive.",
        attended: 0,
        total: 50,
      },
    ],
  };

  const statusChip = (status) => {
    const cls = {
      Completed: "bg-green-100 text-green-700 ring-green-200",
      Pending: "bg-amber-100 text-amber-700 ring-amber-200",
      Ongoing: "bg-blue-100 text-blue-700 ring-blue-200",
      Upcoming: "bg-indigo-100 text-indigo-700 ring-indigo-200",
      "Not Started": "bg-gray-100 text-gray-700 ring-gray-200",
    }[status] || "bg-gray-100 text-gray-700 ring-gray-200";

    return (
      <span className={`px-3 py-1 rounded-full text-sm ring-1 ${cls}`}>
        {status}
      </span>
    );
  };

  // Attendance Gauge Component
  const AttendanceGauge = ({ attended, total }) => {
    const absent = total - attended;
    const attendancePercent =
      total > 0 ? Math.round((attended / total) * 100) : 0;

    // Dynamic color
    let color = "#45bc86"; // green
    const data = {
      datasets: [
        // Background semicircle
        {
          data: [10],
          backgroundColor: ["#d83c60"],
          borderWidth: 0,
          circumference: (180 * 30) / 100,
          rotation: -90,
          cutout: "70%",
        },
        // Foreground arc (attendance)
        {
          data: [attendancePercent],
          backgroundColor: [color],
          borderWidth: 0,
          circumference: (180 * attendancePercent) / 100,
          rotation: -90,
          cutout: "70%",
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    };
    console.log(selectedExam)
    return (
      <div className="flex flex-col items-center mt-6">
        <Doughnut data={data} options={options} width={200} height={100} />
        <div className="text-xl font-bold mt-[-30px]">
          {attendancePercent}% Attendance
        </div>
        <div className="text-sm text-gray-600 mt-2">
          🟩 Attended: {attended} | 🟥 Absent: {absent}
        </div>
      </div>
    );
  };

  // Debug log (moved OUTSIDE JSX)
  console.log(selectedExam);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        {/* LEFT SIDEBAR */}
        <aside className="hidden sm:block w-48 rounded-3xl md:w-56 h-screen sticky top-0 bg-white border-r p-5">
          <div className="space-y-4 rounded-3xl">
            {Object.keys(examData).map((semester) => (
              <button
                key={semester}
                onClick={() => {
                  setSelectedSemester(semester);
                  setSelectedExam(null);
                }}
                className={`w-full text-left text-lg rounded-xl px-3 py-2 transition border ${
                  selectedSemester === semester
                    ? "border-black font-semibold shadow-sm"
                    : "border-transparent hover:bg-gray-100"
                }`}
              >
                {semester}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 min-h-screen p-6 md:p-10 bg-gray-200">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-center text-5xl md:text-6xl font-bold tracking-wide mb-10 uppercase">
              {selectedSemester}
            </h1>

            <div className="relative rounded-[40px] border bg-white/90 shadow-sm overflow-hidden">
              <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent)] bg-gradient-to-b from-gray-50 via-transparent to-gray-100" />

              <div className="relative p-6 md:p-8 space-y-6">
                {examData[selectedSemester]?.map((exam, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedExam(exam)}
                    className="w-full group text-left bg-white border rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition flex items-center justify-between"
                  >
                    <div>
                      <h2 className="text-2xl md:text-3xl font-medium">
                        {exam.name}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-gray-500">
                        Status
                      </p>
                      <div className="mt-1">{statusChip(exam.status)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block w-80 h-screen sticky top-0 bg-white border-l p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Details</h3>
            {selectedExam ? statusChip(selectedExam.status) : null}
          </div>

          {selectedExam ? (
            <div className="space-y-4">
              {selectedExam.status==="Completed" ? (
                <AttendanceGauge
                  attended={selectedExam.attended}
                  total={selectedExam.total}
                />
              ) : (
                <div>

                <p className="text-gray-700  capitalize
                ">exam not yet started</p>
                <button className="h-16 text-center text-lg rounded-xl border-solid bg-black text-white">Schedule The exam</button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <p className="text-gray-500">
                Select an exam card to see details here.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
