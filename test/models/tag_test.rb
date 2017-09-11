require 'test_helper'

class TagTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  	def setup
  		@space_tag = tags(:space)
  	end


 	test "should remove underscores from display name" do
		assert_equal @space_tag.name, "Space_Cadets" 
		assert_equal @space_tag.display_name, "Space Cadets"		
 	end

end
