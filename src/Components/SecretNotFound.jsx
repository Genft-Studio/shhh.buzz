import {Link} from "react-router-dom";
import React from "react";
import {Button} from "react-bootstrap";
import beeSleepy from "../assets/images/bees/bee-sleepy.png"

export const SecretNotFound = () =>
    <>
        <h4>That secret isn't available</h4>
        <Link to="/">
            <Button className="mt-4 mb-5">
                Create a new secret
            </Button>
        </Link>
        <div class="container-fluid">
            <div class="row">
                <div class="col"></div>
                <div class="col">
                    <img src={beeSleepy} alt="confused bee" className="img-fluid" />
                </div>
                <div className="col"></div>
            </div>
        </div>
    </>

export default SecretNotFound
