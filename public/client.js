new Vue({
  el: '#wrapper',
  mounted : function () {
    this.$http.get('/games/ext-093').then(response => {
    this.tablehtml = response.data;
        });
  },
  data: {
    vis: '',
    game : 'ext-093',
    tablehtml : 'Loading.....',
    seeme: {
      villagemsg : true,
      modgemsg : true,
      wolfmsg: false,
      covenmsg: false
    }
  },
  watch : {
    game: function(){
      $( "#gametable").load( "/games/"+this.game);
    }
  },
  methods: {}

})
