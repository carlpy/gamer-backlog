<template>
    <div class="mx-auto grid min-h-screen max-w-[1200px] grid-rows-[90px_1fr_90px] gap-4">
        <header class="mb-4 flex items-center justify-between border-b border-gray-300 p-4">
            <h1 class="flex items-center justify-between text-center text-3xl font-bold">
                Gamer Backlog <span class="icon-[maki--gaming] ml-4" />
            </h1>

            <nav class="hidden md:flex">
                <router-link class="mr-6 font-medium" :to="{ name: 'home' }">Home</router-link>
                <router-link class="mr-6 font-medium" :to="{ name: 'c-games' }">Current Backlog</router-link>
                <router-link class="font-medium" :to="{ name: 'co-games' }">Completed Games</router-link>
            </nav>
        </header>

        <main class="w-full">
            <router-view />
        </main>

        <footer class="p-4 text-center font-medium">Created with ❤️ by Carlos Zambrano</footer>
    </div>
</template>

<script>
export default {};
</script>
