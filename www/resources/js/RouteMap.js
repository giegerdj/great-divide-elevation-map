
function RouteMap( config ) {
    this.metadata = config.metadata;
    this.map = config.map;

    this.route_coordinates = [];

    this.route = null;
    this.start_marker = null;
    this.end_marker = null;
    this.start_snap = null;
    this.end_snap = null;

    this.init();
}

RouteMap.prototype.init = function() {

    this.route = new google.maps.Polyline({
        strokeColor: '#770000',
        strokeWeight: 3,
        strokeOpacity: 1.0
    });

    for(var i=0; i < this.metadata.length; i++) {
        this.route_coordinates.push(
            new google.maps.LatLng(
                this.metadata[i].c[0],
                this.metadata[i].c[1]
            )
        );
    }
    this.route.setPath(this.route_coordinates);
    this.route.setMap(this.map);

    this.placeMarkers();
};

RouteMap.prototype.placeMarkers = function() {

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

    //might need to put a setTimeout here
    this.finalizeMap()

};

RouteMap.prototype.finalizeMap = function() {
    var me = this;
    this.start_marker.setMap(this.map);
    this.end_marker.setMap(this.map);

    this.start_snap = new SnapToRoute(this.map, this.start_marker, this.route);
    this.end_snap = new SnapToRoute(this.map, this.end_marker, this.route);

    google.maps.event.addListener(this.end_marker, "dragend", function(e){
        me.dragEnd();
    });

    google.maps.event.addListener(this.start_marker, "dragend", function(e){
        me.dragEnd();
    });

}

RouteMap.prototype.dragEnd = function() {

};

RouteMap.prototype.getStartMile = function() {
    return this.start_snap.getDistAlongRoute();
};

RouteMap.prototype.getEndMile = function() {
    return this.end_snap.getDistAlongRoute();
};