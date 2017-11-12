@extends('layouts.master')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
                <h1>About The Elevation Map Tool</h1>
                <h3>Why It Exists</h3>
                <p>
                    When I <a href="https://gdmbr.davegieger.com/" target="_blank">toured the Great Divide in 2010</a> there were days where the map
                    elevation profiles looked relatively flat but the roads featured endless rollers that tested the legs and mind.  After returning home
                    I decided to analyze GPS data to find out how flat those sections actually were (they weren't).  Now, a few app versions later, we have this tool.
                </p>
                <h3>Data Source</h3>
                <p>
                    This map shows the Great Divide Mountain Bike Route and various recent Tour Divide courses.
                    Note that the GDMBR and Tour Divide differ in a few, but significant ways.  Data was stitched together
                    from various sources - GPS records from Strava activities and the
                    <a href="http://topofusion.com/divide/gps.php" target="_blank">official Great Divide/Tour Divide GPX tracks</a>.
                </p>
                <p>
                    <strong>Note about ascent/descent numbers</strong><br />
                    Changes in elevation between the source GPS points only count toward ascent or descent if the grade between the points is greater than 1.0%.
                </p>

                <h3>Disclaimers</h3>
                <h4>Accuracy</h4>
                <p>
                    Is the mileage 100% accurage? No, but it is close.  GPS error is unavoidable.<br />
                    Are the elevation profile and gain/loss numbers 100% accurate?  No, but they are close enough to estimate efforts between towns.
                </p>
                <h4>Navigation</h4>
                <p>
                    Don't rely on this map for the purpose of navigation.  Buy the
                    <a href="https://www.adventurecycling.org/routes-and-maps/adventure-cycling-route-network/great-divide-mountain-bike-route/" target="_blank">
                        Official Adventure Cycling GDMBR map set
                    </a> and/or load the <a href="http://topofusion.com/divide/gps.php" target="_blank">Official Tour Divide track</a> into your GPS unit.
                </p>
            </div>
        </div>
    </div>
@endsection

@section('footer-includes')

@endsection