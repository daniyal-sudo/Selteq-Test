import React from "react";
import { AiOutlineDelete, AiOutlineCopy, AiOutlineEdit } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TodoItem({
  allTodos,
  handleCopyClick,
  handleEditClick,
  handleToDoDelete,
  handleDragEnd,
}) {
  return (
    <>
      {allTodos && allTodos.length > 0 && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div
                className="todo-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {allTodos.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className="todo-list-item draggable-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                        <div>
                          <AiOutlineCopy
                            title="Copy"
                            className="icon"
                            onClick={() => handleCopyClick(index)}
                          />
                          <AiOutlineEdit
                            title="Edit"
                            className="icon"
                            onClick={() => handleEditClick(index)}
                          />
                          <AiOutlineDelete
                            title="Delete?"
                            className="icon"
                            onClick={() => handleToDoDelete(index)}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}

export default TodoItem;
