var db = require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var util = require('util');


exports.addWaterLevel = function(req,resp,reqBody){
	var dt = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
	console.log(dt);
	var ISTdate = ('0'+ dt.getDate()).slice(-2);
	var ISTmonth = ('0'+ (dt.getMonth()+1)).slice(-2);
	var ISTyear =  dt.getFullYear();
	var ISThrs = ('0'+ dt.getHours()).slice(-2);
	var ISTmin = ('0'+ dt.getMinutes()).slice(-2);
	var ISTsec = ('0'+ dt.getSeconds()).slice(-2);
	//var dateFormat = ISTdate+"-"+ISTmonth+"-"+ISTyear+" "+ISThrs+":"+ISTmin+":"+ISTsec;
	var dateFormat = ISTyear+"-"+ISTmonth+"-"+ISTdate+" "+ISThrs+":"+ISTmin+":"+ISTsec;
	console.log("req",reqBody);
	reqBody.date= dateFormat;
	console.log(reqBody);
	var con={"deviceId":reqBody.deviceId};
	console.log("filter ",con);
	db.dbs.collection("water").find(con,{fields: { _id: 0,date:1}}).sort({"date":-1}).skip(100).limit(1).toArray(function(err,data){
		console.log(data);
		var deldate
		if(data.length >0)
		{
			deldate = data[0].date;	
			console.log("sort data ",deldate);
		}
		else
		{
			deldate="";
		}
		db.dbs.collection("water").remove({date:{$lt:deldate}},function(err,d){
			console.log("error in remove",err);
			//console.log("date in remove",d);
			db.dbs.collection("water").insert(reqBody,function(err,result){
				if(err){
					httpMsgs.show500(req,resp,err);
				}						
				else{
					httpMsgs.send200(req,resp);
				}
			});
		})
	});
};


exports.getWaterLevel = function(req,resp,device){
//	device = parseInt(device);
	var con={"deviceId":device};
	db.dbs.collection("water").find(con,{ fields: { _id: 0,deviceId:0 } }).sort({"date":-1}).limit(1).toArray(function(err,data){
		console.log(err);
		console.log(data);
		if(err){
			httpMsgs.show500(req,resp,err);
		}						
		else{
			console.log(data);
			//data.date = data.date.toLocaleString();
			//console.log(data.date);
			httpMsgs.sendJson(req,resp,data[0]);
		}
	})
};



exports.addMotorStatus = function(req,resp,reqBody){
	var dt = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
	console.log(dt);
	var ISTdate = ('0'+ dt.getDate()).slice(-2);
	var ISTmonth = ('0'+ (dt.getMonth()+1)).slice(-2);
	var ISTyear =  dt.getFullYear();
	var ISThrs = ('0'+ dt.getHours()).slice(-2);
	var ISTmin = ('0'+ dt.getMinutes()).slice(-2);
	var ISTsec = ('0'+ dt.getSeconds()).slice(-2);
	//var dateFormat = ISTdate+"-"+ISTmonth+"-"+ISTyear+" "+ISThrs+":"+ISTmin+":"+ISTsec;
	var dateFormat = ISTyear+"-"+ISTmonth+"-"+ISTdate+" "+ISThrs+":"+ISTmin+":"+ISTsec;
	console.log("req",reqBody);
	reqBody.date= dateFormat;
	console.log(reqBody);
	var con={"deviceId":reqBody.deviceId};
	console.log("filter ",con);
	
	db.dbs.collection("motor").find(con,{fields: { _id: 0,date:1}}).sort({"date":-1}).skip(100).limit(1).toArray(function(err,data){
		console.log(data);
		var deldate
		if(data.length >0)
		{
			deldate = data[0].date;	
			console.log("sort data ",deldate);
		}
		else
		{
			deldate="";
		}
		db.dbs.collection("motor").remove({date:{$lt:deldate}},function(err,d){
			console.log("error in remove",err);
			//console.log("date in remove",d);
			db.dbs.collection("motor").insert(reqBody,function(err,result){
				if(err){
					httpMsgs.show500(req,resp,err);
				}						
				else{
					httpMsgs.send200(req,resp);
				}
			});
		})
	});
};


exports.getMotorStatus = function(req,resp,device){
//	device = parseInt(device);
	var con={"deviceId":device};
	db.dbs.collection("motor").find(con,{ fields: { _id: 0,deviceId:0,date:0 } }).sort({"date":-1}).limit(1).toArray(function(err,data){
		console.log("err:",err);
		console.log("data:",data);
		if(err){
			httpMsgs.show500(req,resp,err);
		}						
		else{
			if(data.length>0)
			{
				console.log(data[0].status);
				 resp.write(data[0].status);
			}
			else
			{
				console.log("data is blank");	
			}
			//data.date = data.date.toLocaleString();
			//console.log(data.date);
		//	httpMsgs.sendJson(req,resp,data[0]);
			resp.end();
		}
	})
};


