(function(util){

    util.ViewComposition = {
        create_view: function create_view() {
            return React.createElement.apply(React, arguments);
        },

        //create_composite_view: function create_composite_view(details) {
        //    var args = core_utils.args_array(arguments);
        //    args.unshift({});
        //    args.unshift("div");

        //    return React.createElement.apply(React, args);
        //}
    };

    util.post = function(url, data, success) {
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.onload = function() {
            var result = JSON.parse(request.responseText);
            if (success != null)
                success(result);
        }
        request.send(JSON.stringify(data));
    };

    util.get = function(url, success) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.onload = function() {
            var result = JSON.parse(request.responseText);
            if (success != null)
                success(result);
        };
        request.send();
    };

    util.reload = function() {
        location.reload();
    };
    util.register_route = function(route, action) {
        crossroads.addRoute(route, action);
    };

    util.is_empty = function(obj) {
        if (obj == null) return true;
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    };

    util.event_fire = function(el, etype) {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    };

    util.datepicker = React.createClass({

        propTypes: {
            value: React.PropTypes.instanceOf(Date),
            onChange: React.PropTypes.func,

            valueLink: React.PropTypes.shape({
                value: React.PropTypes.instanceOf(Date),
                requestChange: React.PropTypes.func.isRequired
            })
        },

        getValueLink: function(props) {
            return props.valueLink || {
                value: props.value,
                requestChange: props.onChange
            };
        },

        setDateIfChanged: function(newDate, prevDate) {
            var newTime = newDate ? newDate.getTime() : null;
            var prevTime = prevDate ? prevDate.getTime() : null;

            if ( newTime !== prevTime ) {
                if ( newDate === null ) {
                    // Workaround for pikaday not clearing value when date set to falsey
                    this.refs.pikaday.getDOMNode().value = '';
                }
                this._picker.setDate(newDate, true);  // 2nd param = don't call onSelect
            }
        },
        valid_prop:function(prop){
            if(prop == null){
                return false;
            }
            return true;
        },
        componentDidMount: function() {
            var el = this.refs.pikaday.getDOMNode();
            this._picker = new Pikaday({
                field: el,
                onSelect: this.getValueLink(this.props).requestChange,
                minDate: this.valid_prop(this.props.minDate) ? this.props.minDate.toDate() : null,
                defaultDate: this.props.value ? this.props.value.toDate() : null,
                setDefaultDate: true,
                format: 'MM/DD/YYYY',
            });

            //this.setDateIfChanged(this.getValueLink(this.props).value);
        },

        componentWillReceiveProps: function(nextProps) {
            var newDate = this.valid_prop(this.getValueLink(nextProps).value) ? this.getValueLink(nextProps).value.toDate() : null;
            var lastDate = this.valid_prop(this.getValueLink(this.props).value) ? this.getValueLink(this.props).value.toDate() : null;;
            this.setDateIfChanged(newDate, lastDate);
        },

        render: function() {
            return (
              <input type="text" ref="pikaday" className={this.props.className}
	        placeholder={this.props.placeholder} disabled={this.props.disabled} />
	    );
}
});

util.Checkbox = React.createClass({
    propTypes: {
        value 	    : React.PropTypes.string.isRequired,
        is_checked  : React.PropTypes.oneOf([true, false]),
        is_disabled : React.PropTypes.oneOf([true, false]),
        label        : React.PropTypes.string.isRequired
    },
    getInitialState: function(){
        return {
            is_checked: this.props.is_checked, 
            disabled: this.props.is_disabled
        };
    },
    on_change: function(event){
        this.setState({
            is_checked: !this.state.is_checked
        });
        if (this.props.onChange){       
            this.props.onChange(this.state.is_checked);
        }
    },
    render: function() {
        return (
          <p>
              <input type="checkbox" className="filled-in" 
                id="filled-in-box"
                checked={this.state.is_checked}
              onChange={this.on_change}
              />
            <label htmlFor="filled-in-box">{this.props.label}</label>
        </p>
		    );
},
});
})(app.util);