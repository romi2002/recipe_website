import * as React from "react"
import './App.css';
import Button from '@mui/material/Button';
import Navbar from './components/Navigation/Navbar'
import RecipeGrid from "./components/Recipe/RecipeGrid";
import Recipe from "./api/recipe"
import {useState, useEffect} from "react";
import {Box} from "@mui/material"

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
                <Box sx={{mt: 2}}>
                    <RecipeGrid recipes={recipes}/>
                </Box>
            </div>
    );
}

export default App;
