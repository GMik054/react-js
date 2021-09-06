import React, { Component } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../helpers_/utils';
import EditTaskModal from '../../EditTaskModal';
import { getTask, deleteTask } from '../../../store/actions';
import { connect } from 'react-redux';


class TaskPage extends Component {

    state = {
        openEditModal: false
    }

    componentDidMount() {


        const taskId = this.props.match.params.taskId;
        this.props.getTask(taskId);

    }

    deleteTask = () => {

        const taskId = this.props.task._id;
        this.props.deleteTask(taskId, 'single');

    }


    toggleEditModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    }


    render() {
        const { openEditModal } = this.state;
        const { task } = this.props;

        return (
            <div className='mt-5'>
                <Container>
                    <Row>
                        <Col xs={12}>

                            {task ?
                                <Card className='text-center'>
                                    <Card.Body>

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
                                            onClick={this.toggleEditModal}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />

                                        </Button>
                                        <Button
                                            className='m-1'
                                            variant="danger"
                                            onClick={this.deleteTask}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />

                                        </Button>
                                    </Card.Body>
                                </Card> :
                                <p>Not have Task</p>
                            }

                        </Col>
                    </Row>
                </Container>
                {
                    openEditModal &&
                    <EditTaskModal
                        data={task}
                        onClose={this.toggleEditModal}
                        from='single'
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.task
    };
};

const mapDispatchToProps = {
    getTask,
    deleteTask

};
export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);