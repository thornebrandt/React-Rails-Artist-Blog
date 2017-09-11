class CreatePortfolios < ActiveRecord::Migration[5.0]
	def change
		create_table :portfolios do |t|
			t.string :name
			t.string :url
			t.datetime :publish_date
			t.boolean :published
			t.text :icon
			t.text :body
			t.timestamps
		end
	end
end
