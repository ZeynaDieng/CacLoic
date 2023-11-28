<template>
  <section class="account-section mt-5 mb-10">
    <div class="grid-container">
      <nav class="breadcrumb is-small mb-2" aria-label="breadcrumbs">
        <ul>
          <li><a href="/compte/infos">Accueil</a></li>

          <li class="is-active">
            <a href="#" aria-current="page">Mon compte</a>
          </li>
        </ul>
      </nav>
      <h3 class="title is-4" style="margin: 0">Mon Compte</h3>
      <br />
      <div class="grid-x grid-margin-xc">
        <div class="show-for-large medium-2 cell">
          <div class="account-menu">
            <b-menu>
              <b-menu-list>
                <b-menu-item
                  icon="home"
                  tag="NuxtLink"
                  to="/compte/infos"
                  :active="false"
                  label="Informations"
                />
                <b-menu-item
                  icon="shopping"
                  tag="NuxtLink"
                  to="/compte/commandes"
                  label="Commandes"
                />
                <b-menu-item
                  icon="account-box"
                  tag="NuxtLink"
                  to="/compte/address"
                  label="Adresses"
                />
                <b-menu-item
                  icon="logout"
                  label="Déconnexion"
                  @click="logout"
                />
              </b-menu-list>
            </b-menu>
          </div>
        </div>
        <div class="large-10 medium-12 small-12 cell">
          <div class="account-content grid-x align-center">
            <div class="large-10 small-12 cell">
              <div class="content">
                <nuxt-child />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    ProductCard,
  },
  auth: "loggedIn",
  middleware:"auth",
  layout:"customer",
  data() {
    return {
      isActive: true,
      activeTab: 0,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "assets/sass/partials/global";

.account-section {
  /*  .account-menu {
     //@include standard-card-simple();
     // padding: 14px;
   } */

  .account-content {
    @include standard-card-simple();
    padding-top: 15px;
    padding-bottom: 85px;
  }
}
</style>
