import  *  as actions from "../action/home.action";
import { CourseInterface } from "../../components/course/course.interface";
import { createReducer, on } from "@ngrx/store";


export interface HomeState{
    courseList: CourseInterface[]
    status:Map<string,string>;
}

export const initialState : HomeState = {
    courseList: [],
    status: new Map<string,string>()
}

export const newState = (state:any,newData:any)=>{

    return Object.assign({},state,newData);
}

export const HomeReducer = createReducer(
    initialState,

    on(actions.GetCourses,(state) => (
        {
        ...state
   })),

  on(actions.AddCourses, (state,{course}) => ({
    ...state,
    courseList:course,
    status:UpdateCourse(course,"unpaid")
  })),

  on(actions.updateCourseStatus, (state,{courseList}) => (
    console.log(courseList),{
    ...state,
    status:UpdateStatus(state.status,courseList,"paid"),
  })),
)

function UpdateCourse(course:CourseInterface[], status:string):Map<string,string>
{
    let map = new Map<string,string>();
    console.log(course);
    course.forEach(course=>{
        map.set(course.id,status);
    })
    return map;
}

function UpdateStatus(map:Map<string,string>, course:CourseInterface[], status:string):Map<string,string>
{
        course.forEach(course=>{
            map.set(course.id,status);
        })
    return map;
}
