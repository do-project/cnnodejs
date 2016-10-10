/**
 * related to listview_cell.ui
 * 
 * @Author : and
 * @Timestamp : 2016-10-05
 */
// require
var core = require("do/core");
var http = require("do/http");
// sm
var do_Page = sm("do_Page");
var do_App = sm("do_App");
// mm
var do_ListData = mm("do_ListData");
// ui
var root = ui('$');
var listview = ui('listview');

// init
(function() {
	root.setMapping({
		"listview.tag" : "tag"
	})
	listview.bindItems(do_ListData);
})();

// event
listview.on("touch", function(index) {
	var d = do_ListData.getOne(index);
	do_App.openPage({
		source : "source://view/topic/details.ui",
		data : d,
		statusBarState : "transparent",
		animationType : "push_r2l_1"
	});
});
do_Page.on("indexChanged", function(topic) {
	var _topic = listview.tag;
	if (_topic == topic) {
		var url = "?page=1&limit=10";
		if (topic != "main")
			url = url + "&tab=" + topic;
		http.ajax({
			parent : "topics_options",
			url : url,
			success : function(data) {
				do_ListData.removeAll();
				do_ListData.addData(data);
				// core.p(do_ListData);
				listview.refreshItems();
			}
		})
	}
})