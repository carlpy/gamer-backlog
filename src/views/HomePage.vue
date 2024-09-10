<template>
    <div class="mb-6">
        <p class="mb-4 text-center text-3xl font-semibold">Welcome to the Backlog</p>

        <GameViews @updateView="setGameViewVal" />

        <antd-inp
            v-model:value="currentSearch"
            @keyup.enter="searchGame"
            class="w-full p-3"
            placeholder="Type the game you want into your backlog..."
        />
    </div>

    <div v-if="!isLoading">
        <GameCards
            :gameObj="displayedGames"
            gameSection="home"
            :gameView="gameViewVal"
        />
    </div>
    <div
        v-else
        class="mt-4 text-center"
    >
        <SpinnerAntd size="large" />
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

// antd components
import { Input } from 'ant-design-vue';

//-------------------- Vue components --------------------------\\
import GameCards from '@/components/GameCards.vue';
import GameViews from '@/components/GameViews.vue';
import SpinnerAntd from '@/components/utils/SpinnerAntd.vue';

//-------------------- Composables --------------------------\\
import { useGameView } from '@/composables/useGameView';

export default {
    components: {
        'antd-inp': Input,
        SpinnerAntd,

        GameCards,
        GameViews,
    },

    setup() {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const listOfGames = ref([]);
        const isLoading = ref(true);
        // game-searcher
        const currentSearch = ref('');
        const searchedGames = ref([]);

        // the views-switching info
        const { gameViewVal, setGameViewVal } = useGameView();

        async function getGames() {
            try {
                const { data } = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
                listOfGames.value = data.results;
            } catch (e) {
                console.log(e);
            } finally {
                isLoading.value = false;
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
            isLoading,
            currentSearch,
            searchedGames,
            gameViewVal /* with a composable or some kind of re-usability tecnique i could make this more ordered */,

            //functions
            setGameViewVal,
            searchGame, // async

            // computed
            displayedGames,
        };
    },
};
</script>
