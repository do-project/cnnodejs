//---------------------------------------------------------------
//封装一些常用的全局函数
//为了方便当前文件的升级，不建议直接修改该文件，如果需要修改相关的配置，请在globalSetting.js中修改
//version: 1.0.0
//---------------------------------------------------------------
var core=require("do/core");
var d1=require("deviceone");

/**
 * 当前是否为调试状态
 */
module.exports.isDebug = function(options){
	var d=core.getOptions(options, "do/globalSetting");
	return d.isDebugStatus;
};

/**
 * 获取当前操作系统类型(可能的值包括：android，iPhone OS, iPad OS等
 */
module.exports.getOS = function(){
	var do_Device=d1.sm("do_Device");
	var dInfo=do_Device.getInfo();
	return dInfo.OS;
};

/**
 * 获取当前操作系统的版本
 */
module.exports.getOSVersion = function(){
	var do_Device=d1.sm("do_Device");
	var dInfo=do_Device.getInfo();
	return dInfo.OSVersion;
};

/**
 * 获取当前设备的ID
 */
module.exports.getDeviceID = function(){
	var do_Device=d1.sm("do_Device");
	var dInfo=do_Device.getInfo();
	return dInfo.deviceId;
};

/**
 * 获取当前设备的名称
 */
module.exports.getDeviceName = function(){
	var do_Device=d1.sm("do_Device");
	var dInfo=do_Device.getInfo();
	return dInfo.deviceName;
};

/**
 * 封装一些常用的SM的对象
 */
module.exports.sm = {
		do_External:d1.sm("do_External"),
		do_Device:d1.sm("do_Device"),
		do_Global:d1.sm("do_Global"),
		do_App:d1.sm("do_App"),
		do_Page:core.inPage()? d1.sm("do_Page"):null,
		do_Storage:d1.sm("do_Storage"),
		do_InitData:d1.sm("do_InitData"),
		do_DataCache:d1.sm("do_DataCache"),
		do_Notification:d1.sm("do_Notification"),
		do_Album:d1.sm("do_Album"),
		do_ImageBrowser:d1.sm("do_ImageBrowser"),
		do_Network:d1.sm("do_Network")
};

/**
 * 封装一些常用的MM的创建对象方法 
 */
module.exports.mm = {
		do_Animation:function(_id){
			if (_id && _id.length >0){
				return d1.mm("do_Animation", _id, "app");
			}
			else{
				return d1.mm("do_Animation");
			}
			
		},
		do_HashData:function(_id){
			if (_id && _id.length >0){
				return d1.mm("do_HashData", _id, "app");
			}
			else{
				return d1.mm("do_HashData");
			}
			
		},
		do_Http:function(_id){
			if (_id && _id.length >0){
				return d1.mm("do_Http", _id, "app");
			}
			else{
				return d1.mm("do_Http");
			}
			
		},
		do_ListData:function(_id){
			if (_id && _id.length >0){
				return d1.mm("do_ListData", _id, "app");
			}
			else{
				return d1.mm("do_ListData");
			}
			
		},
		do_SQLite:function(_id){
			if (_id && _id.length >0){
				return d1.mm("do_SQLite", _id, "app");
			}
			else{
				return d1.mm("do_SQLite");
			}
			
		},
		do_Timer:function(_id){
			if (_id && _id.length >0){
				return d1.mm("do_Timer", _id, "app");
			}
			else{
				return d1.mm("do_Timer");
			}
			
		}
};
