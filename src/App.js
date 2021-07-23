import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/pagees/todo/ToDo';
import About from './components/pagees/About/About';
import Contact from './components/pagees/Contact/Contact';
import NotFound from './components/pagees/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import taskPage from './components/pagees/taskPage/taskPage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

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
            path='/task'
            component={taskPage}
            exact={true}
          />
          <Route
            path='/not-found'
            component={NotFound}
            exact={true}
          />

          <Redirect to='/not-found' />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
