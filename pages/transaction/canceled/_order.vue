
<template>
<main class="bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
  <div class="max-w-3xl mx-auto">
    <div class="max-w-xl">
      <h1 class="text-sm font-semibold uppercase tracking-wide text-primary ">Oups !</h1>
      <p class="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Commande annulée</p>
      <p class="mt-2 text-base text-gray-500">Vous avez annulé la commande <b>#{{order.number_order}} </b>.</p>

<!--       <dl class="mt-12 text-sm font-medium">
        <dt class="text-gray-900">Tracking number</dt>
        <dd class="text-primary mt-2">51547878755545848512</dd>
      </dl> -->
    </div>

    <section aria-labelledby="order-heading" class="mt-10 border-t border-gray-200">
      <h2 id="order-heading" class="sr-only">Votre commande</h2>

      <h3 class="sr-only">Produits</h3>

      <div v-for="product in order.products" v-bind:key="product.slug"  class="py-10 border-b border-gray-200 flex space-x-6">
        <img   :src="`${product.image_ext}.webp`" alt="Glass bottle with black plastic pour top and mesh insert." class="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40">
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
                <span class="block">Dakar</span>
                <span class="block">Cité biagui, villa 107</span>
              </address>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">Adresse de Facturation</dt>
            <dd class="mt-2 text-gray-700">
              <address class="not-italic">
                 <span class="block">Sénégal</span>
                <span class="block">Dakar</span>
                <span class="block">Cité biagui, villa 107</span>
              </address>
            </dd>
          </div>
        </dl>

        <h4 class="sr-only">Paiement</h4>
        <dl class="grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10">
          <div>
            <dt class="font-medium text-gray-900">Méthode de paiement </dt>
            <dd class="mt-2 text-gray-700">
              <p>Paytech</p>
              <p>Orange Money</p>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">Livraison</dt>
            <dd class="mt-2 text-gray-700">
              <p>Cac</p>
              <p>3 jours ouvrés</p>
            </dd>
          </div>
        </dl>

        <h3 class="sr-only">Récapitulatif</h3>

        <dl class="space-y-6 border-t border-gray-200 text-sm pt-10">
          <div class="flex justify-between">
            <dt class="font-medium text-gray-900">Sous-total</dt>
            <dd class="text-gray-700">32000 FCA</dd>
          </div>
          <div class="flex justify-between">
            <dt class="flex font-medium text-gray-900">
              Discount
              <span class="rounded-full bg-gray-200 text-xs text-primary py-0.5 px-2 ml-2">RAMADAN50</span>
            </dt>
            <dd class="text-gray-700">-16000 (50%)</dd>
          </div>
          <div class="flex justify-between">
            <dt class="font-medium text-gray-900">Shipping</dt>
            <dd class="text-gray-700">1500 FCFA</dd>
          </div>
          <div class="flex justify-between">
            <dt class="font-medium text-gray-900">Total</dt>
            <dd class="text-gray-900 font-bold">17500 FCFA</dd>
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
        const orderId = route.query.order;
              try {
      const { data, status } = await $axios.get(`/orders/${orderId}`);

      if (status === 200) {
       // console.log(data);
        return {
          order: data.data,
          isLoaded: true,
        };
      }
    } catch (e) {
      console.error(e);
    } 
        },
        mounted(){
           // this.fetchOrder();
        },
        methods: {
   /*        async fetchOrder(){
            const data= await $axios.get(`/orders/${orderId}`);
            console.log(data.data);
          } */
        }
    }
</script>

<style lang="scss" scoped>

</style>