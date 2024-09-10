<template>
    <button :class="btnClasses" class="mb-1.5" @click="handleClick">
        <div>{{ btnContent[0] }}</div>
        <span :class="btnContent[1]" class="ml-2"></span>
    </button>
</template>

<script>
import { computed, toRefs, onMounted } from 'vue';

//---------------------- Composables -----------------------\\
import { useBacklog } from '@/composables/useBacklog';

export default {
    props: {
        gameSection: {
            type: String,
            required: true,
        },
        gameWhole: {
            type: Object,
            required: true,
        },
        view: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        const { gameSection, gameWhole } = toRefs(props);
        const { isInBacklog, checkBacklog, updateBacklog, deleteFromBacklog } = useBacklog();

        onMounted(() => {
            checkBacklog(gameWhole.value.id);
        });

        const btnContent = computed(() => {
            switch (gameSection.value) {
                case 'home':
                    return isInBacklog.value ? ['Already in backlog', ''] : ['Add to the backlog', 'icon-[subway--add]'];
                case 'current-back':
                    return ['Mark as complete', 'icon-[gridicons--add]'];
                default:
                    return ['Remove from the list', 'icon-[lets-icons--remove]'];
            }
        });

        function handleClick() {
            if (gameSection.value === 'home') {
                updateBacklog(gameWhole.value, 'in-progress');
            } else if (gameSection.value === 'current-back') {
                updateBacklog(gameWhole.value, 'completed');
            } else {
                deleteFromBacklog(gameWhole.value);
            }
        }

        const btnClasses = computed(() => {
            let baseClasses = 'flex w-max items-center justify-center rounded border-2 px-2 py-1 text-center text-xs mr-4';
            return props.view === 'details' ? baseClasses : baseClasses + ' add-btn absolute z-20';
        });

        return {
            btnContent,
            btnClasses,
            // functions
            handleClick,
        };
    },
};
</script>
