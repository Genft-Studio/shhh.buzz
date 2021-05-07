import React, {useState} from "react"
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

// eslint-disable-next-line
export default () => {
    const [walletWords, setWalletWords] = useState()
    return (
        <Form onSubmit={e => e.preventDefault()}>
            <FormGroup>
                <FormLabel>
                    Wallet seed words:
                </FormLabel>
                <FormControl as="textarea" onChange={({target: {value}}) => setWalletWords(value)}/>
            </FormGroup>
        </Form>
    )
}