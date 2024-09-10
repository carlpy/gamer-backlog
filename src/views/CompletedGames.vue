<template>
    <h1 class="mb-4 text-center text-3xl font-semibold">Completed Games</h1>

    <GameViews @updateView="setGameViewVal" />

    <template v-if="Object.keys(completed).length">
        <GameCards
            :gameObj="completed"
            gameSection="completed"
            :gameView="gameViewVal"
        />
    </template>
    <template v-else>
        <h2 class="text-center font-medium">There's no completed games yet... 🧑‍💻</h2>
    </template>
</template>

<script>
import { ref } from 'vue';

//-------------------- Vue components --------------------------\\
import GameCards from '@/components/GameCards.vue';
import GameViews from '@/components/GameViews.vue';

//-------------------- Composables --------------------------\\
import { useGameView } from '@/composables/useGameView';
import { useFilteredGames } from '@/composables/useFilteredGames';

export default {
    components: {
        GameCards,
        GameViews,
    },

    setup() {
        const games = ref(JSON.parse(localStorage.getItem('backlog')));

        const { filteredGames } = useFilteredGames(games, 'completed');
        const { gameViewVal, setGameViewVal } = useGameView();

        return {
            games,
            gameViewVal,

            // computed
            completed: filteredGames,

            // functions
            setGameViewVal,
        };
    },
};
</script>
