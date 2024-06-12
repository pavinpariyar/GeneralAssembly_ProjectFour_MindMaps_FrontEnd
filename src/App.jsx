import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Create-Account" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
