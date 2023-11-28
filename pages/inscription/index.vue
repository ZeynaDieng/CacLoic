<template>
   <div>
      <!-- component -->
      <div class="bg-no-repeat bg-cover bg-center relative" style="background-image: url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80);">
         <div class="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0 hidden md:block"></div>
         <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
            <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
               <div class="self-start hidden lg:flex flex-col  text-white">
                  <img src="" class="mb-3">
                  <h1 class="mb-3 font-bold text-5xl">Salut 👋 Ravi de vous revoir </h1>
                  <!--           <p class="pr-3">Lorem ipsum is placeholder text commonly used in the graphic, print,
                     and publishing industries for previewing layouts and visual mockups</p> -->
               </div>
            </div>
            <div class="flex justify-center self-center  z-10">
               <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
                  <div class="mb-4">
                     <h3 class="font-semibold text-2xl text-gray-800">Inscription</h3>
                     <div class="mb-7">
                        <p class="text-gray-500">
                           Vous avez déjà un compte? 
                           <nuxt-link to="/login"   class="text-sm text-green-500 hover:text-green-400">Connexion</nuxt-link>
                        </p>
                     </div>
                  </div>
                  <div class="space-y-5">
                     <form action="" @submit.prevent="userRegister(userInfos)">
                        <div class="space-y-2">
                           <label class="text-sm font-medium text-gray-700 tracking-wide">Nom</label>
                           <input required v-model="userInfos.lastName" type="text" class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"  placeholder="">
                        </div>
                        <div class="space-y-2">
                           <label class="text-sm font-medium text-gray-700 tracking-wide">Prénom</label>
                           <input required v-model="userInfos.firstName" type="text" class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"  placeholder="">
                        </div>
                        <div class="space-y-2">
                           <label class="text-sm font-medium text-gray-700 tracking-wide">Téléphone</label>
                           <input required v-model="userInfos.phone" type="text" class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"   >
                        </div>
                        <div class="space-y-2">
                           <label class="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                           <input required v-model="userInfos.email" type="email" class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"   >
                        </div>
                        <div class="space-y-2">
                           <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                           Mot de passe
                           </label>
                           <input required v-model="userInfos.password" class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="password" >
                        </div>
 
                        <br/>
                        <div>
                           <button type="submit" class="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                           S'inscrire
                           </button>
                        </div>
                     </form>
                  </div>
                  <div class="pt-5 text-center text-gray-400 text-xs">
                     <span>
                     Copyright © 2023 Tout droits réservés.
                     <nuxt-link to="/" rel="" title="cac" class="text-green hover:text-green-500 ">Cac sénégal</nuxt-link ></span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
    export default {
        
    head() {
        return {
            title: `Inscription | Cac Senegal`,
        };
    },
  layout: "login",
    data () {
    return {
      userInfos: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
 async userRegister (userInfo) {
   try {
                const { statusCode } = await this.$repositories.userRegister.create(userInfo)
                if (statusCode === 201) {
                // await this.$router.push('/dashboard/user/list')
                // console.log('successful:' + JSON.stringify(data))
                // this.$forceUpdate()

                // this.fieldslist += 1
                // window.location.reload(true)
                this.userInfo = {};
                await this.$router.push('/login')
                
         
                }  

            } catch (error) {
                    console.log('error', {...error.response});                               
                        if(error?.response){

                        for(var i=0; i<error.response.data.message.length; i++){
                                                               this.$buefy.toast.open({
          duration: 5000,
          message: `${error.response.data.message[i]}`,
          position: "is-bottom-right",
          type: "is-warning"
        });
                        }


                        }else{
                                this.$buefy.toast.open({
          duration: 5000,
          message: `${error}`,
          position: "is-bottom-right",
          type: "is-danger"
        });
                          
                        }
            }
    }
  }
    }
</script>

<style lang="scss" scoped>

</style>