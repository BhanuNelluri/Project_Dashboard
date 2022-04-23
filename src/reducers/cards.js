import { ADD_CARD,EDIT_CARD,DELETE_CARD } from "../constants/ActionTypes";

const initialState = {
  "card-0": {
    text: "Sample Highlight",
    id: `card-0`,
    list: "list-0"
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const { text, listID, id } = action.payload;
      const newCard = {
        text,
        id: `card-${id}`,
        list: listID
      };

      return { ...state, [`card-${id}`]: newCard };
    }
    case EDIT_CARD: {
      const { id, newText } = action.payload;
      const c = state[id];
      c.text = newText;
      return { ...state, [`card-${id}`]: c };
    }

    case DELETE_CARD: {
      const { id } = action.payload;
      const newState = state;
      delete newState[id];
      console.log(newState);
      return newState;
    }
    default:
      return state;
    }

}


