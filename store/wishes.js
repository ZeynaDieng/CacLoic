// import UserService from '@/services/userService'
// import Vue from 'vue'
import { ToastProgrammatic as Toast } from "buefy";
import axios from "@nuxtjs/axios";

// init state
const state = () => ({
  items: [],
  promoModalOpened: false,
  deliveryAddress: "",
});

// getters
const getters = {
  promoModalOpened: (state) => {
    return state.promoModalOpened;
  },
  wishesItems: (state) => {
    if (state.items.length > 0) {
      return state.items.map(({ item, quantity }) => {
        return {
          ...item,
          quantity: quantity,
          // quantityPersale: 10,
        };
      });
    }
    // check if product is already present in wishes
    return [];
  },
  wishesTotalTaxes: (state) => {
    return state.items.reduce((total, { item, quantity }) => {
      return total + item.tax * quantity;
    }, 0);
  },
  wishesTotalPrice: (state) => {
    return state.items.reduce((total, { item, quantity }) => {
      return total + item.price * quantity;
    }, 0);
  },
  wishesTotalWeight: (state) => {
    return state.items.reduce((total, { item, quantity }) => {
      return total + item.weight * quantity;
    }, 0);
  },
  wishesTotalItems: (state, getters) => {
    return state.items.reduce((total, { item, quantity }) => {
      return total + quantity;
    }, 0);
    //return getters.wishesItems.length
  },
  getDeliveryAddress: (state, getters, rootState, rootGetters) => {
    const defaultAddress = rootState.auth.user.defaultAddress;
    const userAddresses = rootState.auth.user.adresses;
    console.log(
      "adresses is : " +
      JSON.stringify(userAddresses[0]) +
      "and def is :" +
      defaultAddress
    );
    console.log("delivery  is : " + state.deliveryAddress);
    if (state.deliveryAddress === "") {
      if (typeof defaultAddress === "undefined") {
        return userAddresses[0];
      } else {
        let filtered = userAddresses.filter(
          (userAddress) => userAddress._id === defaultAddress
        );

        if (filtered.length) {
          return filtered[0];
        }
      }
    } else {
      return state.deliveryAddress;
    }
  },
};

// mutations
const mutations = {
  OPEN_PROMO_MODAL(state) {
    state.promoModalOpened = true;
  },
  ADD_WISHES_ITEM(state, { product, quantityToBeAdd }, rootState, rootGetters) {
    console.log("ADD_WISHES_ITEM quantity " + quantityToBeAdd);
    console.log("ADD_WISHES_ITEM prod " + product);
    // const wishesItems = rootGetters["wishes/wishesItems"];

    state.items.push({
      quantity: quantityToBeAdd === undefined ? 1 : quantityToBeAdd,
      item: product,
    });

    this.$axios.patch("customer/wishes", {
      items: state.items.map((item) => {
        const { quantity, ...product } = item;

        return {
          quantity: quantity,
          product: product.item._id,
        };
      }),
    });

    Toast.open({
      message: "Article ajouté à votre panier!",
      type: "is-success",
      position: "is-bottom-right",
    });
  },
  SET_WISHES(state, payload) {
    state.items =
      typeof payload.items === "undefined"
        ? []
        : payload.items.map((item) => {
          return {
            ...item,
          };
        });
  },
  DELETE_WISHES_ITEM(state, wishesItem) {
    // const item = state.items.find(item => item.id === wishesItem.id)
    console.log("DELETE_WISHES_ITEM prod " + wishesItem._id, state.items[0]);
    const index = state.items.findIndex(
      (item) => item.item._id === wishesItem._id
    );
    state.items.splice(index, 1);

    // const newList = state.items.filter(function (value) {
    //   return value.item._id !== wishesItem._id;
    // });
    // console.log("newList  " + newList.length);
    // state.items = [...newList];

    Toast.open({
      message: "Panier mise à jour!",
      type: "is-success",
      position: "is-bottom-right",
    });

    this.$axios.patch("customer/wishes", {
      items: state.items.map((item) => {
        const { quantity, ...product } = item;

        return {
          quantity: quantity,
          product: product.item._id,
        };
      }),
    });
    /* state.items = state.items.filter(function (value, index, arr) {
      return value !== wishesItem
    }) */
  },
  UPDATE_WISHES_ITEM(state, updatedWishesItem) {
    const index = state.items.indexOf(updatedWishesItem);

    //state.items[index] = updatedWishesItem
    state.items.splice(index, 1, updatedWishesItem);

    this.$axios.patch("customer/wishes", {
      items: state.items.map((item) => {
        const { quantity, ...product } = item;

        return {
          quantity: quantity,
          product: product.item._id,
        };
      }),
    });

    // UserService.updateWishes(state).then(r => console.log(r))
    Toast.open({
      message: "Panier mise à jour!",
      type: "is-success",
      position: "is-bottom-right",
    });
  },

  INCREMENT_WISHES_ITEM_QUANTITY(state, { product, quantityToBeAdd }) {
    const existingWishesItem = state.items.find(
      (wishesItems) => wishesItems.item._id === product._id
    );
    console.log("INCREMENT_WISHES_ITEM_QUANTITY " + quantityToBeAdd);
    const max = product.quantityPerSale;

    if ((existingWishesItem.quantity + quantityToBeAdd) <= max) {
      if (quantityToBeAdd === undefined) {
        existingWishesItem.quantity++;

        Toast.open({
          message: "Article ajouté à votre panier!",
          type: "is-success",
          position: "is-bottom-right",
        });
      } else {
        existingWishesItem.quantity =
          existingWishesItem.quantity + parseInt(quantityToBeAdd, 10);

        Toast.open({
          message: "Article ajouté à votre panier!",
          type: "is-success",
          position: "is-bottom-right",
        });
      }
    } else {
      Toast.open({
        message: "Maximum " + max + " par commande pour ce produit!",
        duration: 5000,
        queue: false,
        type: "is-warning",
        position: "is-bottom-right",
      });
    }

    this.$axios.patch("/wishes", {
      items: state.items.map((item) => {
        const { quantity, ...product } = item;

        return {
          quantity: quantity,
          product: product.item._id,
        };
      }),
    });
  },
  CHANGE_WISHES_ITEM_QUANTITY(state, { id }) {
    const wishesItem = state.items.find((item) => item.id === id);
    wishesItem.quantity++;
  },
  DECREMENT_WISHES_ITEM_QUANTITY(state, { _id }) {
    const wishesItem = state.items.find((item) => item._id === _id);
    wishesItem.quantity--;
  },
  EMPTY_WISHES(state) {
    // state.items.length = 0
    state.items = [];
    /*     Vue.notify({
          group: 'success',
          title: 'Panier',
          text: 'Votre panier est maintenant vide'
        }) */
  },
  SET_DELIVERY_ADDRESS(state, address) {
    console.log(address);
    state.deliveryAddress = address;
    /* Vue.notify({
      group: 'success',
      title: 'Addresse de livraison mise à jour',
      text: 'Nouvelle addresse : ' + address.title
    }) */
  },
};

// actions
const actions = {
  setWishes({ commit }, payload) {
    commit("SET_WISHES", payload);
  },
  setPromoModalState({ state, commit }) {
    commit('OPEN_PROMO_MODAL');
  },
  //REMBER: actions can on take 1 parameter either {} or [value,value] or simple value
  addProductToWishes(
    { state, commit },
    itemWishes /*itemWishes={product, quantityToBeAdd} */
  ) {

    function isProductExistInWishes(product) { return state.items.find((item) => item.item._id === product._id); };

    function addToWishes(singleItemWishes) {
      const wishesItem = isProductExistInWishes(singleItemWishes.product);//return the item in Wishes | {item:{},quantity:1}
      // if wishes item containing this product exist in wishes then increment the wishes item quantity
      console.log("wesh: " + JSON.stringify(singleItemWishes.product.name));
      if (wishesItem) {
       /// console.log("eeee: " + JSON.stringify(wishesItem));
        //check if product can be added to wishes by quantityPerSale
        if ((wishesItem.quantity + singleItemWishes.quantity) >= wishesItem.item.quantityPerSale) {

          Toast.open({
            message: "Maximum " + wishesItem.item.quantityPerSale + " par commande pour ce produit!",
            duration: 5000,
            queue: false,
            type: "is-warning",
            position: "is-bottom-right",
          });
        } else {
          // increment the wishes item quantity it is exist in the wishes
          commit("INCREMENT_WISHES_ITEM_QUANTITY", singleItemWishes);
        }
      } else {
        //if product dosnt exist in the wishes, just add it
        commit("ADD_WISHES_ITEM", singleItemWishes);
      }
    };
    //if itemWishes is an array of wishesItem
    if (Array.isArray(itemWishes.e)) {

      for (let i = 0; i < itemWishes.e.length; i++) {
        console.log(
          "****addProductToWishes item:" +
          JSON.stringify(itemWishes.e[i].name) +
          "quantityAdded: " +
          itemWishes.quantityToBeAdd
        );
        addToWishes({ product: itemWishes.e[i], quantityToBeAdd: 1 });
      }

    } else {
      console.log(
        "addProductToWishes item:" +
        itemWishes.product +
        "quantityAdded: " +
        itemWishes.quantityToBeAdd
      );
      addToWishes(itemWishes);
    }

  },

  changeWishesItemQuantity({ state, commit }, { wishesItem, newValue }) {
    console.log("newValue " + newValue);
    const ee = state.items.find((item) => item.item._id === wishesItem._id);

    const index = state.items.indexOf(ee);
    // console.log("mozo" + ee);

    const oldWishesItem = { ...state.items[index] };
    oldWishesItem.quantity = newValue;
    commit("UPDATE_WISHES_ITEM", oldWishesItem);
  },
  removeItem({ state, commit }, wishesItem) {
    console.log(wishesItem);
    commit("DELETE_WISHES_ITEM", wishesItem);

    // UserService.updateWishes(state).then(r => console.log(r))
  },
  emptyWishes({ state, commit }) {
    commit("EMPTY_WISHES");

    // UserService.updateWishes(state).then(r => console.log(r))
  },
  setDeliveryAddress({ commit }, address) {
    console.log(address);
    commit("SET_DELIVERY_ADDRESS", address);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
