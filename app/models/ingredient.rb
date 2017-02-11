class Ingredient < ApplicationRecord
  belongs_to :recipe
  after_save { |ingredient| ingredient.destroy if ingredient.name.blank? }
end
