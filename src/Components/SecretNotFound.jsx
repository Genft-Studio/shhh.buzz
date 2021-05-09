import {Link} from "react-router-dom";
import React from "react";

export const SecretNotFound = () =>
    <>
        <div>That secret isn't available</div>
        <Link as="Button" to="/">Create a new secret</Link>
    </>

export default SecretNotFound
