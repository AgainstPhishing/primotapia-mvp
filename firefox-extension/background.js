/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const urls = ["<all_urls>"];
const blacklistMockedData = [
    {
      "type": "wallet",
      "address": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      "description": "Uniswap Scam address ",
      "status": "confirmed",
      "reportedBy": "eSwwNGfXn54XHeEu9_pO32FYnPqz-Cszv0Unh5b10ck",
      "reportedAt": 1667061657
    },
    {
      "type": "wallet",
      "address": "0x6d79250533C00FBdC8f92d6aB8c32987a4D6F315",
      "description": "another test",
      "status": "confirmed",
      "reportedBy": "VRTN0Lta5QlQTooESMwWwa3gJSYVWFhPfAUiD-9YhO4",
      "reportedAt": 1667058082
    },
    {
      "type": "wallet",
      "status": "confirmed",
      "address": "0x168165F3768a0ae21c0bF1b078C9AACa2ed33411",
      "reportedAt": "1666997666",
      "reportedBy": "HgNHqGmSTDb4eSldvWntP6s8nUk8tCiSP9-1l76thEY",
      "description": "It supposed to be is phishing related address. (in reality it's another owner wallet address added for test)"
    },
    {
      "type": "domain",
      "status": "confirmed",
      "address": "ens-airdrop.domains",
      "reportedAt": "1666997666",
      "reportedBy": "HgNHqGmSTDb4eSldvWntP6s8nUk8tCiSP9-1l76thEY",
      "description": "This is fake ENS project website"
    }
];

// The code was inspired by this extension with Mozilla Public License:
// https://github.com/WesleyBranton/Website-Blocker/blob/main/src/background.js

/**
 * Create block listener
 * @async
 */
 async function createBlocker() {
  // Remove previous listener
  browser.webRequest.onBeforeRequest.removeListener(block);

  // Check if there are URLs to load
  if (urls && urls.length > 0) {
    // Create listener
    browser.webRequest.onBeforeRequest.addListener(block, {
        urls
    }, ["blocking"]);
  }
}

/**
* Handle blocked URL
* @param {Object} requestDetails
*/
async function block(_requestDetails) {

    // const blacklist = await fetch('http://localhost:3001/api/blacklist').then(
    //     response => response.json()
    // );

    // For the prototype purpose we are using mocked data!

    const blacklistRecordFound = blacklistMockedData.findIndex(blacklistItem => {
        if(blacklistItem.status !== 'confirmed') {
            return false;
        }

        if(blacklistItem.type !== 'domain') {
            return false;
        }

        // TODO:
        // - case for social media profile
        // - case for ip addresses

        return _requestDetails.url.includes(blacklistItem.address);
    });

    if (blacklistRecordFound != -1) {
        return {
            redirectUrl: browser.runtime.getURL('/pages/blockpage.html')
        };
    } else {
        return {
            cancel: true
        };
    }
}

async function checkData() {
    // init blacklist
    const blacklist = await fetch('http://localhost:3001/api/blacklist').then(
        response => response.json()
    );

    // Load URLs from storage
    const data = await browser.storage.sync.get();

    // Create blank URL list in storage if required
    if (!data.urlList) {
        browser.storage.sync.set({
            blacklist
        });
    }
}

// init blacklist
fetch('http://localhost:3001/api/blacklist').then(
    response => response.json()
).then(jsonResponse => {
    blacklist = jsonResponse
});

createBlocker();
