
class ApplicationController < ActionController::Base
  helper_method :logged_in, :authorized, :encrypt
  protect_from_forgery with: :exception

  private

  def authorized
  	if (Rails.env.test? || BCrypt::Password.new(ENV['AUTH_TOKEN']) == session[:USER_TOKEN])
      session[:logged_in] = true;
      return true
  	else
      puts("-----"+Rails.env+"-----", encrypt(session[:USER_TOKEN]), "-----"+Rails.env+"-----")
  		session[:logged_in] = false;
  		return false
  	end
  end

  def logged_in
  	return session[:logged_in]
  end

  def logged_out
  	session.delete(:logged_in)
  	session.delete(:USER_TOKEN)
  	return true
  end

  def encrypt(pw)
  	hash = BCrypt::Password.create(pw)
  	return hash
  end

  def check_login
    if !logged_in
      puts "You ain't logged in: " + Rails.env
      flash[:error] = "You are not authorized."
      redirect_to "/login"
    end
  end
  
end
