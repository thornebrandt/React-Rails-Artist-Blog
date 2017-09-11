class PostsController < ApplicationController
  include ReactOnRails::Controller
  #include ActionController::Base.helpers.image_path
  before_action :set_post, only: [:show, :edit, :update, :destroy, :publish, :unpublish]
  before_action :get_instance_vars, only: [:edit, :new]
  before_action :check_login

  # GET /posts
  # GET /posts.json
  def index
    redirect_to home_path
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
    @rails_props[:post_tags] = get_post_tags(@post)
    @rails_props[:post] = @post
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)
    check_published
    if(post_params[:tag_ids])
      @post.tags = Tag.find(post_params[:tag_ids])
    end
    respond_to do |format|
      if @post.save
        url = @post.link
        format.html { redirect_to url, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: url }
      else
        get_instance_vars
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def publish
    if @post.update(published: true)
      url = @post.link
      redirect_to url
    end
  end

  def unpublish
    if @post.update(published: false)
      dashboard = get_dashboard
      redirect_to dashboard
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    check_published
    respond_to do |format|
      if post_params[:tag_ids]
        @post.tags = Tag.find(post_params[:tag_ids]) || []
      end
      if @post.update(post_params)
        url = @post.link
        format.html { redirect_to url, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: url }
      else
        get_instance_vars
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      dashboard = get_dashboard
      format.html { redirect_to dashboard, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def get_instance_vars
      @portfolios = get_portfolios
      @tags = get_tags
      @rails_props = {
        portfolios: @portfolios,
        tags: @tags
      }
    end

    def set_post
      if Post.exists?(params[:id])
        @post = Post.find(params[:id])
      elsif Post.exists?(:url=>params[:id])
        @post = Post.find_by_url(params[:id])
      else
        flash[:error] = "Could not find post " + params[:id]
        redirect_to home_path
      end
    end

    def get_portfolios
      portfolios = Portfolio.all.map{ |p| { 'label' => p.name, 'value' => p.id } }
      portfolios.unshift({ "label" => "NA", "value" => -1})
      return portfolios
    end

    def get_tags
      tags = Tag.all.map{ |tag| { 
        'label' => tag.display_name,
        'color' => tag.color,
        'name' => tag.display_name,
        'value' => tag.id,
        'id' => tag.id
      }}
      return tags
    end

    def get_post_tags(post)
      post_tags = post.tags.map{ |tag| { 
        'id' => tag.id,
        'value' => tag.id,
        'label' => tag.display_name,
        'name' => tag.display_name,
        'color' => tag.color
      }}
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :subtitle, :body, :summary, :icon, :portfolio_id, :post_type, :published, :publish_date, :url, tag_ids: [])
    end

    def check_published
      if !@post.published
        @post.published = false
      end
    end
    
    def get_dashboard
      return "/admin/dashboard"
    end

end
