import React, { Component } from 'react';
// import styles from './todo.module.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from "../Task/Task.jsx"
import NewTask from "../newTask/NewTask"
import Confirm from '../confirm.jsx';

class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        openNewTaskModal: false
    }



    addTask = (newTask) => {

        const tasks = [...this.state.tasks, newTask];

        this.setState({
            tasks,
            openNewTaskModal: false
        });

    };

    deleteTask = (taskID) => {

        this.setState({
            tasks: this.state.tasks.filter((task) => taskID !== task._id)
        });
    };

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
        const { selectedTasks, tasks } = this.state;

        const newTasks = tasks.filter((task) => {
            if (selectedTasks.has(task._id)) {
                return false;
            }
            return true;
        });

        this.setState({
            tasks: newTasks,
            selectedTasks: new Set(),
            showConfirm: false
        });
    };

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

    toggleNewTaskModal=()=>{
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        });
    };

    render() {
        const { tasks, selectedTasks, showConfirm, openNewTaskModal } = this.state;



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
                        onDelete={this.deleteTask}
                        selected={selectedTasks.has(task._id)}
                    />
                </Col>
            )
        })

        return (
            <>
                <h2>ToDo List</h2>
                <Container>


                    <Row className="justify-content-center">
                        <Col>
                            <Button
                                variant="primary"
                                onClick={this.toggleNewTaskModal}
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
                            >Delete Selectid
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
                    onAdd={this.addTask}
                />
                }
               
            </>
        )
    }

}

export default ToDo;