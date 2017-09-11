require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = posts(:one)
    @published_post = posts(:dev_blog)
  end

  test "should get new" do
    authorized_dashboard
    get new_post_url
    assert_response :success
  end

  test "should create post" do
    authorized_dashboard
    assert_difference('Post.count') do
      post posts_url, params: {
        post: {
          body: @post.body,
          icon: @post.icon,
          publish_date: @post.publish_date,
          published: @post.published,
          subtitle: @post.subtitle,
          summary: @post.summary,
          title: @post.title,
          url: "new_url",
          tag_ids: [tags(:one).id]
        }
      }
    end
    assert_redirected_to Post.last.link
  end

  test "should show published post" do
    get post_url(@published_post)
    assert_response :success
  end

  test "should redirect to home on unpublished post" do
    get post_url(@post)
    assert_redirected_to home_path
  end

  test "should get edit" do
    authorized_dashboard
    get edit_post_url(@post)
    assert_response :success
  end

  test "should update post" do
    authorized_dashboard
    patch post_url(@post), params: { post: { 
      body: 'new body',
      icon: @post.icon,
      publish_date: @post.publish_date,
      published: @post.published,
      subtitle: @post.subtitle,
      summary: @post.summary,
      title: @post.title
    }}
    assert_redirected_to @post.link
  end

  test "should destroy post" do
    authorized_dashboard
    assert_difference('Post.count', -1) do
      delete post_url(@post)
    end
    assert_redirected_to "/admin/dashboard"
  end

  test "can access urls this way" do
    post_id = @published_post.id
    get "/posts/" + post_id.to_s
    assert_response :success
  end

  test "can quickly publish post" do
    authorized_dashboard
    post_id = @post.id
    get "/admin/publish_post/" + post_id.to_s
    assert_redirected_to "/blog/" + @post.url
  end

  test "can quickly unpublish post" do
    authorized_dashboard
    post_id = @post.id
    get "/admin/unpublish_post/" + post_id.to_s
    assert_redirected_to "/admin/dashboard" 
  end

  test "should get portfolio post" do
    get "/portfolio/third_portfolio/dev_portfolio_post"
    assert_response :success
  end

  test "should get blog" do
    get "/blog"
    assert_response :success
  end
  
end