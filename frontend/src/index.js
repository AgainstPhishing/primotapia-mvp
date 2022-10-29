import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Report from './pages/Report';
import List from './pages/List';
import { MantineProvider } from '@mantine/core';
import {
  bumblebee,
  dark,
  cupcake,
  dracula,
  light,
  synthwave,
  retro,
} from 'manthemes/daisyui';
import { LandingPage } from './pages/LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colors: {
          brand: [
            '#F0BBDD',
            '#ED9BCF',
            '#EC7CC3',
            '#ED5DB8',
            '#F13EAF',
            '#F71FA7',
            '#FF00A1',
            '#E00890',
            '#C50E82',
            '#AD1374',
          ],
        },
        primaryColor: 'blue',
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/list" element={<List />} />
              <Route path="/report" element={<Report />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
