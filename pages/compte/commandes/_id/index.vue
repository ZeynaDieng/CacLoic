<template>
  <section class="page-content-wrapper">
    <div class="grid-container fluid">
      <div class="grid-x">
        <div class="small-12 cell">
          <!--       <AppUserPageTitle
            title="Problème avec la commande "
            description=""
          /> -->
          <h2 class="title is-size-6-mobile ml-2 mt-2">Détails de la commande </h2>
        </div>
        <div class="small-12 cell">
          <div class="order-card">
            <!-- header -->
            <div class="header">
              <div class="grid-x">
                <div class="small-12 large-6 cell">
                  <p class="order_date">
                    Commande placée le
                    <!--                    <span>mercredi 29 juillet 2020 04:05</span>-->
                    <span>{{ formatDate(order.createdAt, 'lll') }}</span>
                  </p>
                </div>
                <div class="small-12 large-6 cell">
                  <p class="order_number">
                    Numéro de commande:
                    <span>{{ order.reference.toUpperCase() }}</span>
                    <!-- <span>{{toUpperCase(order.reference)}}</span> -->
                  </p>
                </div>
              </div>
            </div>

            <!-- content -->
            <div class="grid-x grid-margin-x order-content">
              <!-- left content -->
              <div class="small-12 medium-12 large-9 cell">
                <!-- product component -->

                <div v-for="(item, index) of order.items" :key="index" class="order-meta"
                     style="    margin-bottom: 32px;">
                  <div class="grid-x grid-margin-x">
                    <!-- img -->
                    <div class="small-4 medium-4 large-2 cell">
                      <div class="img-container">
                        <figure style="    margin: 0 12px 5px 0;" class="media-left">
                          <p class="image is-64x64">
                            <img :src="item.product.image_url" :alt="item.product.slug">
                          </p>
                        </figure>
                      </div>
                      <br/>
                    </div>
                    <!-- product meta -->
                    <div class="small-8 medium-8 large-10 cell">
                      <h5 class="product-title">{{ item.product.name }}</h5>
                      <p class="sub-total">{{ item.quantity }} x {{ item.product.price }} FCFA</p>
                      <br/>
                      <div class="divider"></div>
                    </div>
                  </div>
                </div>

                <!-- footer -->
                <div class="grid-x grid-margin-x">
                  <div class="small-4 medium-4 large-2 cell">
                    <AppBadge :text="translateStatus(order.status)" color=" "></AppBadge>
                  </div>
                  <div class="small-8 medium-8 large-10 cell">
                    <!--                      <p class="delivery-price">Livraison: {{order.transaction.delivery}} FCFA</p>-->
                    <p class="total">Montant Total : {{ order.transaction.total }} FCFA</p>
                  </div>
                </div>
              </div>
              <!-- right content -->
              <div class="small-12 medium-12 large-3 cell">
                <template v-if="order.shouldDeliver">
                  <!-- delivery adress -->
                  <div class="delivery-infos-container">
                    <p class="address-title">Livrée à</p>
                    <p class="name">{{ order.deliveryAddress.fullName }}</p>
                    <p class="adress">{{ order.deliveryAddress.addressLineOne }}</p>
                    <p class="address-details">{{ order.deliveryAddress.moreInfos }}</p>
                    <p>{{ order.deliveryAddress.township + ', ' + order.deliveryAddress.country }}</p>
                    <p>Code postal : {{ order.deliveryAddress.postcode }}</p>
                  </div>
                </template>
                <div class="divider"></div>
                <div class="actions-btn-wrapper">
                  <ul>

                    <li>
                      <!--   <router-link to="/">Noter cette commande</router-link> -->
                    </li>
                    <!-- <li><router-link to="/">Finaliser le paiement</router-link></li> -->
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>

      <!-- CLAIM SECTION -->

<!--       <div class="grid-x ">
        <div class="small-12 cell">
          <div class="problem-subjet-wrapper">
            <h6>Signaler un probléme avec la commande</h6>
          </div>
        </div>
        <div class="small-12 cell" v-if="!claimShow">
          <ul class="order-problem-choice-container">
            <li>
              <a @click="changeTopic('notreceived')">Je n'est pas reçu ma commande</a>
            </li>
            <li>
              <a @click="changeTopic('notexpected')">Produit non conforme à celui affiché</a>
            </li>
            <li>
              <a @click="changeTopic('missingproduct')">Produit(s) manquant(s)</a>
            </li>
            <li>
              <a @click="changeTopic('brokenproduct')">Produit endommagé ou défectueuse</a>
            </li>
            <li>
              <a @click="changeTopic('otherissue')">Signaler un autre problème</a>
            </li>
          </ul>
        </div>
        <span class="form-error-field" v-for="(error, index) in errors.messages" :key="index">{{ error }}</span>
      </div>
      <section class="order-problem-message-widget" v-if="claimShow">

        <form class="grid-x grid-margin-x grid-marginn-y front-page_contact-form align-center">
          <div class="small-12 Cell">
            <div class="text-deco">
              <h6 class="form-section-title no-margin mb-0">Sujet: {{ claimMessage }}</h6>
              <AppTextButton text="Changer" @btn-clicked="claimShow = false"/>
            </div>
          </div>

          <div class="small-12 cell form-section-wrapper">
            <br>
            <p class="p-normal form-description no-margin">Donnez-nous plus de détails sur votre problème.</p>
            <br>
          </div>
          <div class="small-12 medium-12 cell fix-search-input_wrapper center contact-form-inputs input-field">
            <textarea d="front-page_contact-form-message" rows="10" class="contact_form_input"
                      placeholder="Votre message" v-model="claim.message"/>
            <span class="form-error-field" v-for="(error, index) in errors.message" :key="index">{{ error }}</span>
          </div>
          <div class="small-12 medium-12 cell fix-search-input_wrapper center">
            <br>
            <b-button @click="submitForm" type="is-primary" label="Envoyer"/>

          </div>

        </form>
      </section> -->
            <!-- CLAIM SECTION -->
    </div>
  </section>
</template>

<script>


import AppTextButton from '@/components/AppTextButton'
import DisplayConstant from '@/mixins/DisplayConstant'
import _ from 'lodash'


export default {
  name: 'Order',
  mixins: [DisplayConstant],
  async asyncData({$axios, route}) {
    const id = route.params.id;

    const {data} = await $axios.get(`/order/of_customer/${id}`);

    return {
      order: data.data
    };
  },
  components: {},
  created() {
    //this.getOrder()
  },
  data() {
    return {
      errors: {},
      //order: {},
      claimMessage: '',
      claimShow: false,
      claimTopics: [
        {
          topic: "Je n'est pas reçu ma commande",
          key: 'notreceived'
        },
        {
          topic: 'Produit non conforme à celui affiché',
          key: 'notexpected'
        },
        {
          topic: 'Produit(s) manquant(s)',
          key: 'missingproduct'
        },
        {
          topic: 'Produit endommagé ou défectueuse',
          key: 'brokenproduct'
        },
        {
          topic: 'Signaler un autre problème',
          key: 'otherissue'
        }
      ],
      claim: {}
    }
  },
  methods: {
    translateStatus(input) {
      return input
    },
    changeTopic(key) {
      this.claim.topic = key
      this.claimMessage = _.find(this.claimTopics, {key: key}).topic
      this.claimShow = true
    },
    async submitForm() {
      const response = await this.$axios('/api/client/order/claim/' + this.$route.params.id, this.claim)

      if (response.data.hasErrors) {
        console.log(response)
        this.errors = response.data.errors
      }

      if (response.data.success) {
        await this.$router.push('/compte/commandes')
      }
    },

  }
}
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global";

.problem-subjet-wrapper {
  h6 {
    color: $primary-color;
  }
}

.order-problem-message-widget {
  margin-top: 20px;

  .text-deco {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border: 1px solid $primary-color;
    // background: $primary-color;
  }
}

.order-card {
  @include standard-card();
  cursor: auto;
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;

  &::before {
    box-shadow: none !important;
  }

  .header {
    padding: 7px 15px;
    background-color: $the-grey;

    width: 100%;

    margin-bottom: 25px;
    color: grey;

    p {
      margin: 0;
      font-weight: 300;
      font-size: 13px;

      span {
        color: $primary-color;
      }
    }
  }

  .order-content {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 12px;

    .img-container {
      img {
        width: 100%;
      }
    }

    .delivery-price {
      font-size: 13px;
    }

    .sub-total {
      font-size: 13px;
    }

    .product-title {
      font-size: 17px;
      margin-top: 0px;
      font-weight: 400;
    }

    .total {
      font-weight: bold;
    }
  }

  .delivery-infos-container {
    color: grey;
    font-weight: 300;

    p {
      margin: 5px 0;
      font-size: 13px;
    }

    .address-title {
      color: $the-black;
      font-weight: 600;
      font-size: 17px;
    }

    .name {
      color: $primary-color;
    }
  }

  .actions-btn-wrapper {
    ul {
      li {
        a {
          font-size: 13px;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .order_number {
    @include breakpoint(laptop) {
      float: right;
    }
  }

  .order_date {
  }
}

ul.order-problem-choice-container {
  margin: 0;

  li {
    a {
      padding: 4px 4px;
      display: block;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
