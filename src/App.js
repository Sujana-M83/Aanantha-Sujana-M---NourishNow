import React from 'react';
import Login from './components/Login';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Registration from './components/Registration';
import FoodLog from './components/Foodlog';
import Progress from './components/Progress';
import RecipeFinder from './components/RecipeFinder';
import DashboardComponent from './components/DashboardComponent';
import Profile from './components/Profile';
import DietCards from './components/DietPlanPage';
import Quiz from './components/Quiz';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/foodlog" element={<FoodLog />} />
        <Route path="/recipefinder" element={<RecipeFinder />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="/nutritionalinfo" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dietplan" element={<DietCards />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
