<template>
  <div>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Informations personnelles">
        <br>
        <form @submit.prevent="submitUser">
          <div v-if="errorsUser" class="grid-x grid-margin-x grid-margin-y align-center	">
            <b-message :title="errorsUser.title" type="is-danger" has-icon aria-close-label="Close message"
                       size="is-small">
              <div class="block" v-for="(error, index) in errorsUser.message" :key="index">{{ error }}</div>
            </b-message>
          </div>
          <div class="grid-x grid-margin-x grid-margin-y align-center	">
            <b-field class="  small-12 medium-6 cell" label="Prénom">
              <b-input placeholder="Samba" type="text" v-model="user.firstName"></b-input>
            </b-field>
            <b-field class="  small-12 medium-6 cell" label="Nom">
              <b-input placeholder="Ndiaye" type="text" v-model="user.lastName"></b-input>
            </b-field>
            <b-field class="  small-12 medium-6 cell" label="Email">
              <b-input type="email" placeholder="xxxxxx@gmal.com" v-model="user.email" disabled></b-input>
            </b-field>
            <b-field class="  small-12 medium-6 cell" label="Téléphone">
              <b-input type="tel" placeholder="77########" v-model="user.phone"></b-input>
            </b-field>

            <div class="buttons is-centered small-12 cell">
              <b-button type="is-primary" native-type="submit">Sauvegarder</b-button>
            </div>
          </div>
        </form>
      </b-tab-item>

      <b-tab-item label="Mot de passe">
        <br>
        <form @submit.prevent="changePassword">
          <div v-if="errors" class="grid-x grid-margin-x grid-margin-y align-center	">
            <b-message :title="errors.title" type="is-danger" has-icon aria-close-label="Close message"
                       size="is-small">
              <template v-if="Array.isArray(errors.message)">
                <div class="block" v-for="(error, index) in errors.message" :key="index">{{ error }}</div>
              </template>
              <div class="block" v-else>{{ errors.message }}</div>
            </b-message>
          </div>
          <div class="grid-x grid-margin-x grid-margin-y align-center	">
         <div class="small-12 medium-6 cell">
           <div class="grid-x grid-margin-y">
                <b-field class="  small-12 medium-12 cell" label="Mot de passe actuel">
              <b-input placeholder="" required type="password" password-reveal v-model="password.currentPassword"></b-input>
            </b-field>
            <b-field class="small-12 medium-12 cell" label="Nouveau mot de passe">
              <b-input type="password" required placeholder="Mot de passe" password-reveal v-model="password.newPassword">
              </b-input>
            </b-field>
              <b-field class="small-12 medium-12 cell" label="Confirmation du mot de passe">
              <b-input type="password" required placeholder="Retapez le mot de passe" password-reveal v-model="password.newPasswordConfirm">
              </b-input>
            </b-field>
            <div class="buttons is-centered small-12 cell">
              <b-button type="is-primary" native-type="submit">Sauvegarder</b-button>
            </div>
           </div>
         </div>
          </div>
        </form>

      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  auth: "loggedIn",
  created() {
    this.getUser();
  },
  data() {
    return {
      errors: null,
      errorsUser: null,
      isActive: true,
      activeTab: 0,
      password: {
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
      },
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      }
    };
  },
  methods: {
    getUser() {
    
      const { firstName, lastName, phone, email } = this.$auth.user;
              console.log(this.$auth.user);
      this.user = {
        firstName, lastName, phone, email
      };
    },
    updateSuccess() {
      this.$buefy.toast.open({
        message: "Mise à jour réussi! ",
        type: "is-success",
        position: "is-bottom"
      });
    },
    updateFailed(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        position: "is-bottom",
        type: "is-danger"    
      });
    },
    async changePassword() {

      if(this.password.newPassword == this.password.newPasswordConfirm){
        try {


        const { status } = await this.$repositories.user.patch("user/password", this.password);
        console.log(status);
        if (status==200) {
          this.password={};
          this.errors = null;
          this.updateSuccess();
        }
      } catch (e) {
        console.log(e.response);
        this.errors = {
          tilte: e.response.data.error,
          message: e.response.data.message
        };
        this.updateFailed("Échec de la mise à jour!");
      }
} else{
   this.updateFailed("Les mots de passe ne correspondent pas");
}

    },
    async submitUser() {
      try {
        const { status } = await this.$repositories.update("user", this.user);

        if (status === 200) {
          this.$auth.setUser({ ...this.$auth.user, ...this.user });
          this.updateSuccess();
        }
      } catch (e) {
        console.log(e.response);
        this.errorsUser = {
          tilte: e.response.data.error,
          message: e.response.data.message
        };
        this.updateFailed("Échec de la mise à jour!");
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
