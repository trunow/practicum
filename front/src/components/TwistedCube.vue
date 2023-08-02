<template>
  <div class="space" :class="{'space_waiting':rotating||!init}">
    <input :value="x" type="hidden"/>
    <div class="cube" data-x="2" @transitionstart.self="rotating=true" @transitionend.self="rotating=false">
      <div class="cube__side">
        <PrinterZone @end="toIam"/>
      </div>
      <div class="cube__side">
        <IAm @why="roll(-1)"/>
      </div>
      <div class="cube__side">
        <AuthZone @why="roll(-2)"/>
      </div>
      <div class="cube__side">
        <HelpMenu @roll="roll"/>
      </div>
    </div>
  </div>

  <div class="roll roll_prev" @click="roll(-1)"></div>
  <div class="roll roll_next" @click="roll(+1)"></div>
</template>

<script>
import PrinterZone from './PrinterZone.vue';
import IAm from './IAm.vue';
import AuthZone from './AuthZone.vue';
import HelpMenu from './HelpMenu.vue';

export default {
  name: 'TwistedCube',

  props: {
    index: {
      type: Number,
      default: undefined,
    }
  },

  components: {
    PrinterZone,
    IAm,
    AuthZone,
    HelpMenu,
  },

  data() {
    return {
      x: 1,
      rotating: false,
      init: false,
    }
  },

  methods: {
    toIam() {
      this.x = 2;
      this.init = true;
      // this.$emit('init');
    },

    roll(steps) {
      if(steps>0) this.x = this.x===4 ? steps : this.x+steps;
      else this.x = this.x<2 ? 5+steps : this.x+steps;
    },
  },

  emits: ['init', 'change'],

  watch: {
    index(ix) {
      if(ix!==undefined) this.x = ix+1;
      console.log('index was changed', ix);
    },

    x(x) {
      this.$emit('change', x);
    },
  }
}
</script>

<style>
:root {
  --c: 1;
  --p: 100vmin;
  --s: calc(var(--c) * var(--p));
  --t: calc(var(--s) * -1);
  --o: calc(var(--s) * 0.5);
}
body {
  margin: 0;
  	/* perspective: calc(var(--s) * 1);
	perspective-origin: center; */
  /* font-family: monospace; */
}
.space {
  width: var(--s);
	height: 100vh;
	overflow: hidden;
	position: relative;
	margin: 0;
	border: 0 none;
  	perspective: calc(var(--s) * 2.5);
/* 	perspective-origin: center; */
}
.cube {
  /* font-size: calc(var(--s) * 0.8); */
  list-style: none;
  margin: 0;
	padding: 0;
  width: var(--s);
	height: var(--s);
	position: absolute;
  top: calc(50vh - var(--s) / 2);
	transform-style: preserve-3d;
  transform: translateZ( var(--t) );
  transition: transform 1s;
}
.cube__side {
  --th: var(--dh, 20);
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	border: 0 none;
  /* background-color: hsl(calc(var(--th) * 1deg) 60% 50% / 50%); */
  background-color: black;
  align-items: center;
	justify-content: center;
  opacity: 0.99;
}

.cube__side:nth-child(1) {
  transform: translateZ( var(--o) );
}
.cube__side:nth-child(2) {
  transform: rotateX( -90deg ) translateZ( var(--o) );
}
.cube__side:nth-child(3) {
  transform: rotateX( -180deg ) translateZ( var(--o) );
}
.cube__side:nth-child(4) {
  transform: rotateX( -270deg ) translateZ( var(--o) );
}

input[value="1"] + .cube {
  transform: translateZ( var(--t) ) rotateX(0deg);
}
input[value="2"] + .cube {
  transform: translateZ( var(--t) ) rotateX(90deg);
}
input[value="3"] + .cube {
  transform: translateZ( var(--t) ) rotateX(180deg);
}
input[value="4"] + .cube {
  transform: translateZ( var(--t) ) rotateX(270deg);
}

input[value="1"] + .cube .cube__side:nth-child(1),
input[value="2"] + .cube .cube__side:nth-child(2),
input[value="3"] + .cube .cube__side:nth-child(3),
input[value="4"] + .cube .cube__side:nth-child(4) {
  opacity: 1;
}

.roll {
  position: fixed;
  width: 32px;
  height: 32px;
  left: calc(50vw - 16px);
  display: flex;
  place-content: center;
  place-items: center;
  background: #444;
  font-size: 24px;
  border-radius: 50%;
  /* transition: visibility 1s; */
}
.space_waiting ~ .roll {
  visibility: hidden;
}
.roll:hover {
  background: #222;
  cursor: pointer;
}

.roll_prev {
  top: 4px;
}
.roll_next {
  bottom: 4px;
}
.roll_prev::before {
  content: "👆";
}
.roll_next::before {
  content: "👇";
}
</style>
