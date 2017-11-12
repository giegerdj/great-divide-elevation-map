
function Distance( feet ) {
    this.feet = feet;
}

Distance.FEET_PER_METER = 3.28084;
Distance.METERS_PER_MILE = 1609.34;
Distance.FEET_PER_MILE = 5280;

Distance.prototype.toFeet = function () {
    return this.feet;
}

Distance.prototype.toMeters = function () {
    return this.feet / Distance.FEET_PER_METER;
}

Distance.prototype.toMiles = function () {
    return this.feet / Distance.FEET_PER_MILE;
}

Distance.fromFeet = function(feet){
    return new Distance( feet );
}

Distance.fromMeters = function(meters) {
    return new Distance( meters * Distance.FEET_PER_METER );
}

Distance.fromMiles = function(miles) {
    return new Distance( miles * Distance.FEET_PER_MILE );
}