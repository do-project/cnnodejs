/**
 * related to tabCell.ui
 * 
 * @Author : and
 * @Timestamp : 2016-09-26
 */
// sm
var do_Page = sm("do_Page");
// ui
var tag_label = ui("tag_label");
var root = ui("$");
// init
root.setMapping({
	"title_label.text" : "title",
	"tag_label.bgColor" : "bgColor",
	"tag_label.tag" : "tag"
})
// event
root.on("touch", function() {
	do_Page.fire("slideview_indexChanged", tag_label.tag);
})