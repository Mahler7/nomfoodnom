Rails.application.routes.draw do
  
  get '/signup' => 'users#new'
  post '/users' => 'users#create'

  namespace :api do
    namespace :v1 do
      resources :recipes
    end
  end
  resources :recipes
end
