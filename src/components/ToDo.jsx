import React, { Component } from 'react';

class ToDo extends Component {
    state = {
        value: "",
        tasks: []
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

        const tasks = [...this.state.tasks, value];

        this.setState({

            tasks: tasks,
            value: ""
        })

    }


    render() {
        const { tasks, value } = this.state;

        const taskComponents = tasks.map((task, index) => {
            
            return (
                <li key={index}>{task}</li>
            )
        })
        return (
            <>
                <h2>ToDo List</h2>
                <input type="text" value={value} onChange={this.handleChange}></input>
                <button onClick={this.addTask}>add task</button>
                <ol>{taskComponents}</ol>
            </>
        )
    }

}



export default ToDo;