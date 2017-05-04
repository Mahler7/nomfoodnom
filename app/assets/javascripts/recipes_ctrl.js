$(document).on('ready', function() {
  var Recipes = new Vue({
    el: '#app',
    data: {
      message: "Hello World!",
      displayRecipeIndex: false,
      displayNewRecipe: false,
      displayRecipeShow: false,
      recipe: {
        name: '',
        chef: '',
        cooktime: '',
        amount: '',
        description: '',
        favorite: false,
        ingredients: [
          {name: ''},
        ]
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
      setupRecipeIndex: function(){
        this.displayRecipeShow = false;
        var self = this;
        if (self.recipes.length === 0){
          self.$http.get('/api/v1/recipes.json').then(function(response){ 
            for (x in response.data){
              self.recipes.push(response.data[x]);
            }
          })
          this.displayRecipeIndex = true
        } 
        else if (self.recipes.length > 0){
          if (!this.displayRecipeIndex){
            this.displayRecipeIndex = true;
          }
          else {
            this.displayRecipeIndex = true;
          }
        }
      },
      toggleNewRecipe: function(){
        this.displayNewRecipe = true;
        this.resetNewRecipe();
      },
      resetNewRecipe: function(){
        this.recipe.name = '';
        this.recipe.chef = '';
        this.recipe.cooktime = '';
        this.recipe.amount = '';
        this.recipe.description = '';
        this.recipe.favorite = false;
        // this.recipe.ingredients = [];
        for (var i = this.recipe.ingredients.length - 1; i >= 0; i--){ // <-- change direction
          for (var name in this.recipe.ingredients[i]){
            if (this.recipe.ingredients[i].hasOwnProperty(name)){
              this.removeIngredient(i);
              break; // <------ add this
            }
          }
        }
      },
      newRecipe: function(){
        var self = this;
        self.$http.post('/api/v1/recipes.json', self.recipe).then(function(response){
            console.log("response.data " + JSON.stringify(response.data));
            self.recipes.push(JSON.stringify(response.data));
            // window.location.href = "/recipes/" + JSON.stringify(response.data.id)
            self.displayNewRecipe = false;
        }).catch(function(response){
          that.errors = response.data.errors;
        });
      },
      newIngredient: function(){
        this.recipe.ingredients.push({name:''});
      },
      removeIngredient: function(index){
        console.log("index " + index);
        this.recipe.ingredients.splice(index, 1);
      },
      setupRecipeShow: function(recipeId){
        self = this;

        this.displayRecipeIndex = !this.displayRecipeIndex;
        this.displayRecipeShow = !this.displayRecipeShow;

        self.$http.get('/api/v1/recipes/' + recipeId + '.json').then(function(response){ 
            self.recipe.name = response.data.name;
            self.recipe.chef = response.data.chef;
            self.recipe.cooktime = response.data.cooktime;
            self.recipe.amount = response.data.amount;
            self.recipe.description = response.data.description;
            self.recipe.favorite = response.data.favorite;
            self.recipe.ingredients = response.data.ingredients;
        })
      }
    }
  })
})