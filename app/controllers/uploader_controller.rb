
class UploaderController < ApplicationController
  skip_before_filter  :verify_authenticity_token


  def image
  end

  def upload_image
  	uploader = ImageUploader.new
  	respond_to do |format|
  		format.json{
  			image = params[:image]
  			uploader.store!(image)
  			render json: {
  				url: uploader.url

  			}
  		}
  	end
  end

  def upload_video
    uploader = VideoUploader.new
    respond_to do |format|
      format.json{
        video = params[:video]
        uploader.store!(video)
        render json: {
          url: uploader.url
        }
      }
    end
  end


  def curl_post_example
  	render text: "Thanks maaang"
  end

end
