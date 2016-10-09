/**
 * @Author : and
 * @Timestamp : 2016-09-25
 */
// require
var core = require("do/core");
var page = require("do/page");
var http = require("do/http");
// sm
var do_InitData = sm("do_InitData");
var do_Page = sm("do_Page");
// ui
var segmentview = ui("segmentview");
var slideview = ui("slideview");
// var
var topics = [ "good","ask", "main","share", "job"];
var segmentview_listdata, slideview_listdata;

// init
(function() {
	page.allowExit();
	init_segmenetview();
	init_slideview();
})();
// event
slideview.on("indexChanged",function(d){
	core.p(d+";"+topics[d])
	do_Page.fire("indexChanged",topics[d]);
})
do_Page.on("loaded",function(){
	slideview.index = 2;
	segmentview.index = 2;
})
// private Function
function init_segmenetview() {
	segmentview_listdata = mm("do_ListData");
	segmentview.bindItems(segmentview_listdata);
	do_InitData.readFile("initdata://topic_string.json", function(d) {
		segmentview_listdata.addData(d);
		segmentview.refreshItems();
	})
}
function init_slideview() {
	slideview_listdata = mm("do_ListData");
	slideview.bindItems(slideview_listdata);
	do_InitData.readFile("initdata://content_slide.json", function(d) {
		slideview_listdata.addData(d);
		slideview.refreshItems();
	})
}