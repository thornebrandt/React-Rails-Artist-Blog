class Portfolio < ApplicationRecord
	has_many :posts
	def self.all_published
		self.where({ published: true })
	end

	def link
		#TODO - make this post type
		"/portfolio/" + self.url
	end

end
