import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import idGenerator from '../../helpers_/idGenerator.jsx';
import PropTypes from 'prop-types';




class NewTask extends Component {

    state = {
        title: "",
        description: ""
    }

    handleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    };

    handlekeyDown = (event) => {
        if (event.key === "Enter") {
            // this.addTask();
        }
    }

    handleSubmit = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }


        const newTask = {
            _id: idGenerator(),
            title: title,
            description: description
        };

        this.props.onAdd(newTask);
      
        this.setState({
            title: "",
            description: ""
        });

    };

    render() {

        const { title, description } = this.state;
        const { disabled } = this.props;

        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Title"
                    value={title}
                    onChange={this.handleChange}
                    onKeyDown={this.handlekeyDown}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={this.handleSubmit}
                        disabled={disabled}
                    >
                        Add
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}

NewTask.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default NewTask;