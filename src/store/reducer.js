
const defaultState = {
    tasks: [],
    addTaskSuccess: false,
    deleteTaskSuccess: false
};

export default function reducer(state = defaultState, action) {

    switch (action.type) {

        case 'GET_TASKS': {
            return {
                ...state,
                tasks: action.tasks
            };
        }
        case 'ADD_TASK': {

            return {
                ...state,
                tasks: [...state.tasks, action.task],
                addTaskSuccess: true
            };
        }
        case 'ADDING_TASK': {

            return {
                ...state,
                addTaskSuccess: false
            };
        }
        case 'DELETE_TASK': {

            return {
                ...state,
                tasks: state.tasks.filter((task) => action.taskID !== task._id)
            };
        }
        case 'DELETE_TASKS': {
            const newTasks = state.tasks.filter((task) => {
                if (action.taskIDs.has(task._id)) {
                    return false;
                }
                return true;
            });
            return {
                ...state,
                tasks: newTasks,
                deleteTaskSuccess: true
            };
        }
        case 'DELETING_TASKS': {

            return {
                ...state,
                deleteTaskSuccess: false
            };
        }

        default: return state;
    }
}