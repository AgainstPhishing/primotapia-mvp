import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import './App.css';
import Navbar from './components/Navbar';
import ArweaveCtxProvider from './contexts/ArweaveContext';
import { LandingPage } from './pages/LandingPage';
import List from './pages/List';
import Report from './pages/Report';

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function App() {
  return (
    <WagmiConfig client={client}>
      <ArweaveCtxProvider>
        <Navbar />
        <LandingPage />
        <List />
        <Report />
        {/* <Outlet /> */}
      </ArweaveCtxProvider>
    </WagmiConfig>
  );
}

export default App;
