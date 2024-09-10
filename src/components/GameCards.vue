<template>
    <ul :class="viewClassesContainer">
        <template
            v-for="gameIn in gameObj"
            :key="gameIn.id"
        >
            <component
                :is="gameView === 'Grid' ? 'game-item-grid' : 'game-item-details'"
                :game="gameIn"
                :gameSectionIt="gameSection"
            />
        </template>
    </ul>
</template>

<script>
import GameItemGrid from './game-visual/GameItem-grid.vue';
import GameItemDetails from './game-visual/GameItem-details.vue';

import { computed } from 'vue';

export default {
    components: {
        'game-item-grid': GameItemGrid,
        'game-item-details': GameItemDetails,
    },
    props: {
        gameObj: {
            type: Object,
            required: true,
        },
        gameSection: {
            type: String,
            required: true,
        },
        gameView: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const viewClassesContainer = computed(() => {
            return {
                'grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4': props.gameView == 'Grid',
                '': props.gameView == 'Details',
            };
        });

        return {
            // computed
            viewClassesContainer,

            //funcs
        };
    },
};
</script>
