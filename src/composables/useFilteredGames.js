import { computed } from 'vue';

export function useFilteredGames(games, status) {
    const filteredGames = computed(() => {
        if (games.value) {
            return Object.fromEntries(
                Object.entries(games.value).filter(([id, game]) => {
                    return id && game.status === status;
                }),
            );
        }
        return {};
    });

    return {
        filteredGames,
    };
}
