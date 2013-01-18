(function(Model, QUnit, $, _) {
    var req = {
        baseURL: "",
        type: "json"
    };

    function runTest(test) {
        QUnit.asyncTest("Media Gen: "+test.url, function() {
            QUnit.expect(1);
            var mediagen = new Model.MediaGen();
            mediagen.on("ready", function(data) {
                QUnit.deepEqual(data, test.expect, "deep equal for local media gen 1");
                QUnit.start();
            });
            mediagen.fetch("data/mediaGen/" + test.url, req);
        });
    }
    runTest({
        url: "single-rendition-multiple-beacon.json",
        expect: {
            beacons: [{
                "url": "beacon1",
                "startTime": 0,
                "elapsed":30
            }, {
                "url": "beacon2",
                "startTime": Infinity,
                "elapsedAfterAd":true
            },
            {
                "url": "beacon3",
                "startTime": -7,
                "elapsedAfterAd":false
            }],
            errorCode: undefined,
            errorMessage: undefined,
            isDVR: false,
            isLive: false,
            duration: 252,
            renditions: [{
                "cdn": "level3",
                "duration": "252",
                "width": "384",
                "height": "216",
                "type": "video/mp4",
                "bitrate": "450",
                "src": "rtmpe://viacomccstrmfs.fplive.net/viacomccstrm/gsp.comedystor/com/colbert/mashups/cr_mashup_2011_nov_384x216_450.mp4"
            }]
        }
    });
    runTest({
        url: "multiple-rendition.json",
        expect: {
            beacons: [],
            errorCode: undefined,
            errorMessage: undefined,
            isDVR: false,
            isLive: false,
            duration: 252,
            renditions: [{
                "cdn": "level3",
                "duration": "252",
                "width": "384",
                "height": "216",
                "type": "video/mp4",
                "bitrate": "450",
                "src": "rendition1src"
            }, {
                "cdn": "level3",
                "duration": "252",
                "width": "512",
                "height": "288",
                "type": "video/mp4",
                "bitrate": "625",
                "src": "rendition2src"
            }]
        }
    });
    runTest({
        url: "single-beacon.json",
        expect: {
            beacons: [{
                "url": "beacon1",
                "startTime":0,
            }],
            errorCode: undefined,
            errorMessage: undefined,
            isDVR: false,
            isLive: false
        }
    });
    runTest({
        url: "error.json",
        expect: {
            beacons: [],
            errorCode: "error_code",
            errorMessage: "error message",
            isDVR: false,
            isLive: false
        }
    });
    runTest({
        url: "live-dvr.json",
        expect: {
            beacons: [],
            errorCode: undefined,
            errorMessage: undefined,
            isDVR: true,
            isLive: true
        }
    });
})(this.MTVNPlayer.PlaylistMetadata, window.QUnit, window.ender, window.$._);