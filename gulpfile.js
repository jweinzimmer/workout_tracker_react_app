var gulp = require('gulp'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	handlebars = require('handlebars'),
	browserSync = require('browser-sync'),
	shell = require('gulp-shell'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload');
	var exec = require('child_process').execSync;
	var runSequence = require('run-sequence');

gulp.task('default', function(){
});

function handleError(err) {
  gutil.log(err.toString());
  gutil.beep();
  this.emit('end');
}

function execute(command){
	var child = exec(command, {stdio:[0,1,2]});
}

function execute_callback(error, stdout, stderr) {
	gutil.log(stdout);
	gutil.log(stderr);
	if (error !== null) {
	  gutil.log('exec error: ' + error);
	  process.exit(1);
	}
}

function configuration_step(template_path, write_path){
	var argv = require('yargs').argv;
	var environment = argv.env;
	var fs = require('fs');
	var config = require('./settings/' + environment + '.settings');
	fs.readFile(template_path, function(err, data){
	  if (!err) {
        var template = handlebars.compile(data.toString());
	    var output = template(config);
		fs.writeFile(write_path, output, function(err) {
		  if(err) {
		      return gutil.log(err);
		  }		 
 		}); 
	  } else {
	    return gutil.log(err);
	  }
	});
}

gulp.task('minify', function () {
	var scripts_folder = 'source/WorkoutTracker/Scripts/';

    gulp.src(scripts_folder + 'vendor/*.js')
		.pipe(concat('vendor.js'))
		.pipe(uglify())
        .pipe(gulp.dest(scripts_folder));

    return gulp.src([scripts_folder + 'min/app.js',
			  scripts_folder + 'min/app.util.js',
			  scripts_folder + 'min/app.enum.js',
			  scripts_folder + 'features/create_workout/*.js',
			  scripts_folder + 'features/select_workout/*.js',
			  scripts_folder + 'features/*.js',
			  scripts_folder + 'min/routes.js',
			  scripts_folder + 'min/init.js',
			  scripts_folder + 'min/*.js',
			  ])
        .pipe(babel().on('error', handleError))
		.pipe(concat('all.js'))
		.pipe(uglify())
        .pipe(gulp.dest(scripts_folder));

});


gulp.task('build', function(){
	execute(
		'(C:\\WINDOWS\\Microsoft.NET\\Framework\\v4.0.30319\\msbuild source\\WorkoutTracker\\WorkoutTracker.csproj /p:Configuration=Release /p:outdir="../staged" /t:Rebuild) ^& IF %ERRORLEVEL% NEQ 0 exit %ERRORLEVEL%'
	);
});

gulp.task('buildexe', function(){
	execute(
		'(C:\\WINDOWS\\Microsoft.NET\\Framework\\v4.0.30319\\msbuild source\\WorkoutTracker.Notifications\\WorkoutTracker.Notifications.csproj /p:Configuration=Release /p:outdir="../stagedexe" /t:Rebuild) ^& IF %ERRORLEVEL% NEQ 0 exit %ERRORLEVEL%'
	);
});

gulp.task('buildapi', function(){
	execute(
		'(C:\\WINDOWS\\Microsoft.NET\\Framework\\v4.0.30319\\msbuild source\\WorkoutTracker.WebApi\\WorkoutTracker.WebApi.csproj /p:Configuration=Release /p:outdir="../stagedapi" /t:Rebuild) ^& IF %ERRORLEVEL% NEQ 0 exit %ERRORLEVEL%'
	);
});


gulp.task('configuration', function(cb){
	configuration_step('./settings/config.template',
		"source/WorkoutTracker/web.config");
	return cb(null);
});

gulp.task('configurationexe', function(cb){
	configuration_step('./settings/appconfig.template',
		"source/WorkoutTracker.Notifications/App.config");
	return cb(null);
});

gulp.task('configurationapi', function(cb){
	configuration_step('./settings/apiconfig.template',
		"source/WorkoutTracker.WebApi/web.config");
	return cb(null);
});

function push_files(source, destination){

}

gulp.task('push', function(cb){
	var argv = require('yargs').argv;
	var environment = argv.env;
	var config = require('./settings/' + environment + '.settings');
	gutil.log(config.deploy_to.path);
    execute(
		'(robocopy ' + 'source\\staged\\_PublishedWebsites\\WorkoutTracker' + ' \\' + config.deploy_to.path + ' /E /ZB /IS /COPYALL /PURGE /v /W:5 /sec /MT /xf *.cs *.csproj* *.pdb) ^& IF %ERRORLEVEL% LEQ 1 exit 0' 
	);
	cb(null);
});

gulp.task('pushexe', function(cb){
	var argv = require('yargs').argv;
	var environment = argv.env;
	var config = require('./settings/' + environment + '.settings');
	gutil.log(config.deploy_to.notifications_path);
    execute(
		'(robocopy ' + 'source\\stagedexe' + ' \\' + config.deploy_to.notifications_path + ' /E /ZB /IS /COPYALL /PURGE /v /W:5 /sec /MT /xf *.cs *.csproj* *.pdb) ^& IF %ERRORLEVEL% LEQ 1 exit 0' 
	);
	cb(null);
});

gulp.task('pushapi', function(cb){
	var argv = require('yargs').argv;
	var environment = argv.env;
	var config = require('./settings/' + environment + '.settings');
	gutil.log(config.deploy_to.api_path);
    execute(
		'(robocopy ' + 'source\\stagedapi\\_PublishedWebsites\\WorkoutTracker.WebApi' + ' \\' + config.deploy_to.api_path + ' /E /ZB /IS /COPYALL /PURGE /v /W:5 /sec /MT /xf *.cs *.csproj* *.pdb) ^& IF %ERRORLEVEL% LEQ 1 exit 0' 
	);
	cb(null);
});

gulp.task('deploy', ['minify', 'configuration'], function(done){
    runSequence('build', 'push', done);
});

gulp.task('deployexe', ['minify', 'configurationexe'], function(done){
	runSequence('buildexe', 'pushexe', done);
});

gulp.task('deployapi', ['minify', 'configurationapi'], function(done){
	runSequence('buildapi', 'pushapi', done);
});


gulp.task('watch', ['minify'], function(){
	gulp.watch('source/WorkoutTracker/Scripts/min/*.js', ['minify']);
	gulp.watch('source/WorkoutTracker/Scripts/features/**/*.js', ['minify']);
});
