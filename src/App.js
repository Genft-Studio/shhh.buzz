import './App.scss';
import React, {useEffect, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {
    encodeSecp256k1Pubkey, EnigmaUtils,
    pubkeyToAddress,
    Secp256k1Pen,
    SigningCosmWasmClient
} from "secretjs"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

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

// const client = new CosmWasmClient(SECRET_REST_URL)


function App() {
    const [client, setClient] = useState()
    const [signingPen, setSigningPen] = useState()
    const [address, setAddress] = useState('')
    const [account, setAccount] = useState({})
    const [inProgress, setInProgress] = useState(false)
    const [sendAmount, setSendAmount] = useState(0)
    const [message, setMessage] = useState('')
    const [revealed, setRevealed] = useState('')

    const [count, setCount] = useState(0)

    const [tokenId, setTokenId] = useState('')

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

    const retrieveCount = async () => {
        const response = await client.queryContractSmart(CONTRACT_ADDRESS, {"get_count": {}})
        setCount(response.count)
    }

    const retrieveContractInfo = async () => {
        console.log('Querying contract info');
        let response = await client.queryContractSmart(CONTRACT_ADDRESS, {"contract_info": {}});
        console.log(response)
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

        setTokenId(result?.mint_nft?.token_id)

        setMessage('')
        setInProgress(false)
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

    // const handleScrtSend = async e => {
    //     const memo = 'My first secret transaction, sending uscrt to my own address';
    //     setInProgress(true)
    //     const {logs, transactionHash} = await client.sendTokens(
    //         address,
    //         [{denom: "uscrt", amount: sendAmount.toString()}],
    //         memo
    //     )
    //     await retrieveAccount()
    //     setInProgress(false)
    //     console.log(logs)
    // }

    // const handleIncrement = async e => {
    //     setInProgress(true)
    //     await client.execute(CONTRACT_ADDRESS, { increment: {} })
    //     const response = await retrieveCount()
    //     console.log(response)
    //     setInProgress(false)
    // }

    const ready = signingPen && address && sequence && !inProgress

    const onChangeEvent = fn => ({target: {value}}) => fn(value)

    return (
        <div className="App">
            <header className="App-header">
                A simple app for the secret network
            </header>

            <section>
                <Form>
                    <FormGroup controlId='address'>
                        <FormLabel>Address</FormLabel>
                        <FormControl disabled={true} value={address}/>
                    </FormGroup>
                    <FormGroup controlId='accountNumber'>
                        <FormLabel>Account number</FormLabel>
                        <FormControl disabled={true} value={accountNumber}/>
                    </FormGroup>
                    <FormGroup controlId='message'>
                        <FormLabel>Message</FormLabel>
                        <FormControl value={message} onChange={onChangeEvent(setMessage)}/>
                    </FormGroup>
                    <FormGroup controlId='createTokenButton'>
                        <Button className='create-token-button' disabled={!ready} onClick={handleCreateToken}>
                            {inProgress ? <FontAwesomeIcon icon={faSpinner} spin/> : "Create SHHH! token"}
                        </Button>
                    </FormGroup>
                    {tokenId &&
                    <>
                        <FormGroup controlId='tokenId'>
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
                    <FormGroup controlId='revealedMessage'>
                        <FormLabel>Revealed Message</FormLabel>
                        <FormControl value={revealed} disabled={true}/>
                    </FormGroup>
                    }
                    {/*<FormGroup>*/}
                    {/*    <FormLabel>Balances</FormLabel>*/}
                    {/*    {balance && balance.map(({denom, amount}) => (*/}
                    {/*        <FormGroup key={denom} controlId='Balance.denom'>*/}
                    {/*            <FormLabel>{denom}</FormLabel>*/}
                    {/*            <FormControl disabled={true} value={amount}/>*/}
                    {/*        </FormGroup>*/}
                    {/*    ))}*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup>*/}
                    {/*    <FormLabel>Amount to send</FormLabel>*/}
                    {/*    <FormControl value={sendAmount} onChange={e => setSendAmount(e.target.value)}/>*/}
                    {/*    <Button disabled={!ready} onClick={handleScrtSend}>*/}
                    {/*        Send SCRT <FontAwesomeIcon style={{display: inProgress ? '' : 'none'}} icon={faSpinner}*/}
                    {/*                                   spin/>*/}
                    {/*    </Button>*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup>*/}
                    {/*    <FormLabel>Current count: {count}</FormLabel>*/}
                    {/*    <Button disabled={!ready} onClick={handleIncrement}>*/}
                    {/*        Increment count*/}
                    {/*        <FontAwesomeIcon style={{display: inProgress ? '' : 'none'}} icon={faSpinner} spin/>*/}
                    {/*    </Button>*/}
                    {/*</FormGroup>*/}
                </Form>
            </section>
        </div>
    );
}

export default App;
