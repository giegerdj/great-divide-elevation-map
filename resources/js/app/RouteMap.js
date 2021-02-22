var RouteMap = (function( $ ) {

    var googleMap,
        routePolyline,
        updateCallback,
        FORWARD_DIRECTION = 'forward',
        REVERSE_DIRECTION = 'reverse',
        isReverse = false,
        profileContainerId,
        elevationProfile,
        routeCoordinates = [],
        markers = {
            startMarker: null,
            startMarkerIndex: null,
            endMarker: null,
            endMarkerIndex: null
        },
        snaps = {
            startSnap: null,
            endSnap: null
        };

    var Construct = function( config ) {
        googleMap = config.map;
        profileContainerId = config.profileContainerId;
        updateCallback = config.updateCallback;

        elevationProfile = new ElevationProfile({
            profileContainerId: profileContainerId
        });

    }

    var setRouteData = function( routeData ) {
        // console.log('RouteMap::setRouteData');
        routeCoordinates = [];
        routePolyline = new google.maps.Polyline({
            strokeColor: '#770000',
            strokeWeight: 3,
            strokeOpacity: 1.0
        });

        var totalDistance = 0,
            totalReverseDistance = 0;

        var profileData = {
            forward: [],
            reverse: []
        }

        for(var i=0; i < routeData.length; i++) {
            var reverseIndex = (routeData.length - i - 1);
            totalReverseDistance += ( (i == 0) ? 0 : routeData[reverseIndex + 1].d);
            totalDistance += routeData[i].d;

            routeData[i].totalDistance = Distance.fromMeters(totalDistance).toMiles();
            routeCoordinates.push(
                new google.maps.LatLng(
                    routeData[i].c[0],
                    routeData[i].c[1]
                )
            );

            profileData.forward.push({
                distance: Distance.fromMeters(totalDistance).toMiles(),
                elevation: Distance.fromMeters(routeData[i].e).toFeet()
            });

            profileData.reverse.push({
                distance: Distance.fromMeters(totalReverseDistance).toMiles(),
                elevation: Distance.fromMeters(routeData[reverseIndex].e).toFeet()
            });
        }

        routePolyline.setPath(routeCoordinates);
        routePolyline.setMap(googleMap);

        elevationProfile.setData(profileData);

        setTimeout(function(){
            _placeMarkers();
            _filterProfile();
            updateCallback(self.RouteMap.prototype);
        }, 200);
    }

    var _placeMarkers = function() {
        // console.log('RouteMap::_placeMarkers');
        markers.startMarkerIndex = 0;
        markers.startMarker = new google.maps.Marker({
            position: routeCoordinates[0],
            draggable: true,
            icon: new google.maps.MarkerImage('https://www.google.com/mapfiles/markerA.png')
        });

        markers.endMarkerIndex = routeCoordinates.length - 1;
        markers.endMarker = new google.maps.Marker({
            position: routeCoordinates[routeCoordinates.length - 1],
            draggable: true,
            icon: new google.maps.MarkerImage('https://www.google.com/mapfiles/markerB.png')
        });

        markers.endMarker.setMap(googleMap);
        snaps.endSnap = new SnapToRoute(googleMap, markers.endMarker, routePolyline);

        markers.startMarker.setMap(googleMap);
        snaps.startSnap = new SnapToRoute(googleMap, markers.startMarker, routePolyline);

        google.maps.event.addListener(markers.startMarker, 'dragend', function(e){
            _dragEnd('A', false);
        });

        google.maps.event.addListener(markers.endMarker, 'dragend', function(e){
            _dragEnd('B', false);
        });

    }

    var setDirection = function(direction) {
        // console.log('RouteMap::setDirection');

        if(!( (direction == FORWARD_DIRECTION && markers.startMarkerIndex > markers.endMarkerIndex) ||
            (direction == REVERSE_DIRECTION && markers.startMarkerIndex < markers.endMarkerIndex)  )) {
            //the markers are already set in the specified direction
            return;
        }
        var startIndex = markers.startMarkerIndex,
            endIndex = markers.endMarkerIndex;

        _setMarkerPosition('A', endIndex);
        _setMarkerPosition('B', startIndex);

        _setIsReverse( (markers.startMarkerIndex > markers.endMarkerIndex) );

        elevationProfile.filterProfile(markers.startMarkerIndex, markers.endMarkerIndex )

        updateCallback(self.RouteMap.prototype);
    }

    var _setIsReverse = function(bool) {
        isReverse = bool;
    }

    var assertIsReverse = function() {
        return isReverse;
    }

    var _dragEnd = function(pos, triggerGoogleAnalytics) {
        // console.log('_dragEnd');

        triggerGoogleAnalytics = (typeof triggerGoogleAnalytics === 'undefined') ? true : triggerGoogleAnalytics;

        if(pos == 'A') {
            _setMarkerPosition('A', snaps.startSnap.getClosestVertexIndex());
        } else {
            _setMarkerPosition('B', snaps.endSnap.getClosestVertexIndex());
        }

        if(markers.startMarkerIndex == markers.endMarkerIndex) {
            alert('No distance selected.  Spread out the markers.');
            return;
        }

        if(typeof ga === 'function' && triggerGoogleAnalytics) {
            ga('send', 'event', 'Map', 'Drag Marker');
        }

        _filterProfile(markers.startMarkerIndex, markers.endMarkerIndex)

        //trigger callback
        updateCallback(self.RouteMap.prototype);
    }

    var _filterProfile = function(startIndex, endIndex) {

        startIndex = startIndex || markers.startMarkerIndex;
        endIndex = endIndex || markers.endMarkerIndex;

        _setIsReverse( (startIndex > endIndex) );

        //update elevation profile
        elevationProfile.filterProfile(startIndex, endIndex );
    }

    var getSegmentStats = function() {
        return elevationProfile.getSegmentStats();
    }

    var _setMarkerPosition = function(pos, index) {
        if(pos == 'A') {
            markers.startMarker.setPosition(routeCoordinates[index]);
            markers.startMarkerIndex = index;
        } else {
            markers.endMarker.setPosition(routeCoordinates[index]);
            markers.endMarkerIndex = index;
        }
    }

    var reset = function() {
        // console.log('RouteMap::reset');
        if(markers.startMarker) {
            markers.startMarker.setMap(null);
        }

        if(markers.endMarker) {
            markers.endMarker.setMap(null);
        }

        if(routePolyline) {
            routePolyline.setMap(null);
            routePolyline = null;
        }

    }

    var resizeElevationProfile = function(){
        elevationProfile.resizeElevationProfile();
    }

    Construct.prototype = {
        constructor: RouteMap,
        reset: reset,
        setDirection: setDirection,
        setRouteData: setRouteData,
        assertIsReverse: assertIsReverse,
        getSegmentStats: getSegmentStats,
        resizeElevationProfile: resizeElevationProfile,
        FORWARD_DIRECTION: FORWARD_DIRECTION,
        REVERSE_DIRECTION: REVERSE_DIRECTION
    };

    return Construct;

})( jQuery );
