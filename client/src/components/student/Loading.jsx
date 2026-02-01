import React from "react"

const LoadingPage = ({ text = "Loading, please wait..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-5 text-sm sm:text-base text-gray-600">
        {text}
      </p>

    </div>
  )
}

export default LoadingPage
