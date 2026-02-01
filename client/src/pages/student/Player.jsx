import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AddContext.jsx"
import { useParams } from "react-router-dom"
import { assets } from "../../assets/assets"
import humanizeDuration from "humanize-duration"
import YouTube from "react-youtube"
import Footer from "../../components/student/Footer"
import Rating from '../../components/student/Rating.jsx'
const Player = () => {
  const { enrolledCourses, calculatelectureTime } = useContext(AppContext)
  const { courseId } = useParams()
  const [coursedata, setcoursedata] = useState(null)
  const [openSection, setOpenSection] = useState({})
  const [playerdata, setplayerdata] = useState(null)

  // fetch individual course
 useEffect(() => {
  if (enrolledCourses?.length) {
    const course = enrolledCourses.find(c => c._id === courseId)
    setcoursedata(course || null)
  }
}, [enrolledCourses, courseId])
  // toggle sections
  const toggleSection = index => {
    setOpenSection(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // loading state
  if (!coursedata) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading course...</p>
      </div>
    )
  }

  // placeholder for lecture completion
  const isLectureCompleted = (chapterIndex, lectureIndex) => {
    // TODO: replace with real progress logic
    return false
  }

  return (
    <>
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-4">
      
      {/* Left: Course Structure */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">Course Structure</h1>

        <div className="space-y-3">
          {coursedata.courseContent.map((chapter, index) => (
            <div key={index} className="bg-white border rounded-md">
              
              {/* Chapter Header */}
              <div
                onClick={() => toggleSection(index)}
                className="flex items-center justify-between px-4 py-3 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={assets.down_arrow_icon}
                    alt=""
                    className={`transition-transform ${
                      openSection[index] ? "rotate-180" : ""
                    }`}
                  />
                  <p className="font-medium">{chapter.chapterTitle}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {chapter.chapterContent.length} lectures ·{" "}
                  {calculatelectureTime(chapter)}
                </p>
              </div>

              {/* Chapter Lectures */}
              {openSection[index] && (
                <ul className="px-6 pb-4">
                  {chapter.chapterContent.map((lecture, i) => (
                    <li
                      key={i}
                      className="flex justify-between gap-4 py-2 border-t"
                    >
                      <div className="flex gap-2 items-center">
                        <img
                          src={
                            isLectureCompleted(index, i)
                              ? assets.blue_tick_icon
                              : assets.play_icon
                          }
                          alt=""
                          className="w-4 h-4 mt-1"
                        />
                        <p className="text-sm text-gray-700">{lecture.lectureTitle}</p>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        {lecture.lectureUrl && (
                          <span
                            onClick={() =>
                              setplayerdata({
                                 videoId: lecture.lectureUrl.split('/').pop(), // correct YouTube ID
  lectureTitle: lecture.lectureTitle,          // make sure this key exists
  chapter: index + 1,
  lecture: i + 1
                               
                              })
                            }
                            className="text-blue-600 cursor-pointer hover:underline"
                          >
                            Watch
                          </span>
                        )}
                        <span>
                          {humanizeDuration(
                            lecture.lectureDuration * 60 * 1000,
                            { units: ["h", "m"] }
                          )}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        {/* /rating */}
        <div className="flex items-centergap-2 py-3 mt-10">
          <h1 className="text-xl font-bold">Rate this course:</h1>
          <Rating initialRating={0}/>
        </div>
      </div>

      {/* Right: Video Player */}
      <div className="lg:w-1/2 w-full space-y-4">
  {playerdata ? (
    <div className="flex flex-col">
      {/* Video Player */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
        <YouTube
          videoId={playerdata.videoId}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: { autoplay: 1 },
          }}
          className="absolute inset-0 w-full h-full"
          iframeClassName="w-full h-full"
        />
      </div>

      {/* Lecture Info */}
      <div className="flex justify-between items-center mt-2">
        <p className="font-medium text-gray-800">
          {playerdata.chapter}.{playerdata.lecture}: {playerdata.lectureTitle}
        </p>

        {/* Completed Button */}
        <button
          className={`px-4 py-2 rounded-md text-white font-medium transition ${
            false ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {false ? "Completed" : "Mark as completed"}
        </button>
      </div>
    </div>
  ) : (
    <img
      src={coursedata.courseThumbnail}
      alt="Course Thumbnail"
      className="w-full aspect-video object-cover rounded-lg shadow-md"
    />
  )}
</div>
 
    </div>
    <Footer/>
    </>
  )
}

export default Player
