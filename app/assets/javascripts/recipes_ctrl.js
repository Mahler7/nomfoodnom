$(document).on('ready', function() {
  new Vue({
    el: '#app',
    data: {
      message: "Hello World!",
      recipe: {
        name: '',
        chef: '',
        cooktime: '',
        amount: '',
        description: '',
        favorite: false,
      },
      recipes: [],
      errors: {}
    },
    methods: {
      newRecipe: function(){
        this.$http.post('/api/v1/recipes.json', this.recipe).then(function(response){
          this.recipes.push(this.recipe);
        }).catch(function(response){
          this.errors = response.data.errors;
        });
      }
    }
  })
})