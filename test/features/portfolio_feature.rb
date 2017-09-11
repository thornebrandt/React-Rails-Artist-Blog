require "test_helper"

class PortfolioFeature < Capybara::Rails::TestCase
	describe "view portfolio" do
		describe "can access all portfolios" do
			test "has correct elements" do
				visit "portfolio"
				assert page.has_content?("Second Portfolio")
			end
		end

		describe "can access specific portfolio" do
			test "has correct elements" do
				visit "portfolio/first_portfolio"
				assert page.has_content?("First Portfolio")
			end
		end

	end
end