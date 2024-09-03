import { ref, computed } from 'vue';

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
        const backLog = JSON.parse(localStorage.getItem('backlog'));
		backLog[game.id] = 'Azucare';
        /* delete backLog[game.id]; */
        localStorage.setItem('backlog', JSON.stringify(backLog));
		isInBacklog.value = false;
    }

    const btnClasses = computed(() => {
        return ['flex w-max items-center rounded border-2 px-2 py-1 text-center text-sm mr-4'];
    });

    const btnClassesGrid = computed(() => {
        return ['add-btn absolute z-20 flex w-max items-center rounded border-2 px-2 py-1 text-center text-sm mr-4'];
    });

    return {
        // reactive vars
        isInBacklog,

        // functions
        checkBacklog,
        updateBacklog,
		deleteFromBacklog,

        // computed
        btnClasses,
		btnClassesGrid,
    };
}
