require 'test_helper'

class AdminControllerTest < ActionDispatch::IntegrationTest
	test "should get login" do
		get "/login"
		assert_response :success
	end

	test "should redirect to login on authorized access" do
		get "/admin/dashboard"
		assert_redirected_to "/login"
	end

	test "should login" do
		authorized_dashboard
		assert_redirected_to "/admin/dashboard"
	end
	
end
