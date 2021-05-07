const {
    EnigmaUtils, Secp256k1Pen, SigningCosmWasmClient, pubkeyToAddress, encodeSecp256k1Pubkey
} = require("secretjs");

const fs = require("fs");

// Load environment variables
require('dotenv').config();

const customFees = {
    upload: {
        amount: [{ amount: "20000000", denom: "uscrt" }],
        gas: "20000000",
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

async function initializeClient() {
    const httpUrl = process.env.SECRET_REST_URL;

    // Use key created in tutorial #2
    const mnemonic = process.env.MNEMONIC;

    // A pen is the most basic tool you can think of for signing.
    // This wraps a single keypair and allows for signing.
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);

    // Get the public key
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);

    // get the wallet address
    const accAddress = pubkeyToAddress(pubkey, 'secret');

    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();

    const client = new SigningCosmWasmClient(
        httpUrl,
        accAddress,
        (signBytes) => signingPen.sign(signBytes),
        txEncryptionSeed, customFees
    );
    console.log(`Wallet address=${accAddress}`)
    return {accAddress, client};
}

const deployContract = async () => {
    const {accAddress, client} = await initializeClient();

    // Upload the wasm of a simple contract
    const wasm = fs.readFileSync(process.env.WASM_FILE);
    console.log('Uploading contract')
    const uploadReceipt = await client.upload(wasm, {});

    // Get the code ID from the receipt
    const codeId = uploadReceipt.codeId;
    console.log('codeId: ', codeId);

    // contract hash, useful for contract composition
    const contractCodeHash = await client.restClient.getCodeHashByCodeId(codeId);
    console.log(`Contract hash: ${contractCodeHash}`);

    const initMsg = {
        name: "Secret Bees",
        symbol: "$SHHH",
        admin: accAddress,
        entropy: Math.ceil(Math.random() * 10000000).toString(16),
        config: {
            public_token_supply: false,
            public_owner: true,
            enable_sealed_metadata: true,
            unwrapped_metadata_is_private: true,
            minter_may_update_metadata: true,
            owner_may_update_metadata: true,
            enable_burn: true,
        }
    }
    console.log('initMsg:', initMsg);

    const contract = await client.instantiate(
        codeId, initMsg, "shhh.buzz " + Math.ceil(Math.random()*10000)
    );
    console.log('contract: ', contract);

    const contractAddress = contract.contractAddress;
    let response;

    // Query the current contract
    console.log('Querying contract info');
    response = await client.queryContractSmart(contractAddress, { "contract_info": {}});

    console.log(response)
    // console.log(`Count=${response.count}`)

    // Increment the counter
    // const handleMsg = { increment: {} };
    // console.log('Updating count');
    // response = await client.execute(contractAddress, handleMsg);
    // console.log('response: ', response);

    // Query again to confirm it worked
    // console.log('Querying contract for updated count');
    // response = await client.queryContractSmart(contractAddress, { "get_count": {}})
    //
    // console.log(`New Count=${response.count}`);
};

deployContract();