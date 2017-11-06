@extends('layouts.master')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1>About The Elevation Maps</h1>
                <h3>What is the purpose of this app?</h3>
                <p>

                </p>
                <h3>Data Source</h3>
                <p>
                    This map shows the 2011 route of the Great Divide Mountain Bike Route and various recent Tour Divide courses.
                    Note that the GDMBR and Tour Divide differ in a few significan ways.
                </p>
                <p>
                    Data was stitched together from various sources - gps records from Strava activities and the
                    <a href="http://topofusion.com/divide/gps.php" target="_blank">official Great Divide/Tour Divide GPX tracks</a>
                </p>
                <p>
                    <strong>Note about ascent/descent numbers</strong>
                    Changes in elevation between the source GPS points only count toward ascent or descent if the grade between the points is greater than 1.0%.
                </p>

                <h3>Disclaimers</h3>
                <h4>Accuracy</h4>
                <p>
                    Is the mileage 100% accurage? No, but it is close.  GPS error is unavoidable.<br />
                    Are the elevation profile and gain/loss numbers 100% accurate?  No, but they is close enough to compare efforts between resupplies.
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