class RecipesController < ApplicationController
  def index

  end

  def new

  end

  def show
    @recipe = Recipe.find_by(id: params[:id])
  end

end
