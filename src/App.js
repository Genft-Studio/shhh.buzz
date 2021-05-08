import './App.scss';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SetupSecret from "./SetupSecret";
import RevealSecret from "./RevealSecret";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    A simple app for the secret network
                </header>
                <Switch>
                    <Route path='/' exact>
                        <SetupSecret/>
                    </Route>
                    <Route path='/:tokenId' exact>
                        <RevealSecret/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
