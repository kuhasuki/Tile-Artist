class UsersController < ApplicationController
	
	def create
		@user = User.new(user_params)
		if @user.save
			login!(@user)
			render json: @user
		else
			render json: {error: "Invalid username/ password combination"}
		end
	end

	private

	def user_params
    params.require(:user).permit(:name, :password)
  end

end
