This is example smart contract of PRIMOTAPIA with comments.

```json
{
  "owner": "", // The owner ArWeave address
  "allowedAddresses": [{
    // here is the address which can report without being verified
    // however the report might be reverted by the owner
    "address": "HgNHqGmSTDb4eSldvWntP6s8nUk8tCiSP9-1l76thEY",
    "description": "The owner address"
  }],
  "blacklist": [
    {
      /*
        types:
        - domain - website domain 
        - ip - ip address
        - profile - social media profile (ex. twitter.com/ethereum_phishing_profile)
        - wallet - wallet addresses (ex. 0x12312121231321312312312312312312312312)
          // TODO: Add possibility to add different wallet addresses - maybe by types: wallet_eth, wallet_ar, wallet_btc
      */
      "type": "domain",

      // the address - example for type = domain
      "address": "example.domains",

      // description - with the reason of reporting and possible proofs
      "description": "This is fake ENS project website",

      // possible statuses: "confirmed", "reported", "rejected"
      "status": "confirmed",
      
      // reporter ArWeave address
      "reportedBy": "HgNHqGmSTDb4eSldvWntP6s8nUk8tCiSP9-1l76thEY",
      
      // UNIX Timestamp - number
      "reportedAt": 1666997666
    }
  ]
}
```

