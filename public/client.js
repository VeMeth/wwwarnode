Vue.component("loading", {
    template: '<span>Loading...</span>'
});

new Vue({
  el: '#wrapper',
  data: {
    vis: '',
    game : 'ext-093',
    currentView: "loading",
    seeme: {
      villagemsg : true,
      wolfmsg: false,
      covenmsg: false,
      vampnmsg: false,
      masonmsg: false,
      ghostmsg: false,
      demonmsg: false
    }
  },
  mounted : function () {
    this.$http.get('/games/ext-093').then(response => {
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
    }
  },
  methods: {}
})
