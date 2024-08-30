<template>
    <li class="game-card mx-auto overflow-hidden rounded border-4 border-slate-800 text-gray-300">
        <img :src="game.background_image" class="aspect-[16/12] object-cover" />

        <p class="absolute right-2 top-2 z-20 rounded border-2 border-gray-300 px-2 py-px">
            {{ dayjs(game.released).format('YYYY') }}
        </p>

        <button
            v-if="gameSectionIt === 'home'"
            @click="addToLocalBacklog(game)"
            :class="btnClasses"
        >
            <div v-if="!isInBacklog">Add <span class="icon-[subway--add] ml-2" /></div>
            <div v-else>Already in the backlog</div>
        </button>

        <button
            v-else-if="gameSectionIt === 'current-back'"
            @click="markAsComplete(game)"
            :class="btnClasses"
        >
            Mark as complete <span class="icon-[gridicons--add] ml-2" />
        </button>

        <button
            v-else
            @click="removeGame(game)"
            :class="btnClasses"
        >
            Remove from the list <span class="icon-[lets-icons--remove] ml-2" />
        </button>

        <div class="game-card__info z-20">
            <p class="mb-1 font-medium">{{ game.name }}</p>

            <ul class="flex items-center justify-center text-xs">
                <template v-for="platformObj in game.platforms.slice(0, 3)" :key="platformObj.id">
                    <li class="mr-1 rounded border-2 border-gray-300 px-2 py-px">{{ platformObj.platform.name }}</li>
                </template>
            </ul>
        </div>
    </li>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import dayjs from 'dayjs';

export default {
    props: {
        game: {
            type: Object,
            required: true,
        },
        gameSectionIt: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const isInBacklog = ref(false);

        //----- functions
        function checkBacklog(id) {
            const backlog = JSON.parse(localStorage.getItem('backlog')) || {};
            isInBacklog.value = backlog[id] ? true : false;
        }

        function addToLocalBacklog(game) {
            const backLog = JSON.parse(localStorage.getItem('backlog')) || {};
            game.status = 'in-progress';
            backLog[game.id] = game;
            localStorage.setItem('backlog', JSON.stringify(backLog));
            isInBacklog.value = true;
        }

        function markAsComplete(game) {
            console.log(game.slug, 'Has been completed');
            const backlog = JSON.parse(localStorage.getItem('backlog')) || {};
            game.status = 'completed';
            backlog[game.id] = game;
            localStorage.setItem('backlog', JSON.stringify(backlog));
        }

		const btnClasses = computed(() => {
			return ['add-btn invisible absolute left-0 top-0 z-20 flex w-max items-center rounded border-2 px-2 py-1 text-center text-sm'];
		})

        onMounted(() => {
            checkBacklog(props.game.id);
        });

        return {
            isInBacklog,
			btnClasses,

            checkBacklog,
            addToLocalBacklog,
            markAsComplete,

            dayjs,
        };
    },
};
</script>

<style scoped>
.game-card {
    position: relative;
}

.game-card::after {
    content: '';
    background-color: rgba(0, 0, 0);
    opacity: 0;
    visibility: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    transition:
        opacity 0.7s,
        visibility 0.7s;
}

.game-card .game-card__info {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 0;
    left: 50%;
    transition: transform 0.7s;
    transform: translate(-50%, 100%);
}

.game-card .add-btn {
    top: -10%;
    left: 50%;
    opacity: 0;
    transition:
        top 0.7s,
        visibility 0.7s,
        opacity 0.7s;
    transform: translate(-50%, -50%);
}

.game-card:hover::after {
    opacity: 0.55;
    visibility: visible;
}

.game-card:hover .game-card__info {
    transform: translate(-50%, 0);
}

.game-card:hover .add-btn {
    opacity: 1;
    top: 50%;
    visibility: visible;
}
</style>
