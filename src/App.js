import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ToDo from './components/todo/ToDo'

function App() {
  return (
    <div className="App">
  
      <header className="App-header">
      <ToDo/>
      {/*<Conditional/>
      <Product 
      name='Banana '
      price='2$'
     description=' Fresh Bananas from Finland ' 
     changecurrency="Change Currency" />

      <Counter defoultValue = {0} />*/}
      </header>
    </div>
  );
}

export default App;
