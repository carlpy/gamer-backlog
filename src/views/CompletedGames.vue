<template>
    <h1 class="mb-4 text-2xl font-medium">Completed Games</h1>

	<GameViews/>

    <div v-if="Object.keys(completed).length">
        <GameCards :gameObj="completed" gameSection="completed" />
    </div>
    <div v-else>
        <h2 class="text-center font-medium">There's no completed games yet... 🧑‍💻</h2>
    </div>
</template>

<script>
import { computed, ref } from 'vue';

import GameCards from '@/components/GameCards.vue';
import GameViews from '@/components/GameViews.vue';

export default {
    components: {
        GameCards,
		GameViews
    },

    setup() {
        const games = ref(JSON.parse(localStorage.getItem('backlog')));

        const completed = computed(() => {
            const completedGames = {};
            const game = games.value;

            for (let i in game) {
                if (game[i].status == 'completed') {
                    completedGames[i] = game[i];
                    console.log(i, game[i]);
                }
            }

            return completedGames;
        });

		console.log('games value: ', games.value, 'completed games: ', completed.value)

        return {
            games,

            completed,
        };
    },
};
</script>

<style></style>
