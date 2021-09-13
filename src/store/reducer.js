import * as actionTypes from './actionTypes';

const defaultState = {
    tasks: [],
    task: null,
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    editTasksSuccess: false,
    editTaskSuccess: false,
    loading: false,
    successMessage: null,
    errorMessage: null
};

export default function reducer(state = defaultState, action) {

    switch (action.type) {

        case actionTypes.PENDING: {
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                deleteTasksSuccess: false,
                editTasksSuccess: false,
                editTaskSuccess: false,
                successMessage: null,
                errorMessage: null
            };
        }

        case actionTypes.ERROR: {
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };
        }

        case actionTypes.GET_TASKS: {
            return {
                ...state,
                tasks: action.tasks,
                loading: false
            };
        }

        case actionTypes.GET_TASK: {
            return {
                ...state,
                task: action.task,
                loading: false
            };
        }
        case actionTypes.ADD_TASK: {

            return {
                ...state,
                tasks: [...state.tasks, action.task],
                addTaskSuccess: true,
                loading: false,
                successMessage: 'Task created successfully!'

            };
        }

        case actionTypes.DELETE_TASK: {

            
            if (action.from === 'single') {
                return {
                    ...state,
                    task: null,
                    loading: false,
                    successMessage: 'Task deleted successfully!'
                };
            };
            return {
                ...state,
                tasks: state.tasks.filter((task) => action.taskID !== task._id),
                loading: false,
                successMessage: 'Task deleted successfully!'
            };
        }
        case actionTypes.DELETE_TASKS: {
            const newTasks = state.tasks.filter((task) => {
                if (action.taskIDs.has(task._id)) {
                    return false;
                }
                return true;
            });
            return {
                ...state,
                tasks: newTasks,
                editTasksSuccess: true,
                loading: false,
                successMessage: 'Tasks deleted successfully!'
            };
        }

        case actionTypes.EDIT_TASK: {

            if (action.from === 'single') {
                return {
                    ...state,
                    task: action.editedTask,
                    editTaskSuccess: true,
                    loading: false,
                    successMessage: 'Task edited successfully!rrr'
                };
            }

            const tasks = [...state.tasks];
            const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id);
            tasks[foundIndex] = action.editedTask;


            return {
                ...state,
                tasks,
                editTasksSuccess: true,
                loading: false,
                successMessage: 'Task edited successfully!'
            };
        }

        default: return state;
    }
}