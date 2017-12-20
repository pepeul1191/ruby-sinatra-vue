var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var concatJs = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var replace = require('gulp-replace');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var BASE_URL = 'http://localhost:3000/';
var DESTINO = 'public/dist/';
var MEDIA = 'public/'

// -----------------------------------
function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}
// -----------------------------------------

gulp.task('fonts', function() {
    gulp.src([
        MEDIA + 'bower_components/font-awesome/fonts/*', 
        MEDIA + 'bower_components/bootstrap/fonts/*', 
        MEDIA + 'assets/fontastic/fonts/*'
    ])
    .pipe(plumber())
    .pipe(gulp.dest(DESTINO));
});

gulp.task('layout-css', function() {
    gulp.src([
        MEDIA + 'bower_components/bootstrap/dist/css/bootstrap.min.css', 
        MEDIA + 'bower_components/font-awesome/css/font-awesome.min.css', 
        MEDIA + 'assets/fontastic/styles.css', 
        MEDIA + 'assets/site/styles.css'
    ])
    .pipe(plumber())
    .pipe(concatCss('styles.min.css'))
    .pipe(minifyCss())
    .pipe(replace('../../../font-awesome/fonts/', BASE_URL + 'dist/'))
    .pipe(replace('../../../../assets/fontastic/fonts', BASE_URL + 'dist/'))
    .pipe(replace('../fonts/glyphicons', 'glyphicons'))
    .pipe(gulp.dest(DESTINO));
});

gulp.task('layout-js', function() {
    gulp.src([
        MEDIA + 'bower_components/jquery/dist/jquery.min.js', 
        MEDIA + 'bower_components/bootstrap/dist/js/bootstrap.min.js', 
        MEDIA + 'bower_components/underscore/underscore-min.js',
        MEDIA + 'bower_components/backbone/backbone-min.js', 
        MEDIA + 'bower_components/backbone.marionette/lib/backbone.marionette.min.js', 
        MEDIA + 'bower_components/handlebars/handlebars.min.js'])
    .pipe(plumber())
    .pipe(concatJs('libs.min.js'))
    .pipe(gulp.dest(DESTINO));
});

gulp.task('swp-plugins', function(){
    gulp.src([
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools-core.min.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.min.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools-interfaces.min.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/jquery.upload.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.chain.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.dao.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.autocomplete.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.form.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.observer.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.grid.js'
    		])
     .pipe(plumber())
     .pipe(concatJs('swp.js'))
     .pipe(gulp.dest(DESTINO));

     gulp.src([
    	 	MEDIA + 'bower_components/swp-plugins/assets/css/mootools.autocomplete.css', 
    	 	MEDIA + 'bower_components/swp-plugins/assets/css/mootools.grid.css', 
    	 	MEDIA + 'bower_components/swp-plugins/assets/css/mootools.validations.css'])
     .pipe(plumber())
     .pipe(concatCss('swp.css'))
     .pipe(gulp.dest(DESTINO));
});

gulp.task('layout', ['fonts', 'layout-css', 'layout-js']);

// -----------------------------------------

gulp.task('error-css', function() {
    gulp.src([
        MEDIA + 'bower_components/bootstrap/dist/css/bootstrap.min.css',
        MEDIA + 'bower_components/font-awesome/css/font-awesome.min.css', 
        MEDIA + 'assets/fontastic/styles.css', 
        MEDIA + 'assets/error/index.css'])
    .pipe(plumber())
    .pipe(concatCss('error.min.css'))
    .pipe(minifyCss())
    .pipe(replace('../../../font-awesome/fonts/', BASE_URL + 'dist/assets/'))
    .pipe(replace('../../../assets/fontastic/fonts/', 'assets/'))
    .pipe(gulp.dest(DESTINO));
});

gulp.task('login', function(){
    gulp.start('fonts', 'layout-css', 'layout-js');

    gulp.src([
        MEDIA + 'bower_components/jquery/dist/jquery.min.js', 
        MEDIA + 'bower_components/handlebars/handlebars.min.js',
        MEDIA + 'layouts/blank.js'])
    //.pipe(uglify())
    .pipe(plumber())
    .pipe(concatJs('login.min.js'))
    .pipe(gulp.dest(DESTINO))//.pipe(gulp.dest(DESTINO + 'home'))
    .pipe(livereload());

    gulp.src([
        DESTINO + 'styles.min.css',
        MEDIA + 'assets/login/index.css'])
    .pipe(plumber())
    .pipe(concatCss('login.min.css'))
    //.pipe(minifyCss())
    .pipe(gulp.dest(DESTINO));
});

gulp.task('app', function(){
    gulp.start('fonts', 'layout-css', 'layout-js');
    gulp.src([
        DESTINO + 'libs.min.js',  
        MEDIA + 'layouts/site.js',  
        MEDIA + 'models/usuario.js', 
        MEDIA + 'views/home.js', 
        MEDIA + 'views/buscar.js', 
        MEDIA + 'views/contacto.js',  
        MEDIA + 'views/registro.js', 
        MEDIA + 'views/_form_registro.js', 
        MEDIA + 'views/login.js', 
        MEDIA + 'views/_form_login.js' , 
        MEDIA + 'views/_form_contrasenia.js' ,
        MEDIA + 'routes/router.js'])
    //.pipe(uglify())
    .pipe(plumber())
    .pipe(concatJs('app.min.js'))
    .pipe(gulp.dest(DESTINO))//.pipe(gulp.dest(DESTINO + 'home'))
    .pipe(livereload());
});

gulp.task('libros', function(){
    gulp.start('fonts', 'layout-css', 'layout-js', 'swp-plugins');
    gulp.src([
        DESTINO + 'libs.min.js',  
        DESTINO + 'swp.js',
        MEDIA + 'layouts/app.js',  
        //MEDIA + 'views/libros/_table_libro.js', 
        MEDIA + 'views/libros/_table_autor.js', 
        MEDIA + 'views/libros/_table_categoria.js', 
        //MEDIA + 'views/libros/libro.js',  
        MEDIA + 'views/libros/autor.js', 
        MEDIA + 'views/libros/categoria.js', 
        MEDIA + 'routes/libros.js'
    ])
    //.pipe(uglify())
    .pipe(plumber())
    .pipe(concatJs('libros.min.js'))
    .pipe(gulp.dest(DESTINO))//.pipe(gulp.dest(DESTINO + 'home'))
    .pipe(livereload());

    gulp.src([
        DESTINO + 'styles.min.css', 
        DESTINO + 'swp.css'
    ])
    .pipe(plumber())
    .pipe(concatCss('libros.min.css'))
    .pipe(gulp.dest(DESTINO));
  });

gulp.task('accesos', function(){
    gulp.start('fonts', 'layout-css', 'layout-js', 'swp-plugins');
    gulp.src([
        DESTINO + 'libs.min.js',  
        DESTINO + 'swp.js',
        MEDIA + 'layouts/app.js',  
        MEDIA + 'models/accesos/usuario.js', 
        MEDIA + 'views/accesos/_table_usuario.js', 
        MEDIA + 'views/accesos/_table_sistema.js', 
        MEDIA + 'views/accesos/_table_menu.js', 
        MEDIA + 'views/accesos/_table_rol.js', 
        MEDIA + 'views/accesos/_table_permiso.js', 
        MEDIA + 'views/accesos/_table_usuario_sistema.js', 
        MEDIA + 'views/accesos/_table_log.js', 
        MEDIA + 'views/accesos/sistema.js',
        MEDIA + 'views/accesos/menu.js', 
        MEDIA + 'views/accesos/rol.js', 
        MEDIA + 'views/accesos/permiso.js', 
        MEDIA + 'views/accesos/usuario.js', 
        MEDIA + 'views/accesos/log.js', 
        MEDIA + 'views/accesos/usuario_sistema.js', 
        MEDIA + 'views/accesos/usuario_detalle.js', 
        MEDIA + 'views/accesos/usuario_rol_permiso.js', 
        MEDIA + 'views/accesos/_form_usuario.js', 
        MEDIA + 'routes/accesos.js'
    ])
    //.pipe(uglify())
    .pipe(plumber())
    .pipe(concatJs('accesos.min.js'))
    .pipe(gulp.dest(DESTINO))//.pipe(gulp.dest(DESTINO + 'home'))
    .pipe(livereload());

    gulp.src([
        DESTINO + 'styles.min.css', 
        DESTINO + 'swp.css'
    ])
    .pipe(plumber())
    .pipe(concatCss('accesos.min.css'))
    .pipe(gulp.dest(DESTINO));
  });

gulp.task('agricultores', function(){
    gulp.start('fonts', 'layout-css', 'layout-js', 'swp-plugins');
    gulp.src([
        DESTINO + 'libs.min.js',  
        DESTINO + 'swp.js',
        MEDIA + 'layouts/app.js',  
        MEDIA + 'views/agricultores/_table_responsable.js', 
        MEDIA + 'views/agricultores/responsable.js', 
        MEDIA + 'views/agricultores/_table_asociacion.js', 
        MEDIA + 'views/agricultores/asociacion.js', 
        MEDIA + 'views/agricultores/_table_campo.js', 
        MEDIA + 'views/agricultores/campo.js', 
        MEDIA + 'views/agricultores/_table_estacion.js', 
        MEDIA + 'views/agricultores/estacion.js', 
        MEDIA + 'routes/agricultores.js'
    ])
    //.pipe(uglify())
    .pipe(plumber())
    .pipe(concatJs('agricultores.min.js'))
    .pipe(gulp.dest(DESTINO))//.pipe(gulp.dest(DESTINO + 'home'))
    .pipe(livereload());

    gulp.src([
        DESTINO + 'styles.min.css', 
        DESTINO + 'swp.css'
    ])
    .pipe(plumber())
    .pipe(concatCss('agricultores.min.css'))
    .pipe(gulp.dest(DESTINO));
});

gulp.task('maestros', function(){
    gulp.start('fonts', 'layout-css', 'layout-js', 'swp-plugins');
    gulp.src([
        DESTINO + 'libs.min.js',  
        DESTINO + 'swp.js',
        MEDIA + 'layouts/app.js',  
        MEDIA + 'views/maestros/_form_distritos.js',
        MEDIA + 'views/maestros/_table_departamentos.js', 
        MEDIA + 'views/maestros/_table_provincias.js', 
        MEDIA + 'views/maestros/_table_distritos.js', 
        MEDIA + 'views/maestros/ubicaciones.js', 
        MEDIA + 'views/maestros/_table_extensiones.js', 
        MEDIA + 'views/maestros/extensiones.js', 
        MEDIA + 'views/estaciones/_table_unidad_medida.js', 
        MEDIA + 'views/estaciones/unidad_medida.js', 
        MEDIA + 'views/estaciones/_table_tipo_estacion.js', 
        MEDIA + 'views/estaciones/tipo_estacion.js', 
        MEDIA + 'routes/maestros.js'
    ])
    //.pipe(uglify())
    .pipe(plumber())
    .pipe(concatJs('maestros.min.js'))
    .pipe(gulp.dest(DESTINO))//.pipe(gulp.dest(DESTINO + 'home'))
    .pipe(livereload());

    gulp.src([
        DESTINO + 'styles.min.css', 
        DESTINO + 'swp.css'
    ])
    .pipe(plumber())
    .pipe(concatCss('maestros.min.css'))
    .pipe(gulp.dest(DESTINO));
});

gulp.task('vue', function(){
    gulp.start('fonts', 'layout-css', 'layout-js', 'swp-plugins');

    gulp.src([
        DESTINO + 'swp.css',
        MEDIA + 'css/main.css',
    ])
    .pipe(plumber())
    .pipe(concatCss('accesos.min.css'))
    .pipe(gulp.dest(DESTINO));

    gulp.src([
        DESTINO + 'libs.min.js',  
        DESTINO + 'swp.js',
        MEDIA + 'layouts/app.js',  
        MEDIA + 'bower_components/vue/dist/vue.min.js',
        MEDIA + 'bower_components/vue-router/dist/vue-router.min.js',
        MEDIA + 'models/accesos/usuario.js', 
        MEDIA + 'views/accesos/_table_usuario.js', 
        MEDIA + 'views/accesos/_table_sistema.js', 
        MEDIA + 'views/accesos/_table_menu.js', 
        MEDIA + 'views/accesos/_table_rol.js', 
        MEDIA + 'views/accesos/_table_permiso.js', 
        MEDIA + 'views/accesos/_table_usuario_sistema.js', 
        MEDIA + 'views/accesos/_table_log.js', 
        //MEDIA + 'views/accesos/sistema.js',
        //MEDIA + 'views/accesos/menu.js', 
        //MEDIA + 'views/accesos/rol.js', 
        //MEDIA + 'views/accesos/permiso.js', 
        //MEDIA + 'views/accesos/usuario.js', 
        //MEDIA + 'views/accesos/log.js', 
        //MEDIA + 'views/accesos/usuario_sistema.js', 
        //MEDIA + 'views/accesos/usuario_detalle.js', 
        //MEDIA + 'views/accesos/usuario_rol_permiso.js', 
        //MEDIA + 'views/accesos/_form_usuario.js', 
        MEDIA + 'routes/accesos.js', 
        MEDIA + 'js/index.js'
    ])
    //.pipe(uglify())
    .pipe(plumber())
    .pipe(concatJs('demo.min.js'))
    .pipe(gulp.dest(DESTINO))//.pipe(gulp.dest(DESTINO + 'home'))
    .pipe(livereload());
    /*
    gulp.src([
        DESTINO + 'styles.min.css', 
        DESTINO + 'swp.css'
    ])
    .pipe(plumber())
    .pipe(concatCss('maestros.min.css'))
    .pipe(gulp.dest(DESTINO));
    */
});