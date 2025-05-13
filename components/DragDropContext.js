import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DragDropArea = ({ items, setItems, droppableId, type }) => {
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // If the positions are the same
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Reordering logic
    const newItems = Array.from(items);
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);

    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId} type={type}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[300px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 mb-3 bg-white rounded-lg shadow-sm border ${
                      snapshot.isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-gray-800">{item.title}</div>
                      <div className="text-gray-500 text-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {items.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                Drag items here
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropArea;
