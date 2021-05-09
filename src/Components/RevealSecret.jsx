import React, {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import beeCarrying from "../assets/images/bees/bee-carrying.png"
import beeSitting from "../assets/images/bees/bee-sitting.png"
import {Link, useParams, useHistory} from 'react-router-dom'
import {KeplrClient} from "../State/KeplrClient";
import {CONTRACT_ADDRESS} from "../App";

export const RevealSecret = () => {
    const {tokenId} = useParams()

    const {client} = useContext(KeplrClient)

    const history = useHistory()
    const [inProgress, setInProgress] = useState(false)
    const [revealed, setRevealed] = useState('')

    const handleBurnToReveal = async () => {
        setInProgress(true)

        client.execute(CONTRACT_ADDRESS, {
            "burn_nft": {
                token_id: tokenId
            }
        }).then(res => {
            let result = JSON.parse(String.fromCharCode(...res.data))
            setRevealed(result?.burn_nft?.secret?.description)
            setInProgress(false)
        }).catch(err => {
            console.error(err)
            history.replace('/not-found')
        });
    }

    const ready = client && !inProgress

    return (
        <div className="container-fluid">
            {tokenId && !revealed &&
            <>
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <Form>
                            <h4>Burn token to reveal secret message.</h4>
                            <FormGroup controlId='burnToRevealButton' className="text-center">
                                <Button className='burn-to-reveal-button mt-4' variant="outline-primary" size="lg" disabled={!ready} onClick={handleBurnToReveal}>
                                    {inProgress ? <FontAwesomeIcon icon={faSpinner} spin/> : "Burn to Reveal"}
                                </Button>
                            </FormGroup>
                        </Form>
                        <img src={beeCarrying} className="img-fluid mt-5" alt="bee carrying bucket of honey" />
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </>
            }
            {revealed &&
            <>
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <Form>
                            <FormGroup controlId='revealedMessage'>
                                <FormLabel>Revealed Message</FormLabel>
                                <FormControl as="textarea" rows={3} value={revealed} disabled={true}/>
                            </FormGroup>
                            <Link to="/new">
                                <Button variant="outline-primary">
                                    Send another secret
                                </Button>
                            </Link>
                        </Form>
                        <img src={beeSitting} className="img-fluid mt-5" alt="bee sitting with a bucket of honey" />
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </>
            }
        </div>
    );

}

export default RevealSecret
