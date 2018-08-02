import { ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST } from '../constants'

const initialState = {
  assignmentList: null,
}

export default function assignmentReducer (state = initialState, action) {
  switch (action.type) {
    case ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST:
      return Object.assign({}, state, {
        assignmentList: action.payload.assignmentList
      })
    default:
      return state
  }
}