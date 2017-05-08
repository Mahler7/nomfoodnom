class Api::V1::RecipesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]

  def index
    @recipes = current_user.recipes
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.user_id = current_user.id
    
    ingredients = params[:ingredients] 
    ingredients.each do |ingredient|
      @recipe.ingredients.new(
        name: ingredient[:name]
      )
    end

    if @recipe.save 
      render nothing: true
    else
      render json: { errors: @recipe.errors.full_messages }, status: 422
    end
  end

  def show
    @recipe = Recipe.find_by(id: params[:id])
  end

  def update
    @recipe = Recipe.find(params[:id])
    @recipe.user_id = current_user.id
    p '--------------'
    p @recipe
    p '--------------'
    @recipe.update(recipe_params)
    p '--------------'
    p @recipe
    p '--------------'
    render nothing: true
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @recipe.destroy
    render json: { message: "Recipe Deleted" }
  end

  private

    def recipe_params
      params.require(:recipe).permit(
        :id,
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
