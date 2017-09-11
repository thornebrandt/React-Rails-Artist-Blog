require "test_helper"

class CreatePostFeature < Capybara::Rails::TestCase
	describe "post creation" do
		before(:each) do
			Capybara.ignore_hidden_elements = false
			visit "posts/new"
		end

		describe "basic tests within page" do
			test "should be on correct page" do
				assert page.has_content?('Admin for thornebrandt.com')
			end

			test "can fill_out_form" do
				post_title = page.find('#post_title')
				post_title.set('CapyTest');
				assert_equal page.find('#post_title').value, 'CapyTest'
			end

			test "conditional portfolio dropdown" do
				first(".Select-input input").set(portfolio)
				assert page.has_selector?('#post_portfolio_id')
			end

			# #commented out until delete works

			# test "creates a blog post" do
			# 	page.find_by_id('post_title').set('Capybara Title');
			# 	page.find_by_id('post_icon').set('Capybara Icon');
			# 	page.find_by_id('post_subtitle').set('Capybara Subtitle');
			# 	page.find_by_id('post_body_hidden').set('Capybara Body');
			# 	page.find_by_id('post_summary').set('Capybara Summary');
			# 	click_on 'submitForm'
			# 	assert page.has_content?('Post was successfully created.');
			# 	assert page.has_content?('Capybara Title');
			# end
		end
	end
end