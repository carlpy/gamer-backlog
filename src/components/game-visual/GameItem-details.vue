<template>
    <li class="mx-auto mb-2 flex cursor-pointer items-center overflow-hidden rounded border-2">
        <img :src="game.background_image" class="mr-5 aspect-[16/12] w-32 object-cover" />

        <div class="grow">
            <p class="mb-1 font-medium">
                <RouterLink :to="{ name: 'game-info', params: { id: game.id } }">{{ game.name }}</RouterLink>
                <span class="text-gray-500">({{ dayjs(game.released).format('YYYY') }})</span>
            </p>

            <ul class="justify-left flex items-center text-xs">
                <template v-for="platformObj in game.platforms.slice(0, 3)" :key="platformObj.id">
                    <li class="mr-1 rounded border-2 border-gray-300 px-2 py-px">{{ platformObj.platform.name }}</li>
                </template>
            </ul>
        </div>

        <p class="mr-6">
            <span v-for="(game, index) in parseInt(game.rating)" class="icon-[noto--star]" :key="index" /> {{ game.rating }}
        </p>

        <div class="mr-4">
            <ButtonGame :gameSection="gameSectionIt" :gameWhole="game" view="details" />
        </div>
    </li>
</template>

<script>
import dayjs from 'dayjs';
import { RouterLink } from 'vue-router';

//-------------------- Vue components --------------------------\\
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
    setup() {
        const { updateBacklog, deleteFromBacklog } = useBacklog();

        return {
            // the functions
            updateBacklog,
            deleteFromBacklog,

            // libs
            dayjs,
        };
    },
};
</script>
