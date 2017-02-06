json.id recipe.id
json.name recipe.name
json.chef recipe.chef
json.cooktime recipe.cooktime
json.amount recipe.amount
json.description recipe.description
json.favorite recipe.favorite
json.user_id recipe.user_id

json.ingredients do 
  json.array!(recipe.ingredients) do |ingredient|
    json.ingredient_id ingredient.id
    json.ingredient_name ingredient.name
    json.ingredient_recipe_id ingredient.recipe_id
  end
end


