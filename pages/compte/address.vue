<template>
  <div class="">
    <b-tabs v-model="activeTab">
      <b-tab-item label="Ajouter une nouvelle adresse">
        <form @submit.prevent="addAddress">
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
            <b-field class="  small-12 medium-12 cell" label="Adresse">
              <b-input required v-model="address.address" placeholder="localité, rue, numéro d'habitation"/>
            </b-field>
            <div class="buttons is-centered small-12 cell">
              <b-button type="is-primary" icon-left="map-marker-radius" native-type="submit" :label="saveButtonLabel"/>
            </div>
          </div>
        </form>

      </b-tab-item>

      <b-tab-item label="Mes adresses">
        <div class="grid-x grid-padding-x grid-padding-y">
          <div
            v-for="address in getUserAddresses"
            :key="address._id"
            class="small-12 medium-6 large-4 cell"
          >
            <AccountAddressCard :address="address" :isDefault="isDefaultAddress(address)">
              <b-button
                size="is-small"
                type="is-success"
                @click="setAsDefault(address._id)">Par défaut
              </b-button>
              <b-button
                size="is-small"
                type="is-info"
                icon-right="lead-pencil"
                @click="alterAddress(address)"
              >
              </b-button>
              <b-button
                size="is-small"
                type="is-danger"
                icon-right="delete"
                @click="removeAddress(address._id)"
              >
              </b-button>
            </AccountAddressCard>
          </div>

        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import AccountAddressCard from "../../components/AccountAddressCard";

export default {
  name: "AddressAccount",
  components: {AccountAddressCard},
  data() {
    return {
      isUpdate: false,
      errors: null,
      isActive: true,
      activeTab: 0,
        regions: [
          {name: "Dakar", value: "DAKAR"},
          {name: "Thies", value: "THIES"}
        ],
        address: {
          fullName: "",
          region: "DAKAR",
          address: "",
          phone: ""
        }
    };
  },
  computed: {
    ...mapGetters({
      getUserDefaultAddress: 'getUserDefaultAddress',
      getUserAddresses: "getUserAddresses",
    }),
    saveButtonLabel() {
      return this.isUpdate ? "Mettre à jour" : "Sauvegarder"
    }
  },
  mounted() {
  this.getAddresses();
    console.log("yooo ", +this.userAdresses);
  },
  methods: {
    ...mapActions({
      setDefaultAddress: 'user/setDefaultAddress',
      deleteAddress: 'user/deleteAddress'
    }),
    resetAddress() {
      this.address = {
        fullName: "",
        region: "DAKAR",
        address: "",
        phone: "",
        detail: ""
      };
    },
    async setAsDefault(addressId) {
      try {
        const {statusCode} = await this.$axios.patch('customer/default_address', {
          defaultAddress: addressId
        });

        if (statusCode === 200) {
          this.setDefaultAddress(addressId)
          await this.$auth.fetchUser()
        }

      } catch (e) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Échec de la mise à jour de l'adresse par defaut!`,
          position: "is-bottom-right",
          type: "is-danger"
        });
      }
    },
    alterAddress(address) {
    console.log(address);
    
      this.address = {
        ...address
      };

      this.isUpdate = true;

      this.activeTab = 0;
    },
    async removeAddress(addressId) {
      try {
        const {statusCode} = await this.$repositories.address.delete(addressId)
        if (statusCode === 200) {
          //this.deleteAddress(addressId)
         
          await this.$auth.fetchUser()
        }
      } catch (e) {
        console.error(e)
      }

    },
    isDeliveryAddress(address) {
      return typeof this.deliveryAddress === 'undefined' ? false : this.deliveryAddress === address._id
    },
    isDefaultAddress(address) {

      return typeof this.$auth.user.defaultAddress === "undefined"
        ? false
        : this.$auth.user.defaultAddress === address._id;
    },
  getAddresses() {
  console.log(this.$auth.user.addresses);

      return this.$auth.user.addresses;
    },
    async addAddress() {
      try {
        if (!this.isUpdate) {
          const {statusCode} = await this.$repositories.address.create(this.address);
          if (statusCode === 200) {
            await this.$auth.fetchUser()
            console.log("e.response");
            this.updateSuccess();
            this.resetAddress();
            this.activeTab = 1;
          }
        } else {
        console.log(this.address._id);
          const {statusCode} = await this.$repositories.address.update(this.address,this.address._id,"")

          if (statusCode === 200) {
            await this.$auth.fetchUser()
          } 
          this.isUpdate = false;
          this.resetAddress();
          this.activeTab = 1;
        }

      } catch (e) {
        console.log(e);
        this.errors = {
          //tilte: e.response.data.error,
          message: e
        };
        this.updateFailed();
      }
    },
    updateSuccess() {
      this.$buefy.toast.open({
        message: "Nouvelle adresse ajoutée!",
        type: "is-success",
        position: "is-bottom-right"
      });
    },
    updateFailed() {
      this.$buefy.toast.open({
        duration: 5000,
        message: `Échec de l'ajout!`,
        position: "is-bottom-right",
        type: "is-danger"
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";
</style>
