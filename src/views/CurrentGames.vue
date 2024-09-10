<template>
    <h2 class="mb-6 text-center text-2xl font-medium">Current Games</h2>

	<GameViews @updateView="setGameViewVal"/>

	<template v-if="Object.keys(currentGames).length">
		<GameCardsVue :gameObj="currentGames" gameSection="current-back" :gameView="gameViewVal"/>
	</template>
	<template v-else>
		<h2 class="text-center font-medium ">There's no games to play, what a day... 😴</h2>
	</template>
	
</template>

<script>
import { ref } from 'vue';

//-------------------- Vue components --------------------------\\
import GameViews from '@/components/GameViews.vue';
import GameCardsVue from '@/components/GameCards.vue';

//-------------------- Composables --------------------------\\
import { useGameView } from '@/composables/useGameView';
import { useFilteredGames } from '@/composables/useFilteredGames';

export default {
	components: {
		GameCardsVue,
		GameViews
	},

	setup() {
		const backlogGames = ref(JSON.parse(localStorage.getItem('backlog')) || [])

		const { gameViewVal, setGameViewVal } = useGameView();
		const { filteredGames } = useFilteredGames(backlogGames, 'in-progress');

		return {
			gameViewVal, /* with a composable or some kind of re-usability tecnique i could make this more ordered */

			// computed
			currentGames: filteredGames,

			// functions
			setGameViewVal,
		}
	}
};
</script>