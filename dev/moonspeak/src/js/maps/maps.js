'use strict';
var settings = require('./settings.json');
var mapsapi = require('google-maps-api')('AIzaSyDWXqPA7d3akOwXcywwVVtgqSg53mULHVs');
function initMap() {
    mapsapi().then(function (maps) {
        var pos = {lat: 51.110298, lng: 17.035175};
        var styledMapType = new maps.StyledMapType(settings);
        var map = new maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 11,
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
            }
        });
        var marker = new maps.Marker({
            position: pos,
            map: map
        });

        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
    });
}
module.exports = initMap;
