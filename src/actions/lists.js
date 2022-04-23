import { ADD_LIST,DRAG_HAPPENED,EDIT_LIST,DELETE_LIST } from "../constants/ActionTypes";
import uuid from "uuidv4";

export const addList = title => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch({
      type: ADD_LIST,
      payload: { title, id }
    });
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    dispatch({
      type: DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type
      }
    });
  };
};

export const editTitle = (listID, newTitle) => {
  return {
    type: EDIT_LIST,
    payload: {
      listID,
      newTitle
    }
  };
};

export const deleteList = listID => {
  return (dispatch, getState) => {
    return dispatch({
      type: DELETE_LIST,
      payload: {
        listID
      }
    });
  };
};
