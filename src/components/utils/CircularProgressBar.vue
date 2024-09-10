<template>
    <circle-progress :percent="percent" :is-bg-shadow="false" :size="50" />
</template>

<script>
import 'vue3-circle-progress/dist/circle-progress.css';
import CircleProgress from 'vue3-circle-progress';

export default {
    components: { CircleProgress },
    props: {
        percent: {
            type: Number,
            required: true,
        },
    },
};
</script>
