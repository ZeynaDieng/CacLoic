<template>
  <div>
    <template>
      <section>
        <!--
                <b-field grouped group-multiline>
                  <div class="control">
                    <b-switch v-model="showDetailIcon">Show detail icon</b-switch>
                  </div>
                  <div class="control">
                    <b-switch v-model="useTransition">Use transition (fade) when toggling details</b-switch>
                  </div>
                </b-field> -->
        <!-- @details-open="(row) => $buefy.toast.open(`Commande ${row.reference}`)" -->
        <b-table :pagination-simple="true" :data="orders" ref="table" paginated per-page="5"
                 :opened-detailed="defaultOpenedDetails" detailed
                 detail-key="_id" :detail-transition="transitionName"

                 :show-detail-icon="showDetailIcon" aria-next-label="Page suivante"
                 aria-previous-label="Page précédente"
                 aria-page-label="Page" aria-current-label="Page Actuelle">

          <b-table-column field="id" label="Référence" width="40" numeric v-slot="props">
            <nuxt-link :to="`/commande/${props.row.reference}`">{{ props.row.reference }}</nuxt-link>
          </b-table-column>


          <b-table-column field="items" label="Articles" width="10" sortable v-slot="props">
            <template v-if="showDetailIcon">
              {{ props.row.items.length }}
            </template>
            <template v-else>
              <a @click="props.toggleDetails(props.row)">
                {{ props.row.user.firstName }} {{ props.row.user.lastName }}
              </a>
            </template>
          </b-table-column>


          <b-table-column field="date" label="Date" sortable centered v-slot="props">
            <span class="tag ">
              {{ new Date(props.row.createdAt).toLocaleString() }}
            </span>
          </b-table-column>

          <b-table-column field="status" label="Status" sortable v-slot="props">
            <span class="tag is-success">
               {{ statusText(props.row.status) }}
            </span>

          </b-table-column>

          <template #detail="props">
            <div>
              <article class="media" v-for="(item, index) of props.row.items" :key="index">
                <figure style="    margin: 0 12px 5px 0;" class="media-left">
                  <p class="image is-32x32">
                    <img :src="item.product.image_url" :alt="item.product.slug">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <small>{{ item.product.name }} {{ item.product.price }}</small> x
                      <strong>{{ item.quantity }}</strong>

                    </p>
                  </div>
                </div>
              </article>
            </div>

          </template>

          <b-table-column field="items" label="Montant" sortable v-slot="props">
            <template v-if="showDetailIcon">
              {{ props.row.transaction.total | currency }}
            </template>
            <template v-else>
              <a @click="props.toggleDetails(props.row)">
                {{ props.row.user.firstName }} {{ props.row.user.lastName }}
              </a>
            </template>
          </b-table-column>

        </b-table>

      </section>
    </template>
  </div>
</template>

<script>
export default {
  auth: "loggedIn",
  middleware: ["auth"],
  created() {
    this.getCustomerOrders()
  },
  data() {
    return {
      //table option
      isActive: true,
      activeTab: 0,
      //table option
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      useTransition: false,
      orders: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'nom_complet',
          label: 'First Name',
        },
        {
          field: 'status',
          label: 'Last Name',
        },
        {
          field: 'date',
          label: 'Date',
          centered: true
        },
        {
          field: 'gender',
          label: 'Gender',
        }
      ]

    }
  }, computed: {
    transitionName() {
      if (this.useTransition) {
        return 'fade'
      }
    }
  },
  methods: {
    async getCustomerOrders() {
      const {data, status} = await this.$repositories.order.all();

      if (status === 200) {
        this.orders = data
      }
    },
    statusText(input) {
      switch (input) {
        case "CANCELED":
          return "annulée";
        case "COMPLETED":
          return "complet";
        case "DELIVERING":
          return "en livraison";
        case "PROCESSING":
        case "HANDLING":
          return "en traitement";
        case "PENDING":
          return "en attente";
        default:
          return input;
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
