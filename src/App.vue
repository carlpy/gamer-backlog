<template>
    <div class="flex min-h-screen">
        <AsideNavigation />

        <section class="ml-20 mr-10 mt-12 grid w-2/4 max-w-7xl grow grid-rows-[1fr_60px] md:ml-28 xl:mx-auto">
            <main>
                <router-view />
            </main>

            <footer class="p-4 text-center font-medium">
                Created with ❤️ by
                <a
                    class="decoration-inherit hover:underline"
                    href="https://github.com/carlpy"
                    >Carlos Zambrano</a
                >
            </footer>
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
    setup() {
        const API_KEY = import.meta.env.VITE_API_KEY;
        console.log(API_KEY);
    },
};
</script>
