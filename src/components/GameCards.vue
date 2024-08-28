<template>
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 px-3">
        <template v-for="gameIn in gameOb" :key="gameIn.id">
            <GameItem :game="gameIn" />
        </template>
    </ul>
</template>

<script>
import GameItem from './GameItem.vue';

export default {
    components: {
        GameItem,
    },
    props: {
        gameObj: {
            type: Array,
            required: true,
        },
    },

    setup(props) {
        console.log(props.gameObj); // This logs the prop data for debugging

        return {
            gameOb: props.gameObj, // Directly returning the prop without renaming
        };
    },
};
</script>
