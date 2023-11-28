
<template>
<main class="bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
  <div class="max-w-3xl mx-auto">
    <div class="max-w-xl">
      <h1 class="text-sm font-semibold uppercase tracking-wide text-primary ">Merci !</h1>
      <p class="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">C'est dans la boîte !</p>
      <p class="mt-2 text-base text-gray-500">Votre commande <b>#{{order.reference}} </b> a été enregistré et vous sera livré trés bientôt.</p>

<!--       <dl class="mt-12 text-sm font-medium">
        <dt class="text-gray-900">Tracking number</dt>
        <dd class="text-primary mt-2">51547878755545848512</dd>
      </dl> -->
    </div>

    <section aria-labelledby="order-heading" class="mt-10 border-t border-gray-200">
      <h2 id="order-heading" class="sr-only">Votre commande</h2>

      <h3 class="sr-only">Produits</h3>

      <div v-for="product in order.products" v-bind:key="product.slug"  class="py-10 border-b border-gray-200 flex space-x-6">
        <img  :src="`${product.image_ext}.webp`" alt="Glass bottle with black plastic pour top and mesh insert." class="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40">
        <div class="flex-auto flex flex-col">
          <div>
            <h4 class="font-medium text-gray-900">
              <nuxt-link to="/produits">{{product.name}} </nuxt-link>
            </h4>
            <p class="mt-2 text-sm text-gray-600" v-html="product.description"></p>
          </div>
          <div class="mt-6 flex-1 flex items-end">
            <dl class="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
              <div class="flex">
                <dt class="font-medium text-gray-900">Quantité:</dt>
                <dd class="ml-2 text-gray-700">1</dd>
              </div>
              <div class="pl-4 flex sm:pl-6">
                <dt class="font-medium text-gray-900">Prix:</dt>
                <dd class="ml-2 text-gray-700">{{product.price | currency }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div class="sm:ml-40 sm:pl-6">
        <h3 class="sr-only">Vos informations</h3>

        <h4 class="sr-only">Addresses</h4>
        <dl class="grid grid-cols-2 gap-x-6 text-sm py-10">
          <div>
            <dt class="font-medium text-gray-900">Adresse de livraison</dt>
            <dd class="mt-2 text-gray-700">
              <address class="not-italic">
                <span class="block">Sénégal</span>
                <span class="block">{{order.deliveryAddress.region}}</span>
                <span class="block">{{order.deliveryAddress.address}}</span>
                <span class="block">{{order.deliveryAddress.phone}}</span>
              </address>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">Adresse de Facturation</dt>
            <dd class="mt-2 text-gray-700">
              <address class="not-italic">
                <span class="block">Sénégal</span>
                <span class="block">{{order.deliveryAddress.region}}</span>
                <span class="block">{{order.deliveryAddress.address}}</span>
                <span class="block">{{order.deliveryAddress.phone}}</span>
              </address>
            </dd>
          </div>
        </dl>

        <h4 class="sr-only">Paiement</h4>
        <dl class="grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10">
          <div>
            <dt class="font-medium text-gray-900">Méthode de paiement </dt>
            <dd class="mt-2 text-gray-700">
              <p>{{order.transaction.provider}}</p>
              <p v-if="order.transaction.payload">{{order.transaction.payload.payment_method}}</p>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">Livraison</dt>
            <dd class="mt-2 text-gray-700">
              <p>Cac</p>
         <!--      <p>3 jours ouvrés </p> -->
            </dd>
          </div>
        </dl>

        <h3 class="sr-only">Récapitulatif</h3>

        <dl class="space-y-6 border-t border-gray-200 text-sm pt-10">
          <div class="flex justify-between">
            <dt class="font-medium text-gray-900">Sous-total</dt>
            <dd class="text-gray-700">{{order.transaction.total}} {{order.transaction.currency}}</dd>
          </div>
<!--           <div class="flex justify-between">
            <dt class="flex font-medium text-gray-900">
              Discount
              <span class="rounded-full bg-gray-200 text-xs text-primary py-0.5 px-2 ml-2">RAMADAN50</span>
            </dt>
            <dd class="text-gray-700">-16000 (50%)</dd>
          </div> -->
          <div class="flex justify-between">
            <dt class="font-medium text-gray-900">Livraison</dt>
            <dd class="text-gray-700">{{order.transaction.delivery}} {{order.transaction.currency}}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="font-medium text-gray-900">Total</dt>
            <dd class="text-gray-900 font-bold">{{order.transaction.total}} {{order.transaction.currency}}</dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</main>

</template>

<script>
    export default {
        async asyncData({ $axios, route }) {
        const orderReference = route.params.order;
              try {
                const { data, status } = await $axios.get(`/order/customer/${orderReference}`);
                //console.log(data);
                if (status === 200) {
                  //console.log(data);
                  return {
                    order: data.data,
                
                  };
                }
                   } catch (error) {
                     console.log('error', error?.response);                               
                /*     if(error?.response){
                        this.$buefy.toast.open(`${error.response.data.message}  `, {
                        title: 'Opération échoué',
                        autoHideDelay: 5000,
                        toaster:"b-toaster-bottom-right",
                        appendToast: false,
                            variant:"danger",
                            solid:true
                        })

                    }else{
                        this.$buefy.toast.open(`${error}`, {
                        title: 'Opération échoué',
                        autoHideDelay: 5000,
                        toaster:"b-toaster-bottom-right",
                        appendToast: false,
                            variant:"danger",
                            solid:true
                        })
                    } */
    } 
        },  
        created(){
         this.fetchOrder();
        },
        methods: {
          async fetchOrder(){
            const data= await this.$axios.get(`/orders/${this.$route.params.order}`);
            this.order=data.data;
            console.log(data.data);
            
          } 
        },
        data() {
          return {
              order: {},
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>