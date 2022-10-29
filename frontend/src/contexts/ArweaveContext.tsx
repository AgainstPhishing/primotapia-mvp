import * as React from 'react';
import Arweave from 'arweave';
import { WarpFactory } from 'warp-contracts';
import Swal from 'sweetalert2';

export const ArweaveContext = React.createContext<any>({});

export default function ArweaveCtxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [address, setAddress] = React.useState('');
  const [allowedAddresses, setAllowedAddresses] = React.useState([]);
  const [phishingList, setPhisingList] = React.useState([]);

  const CONTRACT_ADDRESS = 'LoR8ujVUO0PDll-pbFMuvXRVXKtLjXAYjXqH_pFgmk8';

  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  });

  const warp = WarpFactory.forMainnet();

  async function fetchData() {
    const contract = warp.contract(CONTRACT_ADDRESS);
    const state = await contract.readState();
    setPhisingList(
      Object.values((state?.cachedValue?.state as any)['blacklist'])
    );
    setAllowedAddresses((state?.cachedValue?.state as any)['allowedAddresses']);
    console.log('state', state);
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [address]);

  async function connect() {
    arweave.wallets.getAddress().then((address) => setAddress(address));
    fetchData();
  }
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
        Swal.fire('Success!', 'Rejected Successfully!', 'success');
        fetchData();
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
        Swal.fire('Success!', 'Approved Successfully!', 'success');
        fetchData();
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
        Swal.fire('Success!', 'Reported Successfully!', 'success');
        fetchData();
      });
  }

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
        connect,
      }}
    >
      {children}
    </ArweaveContext.Provider>
  );
}
