<template>
    <div class="flex min-h-screen">
        <AsideNavigation />

        <div class="mx-auto mt-12 grid w-3/5 max-w-[1200px] grid-rows-[1fr_60px]">
            <main>
                <router-view />
            </main>

            <footer class="p-4 text-center font-medium">Created with ❤️ by Carlos Zambrano</footer>
        </div>
    </div>
</template>

<!--  
	(Tasks)
	- make a composable and learn how to encapsulate the logic of the component 👍
	- make a new component for the GameCards View in details 👍
	- fit the proper classes so when user clicks in details all the listed games appears as a list such as windows 👍 
	- make a new view so when an user click a game it gets to a page where it shows all the info of the game ❓
	- delete the element and make it update it inmediatly ❌ 
-->

<script>
import AsideNavigation from './components/AsideNavigation.vue';

export default {
    components: {
        AsideNavigation,
    }
};
</script>
