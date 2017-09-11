require 'test_helper'

class PortfolioTest < ActiveSupport::TestCase
	test "can get all published posts" do
		published_portfolios = Portfolio.all_published
		assert_equal published_portfolios.length, 2
	end
end
