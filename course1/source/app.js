/**
 * @Author : and
 * @Timestamp : 2016-09-25
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	app.openPage({
		source : "source://view/index.ui",
		statusBarState : "transparent"
	});
});
