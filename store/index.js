export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
  getUserDefaultAddress(state) {
    return state.auth.user.defaultAddress;
  },
  getUserAddresses(state) {
    return state.auth.user.addresses;
  },
};
