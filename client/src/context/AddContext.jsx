// this file will have all common logics state and functions
import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import {useNavigate, } from 'react-router-dom'
import humanizeDuration from "humanize-duration";
export const AppContext=createContext();

export const AppContextProvider=(props)=>{

// creating currency an env variable
const currency=import.meta.env.VITE_CURRENCY

// navigate to home page on clicking on logo from any page
const navigate=useNavigate()
// get all course data
const[allCourses,setAllCourses]=useState([])

// iseducator will get diff nav bar
const[isEducator,setIsEducator]=useState(true)
// enrollements
const[enrolledCourses,setEnrolledCourses]=useState([])

// fn to add data in this state
const fetchenrolledcourse=async()=>{
  setEnrolledCourses(dummyCourses)
}
const fetchAllCourses=async()=>{
  setAllCourses(dummyCourses)
}
// execute the fn
useEffect(()=>{
  fetchAllCourses()
  fetchenrolledcourse()
})
// fn to calculate average rating
const calculateRating=(course)=>{
  if(course.courseRatings.length===0){return 0;}
  let totalRating=0;
  course.courseRatings.forEach(rating=>{
    totalRating+=rating.rating
  })
  return totalRating/course.courseRatings.length
}

// fn to calculate course chapter time
// each chapter have multile lectures
const calculatelectureTime=(chapter)=>{
  let time=0
  chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration)
// this time is in minutes
return humanizeDuration(time*60*1000,{units:["h","m"]})
}
// course duration

const calculateCourseTime=(course)=>{
  let time=0
  course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>
 time+=lecture.lectureDuration))
// this time is in minutes
return humanizeDuration(time*60*1000,{units:["h","m"]})
}

// total lecture in course
const countlectures=(course)=>{
let count=0;
course.courseContent.forEach(chapter=>{
  if(Array.isArray(chapter.chapterContent)){
    count+=chapter.chapterContent.length
  }
})
return count;
}


  const value={
currency,allCourses,navigate,calculateRating,isEducator,setIsEducator,countlectures,calculateCourseTime,calculatelectureTime,enrolledCourses,fetchenrolledcourse
  }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}