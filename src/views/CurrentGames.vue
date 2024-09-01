<template>
    <h2 class="mb-6 text-center text-2xl font-medium">Current Games</h2>

	<GameViews/>

	<div v-if="Object.keys(currentGames).length">
		<GameCardsVue :gameObj="currentGames" gameSection="current-back"/>
	</div>
	<div v-else>
		<h2 class="text-center font-medium ">There's no games to play, what a day... 😴</h2>
	</div>
	
</template>

<script>
import { computed, ref } from 'vue';

import GameViews from '@/components/GameViews.vue';
import GameCardsVue from '@/components/GameCards.vue';

export default {
	components: {
		GameCardsVue,
		GameViews
	},

	setup() {
		const backlogGames = ref(JSON.parse(localStorage.getItem('backlog')) || [])

		const currentGames = computed(() => {
			const currentG = {}
			const game = backlogGames.value
			for (let i in game) {
				if (game[i].status == 'in-progress') {
					currentG[i] = game[i]
				}
			}

			return currentG
		})

		return {
			backlogGames,

			currentGames
		}
	}
};
</script>

<style></style>
