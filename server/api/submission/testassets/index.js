// Place this json object into http://geojsonlint.com/ to see what the test is
// doing easier
module.exports.geoFeatures = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -73.6842041,
          42.7288898
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -73.682041,
          42.7588898
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -73.562041,
          42.7308898
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              [
                -73.6786079406738,
                42.7404566603398
              ],
              [
                -73.699893951416,
                42.7268391495544
              ],
              [
                -73.6693382263184,
                42.7038843572483
              ],
              [
                -73.6429023742676,
                42.7217948682557
              ],
              [
                -73.6786079406738,
                42.7404566603398
              ]
            ]
          ],
          [
            [
              [
                -73.5735511779785,
                42.7414652458955
              ],
              [
                -73.5745811462402,
                42.728604551111
              ],
              [
                -73.5481452941895,
                42.7303699024239
              ],
              [
                -73.5484886169434,
                42.7429780934664
              ],
              [
                -73.5735511779785,
                42.7414652458955
              ]
            ]
          ]
        ],
        "type": "MultiPolygon"
      }
    }
  ]
};

module.exports.validLocations = [{
  "coordinates": module.exports.geoFeatures.features[0].geometry.coordinates
}, {
  "coordinates": module.exports.geoFeatures.features[2].geometry.coordinates
}];
module.exports.badLocations = [{
  "coordinates": module.exports.geoFeatures.features[1].geometry.coordinates
}];
