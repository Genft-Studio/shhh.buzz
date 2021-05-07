import './App.scss';
import React, {useEffect, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {
    encodeSecp256k1Pubkey, EnigmaUtils,
    makeSignBytes,
    pubkeyToAddress,
    Secp256k1Pen,
    SigningCosmWasmClient
} from "secretjs"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const WALLET_WORDS = 'scrap network kiss canoe bird strategy fence anger way budget globe evidence will vibrant parade dream slogan around smart daughter buyer guess measure taste'
const CONTRACT_ADDRESS = 'secret1k06wyry8xmwfqkml2d9wda2cfdsgclh0d0jyln'
const SECRET_REST_URL = 'https://bootstrap.secrettestnet.io/'

const customFees = {
    upload: {
        amount: [{ amount: "2000000", denom: "uscrt" }],
        gas: "2000000",
    },
    init: {
        amount: [{ amount: "500000", denom: "uscrt" }],
        gas: "500000",
    },
    exec: {
        amount: [{ amount: "500000", denom: "uscrt" }],
        gas: "500000",
    },
    send: {
        amount: [{ amount: "80000", denom: "uscrt" }],
        gas: "80000",
    },
}

// const client = new CosmWasmClient(SECRET_REST_URL)


function App() {
    const [client, setClient] = useState()
    const [signingPen, setSigningPen] = useState()
    const [chainId, setChainId] = useState('')
    const [blockHeight, setBlockHeight] = useState(0)
    const [address, setAddress] = useState('')
    const [account, setAccount] = useState({})
    const [inProgress, setInProgress] = useState(false)
    const [sendAmount, setSendAmount] = useState(0)

    const [count, setCount] = useState(0)

    const {accountNumber, balance, sequence} = account

    useEffect(() => {
        (async () => {
            const pen = await Secp256k1Pen.fromMnemonic(WALLET_WORDS);
            setSigningPen(pen)
        })()
    }, [])

    useEffect(() => {
        if (client) {
            client.getChainId().then(id => setChainId(id))
            client.getHeight().then(h => setBlockHeight(h))
            retrieveCount()
        }
    }, [client])

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
        const response = await client.queryContractSmart(CONTRACT_ADDRESS, { "get_count": {}})
        setCount(response.count)
    }

    const handleScrtSend = async e => {
        const memo = 'My first secret transaction, sending uscrt to my own address';

        // const msg = {
        //     type: "cosmos-sdk/MsgSend",
        //     value: {
        //         from_address: address,
        //         to_address: address,
        //         amount: [
        //             {
        //                 denom: "uscrt",
        //                 amount: sendAmount.toString(),
        //             },
        //         ],
        //     },
        // }
        //
        // const fee = {
        //     amount: [
        //         {
        //             amount: "50000",
        //             denom: "uscrt",
        //         },
        //     ],
        //     gas: "100000",
        // }
        //
        // const signBytes = makeSignBytes([msg], fee, chainId, memo, accountNumber, sequence);
        // const signature = await signingPen.sign(signBytes);
        // const signedTx = {
        //     msg: [msg],
        //     fee: fee,
        //     memo: memo,
        //     signatures: [signature],
        // };
        setInProgress(true)
        const {logs, transactionHash} = await client.sendTokens(
            address,
            [{denom: "uscrt", amount: sendAmount.toString()}],
            memo
        )
        await retrieveAccount()
        setInProgress(false)
        console.log(logs)
        //
        // // Query the tx result
        // const query = {id: transactionHash}
        // const tx = await client.searchTx(query)

    }

    const handleIncrement = async e => {
        setInProgress(true)
        await client.execute(CONTRACT_ADDRESS, { increment: {} })
        const response = await retrieveCount()
        console.log(response)
        setInProgress(false)
    }

    const ready = signingPen && address && sequence && !inProgress

    return (
        <div className="App">
            <header className="App-header">
                A simple app for the secret network
            </header>

            <section>
                <Form>
                    <FormGroup controlId='restUrl'>
                        <FormLabel>NODE URL</FormLabel>
                        <FormControl disabled={true} value={SECRET_REST_URL}/>
                    </FormGroup>
                    <FormGroup controlId='restUrl'>
                        <FormLabel>Chain ID</FormLabel>
                        <FormControl disabled={true} value={chainId}/>
                    </FormGroup>
                    <FormGroup controlId='blockHeight'>
                        <FormLabel>Block height</FormLabel>
                        <FormControl disabled={true} value={blockHeight}/>
                    </FormGroup>
                    <FormGroup controlId='mnemonic'>
                        <FormLabel>Wallet words</FormLabel>
                        <FormControl disabled={true} value={WALLET_WORDS}/>
                    </FormGroup>
                    <FormGroup controlId='address'>
                        <FormLabel>Address</FormLabel>
                        <FormControl disabled={true} value={address}/>
                    </FormGroup>
                    <FormGroup controlId='accountNumber'>
                        <FormLabel>Account number</FormLabel>
                        <FormControl disabled={true} value={accountNumber || ''}/>
                    </FormGroup>
                    <FormGroup controlId='sequence'>
                        <FormLabel>Sequence</FormLabel>
                        <FormControl disabled={true} value={sequence || ''}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Balances</FormLabel>
                        {balance && balance.map(({denom, amount}) => (
                            <FormGroup key={denom} controlId='Balance.denom'>
                                <FormLabel>{denom}</FormLabel>
                                <FormControl disabled={true} value={amount}/>
                            </FormGroup>
                        ))}
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Amount to send</FormLabel>
                        <FormControl value={sendAmount} onChange={e => setSendAmount(e.target.value)}/>
                        <Button disabled={!ready} onClick={handleScrtSend}>
                            Send SCRT <FontAwesomeIcon style={{display: inProgress ? '' : 'none'}} icon={faSpinner}
                                                       spin/>
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Current count: {count}</FormLabel>
                        <Button disabled={!ready} onClick={handleIncrement}>
                            Increment count
                            <FontAwesomeIcon style={{display: inProgress ? '' : 'none'}} icon={faSpinner} spin/>
                        </Button>
                    </FormGroup>
                </Form>
            </section>
        </div>
    );
}

export default App;
