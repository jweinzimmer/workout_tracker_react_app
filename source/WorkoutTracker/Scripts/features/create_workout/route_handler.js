(function (route_handlers, util, views) {
    route_handlers.create_workout_route_handler = {
        run: function () {
            this.properties = {
                header: "Create Workout"
            };
            var view = this.create_view(views.create_workout, { data: this.properties });
            ReactDOM.render(view, document.getElementById('content'));
        }
    }.extend(util.ViewComposition);
}(app.route_handlers, app.util, app.views));