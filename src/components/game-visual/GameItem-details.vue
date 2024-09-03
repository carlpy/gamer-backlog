<template>
    <li class="mx-auto mb-2 flex items-center overflow-hidden rounded border-2">
        <img :src="game.background_image" class="mr-5 aspect-[16/12] w-32 object-cover" />

        <div class="grow">
            <p class="mb-1 font-medium">
                {{ game.name }} <span class="text-gray-500">({{ dayjs(game.released).format('YYYY') }})</span>
            </p>

            <ul class="justify-left flex items-center text-xs">
                <template v-for="platformObj in game.platforms.slice(0, 3)" :key="platformObj.id">
                    <li class="mr-1 rounded border-2 border-gray-300 px-2 py-px">{{ platformObj.platform.name }}</li>
                </template>
            </ul>

        </div>
		<p class="mr-6"><span v-for="(game, index) in parseInt(game.rating)" class="icon-[noto--star]" :key="index"/> {{ game.rating }}</p>

		
        <button v-if="gameSectionIt === 'home'" @click="updateBacklog(game, 'in-progress')" :class="btnClasses">
            <div v-if="!isInBacklog">Add <span class="icon-[subway--add] ml-2" /></div>
            <div v-else>Already in the backlog</div>
        </button>

        <button v-else-if="gameSectionIt === 'current-back'" @click="updateBacklog(game, 'completed')" :class="btnClasses">
            Mark as complete <span class="icon-[gridicons--add] ml-2" />
        </button>

        <button v-else @click="deleteFromBacklog(game)" :class="btnClasses">
            Remove from the list <span class="icon-[lets-icons--remove] ml-2" />
        </button>
    </li>
</template>

<script>
import { onMounted } from 'vue';
import dayjs from 'dayjs';

//---------------------- Composables -----------------------\\
import { useBacklog } from '@/composables/useBacklog';

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
		const { isInBacklog, checkBacklog, updateBacklog, deleteFromBacklog, btnClasses } = useBacklog();

        onMounted(() => {
            checkBacklog(props.game.id);
        });

        return {
            isInBacklog,

            // custom css classes
            btnClasses,

            // the functions
            checkBacklog,
            updateBacklog,
			deleteFromBacklog,

            // libs
            dayjs,
        };
    },
};
</script>
