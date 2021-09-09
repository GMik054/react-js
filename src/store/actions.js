import request from "../helpers_/request";
import * as actionTypes from './actionTypes';
import {history} from '../helpers_/history';


const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params={}) {

    const query = Object.entries(params).map(([key, value])=>`${key}=${value}`).join('&');


    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING});
        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                dispatch({ type: actionTypes.GET_TASKS, tasks: tasks });
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            });
    }
};


export function getTask(taskId) {

    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING});
        request(`${apiHost}/task/${taskId}`)
            .then((task) => {
                dispatch({ type: actionTypes.GET_TASK, task});
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            });
    }
};


export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING});

        request(`${apiHost}/task`, 'POST', newTask)
            .then((task) => {
                dispatch({ type: actionTypes.ADD_TASK, task });
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            });
    }

};

export function deleteTask(taskID, from) {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING});
        request(`${apiHost}/task/${taskID}`, 'DELETE')
            .then(() => {
                dispatch({ type: actionTypes.DELETE_TASK, taskID, from });
                if(from === 'single'){
                    history.push('/');
                }
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            });
    }
}

export function deleteTasks(taskIDs) {

    return function (dispatch) {

        dispatch({ type: actionTypes.PENDING});
        request(`${apiHost}/task`, 'PATCH', {
            tasks: [...taskIDs]
        })
            .then(() => {
                dispatch({ type: actionTypes.DELETE_TASKS, taskIDs });
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            });
    }
}

export function editTask(data, from ) {

    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING});
        request(`${apiHost}/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                dispatch({ type: actionTypes.EDIT_TASK, editedTask, from });
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            });
    }
}

