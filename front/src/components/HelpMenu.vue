<template>
    <div>
        <h2>Заплутали?</h2>

        <div class="nav">
            <button @click="$emit('roll', -3)">Почитайте обо мне</button>
            <button @click="$emit('roll', -2)">Посмотрите на меня</button>
            <button @click="$emit('roll', -1)">Узнайте больше</button>
        </div>

        <button v-if="countdown" @click="entrance">{{ 'Вернуться? ' + countdown }}</button>
        <button v-else-if="$root.isAuth" @click="exit">{{ 'Уйти?' }}</button>


    </div>
</template>

<script>
export default {
    name: 'HelpMenu',

    data() {
        return {
            fired: null,
            countdown: 0,
        }
    },

    methods: {
        exit() {
            this.fired = this.$root.isAuth ? this.$root.user : undefined;
            if(this.fired) {
                this.$root.user = {};
                window.localStorage.setItem('token', null);
                
                this.countdown = 8;
                let timer = setInterval(() => {
                    if(this.countdown > 0) this.countdown--;
                    else {
                        clearInterval(timer);
                        window.close();
                    }
                }, 1000);
            }
        },
        entrance() {
            if(this.fired) {
                const user = {...this.fired};
                this.$root.user = user;
                this.fired = null;
                this.countdown = 0;
                window.localStorage.setItem('token', user.id + '~' + user.token);
            }
        },
    },

    emits: ['roll'],
}
</script>

<style scoped>

.nav {
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 40px auto;
	gap: 10px;
}
</style>