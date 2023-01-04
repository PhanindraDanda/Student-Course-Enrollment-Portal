import { createAction, props } from "@ngrx/store";


const GET_ALL_LEARNINGS = "[GET] FETCH ALL LEARNINGS FROM SERVER";
const ADD_LEARNINGS = "[ADD] ADD LEARNING TO STATE";



export const GetLearnings = createAction(GET_ALL_LEARNINGS)

export const AddLearnings = createAction(ADD_LEARNINGS,
props<{ course: any}>()

)

