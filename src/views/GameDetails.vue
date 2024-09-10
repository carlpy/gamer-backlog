<template>
    <RouterLink to="/" class="mb-8 inline-block rounded border border-gray-400 px-4 py-1">
        <span>Go back</span>
        <span class="icon-[material-symbols--arrow-circle-left-rounded] ml-1" />
    </RouterLink>

    <section v-if="!isLoading" class="gap-x-10 lg:flex">
        <section class="mb-8 grow">
            <h1 class="mb-3 text-4xl font-medium uppercase">{{ game.name }}</h1>
            <div class="mb-4">
                <span v-for="(game, index) in parseInt(game.rating)" class="icon-[noto--star]" :key="index" />
                <span class="ml-2">{{ game.rating }}</span>
            </div>

            <div class="lg:max-w-3xl">
                <img :src="game.background_image" class="mb-4 aspect-video w-full border-2 border-gray-800 object-cover" />

                <p class="mb-8 leading-8">
                    Dive into the immersive world of <strong>{{ game.name }}</strong
                    >, where you can experience the thrill of the gameplay. Whether you're a fan of action-packed adventures,
                    strategic challenges, or story-driven experiences, this game offers something for every player.
                </p>

                <!-- Genres and Tags -->
                <ul class="mb-8 flex divide-x-2 *:basis-2/4">
                    <li class="px-3">
                        <p class="mb-4 mr-4 text-lg font-medium">Genres</p>
                        <p
                            v-for="genre in game.genres"
                            :key="genre.id"
                            class="mb-2 mr-2 inline-block rounded border border-gray-800 px-2 py-px text-sm"
                        >
                            {{ genre.name }}
                        </p>
                    </li>
                    <li class="px-3">
                        <p class="mb-4 mr-4 text-lg font-medium">Features</p>
                        <p
                            v-for="tag in game.tags.slice(0, 6)"
                            :key="tag.id"
                            class="mb-2 mr-2 inline-block rounded border border-gray-800 px-2 py-px text-sm"
                        >
                            {{ tag.name }}
                        </p>
                    </li>
                </ul>

                <!-- Ratings -->
                <p class="mb-4 text-lg font-semibold">Ratings</p>
                <ul class="justify-between border p-3 sm:flex">
                    <li v-for="rating in game.ratings" :key="rating.id">
                        <p class="mb-2 text-center font-medium">{{ rating.title[0].toUpperCase() + rating.title.slice(1) }}</p>
                        <CircleProgressBar :value="rating.percent" :max="100" :size="80" class="font-semibold">
                            {{ rating.percent }}%
                        </CircleProgressBar>
                    </li>
                </ul>
            </div>
        </section>

        <section class="my-8 lg:max-w-md">
            <!-- the add and other info interfaces -->
            <span class="mb-4 inline-block rounded border border-gray-900 bg-black px-4 py-1 font-medium text-white"
                >ESBR: {{ game.esrb_rating?.name || 'Pending' }}</span
            >

            <ul class="divide-y-2">
                <li class="py-3">
                    <span class="mr-4 text-lg font-medium">Developer(s)</span>
                    <span v-for="(dev, index) in game.developers" :key="dev.id"
                        >{{ dev.name }}{{ index + 1 == game.developers.length ? '' : ', ' }}</span
                    >
                </li>
                <li class="py-3">
                    <span class="mr-4 text-lg font-medium">Publisher(s):</span>
                    <span v-for="(publisher, index) in game.publishers" :key="publisher.id"
                        >{{ publisher.name }}{{ index + 1 == game.publishers.length ? '' : ', ' }}</span
                    >
                </li>
                <li class="py-3">
                    <span class="mr-4 text-lg font-medium">Release Date:</span>
                    <span>{{ game.released }}</span>
                </li>
                <li class="py-3">
                    <span class="text-lg font-medium">Platforms: </span>
                    <span v-for="(platform, index) in game.platforms" :key="index"
                        >{{ platform.platform.name }}{{ index + 1 == game.platforms.length ? '' : ', ' }}</span
                    >
                </li>
            </ul>
        </section>
    </section>
    <section v-else class="text-center">
        <SpinnerAntd size="large" />
    </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

//-------------------- External components --------------------------\\
import { CircleProgressBar } from 'circle-progress.vue';

//-------------------- Vue components --------------------------\\
import SpinnerAntd from '@/components/utils/SpinnerAntd.vue';

export default {
    components: {
        SpinnerAntd,
        CircleProgressBar,
    },
    setup() {
        const route = useRoute();
        const game = ref({});
        const isLoading = ref(true);

        const API_KEY = import.meta.env.VITE_API_KEY;
        const gameId = route.params.id;

        async function getGame() {
            try {
                const { data } = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
                console.log(data);
                game.value = data;
            } catch (e) {
                console.log(e);
            } finally {
                isLoading.value = false;
            }
        }

        onMounted(async () => {
            getGame();
        });

        return {
            route,
            gameId,
            game,
            isLoading,
        };
    },
};
</script>
