/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const CONTRACT_ADDRESS = 'ANonubWMDDS7hK8dJVkQjU1SItCfT3baBxaHi72pa3s';

const urls = ["<all_urls>"];

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
  if (urls) {
      // Create listener
      if (urls.length > 0) {
          browser.webRequest.onBeforeRequest.addListener(block, {
              urls
          }, ["blocking"]);
      }
  }
}

/**
* Handle blocked URL
* @param {Object} requestDetails
*/
async function block(_requestDetails) {
    const warpHandle = warp.WarpFactory.forMainnet();

    const contract = warpHandle.contract(CONTRACT_ADDRESS).connect('use_wallet');
    const { cachedValue } = await contract.readState();
    const blacklistRecordFound = cachedValue.blacklist.find(blacklistItem => {
        if(blacklistItem.status !== 'confirmed') {
            return false;
        }

        if(blacklistItem.type !== 'domain') {
            return false;
        }

        // TODOs:
        // - case for social media profile
        // - case for ip addresses

        return requestDetails.url.includes(blacklistItem.address);
    });
    if (blacklistRecordFound) {
        return {
            redirectUrl: browser.runtime.getURL('/pages/blockpage.html')
        };
    } else {
        return {
            cancel: true
        };
    }
}

createBlocker();
