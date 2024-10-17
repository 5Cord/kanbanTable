import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

export default function Column({ title, tasks, id }) {
    return (
        <>
            <h2>{title}</h2>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey', padding: 8, width: 250, minHeight: 500 }}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>
    );
}
