import React, { useContext, useState } from "react"
import { AppContext } from "../../context/AddContext.jsx"
import {Line} from 'rc-progress'
import Footer from "../../components/student/Footer.jsx"
const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseTime,navigate } = useContext(AppContext)
// setting data
const[progressArray,setprogressarray]=useState([
  // dummy data
  {lectureCompleted:2,totalLectures:4},
  {lectureCompleted:3,totalLectures:4},
  {lectureCompleted:1,totalLectures:4},
  {lectureCompleted:4,totalLectures:4},
  {lectureCompleted:2,totalLectures:4},
  {lectureCompleted:3,totalLectures:4},
  {lectureCompleted:4,totalLectures:4},
  {lectureCompleted:1,totalLectures:4},
])
// onclick on ongoing navigate

  return (
   <>
    <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pt-10 pb-20">
      
      <h1 className="text-2xl font-semibold mb-6">
        My Enrollments
      </h1>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
        <table className="min-w-full text-sm text-left">
          
          {/* TABLE HEAD */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Course</th>
              <th className="px-6 py-4 font-semibold">Duration</th>
              <th className="px-6 py-4 font-semibold">Completed</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="divide-y">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="hover:bg-gray-50">

                {/* COURSE */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 min-w-[220px]">
                    <img
                      src={course.courseThumbnail}
                      alt=""
                      className="w-20 h-12 rounded object-cover"
                    />
                    <p className="font-medium text-gray-800 line-clamp-2">
                      {course.courseTitle}
                    </p>
                    <Line strokeWidth={2} percent={progressArray[index]?(progressArray[index].lectureCompleted*100)/progressArray[index].totalLectures:0} className="bg-gray-300 rounded-full"/>
                  </div>
                </td>

                {/* DURATION */}
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {calculateCourseTime(course)}
                </td>

                {/* COMPLETED */}
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {progressArray[index]&&`${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`} <span className="text-xs">lectures</span>
                </td>

                {/* STATUS */}
               <td className="px-6 py-4">
  <span onClick={()=>navigate('/player/'+course._id)}
    className={`px-3 py-1 text-xs rounded-full font-medium ${
      progressArray[index]?.lectureCompleted ===
      progressArray[index]?.totalLectures
        ? "bg-green-100 text-green-600"
        : "bg-blue-100 text-blue-600"
    }`}
  >
    {progressArray[index]?.lectureCompleted ===
    progressArray[index]?.totalLectures
      ? "Completed"
      : "Ongoing"}
  </span>
</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
    <Footer/></>
  )
}

export default MyEnrollments
