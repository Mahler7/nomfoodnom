class Api::V1::RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
  end

  def create
    @recipe = Recipe.new(recipe_params)
    
    ingredients = params[:ingredients] 
    ingredients.each do |ingredient|
      @recipe.ingredients.new(
        name: ingredient[:name]
      )
    end

    if @recipe.save 
      render :show
    else
      render json: { errors: @recipe.errors.full_messages }, status: 422
    end
  end

  def show
    @recipe = Recipe.find_by(id: params[:id])
  end

  def update
    @recipe = Recipe.find(params[:id])
    @recipe.update(recipe_params)
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @recipe.destroy
    render json: { message: "Recipe Deleted" }
  end

  private

    def recipe_params
      params.require(:recipe).permit(
        :name,
        :chef,
        :cooktime,
        :amount,
        :description,
        :favorite,
        :user_id,
        ingredients:[
          :id,
          :name,
          :recipe_id
        ]
      )
    end
end
