import beeAngry from "../assets/images/bees/bee-angry.png"
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export default () =>
    <>
        <div className="row mb-5">
            <div className="col-sm"></div>
            <div className="col-sm">
                <img src={beeAngry} className="img-fluid"/>
            </div>
            <div className="col-sm"></div>
        </div>
        <div className='row'>
            <div className='col'>
                <h3>It seems that you've lost your way</h3>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Link to="/">
                    <Button size="lg" variant="outline-primary">
                        Go back to the hive
                    </Button>
                </Link>
            </div>
        </div>
    </>