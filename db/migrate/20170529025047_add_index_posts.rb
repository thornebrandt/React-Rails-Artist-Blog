class AddIndexPosts < ActiveRecord::Migration[5.0]
	def change
	  add_foreign_key :posts, :portfolios
	end
end
