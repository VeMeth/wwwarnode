Vue.component("loading", {
    template: '<span><center><img src="/30.gif"></center></span>'
});

new Vue({
  el: '#wrapper',
  data: {
    game : 'ext-043',
    currentView: "loading",
    seeme: {
      villagemsg : true,
      wolfmsg: false,
      covenmsg: false,
      vampmsg: false,
      masonmsg: false,
      ghostmsg: false,
      demonmsg: false,
      modmsg:   true
    }
  },
  mounted : function () {
    this.$http.get('/games/'+this.game).then(response => {
      Vue.component("game", {
        template: response.data,
        props: ['seeme']
    });
        //And then change the page to that component
        this.currentView = "game";
    });
  },

  watch : {
    game: function(){
        // set currentView to 'loading' again, then reload the game as in mounted (move it to a method to be able to recall it)
        this.currentView = "loading";
        this.$http.get('/games/'+this.game).then(response => {
          Vue.component("game", {
            template: response.data,
            props: ['seeme']
        });
            //And then change the page to that component
            this.currentView = "game";
        });
    }
  },
  methods: {}
})
