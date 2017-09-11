class PortfoliosController < ApplicationController
  before_action :set_portfolio, only: [:show, :edit, :update, :destroy]
  before_action :check_login, except: [:show, :index]

  def index
    redirect_to home_path
  end

  def new
    @portfolio = Portfolio.new
  end

  def edit
  end

  def create
    @portfolio = Portfolio.new(portfolio_params)
    respond_to do |format|
      url = get_portfolio_url
      if @portfolio.save
        format.html { redirect_to url, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @portfolio }
      else
        format.html { render :new }
        format.json { render json: @portfolio.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @portfolio.update(portfolio_params)
        url = @portfolio.link
        format.html { redirect_to url, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @portfolio }
      else
        format.html { render :edit }
        format.json { render json: @portfolio.errors, status: :unprocessable_entity }
      end
    end
  end

  def portfolio_params
    params.require(:portfolio).permit(:name, :url, :publish_date, :published, :icon, :body)
  end

  private
    def set_portfolio
      if Portfolio.exists?(params[:id])
        @portfolio = Portfolio.find(params[:id])
      elsif Portfolio.exists?(:url=>params[:id])
        @portfolio = Portfolio.find_by_url(params[:id])
      else
        flash[:error] = "Could not find portfolio " + params[:id]
        redirect_to home_path
      end
    end

    def get_portfolio_url
      return "/portfolio/" + @portfolio.url
    end

end
