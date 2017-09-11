class AddIndexToPosts2 < ActiveRecord::Migration[5.0]
  def change
    add_index :posts, :portfolio_id
  end
end
