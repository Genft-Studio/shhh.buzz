import beeShowingStinger from "../assets/images/bees/bee-showing-stinger.png"
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export const Welcome = () => {
    return (
        <div className="XXXcontainer welcome">
            <div className="row mb-5">
                <div className="col">
                    <Link to="/new">
                        <Button size="lg" variant="outline-primary">
                            Create Secret Message
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <h1>Trustless</h1>
                    <h1>Temporary</h1>
                </div>
                <div className="col-sm">
                    <img src={beeShowingStinger} className="img-fluid" />
                </div>
                <div className="col-sm">
                    <h1>Secret</h1>
                    <h1>Sharing</h1>
                </div>
            </div>
        </div>
    )
}

export default Welcome
