import React, { useEffect, useState } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

export default function KanbanBoard() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);

    // Функция для удаления элемента из списка по его ID
    const removeItemById = (id, list) => {
        return list.filter((item) => item.id !== parseInt(id));
    };

    // Функция для поиска задачи по ID
    const findItemById = (id, list) => {
        return list.find((item) => item.id === parseInt(id));
    };

    useEffect(() => {
        // Получаем список задач
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((json) => {
                setIncomplete(json.filter((task) => !task.completed));
                setCompleted(json.filter((task) => task.completed));
            });
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
    
        // Если элемент не переместился, выходим
        if (!destination) return;
    
        // Если элемент переместился в ту же колонку
        if (source.droppableId === destination.droppableId) {
            const sourceList = source.droppableId === "1" ? incomplete : completed;
            const setSourceList = source.droppableId === "1" ? setIncomplete : setCompleted;
    
            // Создаем новый массив с перестановкой задач
            const newList = Array.from(sourceList);
            const [movedTask] = newList.splice(source.index, 1); // Убираем перемещенную задачу
            newList.splice(destination.index, 0, movedTask); // Вставляем её в новое место
    
            // Обновляем состояние
            setSourceList(newList);
            return;
        }
    
        // Перемещение задачи между колонками
        let movedTask;
        if (source.droppableId === "1") {
            // Если задача перемещается из incomplete в completed
            movedTask = findItemById(draggableId, incomplete);
            setIncomplete(removeItemById(draggableId, incomplete));
            setCompleted((prevCompleted) => [{ ...movedTask, completed: true }, ...prevCompleted]);
        } else {
            // Если задача перемещается из completed в incomplete
            movedTask = findItemById(draggableId, completed);
            setCompleted(removeItemById(draggableId, completed));
            setIncomplete((prevIncomplete) => [{ ...movedTask, completed: false }, ...prevIncomplete]);
        }
    };
    
    

    return (
        <>
            <h1>KanbanBoard</h1>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Column title=" TO DO " tasks={incomplete} id="1" />
                    <Column title=" DONE " tasks={completed} id="2" />
                    <Column title=" BACKLOG " tasks={[]} id="3" />
                </div>
            </DragDropContext>
        </>
    );
}
