class SessionsController < ApplicationController
	before_action :logged_in?, only: :destroy

  def new
    render new
  end

  def show
    if logged_in?
      render 'show'
    else
      render json: { status: "logged out" }
    end
  end

  def create
	  @user = User.find_by_credentials(
	    params[:user][:name],
	    params[:user][:password]
	  )
	  #Switch branches
    if @user
      #initiate a new session
      login!(@user)
      render 'show'
    else
      #flash incorrect password/username combination
      render json: { error: "Incorrect username/ password combination" }
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to root_url
  end

end
