/**
 * related to tabCell.ui
 * 
 * @Author : and
 * @Timestamp : 2016-09-26
 */
// ui
var root = ui("$");
// init
root.setMapping({
	"title_label.text" : "title",
	"tag_label.bgColor" : "bgColor",
	"tag_label.tag" : "tag"
})
// event
root.on("touch", function() {
	sm("do_Page").fire("slideview_indexChanged", ui("tag_label").tag);
})