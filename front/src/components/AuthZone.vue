<template>
    <form v-if="!$root.isAuth" class="form form_auth" @submit.prevent="auth">
        <h2>Узнай больше</h2>
        <p>Выполи вход через почту</p>
        <input class="inp inp_input" name="email" type="email" placeholder="Введи Email" v-model="email"/>
        <button class="btn">Получи ссылку</button>
        <p>Вернись сюда по ссылке из письма</p>
    </form>
    <div v-else-if="$root.content.github">
        <h2>{{ 'Привет, ' + $root.user.name }}</h2>
        <p>Продолжим знакомство? Вот что у меня есть:</p>
        <p><a :href="$root.content.github">Guthub</a></p>
        <p><a :href="$root.content.youtube">Youtube</a></p>
        <p>
            <button class="btn btn_link" @click="$emit('why')">Почему я программист</button>
        </p>

        <form class="form form_callback" @submit.prevent="callback">
            <h3>Что-то ещё?</h3>
            <textarea class="inp inp_textarea" name="callback" placeholder="Вопрос/предложение"></textarea>
            <!-- <input name="from" type="hidden" :value="user.email"/> -->
            <button class="btn">Отправь мне сообщение</button>
        </form>
        <!-- <p><button class="btn">Надоело, ухожу</button></p> -->
    </div>
    <div v-else>
        <h2>Что-то не так</h2>
    </div>
</template>

<script>
export default {
    name: 'AuthZone',

    data() {
        return {
            email: this.$root.isProd ? '' : 's@trnw.ru',
        }
    },

    methods: {
        auth(e) {
            this.$root.loadings.auth = true;

            fetch(this.apiUrl + '?email=' + this.email, {method: 'POST'})
            // fetch(this.apiUrl, {method: 'POST', body: new FormData(e.target)})
                .then(res => res.json())
                .then(json => {
                    console.warn('AUTH?', {json});
                    //window.localStorage.setItem('token');
                })
                .finally(() => {
                    this.$root.loadings.auth = false;
                });

        },

        callback(e) {
            // console.dir(e.target);

            this.$root.loadings.auth = true;

            fetch(this.apiUrl + '?callback=' + e.target.callback.value, {method: 'POST'})
                .then(res => res.json())
                .then(json => {
                    console.warn('callback?', {json});
                    //window.localStorage.setItem('token');
                })
                .finally(() => {
                    this.$root.loadings.auth = false;
                });

        }
    },

    emits: ['why'],
}
</script>

<style scoped>
.form {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 2em;
	gap: 2em;
}
.form .inp,
.form .btn {
    border: none;
    padding: 0.5em;
    min-height: 3em;
    border-radius: none;
}
.form_auth {
	height: 80%;
}
.form_auth .inp,
.form_auth .btn {
    font-size: 1.2rem;
}
.form .inp_textarea {
    min-height: 6em;
    font-family: monospace;
}

a[href^="https://github.com"]:before {
	content: " ";
	display: inline-block;
	margin-right: 5px;
	background-image: url(https://github.com/favicon.ico);
	width: 16px;
	height: 16px;
	filter: invert(1);
	background-size: 100%;
}
a[href^="https://youtube.com"]:before {
	content: " ";
	display: inline-block;
	margin-right: 5px;
	background-image: url(https://youtube.com/favicon.ico);
	width: 16px;
	height: 16px;
	background-size: 100%;
}
</style>