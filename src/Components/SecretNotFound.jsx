import {Link} from "react-router-dom";
import React from "react";
import {Button} from "react-bootstrap";
import beeSleepy from "../assets/images/bees/bee-sleepy.png"

export const SecretNotFound = () =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-5 mt-5">
                <h4>404: Secret Not Found</h4>
                <Link to="/">
                    <Button className="mt-4 mb-5" variant="outline-primary" size="lg">
                        Create New Secret
                    </Button>
                </Link>
            </div>
            <div className="col-7">
                <img src={beeSleepy} alt="confused bee" className="img-fluid" />
            </div>
        </div>
    </div>

export default SecretNotFound
