import React, { Component } from 'react';
import styles from './todo.module.css'
import idGenerator from '../../helpers_/idGenerator.jsx'
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap'

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
    }

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

    }

    deleteTask = (taskID) => {
        console.log(taskID);

        this.setState({
            tasks: this.state.tasks.filter((task) => taskID !== task._id)
        })
    }

    toggleTask = (taskID) => {
        const selectedTasks = new Set(this.state.selectedTasks);

        if(selectedTasks.has(taskID)) {
            selectedTasks.delete(taskID);
        }
        else {
            selectedTasks.add(taskID)
        }

        this.setState({
            selectedTasks
        });
    }


    render() {
        const { tasks, value } = this.state;



        const taskComponents = tasks.map((task) => {

            return (
                <Col
                    key={task._id}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}
                >
                    <Card className={styles.task}>
                        <Card.Body>
                            <input
                                type="checkbox"
                                onChange={() => this.toggleTask(task._id)} />
                            <Card.Title>
                                {task.title}
                            </Card.Title>
                            <Card.Text>
                                Some quick example text to build on
                  </Card.Text>
                            <Button
                                variant="danger"
                                onClick={() => this.deleteTask(task._id)}
                            >Delete
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
        })

        return (
            <>

                <Container>
                    <Row>
                        <h2>ToDo List</h2>
                        <Col xs={10}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Recipient's username"
                                    value={value}
                                    onChange={this.handleChange}
                                />
                                <Button
                                    variant="outline-primary"
                                    onClick={this.addTask}>
                                    Add
                                </Button>
                            </InputGroup>
                        </Col>
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