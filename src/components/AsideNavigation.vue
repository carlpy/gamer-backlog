<template>
    <aside
        class="fixed left-0 top-0 z-30 flex h-full max-h-screen flex-col justify-between overflow-hidden bg-stone-900 p-6 text-white transition-[width]"
        :class="{ 'w-20': !isOpen, 'w-64': isOpen }"
    >
        <div>
            <h1 class="mb-12 divide-y-4 text-center text-3xl">
                <span class="icon-[streamline--ai-gaming-spark-solid]" />
            </h1>

            <nav class="absolute flex flex-col items-start gap-y-6">
                <router-link class="flex items-center text-lg font-medium" :to="{ name: 'home' }"
                    ><span class="icon-[ion--home] mr-4 size-6" />
                    <span class="" :class="{ hidden: !isOpen }">Home</span>
                </router-link>
                <router-link class="flex items-center text-lg font-medium" :to="{ name: 'c-games' }"
                    ><span class="icon-[fluent-mdl2--backlog-list] mr-4 size-6" />
                    <span class="" :class="{ hidden: !isOpen }">Current Backlog</span>
                </router-link>
                <router-link class="flex items-center text-lg font-medium" :to="{ name: 'co-games' }"
                    ><span class="icon-[fluent-mdl2--completed-solid] mr-4 size-6" />
                    <span class="" :class="{ hidden: !isOpen }">Completed Games</span>
                </router-link>
            </nav>
        </div>

        <button @click="toggleModal" class="self-end">
            <span
                class="icon-[material-symbols--expand-circle-right-rounded] size-10 transition-transform"
                :class="{ 'rotate-180': isOpen }"
            />
        </button>
    </aside>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const isOpen = ref(false);

        function toggleModal() {
            isOpen.value = !isOpen.value;
        }

        return {
            isOpen,

            toggleModal,
        };
    },
};
</script>

<style lang="scss" scoped></style>
