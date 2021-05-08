import React, {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import beeShowingStinger from "./assets/images/bees/bee-showing-stinger.png"
import beePointing from "./assets/images/bees/bee-pointing-right.png"
import {KeplrClient} from "../State/KeplrClient";
import {CONTRACT_ADDRESS} from "../App";

export default () => {
    const {client} = useContext(KeplrClient)
    const [inProgress, setInProgress] = useState(false)
    const [message, setMessage] = useState('')
    const [copied, setCopied] = useState(false)

    const [tokenId, setTokenId] = useState('')

    const handleCreateToken = async () => {
        setInProgress(true)
        let response = await client.execute(CONTRACT_ADDRESS, {
            "mint_nft": {
                public_metadata: {description: message}
            }
        }).catch(f => console.log(f));
        let result = JSON.parse(String.fromCharCode(...response.data))
        let tokenId = result?.mint_nft?.token_id
        setTokenId(tokenId)
        setMessage('')
        setInProgress(false)
    }

    const ready = client && !inProgress

    const onChangeEvent = fn => ({target: {value}}) => fn(value)

    return (
        <div className="row">
            <div className="col">
                <img src={beePointing} className="img-fluid" />
            </div>
            <div className="col">
                {ready &&
                    {tokenId &&
                    <>
                        <h3>Your secret token is ready</h3>
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
                        <Link as='Button' to={`/${tokenId}`}>Reveal the secret</Link>
                    </>
                    }
                    {!tokenId &&
                        <>
                            <Form>
                                <FormGroup controlId='message'>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl as="textarea" rows={3} value={message}
                                                 onChange={onChangeEvent(setMessage)}/>
                                </FormGroup>
                                <FormGroup controlId='createTokenButton' className="text-center">
                                    <Button size="lg" className='create-token-button' disabled={!ready}
                                            onClick={handleCreateToken}>
                                        {inProgress ?
                                            <FontAwesomeIcon icon={faSpinner} spin/> : "Create SHHH! token"}
                                    </Button>
                                </FormGroup>
                            </Form>
                        </>
                    }
                }
                {!ready &&
                    <div>Loading...</div>
                }
            </div>
            <div className="col">
                <img src={beeShowingStinger} className="img-fluid" />
            </div>
        </div>
    );
}
