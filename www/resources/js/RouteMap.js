
function RouteMap( config ) {
    this.metadata = config.metadata;
    this.map = config.map;
    this.profile = {};
    this.profile.container = d3.select(config.elevation_profile_container_id);

    this.route_coordinates = [];
    this.profile.data = [];

    this.route = null;
    this.start_marker = null;
    this.end_marker = null;
    this.start_snap = null;
    this.end_snap = null;

    this.FEET_PER_METER = 3.28084,
    this.METERS_PER_MILE = 1609.34;

    this.init();
}

RouteMap.prototype.init = function() {

    this.route = new google.maps.Polyline({
        strokeColor: '#770000',
        strokeWeight: 3,
        strokeOpacity: 1.0
    });
    var total_distance = 0;

    for(var i=0; i < this.metadata.length; i++) {
        total_distance += this.metadata[i].d;
        this.metadata[i].total_distance = total_distance / this.METERS_PER_MILE;

        this.route_coordinates.push(
            new google.maps.LatLng(
                this.metadata[i].c[0],
                this.metadata[i].c[1]
            )
        );

        this.profile.data.push({
            distance: total_distance / this.METERS_PER_MILE,
            elevation: this.metadata[i].e * this.FEET_PER_METER
        });
    }

    this.route.setPath(this.route_coordinates);
    this.route.setMap(this.map);

    var me = this;

    //Why does this.*_marker.getClosestVertexIndex() return 0 if this delay is removed or shortened???

    setTimeout(function(){
        me.placeMarkers();
        me.createElevationProfile();
    },200);

};

RouteMap.prototype.placeMarkers = function() {
    var me = this;

    this.start_marker = new google.maps.Marker({
        position: this.route.getVertex(0),
        draggable: true,
        icon: new google.maps.MarkerImage('https://www.google.com/mapfiles/markerA.png')
    });

    this.end_marker = new google.maps.Marker({
        position: this.route.getVertex( this.route.getVertexCount()-1 ),
        draggable: true,
        icon: new google.maps.MarkerImage('https://www.google.com/mapfiles/markerB.png')
    });

    this.end_marker.setMap(this.map);
    this.end_snap = new SnapToRoute(this.map, this.end_marker, this.route);

    this.start_marker.setMap(this.map);
    this.start_snap = new SnapToRoute(this.map, this.start_marker, this.route);

    google.maps.event.addListener(this.start_marker, "dragend", function(e){
        me.dragEnd();
    });

    google.maps.event.addListener(this.end_marker, "dragend", function(e){
        me.dragEnd();
    });
};

RouteMap.prototype.createElevationProfile = function() {
    var me = this;

    this.profile.margin = {top: 20, right: 50, bottom: 15, left: 50};

    var id = '#' + this.profile.container.attr('id');
    var profile_parent = jQuery(id).parent();
    profile_parent.css('visibility', 'hidden').css('display','block');

    this.profile.width = parseInt(this.profile.container.style("width")) - this.profile.margin.left - this.profile.margin.right;
    this.profile.height = parseInt(this.profile.container.style("height")) - this.profile.margin.top - this.profile.margin.bottom;

    profile_parent.css('visibility', '').css('display','');

    //
    //start axes
    //
    this.profile.x = d3.scale.linear()
        .range([0, this.profile.width]);

    this.profile.xRelative = d3.scale.linear()
        .range([0, this.profile.width]);

    this.profile.y = d3.scale.linear()
        .range([this.profile.height, 0]);

    this.profile.xAxisTop = d3.svg.axis()
        .scale(this.profile.x)
        .orient("top");

    this.profile.xAxisBottom = d3.svg.axis()
        .scale(this.profile.xRelative)
        .orient("bottom")
        .tickSize(-1*this.profile.height);

    this.profile.yAxisRight = d3.svg.axis()
        .scale(this.profile.y)
        .orient("right");

    this.profile.yAxisLeft = d3.svg.axis()
        .scale(this.profile.y)
        .orient("left")
        .tickSize(-1*this.profile.width);
    //
    // End axes
    //
    this.profile.area = d3.svg.area()
        .x(function(d) { return me.profile.x(d.distance); })
        .y0(this.profile.height)
        .y1(function(d) { return me.profile.y(d.elevation); });

    this.profile.svg = this.profile.container
            .attr("width", this.profile.width + this.profile.margin.left + this.profile.margin.right)
            .attr("height", this.profile.height + this.profile.margin.top + this.profile.margin.bottom)
        .append("g")
            .attr("transform", "translate(" + this.profile.margin.left + "," + this.profile.margin.top + ")");


    this.profile.svg.append("defs").append("clipPath")
            .attr("id", "clip")
        .append("rect")
            .attr("id", "clip-rect")
            .attr("width", this.profile.width)
            .attr("height", this.profile.height);


    var min_elevation = d3.min(this.profile.data, function(d) {
        return d.elevation;
    });
    var max_elevation = d3.max(this.profile.data, function(d) {
        return d.elevation;
    });

    var dist_extent = d3.extent(this.profile.data, function(d) { return d.distance; });

    this.profile.x.domain(dist_extent);
    this.profile.xRelative.domain(dist_extent);

    this.profile.y.domain([
        Math.floor(min_elevation/1000)*1000,
        Math.ceil(max_elevation/1000)*1000
    ]);

    this.profile.svg.append("g")
        .attr("class", "x axis top")
        .call(this.profile.xAxisTop);

    this.profile.svg.append("g")
        .attr("class", "x axis bottom")
        .attr("transform", "translate(0," + this.profile.height + ")")
        .call(this.profile.xAxisBottom);

    this.profile.svg.append("g")
        .attr("transform", "translate(" + this.profile.x( this.profile.x.domain()[0] ) + ",0)")
        .attr("class", "y axis left")
        .call(this.profile.yAxisLeft);


    this.profile.svg.append("g")
        .attr("transform", "translate(" + this.profile.x( this.profile.x.domain()[1] ) + ",0)")
        .attr("class", "y axis right")
        .call(this.profile.yAxisRight);

    this.profile.svg.append("path")
        .datum(this.profile.data)
        .attr("class", "area")
        .attr("d", this.profile.area);

    me = this;
    jQuery(window).on("resize", function(){
        me.debounce(me.resizeElevationProfile(),500);
    });
};

RouteMap.prototype.resizeElevationProfile = function(){

    var id = '#' + this.profile.container.attr('id');
    var profile_parent = jQuery(id).parent();
    profile_parent.css('visibility', 'hidden').css('display','block');

    this.profile.width = parseInt(this.profile.container.style("width")) - this.profile.margin.left - this.profile.margin.right;
    this.profile.height = parseInt(this.profile.container.style("height")) - this.profile.margin.top - this.profile.margin.bottom;

    profile_parent.css('visibility', '').css('display','');

    this.profile.x.range([0, this.profile.width]);
    this.profile.xRelative.range([0,this.profile.width]);

    this.profile.y.range([this.profile.height, 0])

    this.profile.xAxisTop.ticks(Math.max(this.profile.width/50, 2));
    this.profile.xAxisBottom.ticks(Math.max(this.profile.width/50, 2));

    this.profile.svg.selectAll("g .x.axis.top")
        .call(this.profile.xAxisTop);

    this.profile.svg.selectAll("g .x.axis.bottom")
        .call(this.profile.xAxisBottom.tickSize(-1*this.profile.height));

    this.profile.svg.select(".y.axis.right")
        .attr("transform", "translate(" + this.profile.x( this.profile.x.domain()[1] ) + ",0)")
        .call(this.profile.yAxisRight);

    this.profile.svg.select(".y.axis.left")
        .call(this.profile.yAxisLeft.tickSize(-1*this.profile.width));

    /* Force D3 to recalculate and update the line */
    this.profile.svg.select('.area')
        .attr("d", this.profile.area);

    this.profile.svg.select("#clip-rect")
        .attr("width", this.profile.width)
        .attr("height", this.profile.height);
};

RouteMap.prototype.dragEnd = function() {
    var me = this;

    var start_index = this.start_snap.getClosestVertexIndex(),
        end_index = this.end_snap.getClosestVertexIndex();

    var start_mile = this.profile.data[start_index].distance,
        end_mile = this.profile.data[end_index].distance;

    this.profile.x.domain([start_mile,end_mile]);
    this.profile.xRelative.domain([0, end_mile-start_mile]);

    var filtered_data = this.profile.data.filter(function(d, i) {
        if ( (d.distance >= me.profile.x.domain()[0]) && (d.distance <= me.profile.x.domain()[1]) ) {
            return d.elevation;
        }
    });

    var min_elevation = d3.min(filtered_data, function(d) {
        return d.elevation;
    });
    var max_elevation = d3.max(filtered_data, function(d) {
        return d.elevation;
    });

    this.profile.y.domain([
            Math.floor(min_elevation/1000)*1000,
            Math.ceil(max_elevation/1000)*1000]
    );

    this.profile.svg.select(".area").attr("d", this.profile.area);

    this.profile.svg.selectAll("g .x.axis.top").call(this.profile.xAxisTop);
    this.profile.svg.selectAll("g .x.axis.bottom").call(this.profile.xAxisBottom.tickSize(-1*this.profile.height));
    this.profile.svg.select(".y.axis.right").call(this.profile.yAxisRight);
    this.profile.svg.select(".y.axis.left").call(this.profile.yAxisLeft);

};

RouteMap.prototype.getStartMile = function() {
    return this.start_snap.getDistAlongRoute();
};

RouteMap.prototype.getEndMile = function() {
    return this.end_snap.getDistAlongRoute();
};

RouteMap.prototype.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}