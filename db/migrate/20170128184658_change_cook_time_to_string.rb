class ChangeCookTimeToString < ActiveRecord::Migration[5.0]
  def change
    change_column :recipes, :cooktime, :string
  end
end
