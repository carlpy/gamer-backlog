import { computed } from 'vue';

export function useFilteredGames(games, status) {
    const filteredGames = computed(() => {
        if (games.value) {
            return Object.fromEntries(
                // eslint-disable-next-line no-unused-vars
                Object.entries(games.value).filter(([id, game]) => {
					return game.status === status;
				})
            );
        }
        return {};
    });

    return {
        filteredGames,
    };
}
