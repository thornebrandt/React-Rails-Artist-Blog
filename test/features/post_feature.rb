require "test_helper"

class ViewPostFeature < Capybara::Rails::TestCase
	describe "view post" do
		before(:each) do
			visit "posts/dev_blog"
		end

		describe "basic tests within post page" do
			test "has correct elements" do
				assert page.has_content?("Dev Blog Test")	
				assert page.has_content?("Dev Blog Subtitle")
				assert page.first('h4.publishDate').text == 'May 9th, 2017'	
				assert page.first('div.postBody').text == 'Body with HTML'
				image_icon =  'http://' + Capybara.current_session.server.host.to_s + ":" + 
					Capybara.current_session.server.port.to_s + "/images/headings/dev.png"
				assert page.find(:xpath, "//img[@class='chapterHeading']")['src'] == image_icon
			end

			# test "next element" do
			# 	puts page.find(:xpath, "//img[@class='chapterHeading']")['src']
			# 	expected = 'http://' + Capybara.current_session.server.host.to_s + ":" + 
			# 		Capybara.current_session.server.port.to_s + "/images/headings/dev.png"
			# 	puts "EXPECTED: " + expected
			# end
		end	
	end
end