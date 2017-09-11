class HelloWorldController < ApplicationController
  def index
  	@post = Post.new
    @hello_world_props = { name: "Stranger" }
  end

  def strange
  end

end
