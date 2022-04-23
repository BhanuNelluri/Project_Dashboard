import { ADD_LIST,ADD_CARD,DRAG_HAPPENED,DELETE_CARD,DELETE_LIST,EDIT_LIST } from '../constants/ActionTypes';

const initialState = [
  {
    id: "list-0",
    cards: ["card-0"],
    title: "myList"
  }
];

export default  (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST: {
      const { title, id } = action.payload;
      const newList = {
        title: title,
        id: `list-${id}`,
        cards: []
      };
      state.push(newList);
      const newState = state.map(list=>{
          return list;
        }
      );
      return newState;
    }

    case ADD_CARD: {
      const { listID, id } = action.payload;
      const newState = state.map(list=>{
        if(list.id===listID){
          return {
            ...list,
            cards:[...list.cards,`card-${id}`]
          };
        }else{
          return list;
        }
      });
      return newState;
    }

    case DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
         droppableIndexStart,
        draggableId,
        type
      } = action.payload;

      
      const newState = [...state];
      if(type==="list"){
        const list = newState.splice(droppableIndexStart,1);
        newState.splice(droppableIndexEnd,0,...list);
        return newState;
      }
      if (droppableIdStart === droppableIdEnd) {
        const l = state.find(list=>droppableIdStart===list.id);
        const c = l.cards.splice( droppableIndexStart, 1);
        l.cards.splice( droppableIndexEnd, 0, ...c);
        return newState;
      }

      if (droppableIdStart !== droppableIdEnd) {
        const lStart = state.find(list=>droppableIdStart===list.id);
        const card = lStart.cards.splice( droppableIndexStart, 1);
        const lEnd = state.find(list=>droppableIdEnd===list.id);

        lEnd.cards.splice( droppableIndexEnd, 0, ...card);
        return newState;
      }
      return state;

    case DELETE_CARD: {
      const newState = [...state];
      const { listID, id } = action.payload;
      const l = state.find(list=>listID===list.id);
      l.cards = l.cards.filter(lid => lid!=id);
      return newState;
    }

    case EDIT_LIST: {
      const newState = [...state];
      const { listID, newTitle } = action.payload;
      const l = state.find(list=>listID===list.id);;
      l.title = newTitle;
      return newState;
    }

    case DELETE_LIST: {
      const { listID } = action.payload;
      const newState = state.filter(list => list.id!=listID);
      return newState;
    }

    default:
      return state;
  }
}