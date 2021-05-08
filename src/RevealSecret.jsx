import React, {useEffect, useState} from "react";
import {encodeSecp256k1Pubkey, EnigmaUtils, pubkeyToAddress, Secp256k1Pen, SigningCosmWasmClient} from "secretjs";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from 'react-router-dom'

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
    let {tokenId} = useParams();
    console.log(tokenId)
    const [client, setClient] = useState()
    const [signingPen, setSigningPen] = useState()
    const [address, setAddress] = useState('')
    const [account, setAccount] = useState({})
    const [inProgress, setInProgress] = useState(false)
    const [revealed, setRevealed] = useState('')

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

    const handleBurnToReveal = async () => {
        console.log('Revealing secret message')
        setInProgress(true)

        let response = await client.execute(CONTRACT_ADDRESS, {
            "burn_nft": {
                token_id: tokenId
            }
        });
        console.log(response)
        let result = JSON.parse(String.fromCharCode(...response.data))

        console.log(result)

        setRevealed(result?.burn_nft?.secret?.description)
        setInProgress(false)
    }
    const ready = signingPen && address && sequence && !inProgress

    return (
        <section>
            <Form>
                <FormGroup controlId='address'>
                    <FormLabel>Address</FormLabel>
                    <FormControl disabled={true} value={address}/>
                </FormGroup>
                {tokenId && !revealed &&
                <>
                    <FormGroup controlId='token_id'>
                        <FormLabel>Token Id</FormLabel>
                        <FormControl disabled={true} value={tokenId}/>
                    </FormGroup>
                    <FormGroup controlId='burnToRevealButton'>
                        <Button className='burn-to-reveal-button' disabled={!ready} onClick={handleBurnToReveal}>
                            {inProgress ? <FontAwesomeIcon icon={faSpinner} spin/> : "Burn to reveal"}
                        </Button>
                    </FormGroup>
                </>
                }
                {revealed &&
                <>
                    <FormGroup controlId='revealedMessage'>
                        <FormLabel>Revealed Message</FormLabel>
                        <FormControl value={revealed} disabled={true}/>
                    </FormGroup>
                    <Link as="Button" to="/">Send another secret</Link>
                </>
                }
            </Form>
        </section>
    );

}