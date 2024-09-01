<template>
    <div class="mb-3 text-center">
        <a-segmented v-model:value="value" :options="data" />
    </div>
</template>

<script>
import Segmented from 'ant-design-vue/es/segmented/src';

import { ref, reactive, watch } from 'vue';

export default {
    components: {
        'a-segmented': Segmented,
    },

    setup() {
		const data = reactive([
			{ label: 'Details', value: 'Details' },
			{ label: 'Grid', value: 'Grid' }
		]);
		
		const value = ref(JSON.parse(localStorage.getItem('game-view')) || 'Grid');
		
        watch(value, (newVal) => {
			console.log(newVal)
			localStorage.setItem('game-view', JSON.stringify(newVal))
        });
		
		return {
			data,
			value,
		};
    },
};
</script>
