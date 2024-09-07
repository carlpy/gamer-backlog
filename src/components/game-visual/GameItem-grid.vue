<template>
    <li class="game-card mx-auto overflow-hidden rounded border-2 border-slate-800 text-gray-300">
        <img :src="game.background_image" class="aspect-[16/12] object-cover" />

        <p class="absolute right-2 top-2 z-20 rounded border-2 border-gray-300 px-2 py-px">
            {{ dayjs(game.released).format('YYYY') }}
        </p>

        <ButtonGame
            :gameSection="gameSectionIt"
            :gameWhole="game"
            btnClasses="'add-btn absolute z-20 flex w-max items-center rounded border-2 px-2 py-1 text-center text-sm mr-4'"
        />

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
import dayjs from 'dayjs';

import ButtonGame from '../ButtonGame.vue';

//---------------------- Composables -----------------------\\
import { useBacklog } from '@/composables/useBacklog';

export default {
    components: {
        ButtonGame,
    },
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
        const { updateBacklog, deleteFromBacklog, gameLinkRouter } = useBacklog();
        const gameLink = gameLinkRouter(props.game);

        return {
            gameLink,

            // the functions
            updateBacklog,
            deleteFromBacklog,

            // libs
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
