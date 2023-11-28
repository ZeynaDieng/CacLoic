<template>
  <section id="cart-page">
    <div class="grid-container">
      <h3 v-if="totalItems > 0" class="title is-4" style="margin:0">Panier <span
          class="cart-header-total is-size-6 has-text-weight-light">({{ totalItems }} articles)</span></h3>
      <div class="grid-x grid-margin-x" v-if="totalItems > 0">
        <div class="small-12 large-7 cell">
          <div class="cart-item-widget box" v-for="item in cartItems" :key="item._id" :product="item">
            <div class="cart-item-widget_content  ">
              <!--          <NuxtLink class="img-link" :to="`/produits/${item.slug}`">
                <img :src="`${item.image_ext}.webp`" :alt="item.slug" :srcset="`
                    ${item.image_ext}-100.webp 100w,
                    ${item.image_ext}-180.webp 180w,
                    ${item.image_ext}-300.webp 300w,
                    ${item.image_ext}-600.webp 600w,
                    `">
              </NuxtLink> -->
              <NuxtLink class="img-link" :to="`/produits/${item.slug}`">
                <img :src="`${item.image_ext}.webp`" :alt="item.slug" :srcset="`
                    ${item.image_ext}-100.webp 100w,
                                                    ${item.image_ext}-180.webp 180w,
                                                    ${item.image_ext}-300.webp 300w,
                    `">
              </NuxtLink>
              <div class="meta">

                <p class="brand-name" v-if="item.brand">{{ item.brand.name }}</p>
                <NuxtLink class="img-link" :to="`/produits/${item.slug}`">
                  <h3 class="product-name">{{ item.name }}</h3>
                </NuxtLink>
                <p :class="{ 'line-through': item.promotion }" class="price">{{ item.price | currency }}</p>
                <p class="price" v-if="item.promotion">{{
                  item.price - (item.price * item.promotion / 100) | currency
                }}</p>
              </div>
            </div>
            <div class="cart-item-widget_action">
              <b-select placeholder="Quantité" v-model="item.quantity"
                @input="changeItemQuantity({ 'cartItem': item, 'newValue': item.quantity })">

                <option v-for="option in item.quantityPerSale" :value="option" :key="option">
                  {{ option }}
                </option>
              </b-select>
              <b-button type="is-text" icon-left="delete" @click="removeItem(item)" outlined class="is-primary" />
            </div>
          </div>
        </div>
        <div class="small-12 large-5 cell" style="position: relative;">
          <div class="cart-summary-container box" id="cart-summdary">
          
            <!--             <div class="mb-4" v-if="!paidAtDelivery">
              <b-field>
                <b-switch v-model="shouldNotDeliver" type="is-primary">
                  Récupérer à la boutique
                </b-switch>
              </b-field>
            </div> -->
 
            <div class="mb-4" v-if="shouldNotDeliver !== true ">
              <h3 class="is-5 title" style="margin-bottom:9px">Zone de livraison</h3>
              <p class="text-gray-500">Choisissez une zone de livraison</p>
              <br>
              <b-field v-for="zone in deliveryZones" :key="zone._id">
                <b-radio v-model="selectedDeliveryZone" :native-value="zone" @input="updateDeliveryPrice">
                <span class="text-md font-bold text-yellow-500">{{zone.name}}</span> - <span  class="text-md font-bold ">{{zone.price | currency}}</span>  ({{(zone.regions.map((region) => region.name).join(', '))}})
                </b-radio>
              </b-field>
 
            </div>
            <div v-else></div>
               <hr>
               
            <div v-if="shouldNotDeliver !== true && $auth.loggedIn" class="delivery-selection-wrapper my-4">
              <h3 class="is-5 title" style="margin-bottom:9px">Adresse de livraison</h3>
              <CartAddressCard @cardClicked="chooseAddressModal()" badgeText='Livrer à cette adresse'
                :address="deliveryAddress" :isDefault="true"
                v-if="getUserAddresses.length !== 0 || typeof getUserAddresses == 'undefined'">
                <b-button @click="chooseAddressModal()" label="Changer" expanded />
              </CartAddressCard>
              <!-- add address component -->

              <div v-else>
                <div class="add-address-card align-center">
                  <b-button icon-left="plus" label="Ajouter une adresse" tag="nuxt-link" to="/compte/address" expanded />
                </div>
              </div>
            </div>


            <div v-else>
               <div class="grid-x grid-margin-x grid-margin-y align-center	">
      <!--       <div v-if="errors" class="grid-x grid-margin-x grid-margin-y align-center	">
              <b-message :title="errors.title" type="is-danger" has-icon aria-close-label="Close message"
                         size="is-small">
                <template v-if="Array.isArray(errors.message)">
                  <div class="block" v-for="(error, index) in errors.message" :key="index">{{ error }}</div>
                </template>
                <div class="block" v-else>{{ errors.message }}</div>
              </b-message>
            </div> -->
            <b-field class="  small-12 medium-12 cell" label="Nom Complet">
              <b-input required placeholder="M****** Sy" type="text" v-model="address.fullName"/>
            </b-field>
            <b-field class="  small-12 medium-6 cell" label="Région">
              <b-select placeholder="Choisissez la région" expanded v-model="address.region">
                <option
                  v-for="option in regions"
                  :value="option.value"
                  :key="option.value">
                  {{ option.name }}
                </option>
              </b-select>
            </b-field>
            <b-field class="  small-12 medium-6 cell" label="Téléphone">
              <b-input required type="tel" placeholder="77XXXXXXX" v-model="address.phone"/>
            </b-field>
            <b-field class="  small-12 medium-12 cell" label="Adresse exacte">
              <b-input required v-model="address.address" placeholder="localité, rue, numéro d'habitation"/>
            </b-field>
 
          </div>
            </div>
<hr>

  <h3 class="is-4 title" style="margin-bottom:9px">Récapitulatif</h3>
            <div class="divider"></div>
            <br>
            <div class="summary-footer-total summary-footer-total-price">
              <p>Montant de votre commande:</p>
              <p>{{ total | currency }}</p>
            </div>
            <div class="summary-footer-total summary-footer-total-price">
              <p>Dont Taxe (18%):</p>
              <p>{{ taxes | currency }}</p>
            </div>
                   <div class="summary-footer-total summary-footer-total-price">
              <p>Livraison</p>
              <p>{{ this.getDeliveryPrice | currency }}</p>
            </div>  

            <!--             <div class="summary-footer-total summary-footer-total-amount">
              <p>TOTAL:</p>
              <p>{{ total + this.getDeliveryPrice() | currency }}</p>
            </div> -->
            <div class="summary-footer-total summary-footer-total-amount">
              <p>TOTAL:</p>
              <p>{{ this.cartTotalPriceWithDelivery | currency }}</p>
            </div>
            <div class="mb-4">
              <b-field>
                <b-switch @input="paymentMode" type="is-primary" v-model="paidAtDelivery">
                  Paiement à la livraison
                </b-switch>
              </b-field>
            </div>
<hr>

            <div style="width:100%" v-if="$auth.loggedIn">
              <b-button class="is-uppercase" :label="orderButtonText" type="is-primary" expanded @click="submitForm" />
              <img v-if="transactionMode === 'ONLINE'" src="@/assets/images/paytech.png" alt="">
            </div>
            <div style="width:100%" v-else  >
              <b-button  tag="nuxt-link" to="/login" class="is-uppercase" label="Déjà client ? Se Connecter" type="is-primary" expanded />
              <b-button    class="is-uppercase mt-2" label="Commander sans créer de compte" type="is-warning" expanded  @click="submitAnonymousForm" />
 <img v-if="transactionMode === 'ONLINE'" src="@/assets/images/paytech.png" alt="">
            </div>
            <div style="width:100%" class="mt-2">
            </div>
          </div>
        </div>
      </div>
      <!-- EMPTY CART -->
      <div v-else class="grid-x" style="margin-top:5vh">
        <div class="small-12 cell text-center">
          <img style="    margin: 0 auto;" src="@/assets/images/emptycart.png" alt />
          <br><br>
          <h4 style="letter-spacing:2px">PANIER D'ACHAT VIDE</h4>

          <p>Ajoutez des produits à votre panier</p>
          <br />
          <b-button tag="NuxtLink" to="/" class="is-uppercase text-primary" label="Parcourir nos produits"
            type="success" />
        </div>
      </div>
    </div>
    <modal name="choose-address-modal" v-if="$auth.loggedIn" width="70%" height="auto" :adaptive="true">
      <div class="modal-content-wrapper" style="  padding-top: 65px;  padding-bottom: 65px;">
        <div class="grid-container">
          <div class="grid-x">
            <div class="small-12 cell">
              <div class="grid-x grid-margin-x grid-margin-y">
                <div class="small-12 medium-6 large-4 cell">
                  <div class="add-address-card align-center">
                    <b-button tag="NuxtLink" to="/compte/address" icon-left="plus" label="Ajouter une adresse" />
                  </div>
                </div>

                <div v-for="address in $auth.user.addresses" :key="address._id" class="small-12 medium-6 large-4 cell">
                  <AddressCard @cardClicked="setDeliveryAddress(address)" :address="address"
                    :isDefault="isDefaultAddress(address)" :isDeliveryAddress="isDeliveryAddress(address)"
                    class="modal-address-card">
                    <b-button @click="setDeliveryAddress(address)" label="Choisir" />

                    <b-button style="    width: 100%; margin:10px 0" @click="deleteAddress(address)" label="Supprimer"
                      type="is-danger" />
                  </AddressCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
    <b-modal v-model="isEmptyAddressModalActive" :width="640" scroll="keep">
      <b-message title="Adresse de livraison obligatoire" type="is-danger" aria-close-label="Fermer" has-icon
        @close="isEmptyAddressModalActive = false">
        Veuillez ajouter une adresse de livraison!
      </b-message>
    </b-modal>
  </section>
</template>

<script>
import {
  mapGetters,
  mapActions
} from "vuex";
import CartAddressCard from "../../components/CartAddressCard"
import AccountAddressCard from "../../components/AccountAddressCard";
import AddressAccount from "../compte/address";
import AddressCard from "../../components/AddressCard";
import OrderTickerModal from "../../components/OrderTickerModal";
import OrderAnonymousTickerModal from "../../components/OrderAnonymousTickerModal";
import _ from "lodash";


export default {
  auth: false,
  middleware: "auth",
  components: {
    AddressAccount,
    CartAddressCard,
    AccountAddressCard,
    AddressCard
  },
  head() {
    return {
      title: "CAC | Panier",
      meta: [{
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Mon Panier d'achat"
      },
      ]
    };
  },
  data() {
    return {
      isEmptyAddressModalActive: false,
      isCardModalActive: false,
      cartItemsRepository: [],
      deliveryZones: [],
      selectedDeliveryZone: null,
      deliveryPrice: 0,
      shouldNotDeliver: false,
      shouldCheckout:true,
      product: {
        quantityPersale: ["1", "2"]
      },
      transactionMode: !this.shouldNotDeliver ? 'ONLINE' : 'SHOP_PICK_UP',
      paidAtDelivery: false,

     regions: [
  {name: "Dakar", value: "DAKAR"},
  {name: "Thiès", value: "THIES"},
  {name: "Diourbel", value: "DIOURBEL"},
  {name: "Fatick", value: "FATICK"},
  {name: "Kaolack", value: "KAOLACK"},
  {name: "Kédougou", value: "KEDOUGOU"},
  {name: "Kolda", value: "KOLDA"},
  {name: "Louga", value: "LOUGA"},
  {name: "Matam", value: "MATAM"},
  {name: "Saint-Louis", value: "SAINT-LOUIS"},
  {name: "Sédhiou", value: "SEDHIOU"},
  {name: "Tambacounda", value: "TAMBACOUNDA"},
  {name: "Ziguinchor", value: "ZIGUINCHOR"}
],

      address: {
        fullName: "",
        region: "DAKAR",
        address: "",
        phone: ""
      }
    };
  },
  computed(){
  
  },
  mounted() {

 this.cartItems.forEach(item => {

       this.$store.dispatch("cart/updatedCartItemPrice", { id: item._id });
   // this.$store.commit('UPDATE_CART_ITEM_PRICE', { id: item._id });
  }); 
      this.getdeliveryZones()
    this.loadCheckoutScript()
    this.cartItemsRepository = this.cartItems;
    // Get the header
    const header = document.getElementById("cart-summary");


    // When the user scrolls the page, execute myFunction
    window.onscroll = function () {
      header === null ? "" : myFunction();
    };


    // Get the offset position of the navbar
    const sticky = header === null ? "" : header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
      //console.log(header);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  },
  computed: {
    ...mapGetters({
      getUserAddresses: "getUserAddresses",
      cartItems: "cart/cartItems",
      total: "cart/cartTotalPrice",
      taxes: "cart/cartTotalTaxes",
      weight: "cart/cartTotalWeight",
      totalItems: "cart/cartTotalItems",
      getUserDefaultAddress: "getUserDefaultAddress",
      getDeliveryPrice: "cart/getDeliveryPrice",
      cartTotalPriceWithDelivery: "cart/cartTotalPriceWithDelivery",
      deliveryAddress: "cart/getDeliveryAddress",
      userAddresses: "getUserAddresses"
      // accessToken: "accessToken"
    }),
    orderButtonText() {
      return this.transactionMode === 'ONLINE' ? 'Procéder au paiement' : 'Passer la commande'
    }
  },
  created() {
    //this.getdeliveryZones()
  },
  methods: {
    // getDeliveryAddress: (state, getters, rootState, rootGetters) => {
    //   const defaultAddress = rootGetters['user/getUserDefaultAddress']
    //   const userAddresses = rootGetters['user/getAddressList']
    //   console.log('adresses is : ' + JSON.stringify(userAddresses[0]) + 'and def is :' + defaultAddress)
    //   console.log('delivery  is : ' + state.deliveryAddress)
    //   if (state.deliveryAddress === '') {
    //     return typeof defaultAddress === 'undefined' ? userAddresses[0] : defaultAddress
    //   } else {
    //     return state.deliveryAddress
    //   }
    // },

    updateDeliveryPrice(ee){
   // console.log(this.selectedDeliveryZone);
    
    this.deliveryPrice = this.selectedDeliveryZone.price;
    this.$store.dispatch("cart/setDeliveryPrice",this.selectedDeliveryZone.price);
    
    },
    loadCheckoutScript() {
      if (document.createStyleSheet) {
        document.createStyleSheet('https://paytech.sn/cdn/paytech.min.css');
      } else {
        const styles = "@import url(' https://paytech.sn/cdn/paytech.min.css');";
        const newSS = document.createElement('link');
        newSS.rel = 'stylesheet';
        newSS.href = 'data:text/css,' + escape(styles);
        document.getElementsByTagName("head")[0].appendChild(newSS);
      }

      let paytechScript = document.createElement('script')
      paytechScript.setAttribute('src', 'https://paytech.sn/cdn/paytech.min.js')
      document.head.appendChild(paytechScript)
    },
    paymentMode($event) {
      $event ? this.transactionMode = 'AT_DELIVERY' : this.transactionMode = 'ONLINE';
    },
    hasDeliveryPrice() {
      return !this.shouldNotDeliver ? this.deliveryPrice : 0;
    },
    ...mapActions({
      removeItem: "cart/removeItem",
      setDefaultAddress: "user/setDefaultAddress",
      setDeliveryAddress: "cart/setDeliveryAddress",
      setDeliveryPrice: "cart/setDeliveryPrice",
      deleteAddress: "user/deleteAddress",
      emptyCart: "cart/emptyCart",
      changeItemQuantity: "cart/changeCartItemQuantity"
    }),
    changeDeliveryStatus(status) {
      this.shouldNotDeliver = status;
      if (status) {
        this.setDeliveryPrice(this.selectedDeliveryZone.price);
      } else {
        this.setDeliveryPrice(0);
      }
    },
 /*    getDeliveryPrice() {

      return (this.total > 100000 ? 3000 : 1500);

      // const response = await this.$axios.get("/api/client/delivery/zone", {
      //   country: this.deliveryAddress.country,
      //   region: this.deliveryAddress.region,
      //   township: this.deliveryAddress.township,
      //   weight: this.weight
      // });
      //
      // if (response.data.success) {
      //   if (response.data.hasDelivery) {
      //     this.deliveryDelay = response.data.delay;
      //     this.deliveryPrice = parseFloat(response.data.price);
      //   }
      // }
    }, */
isAnyFieldEmpty(address) {
  for (const key in address) {
    if (address.hasOwnProperty(key) && !address[key]) {
      return true;
    }
  }
  return false;
},
    async getdeliveryZones() {

      try {
        const { statusCode, data } = await this.$repositories.deliveryZones.all();
        if (statusCode === 200) {

          this.deliveryZones = data
          this.selectedDeliveryZone = data.length > 0 ? data[0] : null;
          //upadte delivery price in the store
          this.setDeliveryPrice(data.length > 0 ? data[0].price : 2500)
         /*  this.deliveryPrice = data.length > 0 ? data[0].price : 0; */




        }


      } catch (error) {
        console.log('error', error);
        if (error?.response) {
          this.$bvToast.toast(`${error.response.data.message}  `, {
            title: 'Opération échoué',
            autoHideDelay: 5000,
            toaster: "b-toaster-bottom-right",
            appendToast: false,
            variant: "danger",
            solid: true
          })

        } else {
          this.$bvToast.toast(`${error}`, {
            title: 'Opération échoué',
            autoHideDelay: 5000,
            toaster: "b-toaster-bottom-right",
            appendToast: false,
            variant: "danger",
            solid: true
          })
        }
      }

    },
    isDefaultAddress(address) {
      return typeof this.getUserDefaultAddress === "undefined" ? false : this.getUserDefaultAddress._id === address
        ._id;
    },
    isDeliveryAddress(address) {
      return typeof this.deliveryAddress === "undefined" ? false : this.deliveryAddress._id === address._id;
    },
    deliveryMethods() {
      this.shouldNotDeliver = !this.shouldNotDeliver;
    },
    async applyPromo() {
      // const response = await this.apiPost("/api/client/promotion", {
      //   price: this.total,
      //   code: this.promotion.code
      // });
      //
      // if (response.data.success) {
      //   if (response.data.promotion.isValid) {
      //     this.promotion = Object.assign(this.promotion, response.data.promotion);
      //     this.showPromo = false;
      //     this.showReduction = true;
      //   }
      // }
    },
    async submitForm() {

    if (this.shouldCheckout == false){
    console.log('zzzzz');
    
    return;
    }
      if (this.cartItems.length === 0) {
        this.$buefy.toast.open({
          message: "Votre panier est vide",
          type: "is-danger"
        });
        return;
      }
            if (this.deliveryAddress && this.shouldNotDeliver) {
        this.$buefy.toast.open({
          message: "L'addresse de livraison est obligatoire ",
          type: "is-danger"
        });
        return;
      }

      if (this.shouldNotDeliver) {
        this.setDeliveryPrice(0);
      }
 
      const loadingComponent = this.$buefy.loading.open({
        container: null
      })

      let totalPrice;

      // if (this.promotion.isValid) {
      //   totalPrice = this.total + this.deliveryPrice;
      // } else {
      //   totalPrice = this.total + this.deliveryPrice - this.promotion.priceReduction;
      // }

      // if (this.promotion.isValid) {
      totalPrice =this.cartTotalPriceWithDelivery;
      // } else {
      //   totalPrice = this.total + this.deliveryPrice - this.promotion.priceReduction;
      // }
      console.log('delivery adresse', JSON.stringify(this.deliveryAddress))

      const body = {
        items: this.cartItems.map(item => {
          return {
            // ...item,
            totalPrice: item.quantity * item.price,
            quantity: item.quantity,
            unitPrice: item.price,

            product: item
          };
        }),

        // promotionReduction: this.promotion.priceReduction,
        // deliveryPrice: parseFloat(this.deliveryPrice),
        total: parseFloat(this.cartTotalPriceWithDelivery),
        cartTotalPrice: parseFloat(this.total),
        hasPromotion: false,
        tax:  parseFloat(this.taxes),
        delivery: this.getDeliveryPrice,
        deliveryZone: this.selectedDeliveryZone==null ? "Indéfini" : this.selectedDeliveryZone.name
        // mode: !this.shouldNotDeliver ? 'ONLINE' : 'SHOP_PICK_UP'
      };

      if (!(this.shouldNotDeliver || this.paidAtDelivery)) {
        body.mode = 'ONLINE';

        if (!_.isObject(this.deliveryAddress)) {
          loadingComponent.close();
          this.isEmptyAddressModalActive = true;

          return;
        }

        body.deliveryAddress = JSON.stringify(this.deliveryAddress);
       // this.deliveryPrice = this.getDeliveryPrice();

      } else if (this.paidAtDelivery) {
        body.mode = 'AT_DELIVERY';

        if (!_.isObject(this.deliveryAddress)) {
          loadingComponent.close();
          this.isEmptyAddressModalActive = true;

      //    this.deliveryPrice = this.getDeliveryPrice();

          return;
        }
        body.deliveryAddress = JSON.stringify(this.deliveryAddress);
      } else if (this.shouldNotDeliver) {
        body.mode = 'SHOP_PICK_UP';
      }

      body.shouldDeliver = body.mode !== 'SHOP_PICK_UP'

      // if (this.promotion.isValid) {
      //   body.promotion = this.promotion.id;
      //   body.hasPromotion = true;
      // }

      if (body.mode === 'ONLINE') {
        if(this.shouldCheckout){
            this.shouldCheckout=false;
              (new PayTech({
          ...body,
          delivery: this.getDeliveryPrice ,
          items: JSON.stringify(body.items)
        })).withOption({

          requestTokenUrl: `${process.env.APP_ENV == 'DEV' ? process.env.DEV_API_BASE_URL : process.env.API_BASE_URL}/order`,
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization": this.$auth.strategy.token.get()
          },
          prensentationMode: PayTech.OPEN_IN_POPUP,
        }).send();
               this.shouldCheckout = true;
        } else{
          this.$buefy.toast.open({
          message: `Une erreur est survenue: shouldCheckout: ${this.shouldCheckout}`,
          type: "is-danger"
        });
        }
  
      } else {
      this.shouldCheckout==false;
        const {
          status,
          data
        } = await this.$axios.post('order', {
          ...body,
          items: JSON.stringify(body.items),
          delivery: this.getDeliveryPrice,
        })

        if (status === 201) {
          console.log(data)
          // this.purchase.token = response.data.token
          await this.emptyCart()

          this.$modal.show(OrderTickerModal, {
            order: data.order,
            transaction: data.transaction,
          }, {
            width: '480px',
            height: '320px'
          })

       this.shouldCheckout = true
        }
      }
      loadingComponent.close();

    },


//ANONYMOUS ORDERING FUNCTION
    async submitAnonymousForm() {

    if (this.shouldCheckout == false){
 
    
    return;
    }
      if (this.cartItems.length === 0) {
        this.$buefy.toast.open({
          message: "Votre panier est vide",
          type: "is-danger"
        });
        return;
      }
            if (this.isAnyFieldEmpty(this.address)  ) {
        this.$buefy.toast.open({
          message: "Les informations de livraison sont obligatoires ",
          type: "is-danger"
        });
        return;
      }

      if (this.shouldNotDeliver) {
        this.setDeliveryPrice(0);
      }
 
      const loadingComponent = this.$buefy.loading.open({
        container: null
      })

      let totalPrice;

      // if (this.promotion.isValid) {
      //   totalPrice = this.total + this.deliveryPrice;
      // } else {
      //   totalPrice = this.total + this.deliveryPrice - this.promotion.priceReduction;
      // }

      // if (this.promotion.isValid) {
      totalPrice =this.cartTotalPriceWithDelivery;
      // } else {
      //   totalPrice = this.total + this.deliveryPrice - this.promotion.priceReduction;
      // }
      console.log('delivery adresse', JSON.stringify(this.address))

      const body = {
        items: this.cartItems.map(item => {
          return {
            // ...item,
            totalPrice: item.quantity * item.price,
            quantity: item.quantity,
            unitPrice: item.price,

            product: item
          };
        }),

        // promotionReduction: this.promotion.priceReduction,
        // deliveryPrice: parseFloat(this.deliveryPrice),
        total: parseFloat(this.cartTotalPriceWithDelivery),
        cartTotalPrice: parseFloat(this.total),
        hasPromotion: false,
        tax:  parseFloat(this.taxes),
        delivery: this.getDeliveryPrice,
        deliveryZone: this.selectedDeliveryZone==null ? "Indéfini" : this.selectedDeliveryZone.name
        // mode: !this.shouldNotDeliver ? 'ONLINE' : 'SHOP_PICK_UP'
      };

      if (!(this.shouldNotDeliver || this.paidAtDelivery)) {
        body.mode = 'ONLINE';

        if (!_.isObject(this.address)) {
          loadingComponent.close();
          this.isEmptyAddressModalActive = true;

          return;
        }

        body.deliveryAddress = JSON.stringify(this.address);
       // this.deliveryPrice = this.getDeliveryPrice();

      } else if (this.paidAtDelivery) {
        body.mode = 'AT_DELIVERY';

        if (!_.isObject(this.address)) {
          loadingComponent.close();
          this.isEmptyAddressModalActive = true;

      //    this.deliveryPrice = this.getDeliveryPrice();

          return;
        }
        body.deliveryAddress = JSON.stringify(this.address);
      } else if (this.shouldNotDeliver) {
        body.mode = 'SHOP_PICK_UP';
      }

      body.shouldDeliver = body.mode !== 'SHOP_PICK_UP'

      // if (this.promotion.isValid) {
      //   body.promotion = this.promotion.id;
      //   body.hasPromotion = true;
      // }

      if (body.mode === 'ONLINE') {
        if(this.shouldCheckout){
            this.shouldCheckout=false;
              (new PayTech({
          ...body,
          delivery: this.getDeliveryPrice ,
          items: JSON.stringify(body.items)
        })).withOption({

          requestTokenUrl: `${process.env.APP_ENV == 'DEV' ? process.env.DEV_API_BASE_URL : process.env.API_BASE_URL}/order/anonymous`,
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization": this.$auth.strategy.token.get()
          },
          prensentationMode: PayTech.OPEN_IN_POPUP,
        }).send();
               this.shouldCheckout = true;
        } else{
          this.$buefy.toast.open({
          message: `Une erreur est survenue: shouldCheckout: ${this.shouldCheckout}`,
          type: "is-danger"
        });
        }
  
      } else {
      this.shouldCheckout==false;
        const {
          status,
          data
        } = await this.$axios.post('order/anonymous', {
          ...body,
          items: JSON.stringify(body.items),
          delivery: this.getDeliveryPrice,
        })

        if (status === 201) {
          console.log(data)
          // this.purchase.token = response.data.token
          await this.emptyCart()

          this.$modal.show(OrderAnonymousTickerModal, {
            order: data.order,
            transaction: data.transaction,
          }, {
            width: '480px',
            height: 'auto',
            scrollable:true,
            adaptive: true,
          })

       this.shouldCheckout = true
        }
      }
      loadingComponent.close();

    },



    chooseAddressModal() {
      this.$modal.show("choose-address-modal");
    },
    modifyAddressModal() {
      this.$modal.show("modify-address-modal");
    },
    async setAsDefault(address) {
      const response = await this.apiPut(
        "/api/client/user/default_address",
        address
      );

      if (response.data.success) {
        this.setDefaultAddress(address);
      }
    },
    badgeText(address) {
      return this.isDeliveryAddress(address) ? "Livrer à cette adresse" : "Adresse par défaut";
    },
    badgeColor(address) {
      return this.isDeliveryAddress(address) ? "" : "success";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global";

.line-through {
  text-decoration: line-through;
  font-size: 0.8rem;
}

.delete-btn {
  color: red !important;
  ;
  padding: 0;
}

.sticky {

  @include breakpoint(laptop) {
    position: fixed;
    top: 140px;
    // right: 0;
    width: inherit;
  }
}

.sticky+.content {
  padding-top: 120px;
}

#cart-page {

  margin-top: 45px;
  margin-bottom: 45px;
}

.summary-footer-total-amount {
  font-weight: 600;
  font-size: 20px;
}

.summary-footer-delivery-price {
  font-weight: 600;
  font-size: 20px;
}

.summary-footer-total {
  margin-bottom: 3px;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
   
}

.cart-summary-container {

  margin-top: 15px;
  //@include standard-card-simple();
}

.cart-item-widget {
  padding: 10px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  //@include standard-card-simple();

  .cart-item-widget_content {
    display: flex;

    img {
      max-height: 100px;
      border: 1px solid #eeee;
      border-radius: 5px;


    }

    .meta {
      margin-left: 15px;

      .brand-name {
        color: $primary-color;
        text-transform: uppercase;
        font-weight: 600;

        @include breakpoint(mobileonly) {
          font-size: 13px;
        }
      }

      .product-name {
        font-size: 15px;

        @include breakpoint(mobileonly) {
          font-size: 12px;
        }
      }

      .price {
        font-weight: 700;

        @include breakpoint(mobileonly) {
          font-size: 12px;
        }
      }
    }
  }


  .modal-content-wrapper {

    background-color: white;
    padding-top: 65px;
    padding-bottom: 65px;
  }

  .cart-item-widget_action {
    // display: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include breakpoint(mobile) {
      // display: block;

    }
  }
}
</style>
