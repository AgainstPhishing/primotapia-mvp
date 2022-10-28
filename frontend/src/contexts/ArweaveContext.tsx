import * as React from 'react';
import Arweave from 'arweave';
import { WarpFactory } from 'warp-contracts';

export const ArweaveContext = React.createContext<any>({});

export default function ArweaveCtxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  });

  const warp = WarpFactory.forMainnet();

  return (
    <ArweaveContext.Provider value={{ arweave, warp }}>
      {children}
    </ArweaveContext.Provider>
  );
}
