import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function Task({ task, index }) {
    return (
        <Draggable draggableId={`${task.id}`} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                        color: "white",
                        ...provided.draggableProps.style
                    }}
                >
                    {task.title}
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    );
}
