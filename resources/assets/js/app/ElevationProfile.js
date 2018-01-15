var ElevationProfile = (function( $ ) {

    var profile = {
        elementId: null,
        data: {
            forward: [],
            reverse: [],
        },
        mouseLine: null,
        container: null,
        margin: {
            top: 20,
            right: 50,
            bottom: 15,
            left: 50
        },
        width: 0,
        height: 0,
        x: null,
        y: null,
        xRelative: null,
        xAxisTop: null,
        xAxisBottom: null,
        yAxisRight: null,
        yAxisLeft: null,
        area: null,
        svg: null
    };
    var segmentStats = {};

    var GRADE_LIMIT = .010;

    var Construct = function( config ) {
        // console.log('ElevationProfile::Construct');
        profile.elementId = config.profileContainerId;
        profile.container = d3.select(config.profileContainerId);
        var id = '#' + profile.container.attr('id');

        profile.parent = $(id).parent();
    }

    var setData = function(data) {
        // console.log('ElevationProfile::setData')
        profile.data = {
            forward: data.forward,
            reverse: data.reverse
        }
        profile.meta = {
            totalDistance: data.forward[ data.forward.length-1 ].distance
        }

        _setupChart();
    }

    //other stuff
    var _setupChart = function(){
        // console.log('ElevationProfile::_setupChart')

        //reset chart
        d3.selectAll('svg > *').remove();

        var dimensions = _getProfileDimensions();

        profile.width = dimensions.width;
        profile.height = dimensions.height;

        //
        //start axes
        //
        profile.x = d3.scale.linear()
            .domain([0, profile.meta.totalDistance])
            .range([0, profile.width]);

        profile.xRelative = d3.scale.linear()
            .domain([0, profile.meta.totalDistance])
            .range([0, profile.width]);


        var minElevation = _minElevation(profile.data.forward);
        var maxElevation = _maxElevation(profile.data.forward);

        profile.y = d3.scale.linear()
            .domain([
                Math.floor(minElevation/1000)*1000,
                Math.ceil(maxElevation/1000)*1000
            ])
            .range([profile.height, 0]);

        profile.xAxisTop = d3.svg.axis()
            .scale(profile.x)
            .ticks(Math.max(profile.width / 50, 2)) //
            .orient('top');


        profile.xAxisBottom = d3.svg.axis()
            .scale(profile.xRelative)
            .orient('bottom')
            .tickSize(-1 * profile.height)
            .ticks(Math.max(profile.width / 50, 2));

        profile.yAxisRight = d3.svg.axis()
            .scale(profile.y)
            .orient('right');

        profile.yAxisLeft = d3.svg.axis()
            .scale(profile.y)
            .orient('left')
            .tickSize(-1 * profile.width);

        //
        // End axes
        //

        profile.area = d3.svg.area()
            .x(function(d) {
                return profile.x(d.distance);
            })
            .y0(profile.height)
            .y1(function(d) {
                return profile.y(d.elevation);
            });


        profile.svg = profile.container
                .attr('width', profile.width + profile.margin.left + profile.margin.right)
                .attr('height', profile.height + profile.margin.top + profile.margin.bottom)
            .append('g')
                .attr('transform', 'translate(' + profile.margin.left + ',' + profile.margin.top + ')');

        profile.svg.append('defs')
            .append('clipPath')
                .attr('id', 'clip')
            .append('rect')
                .attr('id', 'clip-rect')
                .attr('width', profile.width)
                .attr('height', profile.height);

        profile.svg.append('g')
            .attr('class', 'x axis top')
            .call(profile.xAxisTop);

        profile.svg.append('g')
            .attr('class', 'x axis bottom')
            .attr('transform', 'translate(0,' + profile.height + ')')
            .call(profile.xAxisBottom);

        profile.svg.append('g')
            .attr('transform', 'translate(' + profile.x( profile.x.domain()[0] ) + ',0)')
            .attr('class', 'y axis left')
            .call(profile.yAxisLeft);

        profile.svg.append('g')
            .attr('transform', 'translate(' + profile.x( profile.x.domain()[1] ) + ',0)')
            .attr('class', 'y axis right')
            .call(profile.yAxisRight);

        profile.svg.append('path')
            .datum(profile.data.forward)
            .attr('class', 'area')
            .attr('d', profile.area);

        profile.mouseLine = profile.svg.append("g")
            .attr("class", "mouse-over-effects");

        profile.mouseLine.append("path") // this is the black vertical line to follow mouse
            .attr("class", "mouse-bar")
            .style("stroke", "black")
            .style("stroke-width", "0.5px")
            .style("opacity", "0");

        profile.infoBox = profile.svg.append('g')
            .style("opacity", "0")
            .attr('id', 'info-box');

        profile.infoBox.append("rect")
            .attr('y', '20');


        profile.infoBox.append('text')
            .attr('id', 'distance-text')
            .attr('x', '10')
            .attr('y', '40')

        profile.infoBox.append('text')
            .attr('id', 'elevation-text')
            .attr('x', '10')
            .attr('y', '60');
        /*
        profile.mouseLine.append('svg:rect') // append a rect to catch mouse movements on canvas
            .attr('width', profile.width)    // can't catch mouse events on a g element
            .attr('height', profile.height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .attr('id', 'mouse-event-rect')
            .on('mouseout', function() { // on mouse out hide line, circles and text
                d3.select(".mouse-bar")
                    .style("opacity", "0");

                profile.infoBox.style('opacity', '0');
            })
            .on('mouseover', function() { // on mouse in show line, circles and text
                d3.select(".mouse-bar")
                    .style("opacity", "1");

                profile.infoBox.style('opacity', '1');
            })
            .on('mousemove', function() { // mouse moving over canvas
                var mouse = d3.mouse(this);
                d3.select(".mouse-bar")
                    .attr("d", function() {
                        var d = "M" + mouse[0] + "," + profile.height;
                        d += " " + mouse[0] + "," + 0;
                        return d;
                    })
                profile.infoBox.attr("transform", function(d, i) {
                    // console.log(mouse, profile.width / mouse[0]);
                    var routeMile = profile.x.invert(mouse[0]);
                    // console.log(routeMile);
                    var tmp = d3.select('path.area');
                    var beginning = 0,
                        end = tmp.node().getTotalLength(),
                        target = null;

                    while (true){
                        target = Math.floor((beginning + end) / 2);
                        pos = tmp.node().getPointAtLength(target);
                        if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                            break;
                        }
                        if (pos.x > mouse[0])      end = target;
                        else if (pos.x < mouse[0]) beginning = target;
                        else break; //position found
                    }

                    d3.select('#distance-text').text(profile.y.invert(pos.y).toFixed(2));
                    d3.select('#elevation-text').text(profile.x.invert(pos.x));

                    return "translate(" + (mouse[0] + 10) + ", 0)";
                });


            });
        */
        //TODO: figure out debounce issues
        window.addEventListener('resize', resizeElevationProfile);

    }

    var filterProfile = function(startIndex, endIndex){
        // console.log('ElevationProfile::filterProfile')
        var isForward = (startIndex < endIndex);

        var filteredData,
            stats = {
                startMile: 0,
                endMile: 0,
                startElevationFeet: 0,
                endElevationFeet: 0,
                elevationGainFeet: 0,
                elevationLossFeet: 0,
            };

        var startMile = 0,
            endMile = 0,
            startElevation = 0,
            endElevation = 0;

        if(isForward) {
            //forward
            startMile = profile.data.forward[startIndex].distance;
            endMile = profile.data.forward[endIndex].distance;

            startElevation = profile.data.forward[startIndex].elevation;
            endElevation = profile.data.forward[endIndex].elevation;

            filteredData = profile.data.forward.slice(startIndex, endIndex+1);
        } else {
            //reverse
            var reverseStartIndex = profile.data.forward.length -1 - startIndex,
                reverseEndIndex = profile.data.forward.length -1 - endIndex;

            startMile = profile.data.reverse[reverseStartIndex].distance;
            endMile = profile.data.reverse[reverseEndIndex].distance;

            startElevation = profile.data.reverse[reverseStartIndex].elevation;
            endElevation = profile.data.reverse[reverseEndIndex].elevation;

            filteredData = profile.data.reverse.slice(reverseStartIndex, reverseEndIndex+1);
        }

        stats.startMile = startMile;
        stats.endMile = endMile;
        stats.startElevationFeet = startElevation;
        stats.endElevationFeet = endElevation;


        //this controls which miles of the route are shown
        profile.x.domain([startMile, endMile ]);
        profile.xRelative.domain([0, (endMile - startMile) ]);

        var prevElevation = filteredData[0].elevation;
        var prevDistance = filteredData[0].distance;
        for(var j=1; j < filteredData.length; j++) {
            var deltaElevationFt = filteredData[j].elevation - prevElevation;
            var deltaDistanceMi = filteredData[j].distance - prevDistance;

            var deltaDistanceFeet = Distance.fromMiles(deltaDistanceMi).toFeet();

            var grade = deltaElevationFt/deltaDistanceFeet;

            if( Math.abs(grade) > GRADE_LIMIT ) {

                if (deltaElevationFt > 0) {
                    stats.elevationGainFeet += deltaElevationFt;
                } else {
                    stats.elevationLossFeet += deltaElevationFt;
                }
            }

            prevElevation = filteredData[j].elevation;
            prevDistance = filteredData[j].distance;
        }

        var minElevation = _minElevation(filteredData);
        var maxElevation = _maxElevation(filteredData);

        profile.y.domain([
            Math.floor(minElevation/1000)*1000,
            Math.ceil(maxElevation/1000)*1000]
        );

        profile.svg.selectAll('g .x.axis.top')
            .call(profile.xAxisTop);

        profile.svg.selectAll('g .x.axis.bottom')
            .call(profile.xAxisBottom.tickSize(-1 * profile.height));

        profile.svg.select('.y.axis.right')
            .call(profile.yAxisRight);

        profile.svg.select('.y.axis.left')
            .call(profile.yAxisLeft);

        profile.svg.select('.area')
            .datum(filteredData)
            .attr('d', profile.area);

        segmentStats = stats;
    }

    var resizeElevationProfile = function() {
        // console.log('ElevationProfile::resizeElevationProfile')
        var dimensions = _getProfileDimensions();

        profile.width = dimensions.width;
        profile.height = dimensions.height;

        profile.x.range([0, profile.width]);
        profile.xRelative.range([0, profile.width]);

        profile.y.range([profile.height, 0])

        profile.xAxisTop.ticks(Math.max(profile.width / 50, 2));
        profile.xAxisBottom.ticks(Math.max(profile.width / 50, 2));

        profile.svg.selectAll('g .x.axis.top')
            .call(profile.xAxisTop);

        profile.svg.selectAll('g .x.axis.bottom')
            .call(profile.xAxisBottom.tickSize(-1 * profile.height));

        profile.svg.select(".y.axis.right")
            .attr('transform', 'translate(' + profile.x( profile.x.domain()[1] ) + ', 0)')
            .call(profile.yAxisRight);

        profile.svg.select('.y.axis.left')
            .call(profile.yAxisLeft.tickSize(-1 * profile.width));

        // Force D3 to recalculate and update the line
        profile.svg.select('.area')
            .attr('d', profile.area);

        profile.svg.select('#clip-rect')
            .attr('width', profile.width)
            .attr('height', profile.height);

        //TODO: update mouse hover width/height

        profile.mouseLine.select('#mouse-event-rect') // append a rect to catch mouse movements on canvas
            .attr('width', profile.width) // can't catch mouse events on a g element
            .attr('height', profile.height);
    }

    var _getProfileDimensions = function(){
        // console.log('ElevationProfile::_getProfileDimensions')
        var dimensions = {};

        profile.parent
            .css('visibility', 'hidden')
            .css('display','block');

        dimensions.width = parseInt(profile.container.style('width'))
            - profile.margin.left
            - profile.margin.right;
        dimensions.height = parseInt(profile.container.style('height'))
            - profile.margin.top
            - profile.margin.bottom;

        profile.parent
            .css('visibility', '')
            .css('display','');

        return dimensions;
    }

    var _minElevation = function(data) {
        return d3.min(data, function(d) {
            return d.elevation;
        });
    }

    var _maxElevation = function(data) {
        return d3.max(data, function(d) {
            return d.elevation;
        });
    }

    var getSegmentStats = function(){
        // console.log('ElevationProfile::getSegmentStats')
        return segmentStats;
    }

    Construct.prototype = {
        constructor: ElevationProfile,
        filterProfile: filterProfile,
        resizeElevationProfile: resizeElevationProfile,
        setData: setData,
        getSegmentStats: getSegmentStats
    };

    return Construct;

})( jQuery );