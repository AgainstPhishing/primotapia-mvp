const express = require('express');
const cors = require('cors');
const app = express();
const WP = require('warp-contracts');

app.use(cors());

// Set up Warp instance for Arweave mainnet
WP.LoggerFactory.INST.logLevel('debug');
const warp = WP.WarpFactory.forMainnet();

require('dotenv').config()
const contractTxId = process.env.CONTRACT_ADDRESS;

const port = 3001;

app.get('/api/blacklist', async (req, res) => {
    const contract = warp.contract(contractTxId);
    const { cachedValue } = await contract.readState();
    res.send(cachedValue.state.blacklist.reverse());
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
