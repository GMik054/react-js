import logo from './logo.svg';
import './App.css';
import Product from './homework-6/Product'
import Counter from './Counter.jsx'
import Conditional from './demo/Conditional.jsx'
import ToDo from './components/ToDo.jsx'

function App() {
  return (
    <div className="App">
  
      <header className="App-header">
      <ToDo/>
      <Conditional/>
      {/*<Product 
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
