@extends('layouts.master')

@section('header-includes')
    {{--
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
    --}}
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
                            <li role="presentation">
                                <a href="#map-options-tab" aria-controls="map-options-tab" role="tab" data-toggle="tab">Map Options</a>
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
                                        <div class="col-sm-3 col-lg-2">
                                            <div class="form">
                                                <div class="form-group">
                                                    <select name="direction" class="form-control">
                                                        <option value="">Choose Direction</option>
                                                        <option value="forward" selected>Southbound</option>
                                                        <option value="reverse">Northbound</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div id="segment-stats-container">Loading...</div>
                                        </div>
                                        <div class="col-sm-9 col-lg-10">
                                            <svg id="elevation-profile"></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel" class="tab-pane" id="map-options-tab">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-horizontal">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label">
                                                        Units
                                                    </label>
                                                    <div class="col-sm-8">
                                                        <select name="direction" class="form-control disabled" disabled="disabled">
                                                            <option value="imperial" selected>Feet/Miles</option>
                                                            <option value="metric">Meters/Kilometers</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label">
                                                        Grade Limit
                                                    </label>
                                                    <div class="col-sm-8">
                                                        <select name="direction" class="form-control disabled" disabled="disabled">
                                                        @for ($i = 0; $i < 10; $i+=0.5)
                                                            <option value="{{ $i }}" {{$i == 1 ? 'selected' : ''}}>{{$i}}%</option>
                                                        @endfor
                                                        </select>
                                                        <p class="help-block">The grade at which elevation changes add to the total gain/loss</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
        <div class="form-horizontal">

        </div>
        <dl class="dl-horizontal">
            <dt>Distance</dt>
            <dd>@{{stats.distance}} mi</dd>

            <dt>Ascent</dt>
            <dd>@{{stats.ascent}} ft</dd>

            <dt>Descent</dt>
            <dd>@{{stats.descent}} ft</dd>

            <dt>Net Elevation</dt>
            <dd>@{{stats.netElevation}} ft</dd>

            <dt>Miles</dt>
            <dd>@{{stats.startMile}} - @{{stats.endMile}}</dd>
        </dl>
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
    <script src="{{ mix('assets/build/js/app.js') }}"></script>
@endsection
