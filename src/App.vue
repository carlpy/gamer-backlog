<template>
    <div class="mx-auto grid min-h-screen max-w-screen-xl grid-rows-[80px_120px_1fr_70px] gap-4">
        <header class="mb-4 flex items-center justify-between border-b border-gray-300 p-4">
            <h1 class="flex items-center justify-between text-center text-3xl font-bold">
                Gamer Backlog <span class="icon-[maki--gaming] ml-4" />
            </h1>

            <nav class="hidden md:flex">
                <a class="mr-6 font-medium" href="#home">Home</a>
                <!-- This soon will be vue routers, just wait... -->
                <a class="mr-6 font-medium" href="#CurrentLogs">Current Backlog</a>
                <a class="font-medium" href="#CompletedGames">Completed Games</a>
            </nav>
        </header>

        <div>
            <p class="mb-4 text-center text-xl font-medium">Type the game you wanna insert into your backlog</p>
            <antd-inp v-model:value="currentSearch" @keyup.enter="searchGame" class="p-3" />
        </div>

        <div>
            <!-- Games rendered -->
            <div v-if="displayedGames.length">
                <GameCards :gameObj="displayedGames" />
            </div>
            <div v-else>
                <p class="mt-5 text-center text-2xl font-medium">No games found...</p>
            </div>
        </div>

        <footer class="p-4 text-center font-medium">Created with ❤️ by Carlos Zambrano</footer>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue';

// antd components
import { Input } from 'ant-design-vue';

//-------------------- Vue components --------------------------\\
import GameCards from './components/GameCards.vue';

export default {
    components: {
        'antd-inp': Input,

        GameCards,
    },

    setup() {
        const API_KEY = '797a50b79c294570af8c3724295452ea';

        const listOfGames = ref([]);
        // game-searcher
        const currentSearch = ref('');
        const searchedGames = ref([]); // here we store the result of the querying games

        //found-games

        // async funcs
        async function getGames() {
            try {
                const { data } = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
                listOfGames.value = data.results;
            } catch (e) {
                console.log(e);
            }
        }

        async function searchGame() {
			if (!currentSearch.value.trim()) {
                searchedGames.value = [];
                return;
            }

            try {
                const { data } = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURI(currentSearch.value)}`);
                searchedGames.value = data.results;
                console.log(searchedGames.value);
            } catch (e) {
                console.log(e);
            }
        }

        onMounted(() => {
            getGames();
        });

		const displayedGames = computed(() => {
			console.log('recompuing displayedGames')
            return searchedGames.value.length ? searchedGames.value : listOfGames.value;
        });

		watch(displayedGames, () => {
			console.log('This should re-render: ', displayedGames.value)
		})

        return {
            listOfGames,

            currentSearch,
            searchedGames,

            // async
            getGames,
            searchGame,

            // computed
            displayedGames,
        };
    },
};
</script>