import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/pagees/todo/ToDo';
import About from './components/pagees/About/About';
import Contact from './components/pagees/Contact/Contact';
import NotFound from './components/pagees/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import TaskPage from './components/pagees/TaskPage/TaskPage';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from './helpers_/history';



const toastProps = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
}

function App({ loading, successMessage, errorMessage }) {

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastProps);
    }

    if (errorMessage) {
      toast.error(errorMessage, toastProps);
    }

  }, [successMessage, errorMessage]);


  return (
    <div className="App">
      <Router history={history}>

        <NavMenu />

        <Switch>
          <Route
            path='/'
            component={ToDo}
            exact={true}
          />
          <Route
            path='/home'
            component={ToDo}
            exact
          />
          <Route
            path='/about'
            component={About}
            exact={true}
          />
          <Route
            path='/contact'
            component={Contact}
            exact={true}
          />
          <Route
            path='/task/:taskId'
            component={TaskPage}
            exact={true}
          />
          <Route
            path='/not-found'
            component={NotFound}
            exact={true}
          />

          <Redirect to='/not-found' />

        </Switch>
      </Router>
      {loading && <Spinner />}
      <ToastContainer />

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    successMessage: state.successMessage,
    errorMessage: state.errorMessage
  };
};



export default connect(mapStateToProps)(App);
