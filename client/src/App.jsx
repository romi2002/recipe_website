import * as React from "react"
import './App.css';
import Button from '@mui/material/Button';
import Navbar from './components/Navigation/Navbar'
import RecipeGrid from "./components/RecipeGrid";
import Recipe from "./api/recipe"
import {useState, useEffect} from "react";



function App() {
    const [recipes, setRecipes] = useState([])

    const updateRecipes = async () => {
        const data = await Recipe.loadRecipes()
        setRecipes(data.data)
    }

    useEffect(() => {
        updateRecipes()
    }, [])

    return (
        <div className="App">
            <Navbar/>
            <RecipeGrid recipes={recipes}/>
            <Button variant="contained">Hello World</Button>
        </div>
    );
}

export default App;
