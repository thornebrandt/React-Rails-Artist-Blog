class AddPortfolioToPosts < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :posts, :portfolio_id
  end
end
