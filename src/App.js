import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Activities from './components/activities';

function App() {
  return (
    <div className="App">
      <Router>
        <Activities/> 
      </Router>
    </div>
  );
}



export default App;
