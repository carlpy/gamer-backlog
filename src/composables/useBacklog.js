import { ref } from 'vue';

export function useBacklog() {
    const isInBacklog = ref(false);

    function checkBacklog(id) {
        const backlog = JSON.parse(localStorage.getItem('backlog')) || {};
        isInBacklog.value = backlog[id] ? true : false;
    }

    function updateBacklog(game, status) {
        const backLog = JSON.parse(localStorage.getItem('backlog')) || {};
        game.status = status;
        backLog[game.id] = game;
        localStorage.setItem('backlog', JSON.stringify(backLog));
        isInBacklog.value = true;
    }

    function deleteFromBacklog(game) {
        const backLog = JSON.parse(localStorage.getItem('backlog'))  || {};
		delete backLog[game.id]
        localStorage.setItem('backlog', JSON.stringify(backLog));
		isInBacklog.value = false;
		console.log(game.name, ' just deleted')
    }

	function gameLinkRouter(game) { 
		return '/games/'+game.id;
	}

    return {
        // reactive vars
        isInBacklog,

        // functions
        checkBacklog,
        updateBacklog,
		deleteFromBacklog,
		gameLinkRouter,

        // computed
    };
}
