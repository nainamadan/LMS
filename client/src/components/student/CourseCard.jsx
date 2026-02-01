import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AddContext'

const CourseCard = ({ course }) => {

  // currency
  const { currency, calculateRating } = useContext(AppContext)

  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => window.scrollTo(0, 0)}
      className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg hover:shadow-md transition'
    >
      <img
        className='w-full h-40 object-cover'
        src={course.courseThumbnail}
        alt="photo"
      />

      <div className='p-3 text-left space-y-1'>
        {/* title */}
        <h3 className='text-base font-semibold'>
          {course.courseTitle}
        </h3>

        {/* edu name */}
        <p className='text-sm text-gray-500'>
         Naina madaan
        </p>

        <div className='flex items-center gap-2'>
          {/* avrage rating */}
          <p className='text-sm'>
            {calculateRating(course)}
          </p>

          {/* star ratng */}
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                className='w-3.5 h-3.5'
                alt="star"
              />
            ))}
          </div>

          {/* rating */}
          <p className='text-sm text-gray-500'>
            ({course.courseRatings?.length || 0})
          </p>
        </div>

        {/* we are putting currency in env becoz if we neeed to change then change from one place will change from everywhere */}
        <p className='text-base font-semibold text-gray-800'>
          {currency}
          {(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

export default CourseCard
