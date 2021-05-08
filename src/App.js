import './App.scss';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SetupSecret from "./SetupSecret";
import RevealSecret from "./RevealSecret";
import Welcome from "./Welcome"

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Shhh.buzz</h1>
                    A simple app for the secret network
                </header>
                <Switch>
                    <Route path='/' exact>
                        <Welcome />
                    </Route>
                    <Route path='/new' exact>
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
