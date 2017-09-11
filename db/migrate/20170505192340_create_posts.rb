class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.text :title
      t.string :url
      t.string :type
      t.text :subtitle
      t.text :body
      t.text :summary
      t.text :icon
      t.boolean :published
      t.integer :portfolio_id
      t.datetime :publish_date
      t.timestamps
    end
  end
end
