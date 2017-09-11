class Tag < ApplicationRecord
	has_and_belongs_to_many :posts

	def display_name
		self.name.gsub("_", " ")
	end

	def link
		return "/tag/" + self.name
	end

end
