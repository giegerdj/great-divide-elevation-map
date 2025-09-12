// App entry point
// Load dependencies first and assign to global scope for legacy code
window.Distance = require('./app/Distance.js');
window.ElevationProfile = require('./app/ElevationProfile.js');
window.SnaptoRoute = require('./app/SnapToRoute.js'); // Already creates global SnapToRoute function
window.RouteMap = require('./app/RouteMap.js');

// Load main app
require('./app/App.js');