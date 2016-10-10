/**
 * related to details.ui
 * 
 * @Author : and
 * @Timestamp : 2016-10-09
 */
// require
var core = require("do/core");
var page = require("do/page");
// sm
var do_Page = sm("do_Page");
// ui
var header = ui("header");
var title_label = ui("title_label");
var last_reply_at_label = ui("last_reply_at_label");
var avatar_imageview = ui("avatar_imageview");
var webview = ui("webview");
var reply_label = ui("reply_label");
// var
var colors = [ "BA55D3FF", "1E90FFFF", "2F4F4FFF", "2E8B57FF", "FF7F50FF",
		"FF4500FF" ];
// init
(function() {
	page.allowClose(ui("back"));
	
	header.bgColor = randomColor();
	var data = do_Page.getData();
	title_label.text = data.title;
	last_reply_at_label.text = data.last_reply_at;
	avatar_imageview.source = data.avatar_url;
	reply_label.text = data.reply_count;
	webview.url="source://view/topic/content.html";
})();

// private function

function randomColor() {
	return colors[parseInt(colors.length * Math.random())]
}