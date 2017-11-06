@extends('layouts.master')

@section('header-includes')
    <style type="text/css">
        .area {
            /*
            TODO:
            Why does firefox fail to respect the clip if this style is
             placed in an external stylesheet???
            */
            fill: #666;
            clip-path: url(#clip);
        }
    </style>
    <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCej-mrOPruKdNFs6FUoH-oyeWHH5t9TAA&libraries=geometry"></script>
@endsection

@section('content')
    <div id="app">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div role="tabpanel">

                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active">
                                <a href="#profile-tab" aria-controls="profile-tab" role="tab" data-toggle="tab">Profile + Stats</a>
                            </li>
                            <li role="presentation" class="hidden-xs">
                                <a href="#disclaimer-tab" aria-controls="disclaimer-tab" role="tab" data-toggle="tab">Disclaimer</a>
                            </li>
                            <li class="pull-right" class="">
                                <form class="form-inline">
                                    <div clas="form-group">
                                        <label for="#route-select">Current Route:</label>
                                    @if(count($routeGroups) > 0)
                                        <select class="form-control input-sm" id="route-select">
                                        @foreach($routeGroups as $routeGroupName => $routes)
                                            <optgroup label="{{ $routeGroupName }}">
                                            @foreach($routes as $routeInfo)
                                                <option value="{{ $routeInfo['id'] }}" {{ $routeInfo['id'] == $initialSelectedRouteId ? 'selected="SELECTED"' : '' }}>
                                                    {{ $routeInfo['id'] }}
                                                </option>
                                            @endforeach
                                            </optgroup>
                                        @endforeach
                                        </select>
                                    @endif
                                    </div>
                                </form>
                            </li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content">

                            <div role="tabpanel" class="tab-pane active" id="profile-tab">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-sm-2">
                                            <div id="segment-stats-container">Loading...</div>
                                            <form>
                                                <div class="form-group">
                                                    <form>
                                                        <select name="direction" class="form-control">
                                                            <option value="">Choose Direction</option>
                                                            <option value="forward" selected>Southbound</option>
                                                            <option value="reverse">Northbound</option>
                                                        </select>
                                                    </form>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="col-sm-10">
                                            <svg id="elevation-profile"></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel" class="tab-pane" id="disclaimer-tab" style="overflow-x:hidden; overflow-y:scroll;">
                                <p>
                                    <strong>Last Update: November 2017</strong>
                                </p>
                                <p>
                                    <strong>Source</strong><br />
                                    Data was stitched together from various sources - gps records
                                    from <a href="https://app.strava.com" target="_blank">Strava</a> activities and
                                    the <a href="http://topofusion.com/divide/gps.php" target="_blank">official TD GPX tracks</a>.
                                </p>
                                <p>
                                    <strong>Accuracy</strong><br />
                                    Is the mileage 100% accurate? No, but it is close.  GPS error is unavoidable.<br />
                                    Is the elevation profile 100% accurate? No, but it is close enough to compare
                                    efforts between resupplies.<br />
                                    Elevation gain/loss is calculated where the grade between points is greater than 1.5%.  A naive, but
                                    simple approach.
                                </p>
                                <p>
                                    <strong>Navigation</strong><br />
                                    Don't rely on this map for the purpose of navigation.  Buy the
                                    <a href="http://adventurecycling.org/routes-and-maps/adventure-cycling-route-network/great-divide-mountain-bike-route/" target="_blank">
                                        Official Adventure Cycling GDMBR map set
                                    </a> instead.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="map"></div>

@endsection

@section('footer-includes')

    <div class="modal fade" id="download-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Downloading Track...</h4>
                </div>
                <div class="modal-body">
                    <p>
                        This may take a few moments.
                    </p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em;">0%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script id="segment-stats-template" type="text/x-handlebars-template">
        <ul class="list-unstyled">
            <li>
                <strong>Distance:</strong> @{{stats.distance}} mi
            </li>
            <li>
                <strong>Ascent:</strong> @{{stats.ascent}} ft
            </li>
            <li>
                <strong>Descent:</strong> @{{stats.descent}} ft
            </li>
            <li>
                <strong>Net Elevation:</strong> @{{stats.netElevation}} ft
            </li>
            <li>
                <strong>Miles:</strong> @{{stats.startMile}} - @{{stats.endMile}}
            </li>
        </ul>
    </script>

    <script>
        window.appConfig = {!! json_encode([
            'routeGroups' => $routeGroups
        ]) !!}
    </script>

    <script src="/components/jquery/dist/jquery.min.js"></script>
    <script src="/components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="/components/handlebars/handlebars.min.js"></script>
    <script src="/components/d3/d3.min.js"></script>
    <script src="{{ elixir('assets/js/app.js') }}"></script>
@endsection