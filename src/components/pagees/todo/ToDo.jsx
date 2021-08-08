import React, { Component } from 'react';
// import styles from './todo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from "../../Task/Task.jsx";
import NewTask from "../../newTask/NewTask";
import Confirm from '../../confirm.jsx';
import EditTaskModal from '../../EditTaskModal.jsx';
import { connect } from 'react-redux';
import { getTasks, deleteTask, deleteTasks } from '../../../store/actions.js';

class ToDo extends Component {

    state = {
        // tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null
    }

    componentDidMount() {
        this.props.getTasks();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                openNewTaskModal: false
            })
            return;
        }

        if (!prevProps.deleteTaskSuccess && this.props.deleteTaskSuccess) {
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            })
            return;
        }


 

    }

    // addTask = (newTask) => {

    //     fetch('http://localhost:3001/task', {
    //         method: 'POST',
    //         body: JSON.stringify(newTask),
    //         headers: {
    //             "Content-Type": 'application/json'
    //         }
    //     })
    //         .then(async (response) => {

    //             const res = await response.json();

    //             if (response.status >= 400 && response.status < 600) {
    //                 if (res.error) {
    //                     throw res.error;
    //                 }
    //                 else {
    //                     throw new Error('Someting went wrong');
    //                 }
    //             }

    //             const tasks = [...this.state.tasks, res];

    //             this.setState({
    //                 tasks,
    //                 openNewTaskModal: false
    //             });

    //         })
    //         .catch((error) => {
    //             console.log('catch error', error);
    //         });


    // };

    // deleteTask = (taskID) => {



    //     fetch(`http://localhost:3001/task/${taskID}`, {
    //         method: 'DELETE',
    //         headers: {
    //             "Content-Type": 'application/json'
    //         }
    //     })
    //         .then(async (response) => {

    //             const res = await response.json();

    //             if (response.status >= 400 && response.status < 600) {
    //                 if (res.error) {
    //                     throw res.error;
    //                 }
    //                 else {
    //                     throw new Error('Someting went wrong');
    //                 }
    //             }


    //             this.setState({
    //                 tasks: this.state.tasks.filter((task) => taskID !== task._id)
    //             });

    //         })
    //         .catch((error) => {
    //             console.log('catch error', error);
    //         });

    // };

    toggleTask = (taskID) => {
        const selectedTasks = new Set(this.state.selectedTasks);

        if (selectedTasks.has(taskID)) {
            selectedTasks.delete(taskID);
        }
        else {
            selectedTasks.add(taskID)
        }

        this.setState({
            selectedTasks
        });
    };


    removeSelectid = () => {
        const { selectedTasks } = this.state;

        this.props.deleteTasks(selectedTasks);
    }

        //     const body = {
        //         tasks: [...selectedTasks]
        //     }


        //     fetch(`http://localhost:3001/task`, {
        //         method: 'PATCH',
        //         headers: {
        //             "Content-Type": 'application/json'
        //         },
        //         body: JSON.stringify(body)
        //     })
        //         .then(async (response) => {

        //             const res = await response.json();

        //             if (response.status >= 400 && response.status < 600) {
        //                 if (res.error) {
        //                     throw res.error;
        //                 }
        //                 else {
        //                     throw new Error('Someting went wrong');
        //                 }
        //             }

        //             const newTasks = tasks.filter((task) => {
        //                 if (selectedTasks.has(task._id)) {
        //                     return false;
        //                 }
        //                 return true;
        //             });

        //             this.setState({
        //                 tasks: newTasks,
        //                 selectedTasks: new Set(),
        //                 showConfirm: false
        //             });

        //         })
        //         .catch((error) => {
        //             console.log('catch error', error);
        //         });

        // };

        toggleConfirm = () => {
            this.setState({
                showConfirm: !this.state.showConfirm
            })
        }

        selectAll = () => {
            const taskIds = this.state.tasks.map((task) => task._id);

            this.setState({
                selectedTasks: new Set(taskIds)
            });
        };

        deSelectAll = () => {
            this.setState({
                selectedTasks: new Set()
            });
        };

        toggleNewTaskModal = () => {
            this.setState({
                openNewTaskModal: !this.state.openNewTaskModal
            });
        };

        handleEdit = (editTask) => {
            this.setState({ editTask })
        }

        handleSaveTask = (editedTask) => {

            fetch(`http://localhost:3001/task/${editedTask._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(editedTask)
            })
                .then(async (response) => {

                    const res = await response.json();

                    if (response.status >= 400 && response.status < 600) {
                        if (res.error) {
                            throw res.error;
                        }
                        else {
                            throw new Error('Someting went wrong');
                        }
                    }

                    const tasks = [...this.state.tasks];
                    const foundIndex = tasks.findIndex((task) => task._id === editedTask._id);
                    tasks[foundIndex] = editedTask;

                    this.setState({
                        tasks,
                        editTask: null
                    });

                })
                .catch((error) => {
                    console.log('catch error', error);
                });


        };

        render() {
            const { selectedTasks, showConfirm, openNewTaskModal, editTask } = this.state;
            const { tasks } = this.props;


            const taskComponents = tasks.map((task) => {

                return (
                    <Col
                        key={task._id}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2}
                    >
                        <Task
                            data={task}
                            onToggle={this.toggleTask}
                            disabled={!!selectedTasks.size}
                            onDelete={this.props.deleteTask}
                            selected={selectedTasks.has(task._id)}
                            onEdit={this.handleEdit}
                        />
                    </Col>
                )
            })

            return (
                <>
                    <br />
                    <Container>


                        <Row className="justify-content-center">
                            <Col>
                                <Button
                                    variant="primary"
                                    onClick={this.toggleNewTaskModal}
                                    disabled={selectedTasks.size}
                                >
                                    Add new Task
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="warning"
                                    onClick={this.selectAll}
                                >
                                    Select All
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="warning"
                                    onClick={this.deSelectAll}
                                >
                                    Deselect All
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="danger"
                                    onClick={this.toggleConfirm}
                                    disabled={!selectedTasks.size}
                                >
                                    Delete Selectid
                                </Button>
                            </Col>
                        </Row>

                        <Row>
                            {taskComponents}
                        </Row>
                    </Container>

                    {showConfirm && <Confirm
                        onClose={this.toggleConfirm}
                        onConfirm={this.removeSelectid}
                        count={selectedTasks.size}
                    />
                    }
                    {
                        openNewTaskModal &&
                        <NewTask
                            onClose={this.toggleNewTaskModal}
                        />
                    }
                    {
                        editTask && <EditTaskModal
                            data={editTask}
                            onClose={() => this.handleEdit(null)}
                            onSave={this.handleSaveTask}
                        />
                    }


                </>
            )
        }

    }

    const mapStateToProps = (state) => {
        return {
            tasks: state.tasks,
            addTaskSuccess: state.addTaskSuccess,
            deleteTaskSuccess: state.deleteTaskSuccess
        };
    };

    const mapDispatchToProps = {
        getTasks,
        deleteTask,
        deleteTasks

    };

    export default connect(mapStateToProps, mapDispatchToProps)(ToDo);