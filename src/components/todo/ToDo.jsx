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
        showConfirm: false
    }



    addTask = (newTask) => {

        const tasks = [...this.state.tasks, newTask];

        this.setState({
            tasks,
        });

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
            selectedTasks: new Set(),
            showConfirm: false
        })
    };

    toggleConfirm=()=>{
        this.setState({
            showConfirm: !this.state.showConfirm
        })
    }

    render() {
        const { tasks, selectedTasks, showConfirm} = this.state;



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

                            <NewTask
                                disabled={!!selectedTasks.size}
                                onAdd={this.addTask}
                            />

                        </Col>


                    </Row>

                    <Row>

                        <Button
                            variant="danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                        >Delete Selectid
                        </Button>

                    </Row>

                    <Row>
                        {taskComponents}
                    </Row>
                </Container>

                {showConfirm && <Confirm
                    onClose={this.toggleConfirm}
                    onConfirm={this.removeSelectid}
                    count={selectedTasks.size}
                    />}
            </>
        )
    }

}

export default ToDo;