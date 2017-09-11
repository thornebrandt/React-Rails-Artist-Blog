Rails.application.routes.draw do
  root 'pages#home'
  match '/home' => 'pages#home', :as => :home, :via => :get
  resources :posts, only: [:index, :new, :create, :edit, :update, :destroy]
  resources :portfolios
  resources :tags, only: [:index, :new, :create, :edit, :update, :destroy]
  get 'pages/home'
  get  '/contact', to: 'pages#contact'
  get 'hello_world', to: 'hello_world#index'
  get 'strange', to: 'hello_world#strange'
  get '/uploader/image', to: 'uploader#image'
  post '/uploader/image', to: 'uploader#upload_image'
  post '/uploader/video', to: 'uploader#upload_video'
  get '/curl_example', to: 'uploader#curl_post_example'
  post '/curl_example', to: 'uploader#curl_post_example'
  get 'admin/publish_post/:id' => 'posts#publish'
  get 'admin/unpublish_post/:id' => 'posts#unpublish'
  get 'posts/:id' => 'pages#post'
  get '/blog', to: 'pages#blog'
  get 'blog/page/:page' => 'pages#blog_page'
  get 'blog/:id' => 'pages#post'
  get 'portfolio/:portfolio_id/:post_id' => 'pages#portfolio_post'
  get 'portfolio' => 'pages#portfolios'
  get 'portfolio/:id' => 'pages#portfolio'
  get 'admin' => 'admin#dashboard'
  get 'login' => 'admin#login'
  get 'logout' => 'admin#logout'
  get 'tag/:name' => 'pages#tag'
  get 'tag/:name/:page' => 'pages#tag_page'
  post 'authorize' => 'admin#authorize'
  get 'admin/dashboard' => 'admin#dashboard'
  get "/404" => "pages#not_found"
  get "/500" => "pages#server_error"
end
