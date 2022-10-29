import * as React from 'react';
import Arweave from 'arweave';
import { WarpFactory } from 'warp-contracts';

export const ArweaveContext = React.createContext<any>({});

export default function ArweaveCtxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [address, setAddress] = React.useState('');
  const [phishingList, setPhisingList] = React.useState([]);

  const CONTRACT_ADDRESS = '_O_8QWIifv6-Geo477zNVBJ2tHiBDTIq_WOZFTukwg0';

  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  });

  const warp = WarpFactory.forMainnet();

  React.useEffect(() => {
    async function fetchData() {
      const contract = warp.contract(CONTRACT_ADDRESS).connect('use_wallet');
      const state = await contract.readState();
      console.log('state', state);
    }
    fetchData();
  }, []);

  async function send(address: string, type: string, description: string) {
    const contract = warp.contract(CONTRACT_ADDRESS).connect('use_wallet');
    contract
      .writeInteraction({
        function: 'addToBlacklist',
        type,
        address,
        description,
      })
      .then((originalTxId: any) => {
        console.log('originalTxId', originalTxId);
      });
  }

  React.useEffect(() => {
    arweave.wallets.getAddress().then((address) => setAddress(address));
  }, [arweave]);

  return (
    <ArweaveContext.Provider
      value={{ arweave, warp, address, send, phishingList }}
    >
      {children}
    </ArweaveContext.Provider>
  );
}
