$(document).on('ready', function() {
  var Recipes = new Vue({
    el: '#app',
    data: {
      message: "Hello World!",
      displayRecipeIndex: false,
      displayNewRecipe: false,
      displayRecipeShow: false,
      displayRecipeEdit: false,
      recipe: {
        id: '',
        name: '',
        chef: '',
        cooktime: '',
        amount: '',
        description: '',
        favorite: false,
        ingredients: [
          {name: ''},
        ],
        user_id: ''
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
        this.displayNewRecipe = false;
        this.displayRecipeShow = false;
        this.displayRecipeIndex = true;
        var self = this;
        if (self.recipes.length === 0){
          self.$http.get('/api/v1/recipes.json').then(function(response){ 
            for (x in response.data){
              self.recipes.push(response.data[x]);
            }
          })
        } 
        
      },
      toggleNewRecipe: function(){
        this.displayNewRecipe = true;
        this.displayRecipeIndex = false;
        this.displayRecipeShow = false;
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
            // console.log("response.data " + JSON.stringify(response.data));
            self.recipes.push(JSON.stringify(response.data));
            // window.location.href = "/recipes/" + JSON.stringify(response.data.id)
            self.displayNewRecipe = false;
            self.displayRecipeShow = true;
        }).catch(function(response){
          self.errors = response.data.errors;
        });
      },
      newIngredient: function(){
        this.recipe.ingredients.push({name:''});
      },
      removeIngredient: function(index){
        this.recipe.ingredients.splice(index, 1);
      },
      setupRecipeShow: function(recipeId){
        self = this;

        this.displayRecipeIndex = !this.displayRecipeIndex;
        this.displayRecipeShow = !this.displayRecipeShow;

        self.$http.get('/api/v1/recipes/' + recipeId + '.json').then(function(response){ 
            self.recipe.id = response.data.id
            self.recipe.name = response.data.name;
            self.recipe.chef = response.data.chef;
            self.recipe.cooktime = response.data.cooktime;
            self.recipe.amount = response.data.amount;
            self.recipe.description = response.data.description;
            self.recipe.favorite = response.data.favorite;
            self.recipe.ingredients = response.data.ingredients;
            // console.log("Response.data " + JSON.stringify(response.data))
        })
      },
      setupRecipeEdit: function(){
        this.displayRecipeShow = false;
        this.displayRecipeIndex = false;
        this.displayRecipeEdit = true;
      },
      editRecipe: function(recipeId){
        self = this;
        self.$http.patch('/api/v1/recipes/' + recipeId + '.json', self.recipe).then(function(response){
            // console.log("Response " + response);
        }).catch(function(response){
          self.errors = response.data.errors;
        });
        this.displayRecipeEdit = false;
        this.displayRecipeShow = true;
      },
      destroyRecipe: function(recipeId){
        self = this;
        self.$http.delete('/api/v1/recipes/' + recipeId + '.json', self.recipe).then(function(response){
            for (var i = 0; i < self.recipes.length; i++){
              // console.log("self.recipes[i] = " + self.recipes[i]);
              if (self.recipes[i].id === recipeId){
                // console.log("self.recipes[i].id = " + self.recipes[i].id);
                self.recipes.splice(i,1);
                break;
              }
            }
        })
        this.displayRecipeShow = false;
        this.displayRecipeIndex = true;
      }
    }
  })
})