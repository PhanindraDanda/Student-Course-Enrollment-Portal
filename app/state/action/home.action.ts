import { createAction, props } from "@ngrx/store";


const GET_ALL_COURSES = "[GET] FETCH ALL COURSES FROM SERVER";
const ADD_COURSES = "[ADD] ADD COURSES TO STATE";
const UPDATE_COURSE_STATUS = "[UPDATE] UPDATE COURSE PAYMENT STATUS";


export const GetCourses = createAction(GET_ALL_COURSES)

export const AddCourses = createAction(ADD_COURSES,
props<{ course: any}>()

)
export const updateCourseStatus = createAction(UPDATE_COURSE_STATUS,
    props<{ courseList:any}>()
)
