# Shhh!

## Description

**[Shhh!](https://shhh.buzz)** is a one-time-read messaging system that uses Secret Network to securely store messages and deliver secrets like passwords, private keys, credit card information, api keys, etc. It isn't like other secret data stores, though. Once a message is retrieved, it is burned and can't be retrieved again.

To try it out, install Keplr wallet (https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en), load it with some holodeck-2 testnet tokens (https://faucet.secrettestnet.io/), then go to https://shhh.buzz/ to store a secret message.

After your secret is stored, you get a URL to retrieve the secret. Send it to the person you want to share your secret with via email, slack, twitter DM, or whatever. When they click the link, they are taken to the page where they can retrieve and burn the secret.

Once the secret is retrieved, it is gone forever, so you don't have to worry about prying eyes discovering the secret in a server log or a centralized database.

Built by Endowl 🦉
------------------------
**[Endowl](https://endowl.com)** brings payable-on-death functionality to blockchain assets. We built Shhh! as a way to experiment with Secret Network. We wanted to evaluate whether it will work as a decentralized datastore for sensitive estate planning data.

Using the sealed data mechanism of SNIP-721, we believe that we can use our life event oracle to unlock the sensitive estate planning data when the time is right.

## How It's Made

Under the hood, **Shhh!** generates NFTs on the Secret network where the metadata is only revealed when the token is burned. The smart contract code is based on the SNIP-721 reference implementation and can be found at https://github.com/endowl/secret-robot. Changes to the reference implementation were:

- Allow anyone to mint tokens
- Tokens can only be minted for yourself
- Anyone can burn a token to reveal the secret
- Functionality around transferring, sending, minter management, and metadata queries was disabled.
- Unit tests were organized to be easier to work with

Additionally, secret data can be sealed. Sealed data can only be retrieved after the Reveal method is called by the owner of the token or an oracle that they designate.

A frontend webapp was built using react and the secretjs package. It requires Keplr to be installed and funded with secret / holodeck-2 tokens. Keplr handles the signing of requests. The source code can be found at https://github.com/endowl/shhh.buzz/tree/main.

The application is available at https://shhh.buzz. The contract is running on the secret test network, holodeck-2. Your Keplr wallet needs to be funded with holodeck-2 tokens to pay for gas.


---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
