class PicturesController < ApplicationController

	def create
		@picture = Picture.new(picture_params)
		if @picture.save
			render json: @picture
		else
			render json: @picture.errors.full_messages, status: 400
		end
	end

	def update
		@picture = Picture.find(params[:id])
		if @picture
			@picture.update(picture_params)
			render json: @picture
		else
			render json: {error: "no such picture found"}, status: 400
		end
	end

	def show
		@picture = Picture.find(params[:id])
		if @picture
			render json: @picture
		else
			render json: {error: "no such picture found"}, status: 400
		end
	end

	def destroy
		@picture = Picture.find(params[:id])
		if @picture.destroy
			render json: {success: "picture destroyed"}, status: 400
		else
			render json: {error: "failed to destroy picture"}, status: 400
		end
	end

	def index
		@pictures = User.find(params[:id]).Picture.all()
		render json: @pictures
	end

	private

	def picture_params
    params.require(:picture).permit(:title, :user_id, :size, :grid)
  end

end
