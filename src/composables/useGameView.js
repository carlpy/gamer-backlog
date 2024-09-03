import { ref } from 'vue';

export function useGameView() {
	const gameViewVal = ref(JSON.parse(localStorage.getItem('game-view')) || 'Grid');
	
	function setGameViewVal(view) {
		gameViewVal.value = view;
		localStorage.setItem('game-view', JSON.stringify(view))
	}

	return {
		gameViewVal,
		setGameViewVal,
	}
};
