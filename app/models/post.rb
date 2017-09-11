class Post < ApplicationRecord
	has_and_belongs_to_many :tags,  polymorphic: true
	belongs_to :portfolio, optional: true
	validates :title, presence: true
	validates :body, presence: true
	validates :url, presence: true, format: { with: /\A[a-zA-Z0-9_-]+\Z/ }

	def formatted_publish_date
		day = self.publish_date.strftime("%-d").to_i
		self.publish_date.strftime("%B #{day.ordinalize}, %Y")
	end

	def short_date
		self.publish_date.strftime("%-m/%-d/%y")
	end

	def publish_path
		"/admin/publish_post/" + self.id.to_s
	end

	def unpublish_path
		"/admin/unpublish_post/" + self.id.to_s
	end

	def link
		#TODO - make this post type
		case self.post_type
		when 'portfolio'
		  return "/portfolio/" + self.portfolio.url + "/" + self.url
		when 'featured'
			return "/posts/" + self.url
		else
			return "/blog/" + self.url
		end
	end

	def self.list_params
		'id, title, subtitle, publish_date, post_type, url, published, portfolio_id'
	end

	def self.all_unpublished
		self.where.not({ published: true })
	end

	def self.list_unpublished
		self.where.not({ published: true }).select(self.list_params)
	end

	def self.all_published
		self.where({ published: true })
	end

	def self.list_published
		self.where({ published: true }).select(self.list_params)
	end

	def self.all_featured
		self.where({ post_type: 'featured' }).order('publish_date DESC')
	end

	def self.paginated_published_blogs(page)
		return self.where({ published: true, post_type: 'blog' })
			.paginate(:page => page, :per_page => 5)
			.order('publish_date DESC')
	end

end