class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = @user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      flash[:success] = 'Successfully created account!'
      redirect_to '/recipes'
    else
      flash[:warning] = 'Invalid email or password!'
      redirect_to '/signup'
    end

  end

  private

    def user_params
      params.require(:user).permit(
        :user_name,
        :email,
        :first_name,
        :last_name,
        :password,
        :password_confirmation
      )
    end
end
