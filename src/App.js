import './App.scss';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SetupSecret from "./Components/SetupSecret";
import RevealSecret from "./Components/RevealSecret";
import SecretNotFound from "./Components/SecretNotFound";
import Welcome from "./Components/Welcome"
import {ClientProvider} from "./State/KeplrClient";
import UnknownUrl from "./Components/UnknownUrl";

export const CONTRACT_ADDRESS = 'secret19vc03hfsuqfsmt73c4fypg5au07lfngpcw2ytc'

function App() {
    return (
        <ClientProvider>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <h1>Shhh.buzz</h1>
                        Like Snapchat, except for secrets
                    </header>
                    <Switch>
                        <Route path='/' exact>
                            <Welcome/>
                        </Route>
                        <Route path='/new' exact>
                            <SetupSecret/>
                        </Route>
                        <Route path='/not-found' exact>
                            <SecretNotFound/>
                        </Route>
                        <Route path='/:tokenId' exact>
                            <RevealSecret/>
                        </Route>
                        <Route path='*'>
                            <UnknownUrl/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ClientProvider>
    )
}

export default App;
