// It's the WARP smart contract for primotapia

function getCurrentTimestamp() {
  return Math.floor((new Date()).getTime() / 1000);
}

function isAddressAllowed(state, addressToCheck) {
  return !!state.allowedAddress.find(address => address.address === addressToCheck);
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

  // TODO
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

  const blacklist = { ...state.blacklist };
  blacklist[index].status = 'confirmed';

  return {
    state: {
      ...state,
      blacklist
    }
  }
};

const addAllowedAddress = async (
  state,
  { caller: _caller, input: { address } }
) => {
  // TODO

  return { state };
};

const removeAllowedAddress = async (
  state,
  { caller: _caller, input: { address } }
) => {
  // TODO

  return { state };
};

export function handle(state, action){
  switch (action.input.function) {
    case 'changeOwnership':
      return changeOwnership(state, action);
    case 'addToBlacklist':
      return addToBlacklist(state, action);
    case 'approveToBlacklist':
      return approveToBlacklist(state, action);
    case 'revertFromBlacklist':
      return revertFromBlacklist(state, action);
    case 'addAllowedAddress':
      return addAllowedAddress(state, action);
    case 'removeAllowedAddress':
      return removeAllowedAddress(state, action);
    default:
        return state.announcements; 
  }
}