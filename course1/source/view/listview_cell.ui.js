/**
 * related to listview_cell.ui
 * 
 * @Author : and
 * @Timestamp : 2016-10-05
 */
// require
var core = require("do/core");
var http = require("do/http");
var page = require("do/page");
// sm
var do_Page = sm("do_Page");
// mm
var do_ListData = mm("do_ListData");
// ui
var listview = ui('listview');
// var
var current_page = 0;
// init
(function() {
	ui('$').setMapping({
		"listview.tag" : "tag"
	})
	listview.bindItems(do_ListData);
})();

// event
listview.on("touch", function(index) {
	var d = do_ListData.getOne(index);
	sm("do_App").openPage({
		source : "source://view/topic/details.ui",
		data : d,
		statusBarState : "transparent",
		animationType : "push_r2l_1"
	});
});
listview.on("scroll", function(position) {
	if (position.lastVisiblePosition == current_page * 10) {
		fetchdata(++current_page);
	}
})
do_Page.on("indexChanged", function(topic) {
	var _topic = listview.tag;
	if (_topic == topic && current_page == 0) {
		fetchdata(++current_page);
	}
})
// private function
function fetchdata(num) {
	var topic = listview.tag;
	var url = "?page=" + num + "&limit=10";
	if (topic != "main")
		url = url + "&tab=" + topic;
	http.ajax({
		parent : "topics_options",
		url : url,
		success : function(data) {
			if (num == 1)
				do_ListData.removeAll();
			else {
				do_ListData.removeData([ do_ListData.getCount() - 1 ]);
			}
			do_ListData.addData(data);
			var next = {};
			next.template = 1;
			do_ListData.addOne(next);
			// core.p(do_ListData);
			listview.refreshItems();
		},
		beforeSend : function(options, do_Http) {
			if (num == 1)
				page.showView("source://script/do/view/waitting.ui");
		},
		complete : function() {
			if (num == 1)
				page.hideView("source://script/do/view/waitting.ui");
		}
	})
}