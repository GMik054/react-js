import request from "../helpers_/request"

export function getTasks() {

    return (dispatch) => {
        request(`http://localhost:3001/task`)
            .then((tasks) => {
                dispatch({ type: 'GET_TASKS', tasks: tasks })
            });
    }
};

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: 'ADDING_TASK' });

        request(`http://localhost:3001/task`, 'POST', newTask)
            .then((task) => {
                dispatch({ type: 'ADD_TASK', task })
            });
    }

};

export function deleteTask(taskID){
    return function(dispatch){
        request(`http://localhost:3001/task/${taskID}`, 'DELETE')
        .then(() => {
            dispatch({ type: 'DELETE_TASK', taskID })
        });
    }
}

export function deleteTasks(taskIDs){

    return function(dispatch){

        dispatch({ type: 'DELETING_TASKS' });

        request(`http://localhost:3001/task`, 'PATCH', {
            tasks: [...taskIDs]
        })
        .then(() => {
            dispatch({ type: 'DELETE_TASKS', taskIDs })
        });
    }
}