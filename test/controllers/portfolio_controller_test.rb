require 'test_helper'

class PortfolioControllerTest < ActionDispatch::IntegrationTest
	setup do
		@portfolio = portfolios(:one)
		@post = posts(:one)
	end

	test "should get new" do
		authorized_dashboard
		get new_portfolio_url
		assert_response :success
	end

	test "should create portfolio" do
		authorized_dashboard
		assert_difference('Portfolio.count') do
			post portfolios_url, params: {
				portfolio: {
					name: @portfolio.name,
					url: @portfolio.url,
					publish_date: @portfolio.publish_date,
					published: @portfolio.published,
					icon: @portfolio.icon,
					body: @portfolio.body
				}
			}
		end

		assert_redirected_to @portfolio.link
	end

	test "should show portfolio" do
		get portfolio_url(@portfolio)
		assert_response :success
	end

	test "should get edit" do
		authorized_dashboard
		get edit_portfolio_url(@portfolio)
		assert_response :success
	end

	test "should update post" do
		authorized_dashboard
		patch post_url(@post), params: { post: { 
			body: 'new body',
			icon: @post.icon,
			publish_date: @post.publish_date,
			published: @post.published,
			subtitle: @post.subtitle,
			summary: @post.summary,
			title: @post.title
		}}
		assert_redirected_to @post.link
	end

	test "should update portfolio" do
		authorized_dashboard
		patch portfolio_url(@portfolio), params: {
			portfolio: {
				body: 'new body',
				icon: @portfolio.icon,
				publish_date: @portfolio.publish_date,
				published: @portfolio.published,
				name: @portfolio.name
			}
		}
		assert_redirected_to @portfolio.link
	end
end
