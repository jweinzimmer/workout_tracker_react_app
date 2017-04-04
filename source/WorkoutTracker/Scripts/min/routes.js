(function (views, util, route_handlers) {

    util.register_route('/create_workout', function () {
        route_handlers.create_workout_route_handler.run();
    });
    
    util.register_route('/select_workout', function () {
        route_handlers.select_workout_route_handler.run();
    });
    
    //util.register_route('/create_workout', function () {
    //    ReactDOM.render(React.createElement(views.create_workout), document.getElementById('content'));
    //});
    
    //util.register_route('/create_workout', function () {
    //    ReactDOM.render(React.createElement(views.create_workout), document.getElementById('content'));
    //});
    
    //util.register_route('/create_workout', function () {
    //    ReactDOM.render(React.createElement(views.create_workout), document.getElementById('content'));
    //});

})(app.views, app.util, app.route_handlers);