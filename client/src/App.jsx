import * as React from "react"
import './App.css';
import Button from '@mui/material/Button';
import Navbar from './components/Navigation/Navbar'
import RecipeGrid from "./components/Recipe/RecipeGrid";
import Recipe from "./api/recipe"
import {useState, useEffect} from "react";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import LoginModal from "./components/User/LoginModal"


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
        <RecoilRoot>
            <div className="App">
                <Navbar/>
                <RecipeGrid recipes={recipes}/>
                <LoginModal/>
            </div>
        </RecoilRoot>
    );
}

export default App;
