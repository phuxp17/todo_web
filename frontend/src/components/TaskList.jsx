import React from 'react';
import TaskEmptyState from "@/components/TaskEmptyState.jsx";
import TaskCard from "@/components/TaskCard.jsx";

const TaskList = ({filteredTasks, filter, handleTaskChange}) => {
    if (!filteredTasks || filteredTasks.length === 0) {
        return <TaskEmptyState filter ={filter}/>
    }
    return (
        <div className="space-y-3">
            {filteredTasks.map((task, index) => (
                <TaskCard
                    key={task.id ?? index}
                    task={task}
                    index={index}
                    handleTaskChange={handleTaskChange}
                />
            ))}
        </div>
    );
};

export default TaskList;