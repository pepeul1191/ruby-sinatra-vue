class MyApp < Sinatra::Base
  get '/home' do
  	@css = 'dist/styles.min.css'
  	@js = 'dist/demo.min.js'
    erb :'home/index', :layout => :'layouts/blank', :locals => { :tiempo => Time.now}
  end
end