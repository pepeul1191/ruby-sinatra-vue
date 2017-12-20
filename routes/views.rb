class MyApp < Sinatra::Base
  get '/home' do
  	@menu = '[{"url" : "accesos/", "nombre" : "Accesos"},{"url" : "maestros/", "nombre" : "Maestros"},{"url" : "agricultores/", "nombre" : "Agricultores"}]'
		@items = '[{"subtitulo":"Opciones","items":[{"item":"Gestión de Sistemas","url":"home#/sistema"},{"item":"Gestión de Usuarios","url":"home#/usuario"}]}]' 
		@data = false
  	@css = 'dist/styles.min.css'
  	@js = 'dist/demo.min.js'
    erb :'home/index', :layout => :'layouts/blank', :locals => { :tiempo => Time.now}
  end
end