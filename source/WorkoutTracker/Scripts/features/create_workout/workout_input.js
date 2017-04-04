(function(views, util) {
    views.create_workout = React.createClass({
        render: function() {
        	var workouts = [];
        	workouts.push(<div>
					<div className="form-group row">
					  <label htmlFor="example-date-input" className="col-sm-2 col-form-label">Sets:</label>
					  <div className="col-sm-4">
					    <input className="form-control" type="text" value="5" id="example-text-input"/>
					  </div>
  					  <label htmlFor="example-date-input" className="col-sm-2 col-form-label">Reps:</label>
					  <div className="col-sm-4">
					    <input className="form-control" type="text" value="5" id="example-text-input"/>
					  </div>
					</div>
        	</div>)
            return (
              <div className="row">
              	<div>
              		<h2>Create Customized Plan</h2>
              		<div className="form-group row">
					  <label htmlFor="example-text-input" className="col-2 col-form-label">Plan Name</label>
					  <div className="col-10">
					    <input className="form-control" type="text" value="The Dwayne" id="example-text-input"/>
					  </div>
					</div>
					<div className="form-group row">
					  <label htmlFor="example-search-input" className="col-2 col-form-label">Plan Type</label>
					  <div className="col-10">
					    <input className="form-control" type="search" value="Mass Building" id="example-search-input"/>
					  </div>
					</div>
					<div className="form-group row">
					  <label htmlFor="example-date-input" className="col-2 col-form-label">From Date</label>
					  <div className="col-10">
					    <input className="form-control" type="date" value="2011-08-19" id="example-date-input"/>
					  </div>
					</div>
					<div className="form-group row">
					  <label htmlFor="example-date-input" className="col-2 col-form-label">To Date</label>
					  <div className="col-10">
					    <input className="form-control" type="date" value="2011-08-19" id="example-date-input"/>
					  </div>
					</div>
					<div className="form-group row">
					  <label htmlFor="example-color-input" className="col-2 col-form-label">Color</label>
					  <div className="col-10">
					    <input className="form-control" type="color" value="#563d7c" id="example-color-input"/>
					  </div>
					</div>
            		
              	</div>
              	{workouts}
              	<button type="button" className="btn btn-link btn-default" onClick="">Add Set</button>
              </div>
          );
        }
    });
}(app.views, app.util));