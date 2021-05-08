import React, {createContext, useState, useEffect} from 'react'
import {SigningCosmWasmClient} from "secretjs";


const CHAIN_ID = "holodeck-2"
const API_URL = "https://bootstrap.secrettestnet.io/";

const initialState = {client: null, address: null}
export const KeplrClient = createContext(initialState)

export const ClientProvider = ({children}) => {
    const [keplrLoaded, setKeplrLoaded] = useState(false)
    const [client, setClient] = useState()
    const [address, setAddress] = useState()

    useEffect(() => {
        const waitForKeplr = async () => {
            if (!!window.keplr) {
                setKeplrLoaded(true)
                return
            }

            if (document.readyState === "complete") {
                setKeplrLoaded(!!window.keplr)
                return
            }

            return new Promise((resolve) => {
                const documentStateChange = (event) => {
                    if (event.target?.readyState === "complete") {
                        setKeplrLoaded(!!window.keplr)
                        document.removeEventListener("readystatechange", documentStateChange)
                    }
                };
                document.addEventListener("readystatechange", documentStateChange)
            });
        }

        waitForKeplr()
    })

    useEffect(() => {
        const getClient = async () => {
            // Enabling before using the Keplr is recommended.
            // This method will ask the user whether or not to allow access if they haven't visited this website.
            // Also, it will request user to unlock the wallet if the wallet is locked.
            await window.keplr.enable(CHAIN_ID)

            const offlineSigner = window.getOfflineSigner(CHAIN_ID)
            const enigmaUtils = window.getEnigmaUtils(CHAIN_ID)

            // You can get the address/public keys by `getAccounts` method.
            // It can return the array of address/public key.
            // But, currently, Keplr extension manages only one address/public key pair.
            // XXX: This line is needed to set the sender address for SigningCosmosClient.
            const accounts = await offlineSigner.getAccounts()
            const address = accounts[0].address
            setAddress(address)

            // Initialize the gaia api with the offline signer that is injected by Keplr extension.
            const cosmJS = new SigningCosmWasmClient(
                API_URL,
                address,
                offlineSigner,
                enigmaUtils
            )
            setClient(cosmJS)
        }
        getClient()
    }, [keplrLoaded])

    return (
        <KeplrClient.Provider value={{client, address}}>
            {children}
        </KeplrClient.Provider>
    )
}
