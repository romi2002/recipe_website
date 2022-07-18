import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import RecipeView from './components/Recipe/RecipeView'
import RecipeEditor from './components/Recipe/Editor/RecipeEditor'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <React.Fragment>
            <CssBaseline/>
            <RecoilRoot>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                        <Route path={'recipes'}>
                            <Route path={':recipeId'} element={<RecipeView/>}/>
                            <Route path={'editor'} element={<RecipeEditor/>}/>
                        </Route>
                        <Route path="*"
                               element={<h1>404</h1>}
                        />
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>
        </React.Fragment>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
