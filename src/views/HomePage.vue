<template>
    <div class="mb-6">
        <p class="mb-4 text-center text-3xl font-semibold">Welcome to the Backlog</p>

		<GameViews/>

        <antd-inp
            v-model:value="currentSearch"
            @keyup.enter="searchGame"
            class="w-full p-3"
            placeholder="Type the game you want into your backlog..."
        />
    </div>

    <div v-if="displayedGames.length">
        <GameCards :gameObj="displayedGames" gameSection="home" />
    </div>
    <div v-else>
        <p class="mt-5 text-center text-2xl font-medium">No games found...</p>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

// antd components
import { Input } from 'ant-design-vue';

//-------------------- Vue components --------------------------\\
import GameCards from '../components/GameCards.vue';
import GameViews from '@/components/GameViews.vue';

export default {
    components: {
        'antd-inp': Input,

        GameCards,
		GameViews
    },

    setup() {
        const API_KEY = '797a50b79c294570af8c3724295452ea';
        const listOfGames = ref([]);
        // game-searcher
        const currentSearch = ref('');
        const searchedGames = ref([]);

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
                const { data } = await axios.get(
                    `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURI(currentSearch.value)}`,
                );
                searchedGames.value = data.results;
                console.log(searchedGames.value);
            } catch (e) {
                console.log(e);
            }
        }

        const displayedGames = computed(() => {
            return searchedGames.value.length ? searchedGames.value : listOfGames.value;
        });

        onMounted(() => {
            getGames();
        });

        return {
            listOfGames,

            currentSearch,
            searchedGames,

            // async
            searchGame,

            // computed
            displayedGames,
        };
    },
};
</script>
