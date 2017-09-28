class PagesController < ApplicationController
	def contact
	end

	def portfolio
		set_portfolio(params[:id])
		@breadcrumbs = [
			{ name: "Portfolio", link: "/portfolio" },
			{ name: @portfolio.name, link: @portfolio.link }
		];
	end

	def portfolios
		@portfolios = Portfolio.all_published
	end

	def post
		set_post(params[:id])
	end

	def tag
		set_tag(params[:name], 1)
	end

	def tag_page
		set_tag(params[:name], params[:page])
		render :tag
	end

	def portfolio_post
		set_portfolio(params[:portfolio_id])
		set_post(params[:post_id])
		@portfolio_post = true
		@breadcrumbs = [
			{ name: "Portfolio", link: "/portfolio" },
			{ name: @portfolio.name, link: @portfolio.link },
			{ name: @post.title, link: @post.link }
		];
		render :post
	end

	def blog
		@blog_posts = Post.paginated_published_blogs(1)
	end

	def blog_page
		@blog_posts = Post.paginated_published_blogs(params[:page])
		render :blog
	end

	def home
		@featured_posts = Post.all_featured
	end

	private
	def set_post(post_id)
		if Post.exists?(post_id)
			@post = Post.find(post_id)
			check_published
		elsif Post.exists?(:url=>post_id)
			@post = Post.find_by_url(post_id)
			check_published
		else
			flash[:error] = "Could not find post " + post_id
			redirect_to home_path
		end
	end

	def set_portfolio(portfolio_id)
	  if Portfolio.exists?(portfolio_id)
	    @portfolio = Portfolio.find(portfolio_id)
	  elsif Portfolio.exists?(:url=>portfolio_id)
	    @portfolio = Portfolio.find_by_url(portfolio_id)
	  else
	    flash[:error] = "Could not find portfolio " + portfolio_id
	    redirect_to home_path
	  end
	end

	def set_tag(tag_name, page)
		if Tag.exists?(["lower(name) = ?", params[:name].downcase])
			@tag = Tag.where("lower(name) = ?", params[:name].downcase).first
			@posts = @tag.posts.paginate(:per_page => 5, :page => page)
				.where({ published: true })
				.order('publish_date DESC')
		else
			flash[:error] = "No entries under tag " + tag_name
			redirect_to home_path
		end
	end

	def check_published
		if !@post.published && !logged_in
			flash[:error] = "Whoops! Could not find post " + params[:id]
			redirect_to home_path
		end
	end
end
