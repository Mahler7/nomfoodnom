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
      errors: {},
      cookingtimes: [
        {cook: "less than 15 minutes", value: "less than 15 minutes"},
        {cook: "15 minutes", value: "15 minutes"},
        {cook: "30 minutes", value: "30 minutes"},
        {cook: "45 minutes", value: "45 minutes"},
        {cook: "1 hour", value: "1 hour"},
        {cook: "1 hour 30 minutes", value: "1 hour 30 minutes"},
        {cook: "2 hours", value: "2 hours"},
        {cook: "2 hours 30 minutes", value: "2 hours 30 minutes"},
        {cook: "3 hours", value: "3 hours"},
        {cook: "3 hours 30 minutes", value: "3 hours 30 minutes"},
        {cook: "4 hours", value: "4 hours"},
        {cook: "more than 4 hours", value: "more than 4 hours"}
      ],
      servings: [
        {serves: "1", value: 1},
        {serves: "2", value: 2},
        {serves: "3", value: 3},
        {serves: "4", value: 4},
        {serves: "5", value: 5},
        {serves: "6", value: 6},
        {serves: "7", value: 7},
        {serves: "8", value: 8},
        {serves: "9", value: 9},
        {serves: "10", value: 10},
        {serves: "11", value: 11},
        {serves: "12", value: 12},
        {serves: "more than 12", value: "more than 12"}
      ]
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