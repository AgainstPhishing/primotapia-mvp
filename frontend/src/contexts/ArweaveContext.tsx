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
  const [allowedAddresses, setAllowedAddresses] = React.useState([]);
  const [phishingList, setPhisingList] = React.useState([]);

  const CONTRACT_ADDRESS = 'ANonubWMDDS7hK8dJVkQjU1SItCfT3baBxaHi72pa3s';

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
      setPhisingList(
        Object.values((state?.cachedValue?.state as any)['blacklist'])
      );
      setAllowedAddresses(
        (state?.cachedValue?.state as any)['allowedAddresses']
      );
      console.log('state', state);
    }
    fetchData();
  }, []);

  async function rejectFromBlacklist(type: string, address: string) {
    const contract = warp.contract(CONTRACT_ADDRESS).connect('use_wallet');
    contract
      .writeInteraction({
        function: 'rejectFromBlacklist',
        type,
        address,
      })
      .then((originalTxId: any) => {
        console.log('rejectFromBlacklist | originalTxId', originalTxId);
      });
  }

  async function approveToBlacklist(type: string, address: string) {
    const contract = warp.contract(CONTRACT_ADDRESS).connect('use_wallet');
    contract
      .writeInteraction({
        function: 'approveToBlacklist',
        type,
        address,
      })
      .then((originalTxId: any) => {
        console.log('approveToBlacklist | originalTxId', originalTxId);
      });
  }

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
        console.log('addToBlacklist | originalTxId', originalTxId);
      });
  }

  React.useEffect(() => {
    arweave.wallets.getAddress().then((address) => setAddress(address));
  }, [arweave]);

  return (
    <ArweaveContext.Provider
      value={{
        arweave,
        warp,
        address,
        send,
        phishingList,
        owner:
          allowedAddresses.find(
            (allowed: any) => allowed.address === address
          ) !== undefined,
        approveToBlacklist,
        rejectFromBlacklist,
      }}
    >
      {children}
    </ArweaveContext.Provider>
  );
}
