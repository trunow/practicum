<template>
    <div class="cover">
        <img :src="src"/>

        <div v-if="!pause" class="cover__next" :class="{cover__next_star: !!star}">
            <div v-for="(phrases,phIx) in texts" :key="'phrase_'+phIx">
                <div v-for="(text,txtIx) in phrases" :key="'text_'+txtIx">
                    <button v-if="phraseIx===phIx && !txtIx" class="btn" @click="star=!star">
                        {{ text }}
                    </button>
                    <p v-else>
                        {{ text }}
                    </p>
                </div>
            </div>
            <button v-if="!pause && star" class="btn btn_link btn_fadein" @click="$emit('why')">
                {{ 'Почему я программист?' }}
            </button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'IAm',

    computed: {
        src() {
            const fn = this.star ? 'iamstar_320x440.png' : 'iamyoung_320x440.png';
            return `/${fn}`;
        },
        phraseIx() {
            return 1 * !this.star;
        },
    },

    data() {
        return {
            star: false,
            pause: true,
            texts: [
                ['Был я молод...', 'И не кодил'],
                ['Теперь я star', 'И программист'],
            ]
        }
    },

    methods: {
        takeOne() {
            this.pause = true;
            setTimeout(() => {
                this.pause = false;
            }, 1000);
        }
    },

    emits: ['why'],
    
    watch: {
        star() {
            this.takeOne();
        },
    },

    mounted() {
        this.takeOne();
    },
}
</script>

<style scoped>
.cover {
	position: relative;
    height: 100%;
	display: flex;
	overflow: hidden;
	background-color: chocolate;
}
.cover img {
	position: relative;
	width: 100%;
    object-fit: cover;
	transition: transform 2.4s;
}
.cover img:hover {
	transform: scale(1.2);
}
.cover__next {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
.btn_fadein {
    animation: fadein 2s;
    /* opacity: 0; */
}
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
