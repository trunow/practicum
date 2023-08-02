<template>
    <div v-show="!wait" class="printer" :class="{'printer_console': num===null}">
        <p class="printer__line" v-for="(char, line) in pos" :key="'line_'+line">
            {{ text[line]?.slice(0, char+1) }}
        </p>
        <div class="printer__next" v-if="num!==null && storyIsEnded">
            <button class="btn" @click="num=nextNum">
                См. версию №{{ nextNum+1 }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PrinterZone',

    data() {
        return {
            console: [
                'vite create practicum',
                'cd practicum',
                'npm i express cors nodemailer dotenv md5 sqlite3',
                'npm i vue -D',
                'git init',
                'git commit -a -m "to Practicum" && git push',
            ],
            pos: [],
            stories: [
                [
                    'ПОЧЕМУ Я ПРОГРАММИСТ?',
                    '- - -',
                    'В 90-х подростков, таких как я тогда, пугали наркотиками.',
                    '- Мол, ходят наркоманы со шприцем; один незаметный укол - и ты подсел...',
                    '💉',
                    'Однажды, кажется, меня уколол программист...',
                    '👨‍💻',
                    '(Но никакого вреда для здоровья!)',
                ],
                [
                    'ПОЧЕМУ Я ПРОГРАММИСТ?',
                    '- - -',
                    'Инженерный институт сделал больно моему внутреннему Физику.',
                    'На долгие годы я стал Лириком.',
                    'Писательство, музыка.. Творчество, в общем.',
                    'И вдруг:',
                    '- Не посмотришь код? Плохо работает...',
                    '😳',
                    'Я никогда такого раньше не видел...',
                    '💪',
                    'Теперь я и Физик и Лирик',
                ],
                [
                    'ПОЧЕМУ Я ПРОГРАММИСТ?',
                    '- - -',
                    'За редким исключением, каждый в разработке остаётся там по схожему ряду причин.',
                    'Они известны каждому в профессии. Банальны и удивительны.',
                    'Узнать их просто. Надо стать программистом.',
                    'Просто ли стать?',
                    '- Дорогу осилит идущий...',
                    '🚶‍♀️',
                    'А если не учился на это? Учись. В интернете.',
                    '🧬',
                    'Программист учится постоянно',
                ],
                [
                    'ПОЧЕМУ Я ПРОГРАММИСТ?',
                    '- - -',
                    'Да шут его знает...',
                    'Кажется, точно на этот вопрос ответит лишь тот, у кого не было выбора.',
                    'У меня он был. Много где поработал до этого.',
                    'Но, как сказал Поэт:',
                    '- Все работы хороши, выбирай на вкус...',
                    '🚜',
                    'Главное, чтобы нравилось.',
                    '🤑',
                    'Я вот уж лет 15 выбор не меняю:)',
                ],
            ],
            num: null,
            storyIsEnded: false,
            dcoef: 40,
            wait: true,
        }
    },

    computed: {
        text() {
            return this.stories[this.num] ?? this.console;
        },
        nextNum() {
            return this.num >= (this.stories.length - 1) ? 0 : this.num + 1; 
        }
    },

    methods: {
        printer(delay) {
            this.storyIsEnded = false;
            this.wait = false;

            let timer = setInterval(() => {

                if(this.pos.length <= this.text.length) {
                    const currentLine = this.pos.length-1,
                        currentIx = this.pos[currentLine]??-1,
                        nextIx = currentIx+1,
                        nextChar = this.text[currentLine]?.[nextIx];

                    if(currentLine > -1 && nextChar!==undefined) {
                        if(delay !== this.dcoef * 1) {
                            clearInterval(timer);
                            this.printer(this.dcoef * 1);
                        };
                        this.pos[currentLine]=nextIx;
                    }
                    else {
                        if(delay !== this.dcoef * 10) {
                            clearInterval(timer);
                            this.printer(this.dcoef * 10);
                        };
                        this.pos.push(-1);
                    }
                }
                else {
                    if(this.num===null) {
                        this.$emit('end');
                        this.num=0;
                    }
                    else {
                        this.storyIsEnded = true;
                    }

                    clearInterval(timer);
                }

            }, delay);
        },
    },

    mounted() {
        if(this.$root.isAuth) this.num = 0;
        this.printer(this.dcoef * 10);
    },

    emits: ['end'],

    watch: {
        num(n) {
            if (n!==null) {
                this.wait = true;
                setTimeout(() => {
                    this.pos = [];
                    this.printer(this.dcoef * 10);
                }, 288);
            }
        },
    }
}
</script>

<style scoped>
.printer {
	text-align: left;
	padding: 10px;
    font-family: monospace;
    font-size: 24px;
}
.printer_console {
    font-size: 18px;
}
.printer .printer__line {
    color: white;
    margin: 0;
}

.printer__next {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.printer_console .printer__line::before {
    content: '$ ';
}
.printer .printer__line:last-of-type:after {
    content: ' | ';
    animation: blink 0.8s infinite;
}

@keyframes blink {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>