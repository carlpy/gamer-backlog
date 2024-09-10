<template>
    <div class="mb-5 hidden text-center lg:block">
        <a-segmented v-model:value="value" :options="data" @change="giveView" />
    </div>
</template>

<script>
import { Segmented } from 'ant-design-vue';

import { ref, reactive } from 'vue';

export default {
    components: {
        'a-segmented': Segmented,
    },
    emits: ['updateView'],

    setup(_, { emit }) {
        const data = reactive([
            { label: 'Details', value: 'Details' },
            { label: 'Grid', value: 'Grid' },
        ]);

        const value = ref(JSON.parse(localStorage.getItem('game-view')) || 'Grid');

        function giveView(newVal) {
            emit('updateView', newVal);
        }

        return {
            data,
            value,

            giveView,
        };
    },
};
</script>
