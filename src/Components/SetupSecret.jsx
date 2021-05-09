import React, {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import beeShowingStinger from "../assets/images/bees/bee-showing-stinger.png"
import beePointing from "../assets/images/bees/bee-pointing-right.png"
import {KeplrClient} from "../State/KeplrClient";
import {CONTRACT_ADDRESS} from "../App";
import {Random} from "@iov/crypto";

export const SetupSecret = () => {
    const {client} = useContext(KeplrClient)
    const [inProgress, setInProgress] = useState(false)
    const [message, setMessage] = useState('')
    const [copied, setCopied] = useState(false)

    const [tokenId, setTokenId] = useState('')

    const handleCreateToken = async () => {
        setInProgress(true)
        const token_id = Random.getBytes(16).reduce(
            (acc, b) => acc + b.toString(16).padStart(2, "0"),
            ''
        )
        let response = await client.execute(CONTRACT_ADDRESS, {
            "mint_nft": {
                token_id,
                public_metadata: {description: message}
            }
        }).catch(f => console.log(f));
        let result = JSON.parse(String.fromCharCode(...response.data))
        let tokenId = result?.mint_nft?.token_id
        setTokenId(tokenId)
        setMessage('')
        setInProgress(false)
    }

    // NOTE: Make sure prompt to "install holodeck-2" pops up for users who haven't added it yet

    const ready = client && !inProgress

    const onChangeEvent = fn => ({target: {value}}) => fn(value)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <img src={beePointing} className="img-fluid" alt="bee pointing" />
                </div>
                <div className="col">
                    {ready && tokenId &&
                    <>
                        <h4>Your secret token is ready</h4>
                        <div>
                            <CopyToClipboard text={`${window.location.origin}/${tokenId}`}
                                             onCopy={e => setCopied(true)}>
                                <span>
                                    {`${window.location.origin}/${tokenId}`}<FontAwesomeIcon className="ml-1 mr-1"
                                                                                             icon={faClipboard}/>
                                </span>
                            </CopyToClipboard>
                            {copied && "copied"}<br/>
                        </div>
                        <Link as='Button' to={`/${tokenId}`}>
                            <Button variant="outline-primary" size="lg" className="mt-4">
                                Share This Link to Reveal the Secret
                            </Button>
                        </Link>
                    </>
                    }
                    {ready && !tokenId &&
                    <>
                        <Form>
                            <FormGroup controlId='message'>
                                <FormLabel>Message</FormLabel>
                                <FormControl as="textarea" rows={3} value={message}
                                             onChange={onChangeEvent(setMessage)}/>
                            </FormGroup>
                            <FormGroup controlId='createTokenButton' className="text-center">
                                <Button size="lg" className='create-token-button' variant="outline-primary" disabled={!ready || !message}
                                        onClick={handleCreateToken}>
                                    {inProgress ?
                                        <FontAwesomeIcon icon={faSpinner} spin/> : "Create SHHH! token"}
                                </Button>
                            </FormGroup>
                        </Form>
                    </>
                    }
                    {!ready &&
                        <div>
                            <h4 className="mt-5">Connecting to Secret Network...</h4>
                            <h6 className="mt-5">
                                (
                                <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en" target="_blank" rel="noreferrer">
                                    Keplr wallet
                                </a> must be installed and the holodeck-2 testnet added)
                            </h6>
                        </div>
                    }
                </div>
                <div className="col">
                    <img src={beeShowingStinger} className="img-fluid" alt="bee showing stinger" />
                </div>
            </div>
        </div>
    );
}

export default SetupSecret
