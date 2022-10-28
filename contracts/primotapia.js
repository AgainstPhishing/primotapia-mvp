// It's the WARP smart contract for primotapia


const changeOwnership = async (
  state,
  { caller: _caller, input: { address } }
) => {
  // TODO
  return { state };
};

const addToBlacklist = async (
  state,
  { caller: _caller, input: { address } }
) => {
  // TODO

  return { state };
};

const approveToBlacklist = async (
  state,
  { caller: _caller, input: { address } }
) => {
  // TODO

  return {
      state
  };
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
