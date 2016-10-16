var core=require("do/core");
var page=require("do/page");
var d1=require("deviceone");
var do_Global = d1.sm("do_Global");
var stringExt = require("do/ext/stringExt");
//默认选项
module.exports.options ={
   dOption:{
		//上级选项名称（可继承选项内容）
		parent:null,
		//服务请求的根路径
		rootUrl:"http://www.XXX.XXX:8080/webapi",
		//服务请求的url（如果不是以http://或https://开始，则会自动加上httpRootUrl变量值的前缀）
		url:null,
		//请求的类型（GET,POST, PUT, DELETE）。
		type:"GET",
		//发送数据到服务器时所使用的内容类型。可以是："application/x-www-form-urlencoded", "application/json"等
		contentType:"application/json; charset=UTF-8",
		//要发送到服务器的数据，发送前可以根据需要自动转换为请求字符串格式（例如：{a:"1", b:"2"}，对于GET请求可自动转换为&a=1&b=2）
		data:null,
		//返回内容的解码方式（utf-8或GBK）
		responseEncoding:"utf-8",
		//设置本地的请求超时时间（以毫秒计）
		timeout:30000,
		//发送请求前运行的函数:beforeSend(options, do_Http)
		beforeSend:null,
		//返回数据后的进行预处理的函数:dataFilter(data)
		dataFilter:null,
		//当请求成功时运行的函数success(data, status)
		success:null,
		//如果请求失败要运行的函数error(data, status)
		error:null,
		//请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）complete(data, status)
		complete:null,
		//是否缓存上次结果 （为true的时候，在返回服务结果之前会先返回上次结果，一般用于改善数据查询的交互体验）
		cacheLastResult:false,
		//是否使用模拟数据
		useMockData:false,
		//模拟数据
		mockData:[]
   },
   topics_options : {
       rootUrl : "https://cnodejs.org/api/v1/topics",
       contentType : "application/json;charset=utf-8",
       cacheLastResult : true,
       dataFilter : topics_options_dataFilter
   },
   topic_details_options : {
       rootUrl : "https://cnodejs.org/api/v1/topic/",
       contentType : "application/json;charset=utf-8",
       cacheLastResult : true,
       dataFilter : topic_details_options_dataFilter
   }
};
//private Function
function topics_options_dataFilter(data) {
   var fd = [];
   var ds = data.data;
   for (var i = 0; i < ds.length; i++) {
       var d = ds[i];
       var o = options_dataFilter(d);
       o.top = d.top;
       o.good = d.good;
       o.count = d.reply_count + "/" + d.visit_count + "  " + o.tab;
       o.content = d.content;
       o.reply_count = d.reply_count;
       fd.push(o);
   }
   return fd;
}
function options_dataFilter(d) {
   var o = {};
   o.id = d.id;
   o.author_id = d.author_id;
   var tab = d.tab;
   if (!tab)
       tab = "";
   o.tab = tab;
   o.title = d.title;
   o.last_reply_at = computeInterval(d.last_reply_at);
   var avatar = d.author.avatar_url;
   if (avatar.startWith("//"))
       avatar = "http:" + avatar;
   o.avatar_url = avatar;
   return o;
}
function topic_details_options_dataFilter(data) {
   var fd = [];
   var ds = data.data;
   for (var i = 0; i < ds.length; i++) {
       var d = ds[i];
       var o = options_dataFilter(d);

       fd.push(o);
   }
   return fd;
}
function computeInterval(time) {
   var interval = (new Date().getTime() - new Date(time).getTime()) / 1000;
   if (interval < 60)
       return parseInt(interval) + " seconds ago";
   interval = interval / 60;
   if (interval < 60)
       return parseInt(interval) + " minutes ago";
   interval = interval / 60;
   if (interval < 24)
       return parseInt(interval) + " hours ago";
   interval = interval / 24;
   return parseInt(interval) + " days ago"
}

