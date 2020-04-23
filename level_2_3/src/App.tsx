import React, {useState} from 'react';
import {
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";

import Category from "./components/Category";
import Categories from "./components/Categories";

import './App.scss';


function App() {
    const [bgImage, setBgImage] = useState<string>();

    return (
        <>
            <div className="blurry-bg">
                <div id="blurry-img" style={bgImage ? {backgroundImage: `url(${bgImage})`} : undefined}/>
            </div>
            <div className="container">
                <h1>Fotogaléria</h1>
                <BrowserRouter>
                    <Switch>
                        <Route path="/kategoria/:category">
                            <Category/>
                        </Route>
                        <Route path="/">
                            <Categories setBgImage={setBgImage}/>
                        </Route>
                    </Switch>
                </BrowserRouter>
                <p className="design-by">webdesign by bart.sk</p>
            </div>
        </>
);
}

export default App;
