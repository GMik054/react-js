import React, { PureComponent } from "react";
import { Card, Button } from 'react-bootstrap';
import styles from './task.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../helpers_/utils.jsx'

class Task extends PureComponent {


    handleChange = () => {
        const { data, onToggle } = this.props;
        onToggle(data._id);

    };

    render() {

        const task = this.props.data;
        const { disabled, onDelete, selected, onEdit } = this.props;


        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>
                <Card.Body>
                    <input
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={selected}
                    />
                    <Card.Title>
                        {task.title}
                    </Card.Title>
                    <Card.Text>
                        Description: {task.description}
                    </Card.Text>
                    <Card.Text>
                        Date: {formatDate(task.date)}
                    </Card.Text>
                    <Button
                        className='m-1'
                        variant="warning"
                        // disabled={disabled}
                        onClick={() => onEdit(task)}
                    >
                        <FontAwesomeIcon icon={faEdit} />

                    </Button>
                    <Button
                        className='m-1'
                        variant="danger"
                        disabled={disabled}
                        onClick={() => onDelete(task._id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />

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