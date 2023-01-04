import { createAction, props } from "@ngrx/store";

const GET_TOKEN = "[GET] Auth Token";
const ADD_TOKEN = "[ADD] Auth Token";
const REMOVE_TOKEN = "[DELETE] Auth Token";


export const getToken = createAction(GET_TOKEN)

export const AddToken = createAction(ADD_TOKEN,
props<{ token: any}>()
)

export const deleteToken = createAction(REMOVE_TOKEN)

