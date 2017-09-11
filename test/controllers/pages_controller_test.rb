require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
	test "should get home path" do
		get home_path
		assert_response :success
	end

	test "should get contact" do
		get '/contact'
		assert_response :success
	end

end