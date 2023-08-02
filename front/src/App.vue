<template>
	<TwistedCube :index="hashes.findIndex(h => h===String(hash)?.slice(1))" @change="changedCube"/>
</template>

<script>
import TwistedCube from "./components/TwistedCube.vue";

export default {
	name: "App",

  components: {
    TwistedCube
  },

  data() {
    return {
      user: null,
      content: {},
      loadings: {},
      hash: undefined,
      hashes: ['why', 'iam', 'auth', 'help'],
    }
  },

  computed: {
    isAuth() {
      return !!this.user?.id;
    }
  },

  methods: {
    changeLocation(path) {
      window.history.pushState(null, "", [window.location.origin, path].join('/'));
    },

    routing(location) {
      const hash = location.hash,
        qs = String(location.search||''),
        queries = Object.fromEntries(qs.split('?').pop().split('&').map(qp => qp.split('=')));
      
      if(queries['auth']) {
        this.token = queries['auth'];
        
        // this.changeLocation(window.location.hash);
      }

      if(hash) {
        this.hash = hash;//window.location.hash;
        console.log('routing, hash');
      }
            
      // console.log('hash', location.hash?.slice(6));
      // if(hash.startsWith('#auth:')) {
      //   this.token = hash.slice(6);
      //   // 
      // }
    },

    changedCube(x) {
      const hash = this.hashes[x-1] && '#' + this.hashes[x-1];
      if(hash) this.hash = hash; //this.changeLocation(window.location.hash);
    },

    setContent(content) {
      this.content = content;
    },

    setUser(user) {
      if(!user?.error) {
        this.user = user ?? {};
        if(this.user?.token) window.localStorage.setItem('token', this.user.id+'~'+this.user.token);
      }
      else {
        // alert('err?');
        console.warn(user);
      }
    },
  },

  mounted() {
    window.addEventListener(
      "hashchange",
      () => {
        console.log("The hash has changed!", window.location.hash);
        this.hash = window.location.hash;
      },
      false,
    );

    this.routing(window.location);

    this.loadings.auth = true;
    this.loadings.data = true;

    //
    fetch(this.apiUrl, {headers: {'Authorization': 'Bearer ' + this.token}})
        .then(res => res.json())
        .then(json => {
          this.setContent(json.data);
          this.setUser(json.user);
        })
        .finally(() => {
          this.loadings.data = false;
          this.loadings.auth = false;
        });
  },

  watch: {
    hash() {
      this.changeLocation(this.hash)
    }
  }
};
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
