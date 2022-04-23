import React, { useState,PureComponent } from "react";
import TrelloList from "./list";
import { connect } from "react-redux";
import TrelloCreate from "./create";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort } from "../actions/lists";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledInput = styled.input`
  width: 100px;
  // outline-color: blue;
  border: none;
  border-radius: 3px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-Top: 20px;
  height:30px;
`;
const Display = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;


class Home extends PureComponent {
  
 
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };
  
   
     state = {
       fetchSearch:'',
     }
  render() {
    console.log(this.props);
    const { lists, cards} = this.props;
    const handleChange = (e) => {
      e.preventDefault();
      this.setState({
        fetchSearch:e.target.value
      })
  };
    console.log(lists);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        
        <Display class="filterBar input-group mb-3">
                   <h2>Dashboard</h2>
                        <StyledInput type="text"
                            class="searchBar form-control"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                            value={this.state.fetchSearch}
                            placeholder='Filter'
                            onChange={handleChange}
                        />
                   </Display>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              
              {lists.filter((list) =>
                        list.title.toLowerCase().includes(this.state.fetchSearch.toLowerCase())
                    ).map((list,index) => {
                const cardsList = list.cards.map(cardID => cards[cardID]);
                  return (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={cardsList}
                      index={index}
                      isSelected = {list.id==='list-0'?true:false}
                    />
                  );
               
              })}
              {provided.placeholder}
              <TrelloCreate list />
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
});

export default connect(mapStateToProps)(Home);
