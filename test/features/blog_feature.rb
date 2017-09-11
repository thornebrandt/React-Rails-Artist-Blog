require "test_helper"

class BlogFeature < Capybara::Rails::TestCase
	describe "view blog" do
		describe "can access first 5 pages of blog" do
			test "has correct elements" do
				visit "blog"
				assert page.has_content?("Dev Blog Test")
			end
		end
	end
end