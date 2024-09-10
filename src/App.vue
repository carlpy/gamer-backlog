<template>
    <div class="flex min-h-screen">
        <AsideNavigation />

        <section class="ml-28 mr-10 mt-12 grid w-2/4 max-w-7xl grow grid-rows-[1fr_60px] xl:mx-auto">
            <main>
                <router-view />
            </main>

            <footer class="p-4 text-center font-medium">Created with ❤️ by Carlos Zambrano</footer>
        </section>
    </div>
</template>

<script>
//-------------------- Vue components --------------------------\\
import AsideNavigation from './components/AsideNavigation.vue';

export default {
    components: {
        AsideNavigation,
    },
};
</script>
