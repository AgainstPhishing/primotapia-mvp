# PrimoTapia - prototype

This repository contains prototype of PrimoTapia - Decentralized project and wallet agnostic phishing prevention system.

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

### Web WARP Smart contract interface - /frontend

It's a web app for interacting with WARP Smart Contract.


### WebExtension

It's a prototype of browser extension which integrate WARP Smart Contract data with a browser to protect the users from phishing.

### WARP Smart contract address

**ANonubWMDDS7hK8dJVkQjU1SItCfT3baBxaHi72pa3s**
