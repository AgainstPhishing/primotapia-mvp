// It's the WARP smart contract for primotapia

function getCurrentTimestamp() {
  return Math.floor((new Date()).getTime() / 1000);
}

function isAddressAllowed(state, addressToCheck) {
  return !!state.allowedAddresses.find(address => address.address === addressToCheck);
}

function isOwner(state, address) {
  return state.owner === address;
}

const changeOwnership = async (
  state,
  { caller: _caller, input: { address } }
) => {
  
  
  return { state: {
    ...state,
    owner: address
  }};
};

const addToBlacklist = async (
  state,
  { caller: _caller, input: { type, address, description } }
) => {

  const status = isAddressAllowed(state, _caller) ? 'confirmed' : 'reported';

  const blacklistItem = {
    type,
    address,
    description,
    status,
    reportedBy: _caller,
    reportedAt: getCurrentTimestamp()
  }

  const blacklist = [
    ...state.blacklist,
    blacklistItem
  ];

  return { state: {
    ...state,
    blacklist
  } };
};

const approveToBlacklist = async (
  state,
  { caller: _caller, input: { type, address } }
) => {

  // if caller is allowed
  if(!isAddressAllowed(state, _caller)) {
    return { state };
  }

  const index = state.blacklist.findIndex(blacklistItem => blacklistItem.type === type && blacklistItem.address === address) 

  if(index === -1) {
    return { state };
  }

  const blacklist = [ ...state.blacklist ];
  blacklist[index].status = 'confirmed';

  return {
    state: {
      ...state,
      blacklist
    }
  }
};

const rejectFromBlacklist = async (
  state,
  { caller: _caller, input: { type, address } }
) => {

  // if caller is allowed
  if(!isAddressAllowed(state, _caller)) {
    return { state };
  }

  const index = state.blacklist.findIndex(blacklistItem => blacklistItem.type === type && blacklistItem.address === address) 

  if(index === -1) {
    return { state };
  }

  const blacklist = [ ...state.blacklist ];
  blacklist[index].status = 'rejected';

  return {
    state: {
      ...state,
      blacklist
    }
  }
};

const addAllowedAddress = async (
  state,
  { caller: _caller, input: { address, description } }
) => {
  if(!isOwner(state, _caller)) {
    return { state };
  }

  const allowedAddresses = [ ...state.allowedAddresses, {
    address,
    description
  } ];

  return {
    state: {
      ...state,
      allowedAddresses
    }
  }
};

const removeAllowedAddress = async (
  state,
  { caller: _caller, input: { address } }
) => {
  if(!isOwner(state, _caller)) {
    return { state };
  }

  const allowedAddresses = [ ...state.allowedAddresses ].filter(allowedAddress => allowedAddress.address != address);

  return {
    state: {
      ...state,
      allowedAddresses
    }
  }
};

export function handle(state, action){
  switch (action.input.function) {
    case 'changeOwnership':
      return changeOwnership(state, action);
    case 'addToBlacklist':
      return addToBlacklist(state, action);
    case 'approveToBlacklist':
      return approveToBlacklist(state, action);
    case 'rejectFromBlacklist':
      return rejectFromBlacklist(state, action);
    case 'addAllowedAddress':
      return addAllowedAddress(state, action);
    case 'removeAllowedAddress':
      return removeAllowedAddress(state, action);
    default:
        return state.announcements; 
  }
}
