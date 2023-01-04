import  *  as actions from "../action/cart.action";
import { CourseInterface } from "../../components/course/course.interface";
import { createReducer, on } from "@ngrx/store";


export interface CourseState{
    courseList: CourseInterface[]
    isClicked:Map<string,boolean>
    loading:boolean,
    count : number
}

export const initialState : CourseState = {
    courseList: [],
    isClicked: new Map<string,boolean>(),
    loading:false,
    count : 0
}

export const newState = (state:any,newData:any)=>{

    return Object.assign({},state,newData);
}

export const courseReducer = createReducer(
    initialState,

    on(actions.GetCourse,(state) => (
        {
        ...state, 
        count:[...state.courseList].length,
        loading:true
   })),

   on(actions.GetCourseSuccess,(state,{course}) => (
    console.log(course),
    {
    ...state, 
    courseList:course,
    isClicked:getMap(course),
    loading:true
  })),

  on(actions.AddCourseFailure, (state,{error}) => ({
    ...state,
   loading:false
})),

    on(actions.AddCourse,(state,{course}) => (
        {
        ...state, 
       loading:true
   })),

    on(actions.AddCourseSuccess, (state,{course}) => (
        {
         ...state, 
        courseList:[...state.courseList,course.course],
        count:[...state.courseList].length,
        isClicked:state.isClicked.set(course.course.id,true),
        loading:false
    })),
    
    on(actions.AddCourseFailure, (state,{error}) => ({
        ...state,
       loading:false
   })),

    on(actions.RemoveCourse,(state,{course}) => (
        {
        ...state, 
        loading:true
    })),
    
    on(actions.RemoveCourseSuccess, (state,{course,action}) => (
        console.log(course.course)
        ,{ 
        ...state, 
        courseList:state.courseList.filter(item=>{return item.id != course.course.id}),
        count:[...state.courseList].length,
        isClicked:state.isClicked.set(course.course.id,action)
    })),

    on(actions.RemoveCourseFailure, (state,{error}) => ({
        ...state,
       loading:false
   })),

    on(actions.ClearCart, (state) => ({ 
        ...state, 
        courseList: new Array(),
        count:0,
        isClicked: new Map<string,boolean>()
    })),
)


function getMap(course:CourseInterface[]):Map<string,boolean>
{
    let map = new Map<string,boolean>();
    console.log(course);
    course.forEach(course=>{
        map.set(course.id,true);
    })
    return map;
}