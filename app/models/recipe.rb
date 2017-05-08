class Recipe < ApplicationRecord
  has_many :ingredients, dependent: :destroy
  belongs_to :user
end
