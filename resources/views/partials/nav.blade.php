<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Great Divide Elevation Map</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="{{ URL::Route('pages.about') }}">About</a>
                </li>
            @if( !Route::is('pages.map') )
                <li>
                    <a href="{{ URL::Route('pages.map') }}">
                        <span class="glyphicon glyphicon-chevron-left"></span> Back To Map
                    </a>
                </li>
            @endif
            </ul>
        </div>
    </div>
</nav>