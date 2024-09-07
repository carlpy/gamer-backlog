<template>
    <button :class="btnClasses" @click.stop="handleClick">
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
        btnClasses: {
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

        return {
            btnContent,
            // functions
            handleClick,
        };
    },
};
</script>