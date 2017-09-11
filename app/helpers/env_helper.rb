module EnvHelper
	def prerender bool
		if ENV["RAILS_ENV"] == "test"
			true
		else
			bool
		end
	end
end