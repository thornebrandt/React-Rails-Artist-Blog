class AdminController < ApplicationController
	before_action :get_content, only: [:dashboard]


	def login
	end

	def logout
		if logged_out
			flash[:error] = "You have successfully logged out"
			redirect_to "/login"
		end
	end

	def authorize
		session[:USER_TOKEN] = params['password']
		if authorized
			redirect_to "/admin/dashboard" 
		else
			flash[:error] = "That password was incorrect. "
			redirect_to "/login"
		end
	end

	def dashboard
		if !logged_in
			flash[:error] = "You are not authorized."
			redirect_to "/login"
		end
	end

	private
		def get_content
			@unpublished_posts = Post.list_unpublished
			@published_posts = Post.list_published
			@tags = Tag.all
			@portfolios = Portfolio.all
		end
end
