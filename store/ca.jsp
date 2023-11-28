// import UserService from '@/services/userService'
// import Vue from 'vue'
import {
  ToastProgrammatic as Toast
} from "buefy";
import axios from "@nuxtjs/axios";

// init state
const state = () => ({
  items: [],
  menus: [],
  promoModalOpened: false,
  deliveryAddress: "",
  deliveryPrice:2000,
});

// getters
const getters = {
  getAppMenu: (state) => {
    return state.menus;
  },
  promoModalOpened: (state) => {
    return state.promoModalOpened;
  },
  cartItems: (state) => {
    if (state.items.length > 0) {
      return state.items.map(({
        item,
        quantity
      }) => {
      console.log(item);
      
    /*     item.price = item.onSale==true ? item.salePrice : item.price */

        return {
          ...item,
          quantity: item.quantity,
          // quantityPersale: 10,
        };
      });
    }
    // check if product is already present in cart
    return [];
  },
  cartTotalTaxes: (state) => {

  // return method which 18% will be added to the state.items to get 3000
 



    return state.items.reduce((total, {
      item,
      quantity
    }) => {
      return (item.price*quantity) - ((total + (item.price*quantity)) /(1+0.18));
    }, 0);
  },
  cartTotalPrice: (state) => {
    return state.items.reduce((total, {
      item,
      quantity
    }) => {
      return total + item.price * quantity;
    }, 0);
  },
  cartTotalPriceWithDelivery: (state,getters) => {
 
  return getters.cartTotalPrice + state.deliveryPrice;
  },
  cartTotalWeight: (state) => {
    return state.items.reduce((total, {
      item,
      quantity
    }) => {
      return total + item.weight * quantity;
    }, 0);
  },
  cartTotalItems: (state, getters) => {
    return state.items.reduce((total, {
      item,
      quantity
    }) => {
      return total + quantity;
    }, 0);
    //return getters.cartItems.length
  },
  getDeliveryAddress: (state, getters, rootState, rootGetters) => {
    const defaultAddress = rootState.auth.user.defaultAddress;
    const userAddresses = rootState.auth.user.addresses;
/*     console.log(
      "addresses is : " +
      JSON.stringify(userAddresses[0]) +
      "and def is :" +
      defaultAddress
    ); */
  //  console.log("delivery  is : " + state.deliveryAddress);
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
  getDeliveryPrice: (state) => {return state.deliveryPrice},
};

// mutations
const mutations = {
    SET_MENU_MUTATION(state, menus) {
    // console.log("WALABOOOOOOK");
  
     state.menus=menus;

  },

      SET_DELIVERY_PRICE(state, price) {
 
 // console.log("SET_DELIVERY_PRICE: "+price);
     state.deliveryPrice=price;

  },
  OPEN_PROMO_MODAL(state) {
    state.promoModalOpened = true;
  },
  ADD_CART_ITEM(state, {
    product,
    quantityToBeAdd
  }, rootState, rootGetters) {
/*     console.log("ADD_CART_ITEM quantity " + quantityToBeAdd);
    console.log("ADD_CART_ITEM prod " + product); */
     const cartItems = rootGetters["cart/cartItems"];
console.log("cartItems");
    state.items.push({
      quantity: quantityToBeAdd === undefined ? 1 : quantityToBeAdd,
      item: product,
    });

    this.$axios.patch("customer/cart", {
      items: state.items.map((item) => {
        const {
          quantity,
          ...product
        } = item;

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
  SET_CART(state, payload) {
    state.items =
      typeof payload.items === "undefined" ? [] :
      payload.items.map((item) => {
        return {
          ...item,
        };
      });
  },
    
  DELETE_CART_ITEM(state, cartItem) {
    // const item = state.items.find(item => item.id === cartItem.id)
  //  console.log("DELETE_CART_ITEM prod " + cartItem._id, state.items[0]);
    const index = state.items.findIndex(
      (item) => item.item._id === cartItem._id
    );
    state.items.splice(index, 1);

    // const newList = state.items.filter(function (value) {
    //   return value.item._id !== cartItem._id;
    // });
    // console.log("newList  " + newList.length);
    // state.items = [...newList];

    Toast.open({
      message: "Panier mise à jour!",
      type: "is-success",
      position: "is-bottom-right",
    });

    this.$axios.patch("customer/cart", {
      items: state.items.map((item) => {
        const {
          quantity,
          ...product
        } = item;

        return {
          quantity: quantity,
          product: product.item._id,
        };
      }),
    });
    /* state.items = state.items.filter(function (value, index, arr) {
      return value !== cartItem
    }) */
  },
  UPDATE_CART_ITEM(state, updatedCartItem) {
 /* The above code is finding the index of an element called `updatedCartItem` in an array called
 `state.items`. The `indexOf()` method returns the index of the first occurrence of the specified
 element in the array, or -1 if it is not found. The index is then stored in a constant variable
 called `index`. */
    const index = state.items.indexOf(updatedCartItem);
    console.log(index);

    //state.items[index] = updatedCartItem
    /* The above code is updating an item in an array called `items` located in the `state` object. It
    is removing one item at the specified `index` and replacing it with `updatedCartItem`. */
    state.items.splice(index, 1, updatedCartItem);

    this.$axios.patch("customer/cart", {
      items: state.items.map((item) => {
   /* The above code is using object destructuring in JavaScript to extract the `quantity` property
   from an `item` object and assign it to a variable of the same name. The remaining properties of
   the `item` object are being extracted and assigned to a new object called `product`. */
        const {
          quantity,
          ...product
        } = item;

        return {
          quantity: quantity,
          product: product.item._id,
        };
      }),
    }).then(r => console.log(r))

    // UserService.updateCart(state).then(r => console.log(r))
    Toast.open({
      message: "Panier mise à jour!",
      type: "is-success",
      position: "is-bottom-right",
    });
  },

  INCREMENT_CART_ITEM_QUANTITY(state, {
    product,
    quantityToBeAdd
  }) {
    const existingCartItem = state.items.find(
      (cartItems) => cartItems.item._id === product._id
    );
  //  console.log("INCREMENT_CART_ITEM_QUANTITY " + quantityToBeAdd);
    const max = product.quantityPerSale;

    if ((existingCartItem.quantity + quantityToBeAdd) <= max) {
      if (quantityToBeAdd === undefined) {
        existingCartItem.quantity++;

        Toast.open({
          message: "Article ajouté à votre panier!",
          type: "is-success",
          position: "is-bottom-right",
        });
      } else {
        existingCartItem.quantity =
          existingCartItem.quantity + parseInt(quantityToBeAdd, 10);

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

    this.$axios.patch("customer/cart", {
      items: state.items.map((item) => {
        const {
          quantity,
          ...product
        } = item;
        console.log(product);

        return {
          quantity: quantity,
          product: product.item._id,
          unitPrice: product.item.price,
          totalPrice: product.item.price * quantity
        };
      }),
    });
  },
  CHANGE_CART_ITEM_QUANTITY(state, {
    id
  }) {
    const cartItem = state.items.find((item) => item.id === id);
    cartItem.quantity++;
  },
  DECREMENT_CART_ITEM_QUANTITY(state, {
    _id
  }) {
    const cartItem = state.items.find((item) => item._id === _id);
    cartItem.quantity--;
  },
  EMPTY_CART(state) {
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

  async getMenuAction({
    state,
    commit
  }) {



    if (state.menus?.length === 0) {
   
 
      try {
        const {
          status,
          data
        } = await this.$axios.get("/product_category/menu");
        if (status === 200) {

       
             commit("SET_MENU_MUTATION", data.data);
 
 
        }

      } catch (error) {
        console.log('error', {
          ...error.response
        });
        if (error?.response) {

          for (var i = 0; i < error.response.data.message.length; i++) {
            Toast.open({
              message: `${error}`,
              duration: 5000,
              queue: false,
              type: "is-warning",
              position: "is-bottom-right",
            });

          }


        } else {
          Toast.open({
            message: `${error}`,
            duration: 5000,
            queue: false,
            type: "is-danger",
            position: "is-bottom-right",
          });

        }
      }

    }

 

    // UserService.updateCart(state).then(r => console.log(r))
  },
  setCart({
    commit
  }, payload) {
    commit("SET_CART", payload);
  },
 
  setPromoModalState({
    state,
    commit
  }) {
    commit('OPEN_PROMO_MODAL');
  },
  //REMBER: actions can on take 1 parameter either {} or [value,value] or simple value
  addProductToCart({
      state,
      commit
    },
    itemCart /*itemCart={product, quantityToBeAdd} */
  ) {

    function isProductExistInCart(product) {
      return state.items.find((item) => item.item._id === product._id);
    };

    function addToCart(singleItemCart) {
/*     singleItemCart.product.price = singleItemCart.product.onSale==true ? singleItemCart.product.salePrice : singleItemCart.product.price
 */     
      const cartItem = isProductExistInCart(singleItemCart.product); //return the item in Cart | {item:{},quantity:1}
      // if cart item containing this product exist in cart then increment the cart item quantity
     // console.log("wesh: " + JSON.stringify(singleItemCart.product.name));
      if (cartItem) {
       // console.log("eeee: " + JSON.stringify(cartItem));
        //check if product can be added to cart by quantityPerSale
        if ((cartItem.quantity + singleItemCart.quantity) >= cartItem.item.quantityPerSale) {

          Toast.open({
            message: "Maximum " + cartItem.item.quantityPerSale + " par commande pour ce produit!",
            duration: 5000,
            queue: false,
            type: "is-warning",
            position: "is-bottom-right",
          });
        } else {
          // increment the cart item quantity it is exist in the cart
          commit("INCREMENT_CART_ITEM_QUANTITY", singleItemCart);
        }
      } else {
        //if product dosnt exist in the cart, just add it
        console.log(singleItemCart);
        ("ADD_CART_ITEM", singleItemCart);
      }
    };
    //if itemCart is an array of cartItem
    if (Array.isArray(itemCart.e)) {

      for (let i = 0; i < itemCart.e.length; i++) {
  /*       console.log(
          "****addProductToCart item:" +
          JSON.stringify(itemCart.e[i].name) +
          "quantityAdded: " +
          itemCart.quantityToBeAdd
        ); */
        addToCart({
          product: itemCart.e[i],
          quantityToBeAdd: 1
        });
      }

    } else {
 /*      console.log(
        "addProductToCart item:" +
        itemCart.product +
        "quantityAdded: " +
        itemCart.quantityToBeAdd
      ); */
      addToCart(itemCart);
    }

  },

  changeCartItemQuantity({
    state,
    commit
  }, {
    cartItem,
    newValue
  }) {
  //  console.log("newValue " + newValue);
    const ee = state.items.find((item) => item.item._id === cartItem._id);

    const index = state.items.indexOf(ee);
    // console.log("mozo" + ee);

    const oldCartItem = {
      ...state.items[index]
    };
    oldCartItem.quantity = newValue;
    commit("UPDATE_CART_ITEM", oldCartItem);
  },
  removeItem({
    state,
    commit
  }, cartItem) {
    console.log(cartItem);
    commit("DELETE_CART_ITEM", cartItem);

    // UserService.updateCart(state).then(r => console.log(r))
  },
  emptyCart({
    state,
    commit
  }) {
    commit("EMPTY_CART");

    // UserService.updateCart(state).then(r => console.log(r))
  },
  setDeliveryAddress({
    commit
  }, address) {
   // console.log(address);
    commit("SET_DELIVERY_ADDRESS", address);
  },
    setDeliveryPrice({
    commit
  }, price) {
  //  console.log(price);
    commit("SET_DELIVERY_PRICE", price);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};