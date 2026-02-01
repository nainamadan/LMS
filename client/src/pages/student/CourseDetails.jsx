import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../../context/AddContext"
import { assets } from "../../assets/assets"
import Loading from "../../components/student/Loading"
import humanizeDuration from "humanize-duration"
import Footer from "../../components/student/Footer"
import YouTube from "react-youtube"

const CourseDetails = () => {
  const { id } = useParams()

  const {
    allCourses,
    calculateRating,
    calculatelectureTime,
    calculateCourseTime,
    countlectures,
    currency,
  } = useContext(AppContext)

  const [coursedata, setcoursedata] = useState(null)
  // toggle k liye
  const [openSection, setOpenSection] = useState({})
  const [playerdata, setplayerdata] = useState(null)
  const [enroll] = useState(false)

  // fetch course
  // useEffect(() => {
  //   if (allCourses?.length) {
  //     const course = allCourses.find(c => c._id === id)
  //     setcoursedata(course)
  //   }
  // }, [allCourses, id])
useEffect(() => {
  if (allCourses?.length) {
    setTimeout(() => {
      const course = allCourses.find(c => c._id === id)
      setcoursedata(course)
    }, 2000) // 2 sec delay
  }
}, [allCourses, id])
  // open first chapter
  useEffect(() => {
    if (coursedata?.courseContent?.length) {
      setOpenSection({ 0: true })
    }
  }, [coursedata])

  const toggleSection = index => {
    setOpenSection(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  if (!coursedata) return <Loading />

  const discountedPrice = (
    coursedata.coursePrice -
    (coursedata.discount * coursedata.coursePrice) / 100
  ).toFixed(2)

  return (
    <div className="relative bg-gray-50">
      {/* gradient */}
      <div className="absolute top-0 left-0 w-full h-[320px] bg-gradient-to-b from-cyan-100/70 to-white -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 flex flex-col lg:flex-row gap-12">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-gray-600">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
            {coursedata.courseTitle}
          </h1>

          <p
            className="pt-4 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: coursedata.courseDescription.slice(0, 200),
            }}
          />

          {/* rating */}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
            <span className="font-medium text-gray-800">
              {calculateRating(coursedata)}
            </span>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(coursedata))
                      ? assets.star
                      : assets.star_blank
                  }
                  className="w-4 h-4"
                  alt=""
                />
              ))}
            </div>

            <span>
              {coursedata.courseRatings?.length || 0} ratings
            </span>

            <span>
              {coursedata.enrolledStudents.length} students
            </span>
          </div>

          <p className="mt-3 text-sm">
            Course by{" "}
            <span className="text-blue-600 underline">Naina Madaan</span>
          </p>

          {/* COURSE STRUCTURE */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800">
              Course Content
            </h2>

            <div className="mt-5 space-y-3">
              {coursedata.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-md"
                >
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
                      <p className="font-medium">
                        {chapter.chapterTitle}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures ·{" "}
                      {calculatelectureTime(chapter)}
                    </p>
                  </div>

                  {openSection[index] && (
                    <ul className="px-6 pb-4">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex justify-between gap-4 py-2 border-t"
                        >
                          <div className="flex gap-2">
                            <img
                              src={assets.play_icon}
                              alt=""
                              className="w-4 h-4 mt-1"
                            />
                            <p className="text-sm text-gray-700">
                              {lecture.lectureTitle}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            {lecture.isPreviewFree && (
                              <span
                                onClick={() =>
                                  setplayerdata({
                                    videoId:
                                      lecture.lectureUrl.split('/').pop()
                                  })
                                }
                                className="text-blue-600 cursor-pointer hover:underline"
                              >
                                Preview
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
          </div>

          {/* FULL DESCRIPTION */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-3 text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: coursedata.courseDescription,
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
       {/* RIGHT SIDEBAR – SINGLE BOX */}
<div className="w-full lg:w-[360px]">
  <div className="bg-white border rounded-xl shadow-sm overflow-hidden sticky top-24">

    {/* video / thumbnail */}
  {playerdata ? (
  <div className="relative w-full aspect-video">
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
) : (
  <img
    src={coursedata.courseThumbnail}
    alt=""
    className="w-full aspect-video object-cover"
  />
)}


    {/* CONTENT */}
    <div className="p-6 space-y-5">

      {/* time offer */}
      <div className="flex items-center gap-2 text-sm text-red-500">
        <img src={assets.time_left_clock_icon} alt="" className="w-4 h-4" />
        <p><span className="font-medium">5 days</span> left at this price!</p>
      </div>

      {/* price */}
      <div>
        <p className="text-2xl font-semibold text-gray-800">
          {currency}
          {(coursedata.coursePrice -
            (coursedata.discount * coursedata.coursePrice) / 100
          ).toFixed(2)}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <span className="line-through text-gray-400">
            {currency}{coursedata.coursePrice}
          </span>
          <span className="text-green-600 font-medium">
            {coursedata.discount}% off
          </span>
        </div>
      </div>

      {/* course meta */}
      <div className="flex justify-between text-sm text-gray-600 border-y py-3">
        <div className="flex items-center gap-1">
          <img src={assets.star} alt="" className="w-4 h-4" />
          <p>{calculateRating(coursedata)}</p>
        </div>

        <div className="flex items-center gap-1">
          <img src={assets.time_clock_icon} alt="" className="w-4 h-4" />
          <p>{calculateCourseTime(coursedata)}</p>
        </div>

        <div className="flex items-center gap-1">
          <img src={assets.lesson_icon} alt="" className="w-4 h-4" />
          <p>{countlectures(coursedata)} lessons</p>
        </div>
      </div>

      {/* enroll button */}
      <button
        className={`w-full py-3 rounded-md text-white font-medium transition ${
          enroll
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {enroll ? "Already Enrolled" : "Enroll Now"}
      </button>

      {/* course includes */}
      <div>
        <p className="font-semibold mb-3">This course includes</p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>🎥 HD video lectures</li>
          <li>📝 Chapter-wise quizzes</li>
          <li>🧪 Mock tests & practice</li>
          <li>📂 Downloadable resources</li>
          <li>📜 Certificate of completion</li>
          <li> ⏱  Lifetime access</li>
        </ul>
      </div>

    </div>
  </div>
</div>

      </div>

      <Footer />
    </div>
  )
}

export default CourseDetails
