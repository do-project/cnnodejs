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
var segmentview;
var slideview = ui("slideview");
// var
var topics = [ "good","ask", "main","share", "job"];
var slideview_listdata;

// init
(function() {
	page.allowExit();
	ui("$").add("segmentview","source://view/topic_segmentview.ui",0,40);
	segmentview = ui("segmentview");
	init_slideview();
})();
// event
slideview.on("indexChanged",function(d){
	segmentview.index = d; 
	do_Page.fire("indexChanged",topics[d]);
})
do_Page.on("loaded",function(){
	slideview.index = 2;
})
do_Page.on("slideview_indexChanged",function(index){
	slideview.index = index;
})
// private Function
function init_slideview() {
	slideview_listdata = mm("do_ListData");
	slideview.bindItems(slideview_listdata);
	do_InitData.readFile("initdata://content_slide.json", function(d) {
		slideview_listdata.addData(d);
		slideview.refreshItems();
	})
}