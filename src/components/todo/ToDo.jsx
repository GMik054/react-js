import React, { Component } from 'react';
import styles from './todo.module.css'
import idGenerator from '../../helpers_/idGenerator.jsx'
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import Task from "../Task/Task.jsx"


class ToDo extends Component {

    state = {
        value: "",
        tasks: [],
        selectedTasks: new Set()
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    };

    addTask = () => {

        const value = this.state.value.trim();

        if (!value) {
            return;
        }


        const newTask = {
            _id: idGenerator(),
            title: value
        }

        const tasks = [...this.state.tasks, newTask];

        this.setState({

            tasks,
            value: ""
        })

    };

    deleteTask = (taskID) => {

        this.setState({
            tasks: this.state.tasks.filter((task) => taskID !== task._id)
        })
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
            selectedTasks: new Set()
        })
    };

    handlekeyDown = (event) => {
        if (event.key === "Enter") {
            this.addTask();
        }
    }

    render() {
        const { tasks, value, selectedTasks } = this.state;



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
               />
                </Col>
            )
        })

        return (
            <>

                <Container>
                    <Row className="justify-content-center">
                        <h2>ToDo List</h2>
                        <Col xs={10}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Recipient's username"
                                    value={value}
                                    onChange={this.handleChange}
                                    onKeyDown={this.handlekeyDown}
                                    disabled={!!selectedTasks.size}
                                />
                                <Button
                                    variant="outline-primary"
                                    onClick={this.addTask}
                                    disabled={!!selectedTasks.size}
                                >
                                    Add
                                </Button>
                            </InputGroup>
                        </Col>


                    </Row>

                    <Row>

                        <Button
                            variant="danger"
                            onClick={this.removeSelectid}
                            disabled={!selectedTasks.size}
                        >Delete Selectid
                        </Button>

                    </Row>

                    <Row>
                        {taskComponents}
                    </Row>
                </Container>
            </>
        )
    }

}



export default ToDo;