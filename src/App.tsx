import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <div className="app-container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
