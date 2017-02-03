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
      villagemsg : false,
      modgemsg : false,
      wolfmsg: false,
      covenmsg: false
    }
  },
  watch : {
    game: function(){

    }
  },
  methods: {}

})
