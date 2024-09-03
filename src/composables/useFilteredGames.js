import { computed } from 'vue';

export function useFilteredGames(games, status) {

	const filteredGames = computed(() => {
		return Object.fromEntries(
			// eslint-disable-next-line no-unused-vars
			Object.entries(games.value).filter(([_,b]) => b.status === status)
		);
	})

	return {
		filteredGames
	};
}
