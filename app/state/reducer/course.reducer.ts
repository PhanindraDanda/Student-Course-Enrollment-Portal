import  *  as actions from "../action/course.action";
import { CourseInterface } from "../../components/course/course.interface";
import { createReducer, on } from "@ngrx/store";


export interface LearningState{
    courseList: CourseInterface[],
    loading:boolean,
}

export const initialState : LearningState = {
    courseList: [],
    loading:false
}

export const newState = (state:any,newData:any)=>{

    return Object.assign({},state,newData);
}

export const LearningsReducer = createReducer(
    initialState,

    on(actions.GetLearnings,(state) => (
        {
          ...state,
          loading:true
       })),

    on(actions.AddLearnings, (state,{course}) => (
    {
        ...state,
        courseList:course,
        loading:false
    })),

)
