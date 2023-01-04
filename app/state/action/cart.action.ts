import { createAction, props } from "@ngrx/store";


const GET_COURSE = "[GET] GET COURSE FROM CART";
const GET_COURSE_SUCCESS = "[GET] GET COURSE SUCCESS";
const GET_COURSE_FAILURE = "[GET] GET COURSE FAILURE";

const ADD_COURSE = "[ADD] ADD COURSE TO CART";
const ADD_COURSE_SUCCESS = "[ADD] ADD COURSE SUCCESS";
const ADD_COURSE_FAILURE = "[ADD] ADD COURSE FAILURE";

const REMOVE_COURSE = "[REMOVE] REMOVE COURSE FROM CART";
const REMOVE_COURSE_SUCCESS = "[REMOVE] REMOVE COURSE FROM CART SUCCESS";
const REMOVE_COURSE_FAILURE = "[REMOVE] REMOVE COURSE FROM CART FAILURE";

const CLEAR_CART = "[CLEAR] REMOVE ALL ITEMS FROM CART";


export const GetCourse = createAction(GET_COURSE)

export const GetCourseSuccess = createAction(GET_COURSE_SUCCESS,
props<{ course: any}>()
)
export const GetCourseFailure = createAction(GET_COURSE_FAILURE,
props<{error:any}>()
)


export const AddCourse = createAction(ADD_COURSE,
      props<{ course: any}>()
  )

export const AddCourseSuccess = createAction(ADD_COURSE_SUCCESS,
    props<{ course: any}>()
    )
export const AddCourseFailure = createAction(ADD_COURSE_FAILURE,
    props<{error:any}>()
    )

export const RemoveCourse = createAction(REMOVE_COURSE,
    props<{ course: any, action: boolean}>()
  )

  export const RemoveCourseSuccess = createAction(REMOVE_COURSE_SUCCESS,
    props<{ course: any, action: boolean}>()
  )

  export const RemoveCourseFailure = createAction(REMOVE_COURSE_FAILURE,
    props<{error:any}>()
    )

export const ClearCart = createAction(CLEAR_CART);
    
