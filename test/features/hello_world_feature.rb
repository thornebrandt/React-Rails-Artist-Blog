require "test_helper"

class CanAccessHomeTest < Capybara::Rails::TestCase
	describe "hello_world_feature" do
		before(:all) do
			visit "http://localhost:3001/hello_world"
		end

		test "should have stuff from react" do
			assert page.has_content?("Hello, Stranger!");
		end

		test "should update from react" do
			within('#hello_world_form') do
				fill_in('name', :with => 'Dude')
			end
			assert page.has_content?("Hello, Dude!");
		end

		test "should do conditional rendering" do
			refute page.has_selector?('#hiddenDiv');
			within('#hello_world_form') do
				fill_in('name', :with => 'magic word')
			end
			assert page.has_selector?('#hiddenDiv');
		end

	end

	describe "strange features" do
		before(:all) do
			visit "http://localhost:3001/strange"
		end

		test "should use a class" do
			assert page.has_content?('Strange')
		end

		test "should fill in an input" do
			newInput = page.find('#newInput')
			newInput.set('Dude')
			assert_equal newInput.value, 'Dude'
		end

		test "should fill in a textarea" do
			newTextArea = page.find('#newTextArea')
			newTextArea.set('Hey')
			assert_equal newTextArea.value, 'Hey'
		end

		test "should select an option from textbox" do
			newSelect = page.find('#newSelect')
			select "3", :from => 'newSelect'
			assert_equal newSelect.value, '3'
		end

		test "should unhide an element" do
			Capybara.ignore_hidden_elements = false
			assert has_css?('#notHidden.hidden')
			find(:css, 'a#unHide').trigger('click')
			#execute_script("$('#unHide').click()");
			assert has_no_css?('#notHidden.hidden')
		end
	end
end

# feature 'hello_world' do
# 	scenario 'wtf...' do
# 		skip "just an example of how to use"
# 		visit "http://localhost:3001/hello_world"
# 		click_on('buttonTest')
# 		page.must_have_content 'click'
# 		within('#hello_world_form') do
# 			fill_in('name', :with => 'Dude')
# 		end
# 		page.must_have_content "Hello, Dude!"
# 		assert page.has_selector?("input[value='Dude']")
# 	end
# end


#check if element has a class
#page.find("#some-id")[:class].include?("some-class")


# #print page.html
#print page.body


# visit('/projects')
# visit(post_comments_path(post))


# click_link('id-of-link')
# click_link('Link Text')
# click_button('Save')
# click_on('Link Text') # clicks on either links or buttons
# click_on('Button Value')


# fill_in('First Name', :with => 'John')
# fill_in('Password', :with => 'Seekrit')
# fill_in('Description', :with => 'Really Long Text...')
# choose('A Radio Button')
# check('A Checkbox')
# uncheck('A Checkbox')
# attach_file('Image', '/path/to/image.jpg')
# select('Option', :from => 'Select Box')

# page.has_selector?('table tr')
# page.has_selector?(:xpath, '//table/tr')
# page.has_xpath?('//table/tr')
# page.has_css?('table tr.foo')
# page.has_content?('foo')


# find_field('First Name').value
# find_link('Hello', :visible => :all).visible?
# find_button('Send').click

# find(:xpath, "//table/tr").click
# find("#overlay").find("h1").click
# all('a').each { |a| a[:href] }

#page.execute_script("alert()")