import logo from './logo.svg';
import './App.css';
import Product from './homework-6/Product'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Product 
      name='Banana '
      price='2$'
      description=' Fresh Bananas from Finland' />
      </header>
    </div>
  );
}

export default App;
