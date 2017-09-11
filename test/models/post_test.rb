require 'test_helper'

class PostTest < ActiveSupport::TestCase
	def setup
		@post = Post.new(
			title: "Test Post",
			subtitle: "Test Subtitle",
			body: "Test Body",
			summary: "Test Summary",
			icon: "test.png",
			published: true,
			publish_date: DateTime.new(2017, 3, 21),
			url: "test_url",
		)
		@post_with_tags = posts(:with_tags)
		@post_with_portfolio = posts(:with_portfolio)
	end

	test "should be valid" do
		assert @post.valid?
	end

	test "does not allow spaces in url" do
		@post.url = "test url"
		assert_not @post.valid?
	end

	test "title should be present" do
		@post.title = " "
		assert_not @post.valid?
	end

	test "body should be present" do
		@post.body = " "
		assert_not @post.valid?
	end

	test "post fixture has tag relations" do
		assert_equal 2, @post_with_tags.tags.size
	end

	test "post fixture can access tag names" do
		assert_equal "vr", @post_with_tags.tags.first.name
	end

	test "post has access to portfolio" do
		assert @post_with_portfolio.portfolio
	end

	test "can get unpublished posts" do
		unpublished_posts = Post.all_unpublished
		assert_equal unpublished_posts.length, 3
	end

	test "can get all published posts" do
		published_posts = Post.all_published
		assert_equal published_posts.length, 8
	end

	test "list does not include body" do
		posts = Post.list_unpublished
		assert posts.first.title
		assert_raises ActiveModel::MissingAttributeError do
			body = posts.first["body"]
		end 
	end

	test "list of featured post" do
		featured_posts = Post.all_featured
		assert_equal featured_posts.length, 1
		assert_equal featured_posts.first.title, "Featured Post"
	end

	test "list of latest published blog posts" do
		blog_posts = Post.paginated_published_blogs(1)
		assert_equal blog_posts.length, 5
	end

end