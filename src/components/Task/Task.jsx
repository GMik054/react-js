import React, { Component } from "react";
import { Card, Button } from 'react-bootstrap';
import styles from './task.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

class Task extends Component {


    handleChange = () => {
        const { data, onToggle } = this.props;
        onToggle(data._id);
     
    };

    render() {

        const task = this.props.data;
        const { disabled, onDelete, selected} = this.props;
        

        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>
                <Card.Body>
                    <input
                        type="checkbox"
                        onChange={this.handleChange} 
                        checked = {selected}
                        />
                    <Card.Title>
                        {task.title}
                    </Card.Title>
                    <Card.Text>
                    {task.description}
                    </Card.Text>
                    <Button
                    className='m-1'
                    variant="warning"
                    // disabled={disabled}
                    // onClick={() => onDelete(task._id)}
                >
                <FontAwesomeIcon icon = {faEdit}/>
                
                </Button>
                    <Button
                        className='m-1'
                        variant="danger"
                        disabled={disabled}
                        onClick={() => onDelete(task._id)}
                    >
                    <FontAwesomeIcon icon = {faTrash}/>
                    
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
};

export default Task;