/**
 * related to topic_segmentview.ui
 * 
 * @Author : and
 * @Timestamp : 2016-10-09
 */
// sm
var do_Page = sm("do_Page");
// ui
var segmentview = ui("segmentview");
// mm
var segmentview_listdata = mm("do_ListData");
// init
(function() {
	segmentview.bindItems(segmentview_listdata);
	sm("do_InitData").readFile("initdata://topic_string.json", function(d) {
		segmentview_listdata.addData(d);
		segmentview.refreshItems();
	})
})();
// event
do_Page.on("loaded", function() {
	segmentview.index = 2;
})
segmentview.on("indexChanged", function(index) {
	for (var i = 0; i < 5; i++) {
		var d = segmentview_listdata.getOne(i);
		if (index == i) {
			d.bgColor = "FF7F00FF";
		} else {
			d.bgColor = "FF7F0000";
		}
		segmentview_listdata.updateOne(i, d);
	}
	segmentview.refreshItems();
})