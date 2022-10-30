# PrimoTapia - prototype

This repository contains prototype of PrimoTapia - Decentralized project and wallet agnostic phishing prevention system.

![Primo Tapia slide](./doc/Primo%20Tapia.png "Primo Tapia slide")

## Architecture
![Primo Tapia architecture](./doc/Primo%20Tapia%20-%20architecture.png "Primo Tapia architecture")

### WARP Smart contract - /contracts

It's a heart of the app. The WARP Smart Contract manage database with:
- owner address - which is eligible to add and remove allowedAddresses
- allowedAddresses - the list of ArWeave addresses which are eligible to approve 'reported' blacklistItems.
- blacklist - the list containing phishing related: domains, wallet addresses, IP addresses AND social media profiles. Everyone can send the report. If you are one of the allowedAddresses you can add records here without verification.

You can find more details about the database structure at [./doc/SMART_CONTRACT_DATASTRUCTURE_WITH_COMMENTS.md](./doc/SMART_CONTRACT_DATASTRUCTURE_WITH_COMMENTS.md).

### API - /api

API is currently used by:
- browser extension
- metamask snap

It's an easy to use API for getting blacklisted and confirmed records without dealing with WARP Smart Contract directly.

To run the API, you need to:

```
cd api
npm install
npm start
```

### (dApp) Web WARP Smart contract interface - /frontend

It's a web app for interacting with WARP Smart Contract.

To run the frontend, you need to :

```
cd frontend
yarn install
yarn start
```

All The code used to interact with WARP Smart Contract is located here:

https://github.com/PrimoTapia/primotapia-mvp/blob/main/frontend/src/contexts/ArweaveContext.tsx#L17-L87


### Metamask Snap - /metamask-snap

it's an extended feature for metamask snap insights, and we are using it here:

To run the metamask-snap, you need to:

```
cd metamask-snap
yarn install
yarn start
```

The code is located on this file: 

https://github.com/PrimoTapia/primotapia-mvp/blob/main/metamask-snap/packages/snap/src/index.ts#L1-L32

### WebExtension for firefox - /webextension

It's a prototype of browser extension which integrate WARP Smart Contract data with a browser to protect the users from phishing.

### WARP Smart contract address

**LoR8ujVUO0PDll-pbFMuvXRVXKtLjXAYjXqH_pFgmk8**

## How to run the project

Firstly, you need to run API. Before running, you need to create a copy of `.env.example` to `.env` with  the following contract address:

`LoR8ujVUO0PDll-pbFMuvXRVXKtLjXAYjXqH_pFgmk8`

Next, you need to run the API locally, and you can do that by running the following commands:

```bash
$ cd api
$ npm install
$ npm start
```

Once you have that done, you can run the frontend locally, and to interact with the website you will need the ARConnect browser extension to interact with ARWeave (https://www.arconnect.io/)

To Run the frontend, just run the following commands:

```
cd frontend
yarn install
yarn start
```

Once you have the frontend running, you can check the Metamask Snaps, just run the following commands and you need Metamask Flask to install this `snap` feature.

```
cd metamask-snap
yarn install 
yarn run
```

And you can load in your browser: http://localhost:8000