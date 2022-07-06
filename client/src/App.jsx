import * as React from "react"
import './App.css';
import Button from '@mui/material/Button';
import Navbar from './components/Navigation/Navbar'
import RecipeCard from "./components/RecipeCard";


function App() {
    return (
        <div className="App">
            <Navbar/>
            <RecipeCard/>
            <Button variant="contained">Hello World</Button>
        </div>
    );
}

export default App;
