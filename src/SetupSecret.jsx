import React, {useEffect, useState} from "react";
import {encodeSecp256k1Pubkey, EnigmaUtils, pubkeyToAddress, Secp256k1Pen, SigningCosmWasmClient} from "secretjs";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import beeShowingStinger from "./assets/images/bees/bee-showing-stinger.png"
import beePointing from "./assets/images/bees/bee-pointing-right.png"

const WALLET_WORDS = 'scrap network kiss canoe bird strategy fence anger way budget globe evidence will vibrant parade dream slogan around smart daughter buyer guess measure taste'
const CONTRACT_ADDRESS = 'secret19vc03hfsuqfsmt73c4fypg5au07lfngpcw2ytc'
const SECRET_REST_URL = 'https://bootstrap.secrettestnet.io/'

const customFees = {
    upload: {
        amount: [{amount: "2000000", denom: "uscrt"}],
        gas: "2000000",
    },
    init: {
        amount: [{amount: "500000", denom: "uscrt"}],
        gas: "500000",
    },
    exec: {
        amount: [{amount: "500000", denom: "uscrt"}],
        gas: "500000",
    },
    send: {
        amount: [{amount: "80000", denom: "uscrt"}],
        gas: "80000",
    },
}

export default () => {
    const [client, setClient] = useState()
    const [signingPen, setSigningPen] = useState()
    const [address, setAddress] = useState('')
    const [account, setAccount] = useState({})
    const [inProgress, setInProgress] = useState(false)
    const [message, setMessage] = useState('')
    const [copied, setCopied] = useState(false)

    const [linkToReveal, setLinkToReveal] = useState('')

    const {accountNumber, balance, sequence} = account || {
        accountNumber: '',
        balance: 0,
        sequence: 0
    }

    useEffect(() => {
        (async () => {
            const pen = await Secp256k1Pen.fromMnemonic(WALLET_WORDS);
            setSigningPen(pen)
        })()
    }, [])

    useEffect(() => {
        if (signingPen) {
            const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey)
            const accAddress = pubkeyToAddress(pubkey, 'secret')
            setAddress(accAddress)
        }
    }, [signingPen])

    useEffect(() => {
        if (signingPen && address) {
            const txEncryptionSeed = EnigmaUtils.GenerateNewSeed()
            const client = new SigningCosmWasmClient(
                SECRET_REST_URL,
                address,
                (signBytes) => signingPen.sign(signBytes),
                txEncryptionSeed, customFees
            )
            setClient(client)
        }
    }, [signingPen, address])

    useEffect(() => {
        if (client) {
            retrieveAccount()
        }
    }, [client])

    const retrieveAccount = async () => {
        let account;
        while (!account) {
            account = await client.getAccount(address)
                .then(a => {
                    console.log(a)
                    return a
                })
                .catch(err => console.error("request failed, re-try"))
        }
        console.assert(account.address === address)
        setAccount(account)
    }

    const handleCreateToken = async () => {
        console.log('Creating a token')
        setInProgress(true)

        let response = await client.execute(CONTRACT_ADDRESS, {
            "mint_nft": {
                public_metadata: {
                    name: "Secret Sauce",
                    description: message
                }
            }
        });
        console.log(response)
        let result = JSON.parse(String.fromCharCode(...response.data))

        console.log(result)

        let tokenId = result?.mint_nft?.token_id

        setLinkToReveal(`/${tokenId}`)

        setMessage('')
        setInProgress(false)
    }

    const ready = signingPen && address && sequence && !inProgress

    const onChangeEvent = fn => ({target: {value}}) => fn(value)

    return (
        <div className="row">
            <div className="col">
                <img src={beePointing} className="img-fluid" />
            </div>
            <div className="col">
                {linkToReveal ?
                    <>
                        <h3>Your secret token is ready</h3>
                        <div>
                            <CopyToClipboard text={linkToReveal} onCopy={e => setCopied(true)}>
                                <span>
                                    {linkToReveal}<FontAwesomeIcon className="ml-1 mr-1" icon={faClipboard}/>
                                </span>
                            </CopyToClipboard>
                            {copied && "copied"}<br/>
                        </div>
                        <Link as='Button' to={linkToReveal}>Reveal the secret</Link>
                    </>
                    :
                    <>
                        <Form>
                            <FormGroup controlId='message'>
                                <FormLabel>Message</FormLabel>
                                <FormControl as="textarea" rows={3} value={message} onChange={onChangeEvent(setMessage)}/>
                            </FormGroup>
                            <FormGroup controlId='createTokenButton' className="text-center">
                                <Button size="lg" className='create-token-button' disabled={!ready} onClick={handleCreateToken}>
                                    {inProgress ? <FontAwesomeIcon icon={faSpinner} spin/> : "Create SHHH! token"}
                                </Button>
                            </FormGroup>
                        </Form>
                    </>
                }
            </div>
            <div className="col">
                <img src={beeShowingStinger} className="img-fluid" />
            </div>
        </div>
    );

}