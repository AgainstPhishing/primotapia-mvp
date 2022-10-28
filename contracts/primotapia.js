// It's the WARP smart contract for primotapia

const addToBlacklist = async (
  state,
  { caller: _caller, input: { address } }
) => {
  state.announcements.push(address)

  return { state };
};

const approveToBlacklist = async (
  state,
  { caller: _caller, input: { address } }
) => {
  const filteredState = state.announcements.filter(an => (an !== address));

  return {
      state: filteredState
  };
};

const addAllowedAddress = async (
  state,
  { caller: _caller, input: { address } }
) => {
  // state.announcements.push(address)

  return { state };
};

const removeAllowedAddress = async (
  state,
  { caller: _caller, input: { address } }
) => {
  // state.announcements.push(address)

  return { state };
};

export function handle(state, action){
  switch (action.input.function) {
    case 'addToBlacklist':
      return addToBlacklist(state, action);
    case 'approveToBlacklist':
      return approveToBlacklist(state, action);
    case 'addAllowedAddress':
      return addAllowedAddress(state, action);
    case 'removeAllowedAddress':
      return removeAllowedAddress(state, action);

    default:
        return state.announcements; 
  }
}
