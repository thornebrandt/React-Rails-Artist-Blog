require 'test_helper'

class TagsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tag = tags(:one)
  end

  test "should get new" do
    authorized_dashboard
    get new_tag_url
    assert_response :success
  end

  test "should create tag" do
    authorized_dashboard
    assert_difference('Tag.count') do
      post tags_url, params: {
        tag: {
          name: @tag.name,
          description: @tag.description,
          color: @tag.color,
          icon: @tag.icon,
        } 
      }
    end
    assert_redirected_to "/admin/dashboard"
  end

  test "should show tag url" do
    name = @tag.name
    get "/tag/" + name
    assert_response :success
  end

  test "should edit tag" do
    authorized_dashboard
    get edit_tag_url(@tag)
    assert_response :success
  end

  test "should update tag" do
    authorized_dashboard
    @new_name = 'newTagName'
    patch tag_url(@tag), params: {
      tag: {
        name: @new_name,
        description: 'newTagDescription',
        color: 'newTagColor',
        icon: 'newTagIcon'
      }
    }
    @tag.reload
    assert_equal @tag.name, @new_name
  end

end