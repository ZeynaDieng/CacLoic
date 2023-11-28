<template>
<!-- component -->
<section class="text-gray-600 body-font relative">
<!-- component -->
<div class="flex justify-center items-center w-screen h-screen bg-white">
	<!-- COMPONENT CODE -->
	<div class="container mx-auto my-4 px-4 lg:px-20">

		<div class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
			<div class="flex">
				<h1 class="font-bold uppercase text-5xl">Contactez nous</h1>
			</div>
			<div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
				<input class="w-full bg-gray-100 text-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" placeholder="Nom*" />
				<input class="w-full bg-gray-100 text-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" placeholder="Prénom*" />
				<input class="w-full bg-gray-100 text-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="email" placeholder="Email*" />
				<input class="w-full bg-gray-100 text-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="number" placeholder="Téléphone*" />
        </div>
				<div class="my-4">
					<textarea placeholder="Message*" class="w-full h-32 bg-gray-100 text-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
				</div>
				<div class="my-2 w-1/2 lg:w-1/4">
					<button class="uppercase text-sm font-bold tracking-wide bg-cac-500 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline">
            Envoyer
          </button>
				</div>
			</div>

			<div
				class="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-cac-500 rounded-2xl">
				<div class="flex flex-col text-white">
					<h1 class="font-bold uppercase text-4xl my-4">Faites un tour aux showrooms</h1>
<!-- 					<p class="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
						tincidunt arcu diam,
						eu feugiat felis fermentum id. Curabitur vitae nibh viverra, auctor turpis sed, scelerisque ex.
					</p> -->

					<div class="flex my-4 w-2/3 lg:w-1/2">
						<div class="flex flex-col">
							<i class="fas fa-map-marker-alt pt-2 pr-2" />
            </div>
            <div class="flex flex-col">
              <h2 class="text-2xl">YOFF</h2>
              <p class="text-white">Route de l'aéroport, Dakar, Sénégal</p>
            </div>
            
          </div>
          					<div class="flex my-4 w-2/3 lg:w-1/2">
						<div class="flex flex-col">
							<i class="fas fa-map-marker-alt pt-2 pr-2" />
            </div>
            <div class="flex flex-col">
              <h2 class="text-2xl">PARCELLE</h2>
              <p class="text-white">Parcelles Assainies Unité 14/349, Dakar, Sénégal</p>
            </div>
            
          </div>
          <div class="flex my-4 w-full">
            <div class="flex flex-col">
              <i class="fas fa-phone-alt pt-2 pr-2" />
            </div>
            <div class="flex flex-col">
              <h2 class="text-2xl">Téléphone</h2>
              <p class="text-white">Tel: +221 77 426 35 35</p>
              <p class="text-white">Email: contact@cacfoker.com</p>
            </div>
          </div>
          
          <div class="flex my-4 w-2/3 lg:w-1/2">
     <!--        <a href="https://www.facebook.com/ENLIGHTENEERING/" target="_blank" rel="noreferrer" class="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
              <i class="fab fa-facebook-f text-blue-900" />
            </a>
            <a href="https://www.linkedin.com/company/enlighteneering-inc-" target="_blank" rel="noreferrer" class="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
              <i class="fab fa-linkedin-in text-blue-900" />
            </a> -->
          </div>
        </div>
      </div>
    </div>
    <!-- COMPONENT CODE -->
</div>


</section>
</template>

<script>
    export default {
          layout:"customer",
    }
</script>

<style lang="scss" scoped>

</style>