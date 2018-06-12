var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
require("date-format-lite");

var port = 1337;
var app = express();
var mysql = require('mysql');
var db = mysql.createConnection({
	host: 'localhost',
	port: '3307',
	user: 'root',
	password: '123456',
	database: 'pm'
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/data", function (req, res) {
	db.query("SELECT UID_ AS id,PARENTTASKUID_ AS parent,DURATION_ AS duration,NAME_ AS text,START_ as start_date,FINISH_ as end_date,WORK_ as worktime,PERCENTCOMPLETE_ as progress  FROM plus_task", function (err, rows) {
		if (err) console.log(err);
		db.query("SELECT PREDECESSORLINK_ as link, UID_ FROM plus_task", function(err, links){
			if (err) console.log(err);
			let arr = [];
			var n = 1;
			for(var i in links){
				var link = JSON.parse(links[i].link);
				if(link.length == 0){
					continue;
				}
				var obj = {
					id: n++,
					source: +link[0].PredecessorUID,
					target: links[i].UID_,
					type: link[0].Type == 1 ? 0 : 1,
				}
				arr.push(obj)
			}
			res.send({ data: rows, links: arr});
		});
	});
});

app.post("/data/task", function (req, res) {
	var task = getTask(req.body);
	db.query("INSERT INTO plus_task(NAME_, START_, FINISH_, DURATION_, PARENTTASKUID_, WORK_, PREDECESSORLINK_) VALUES (?,?,?,?,?,?,?)",
		[task.text, task.start_date, task.end_date, task.duration, task.parent, task.worktime, '[]'],
		function (err, result) {
			sendResponse(res, "inserted", result ? result.insertId : null, err);
		});
});

app.put("/data/task/:id", function (req, res) {
	var sid = req.params.id,
		task = getTask(req.body);


	db.query("UPDATE plus_task SET NAME_ = ?, START_ = ?, FINISH_ = ?, DURATION_ = ?, PERCENTCOMPLETE_ = ?,WORK_ = ?, PARENTTASKUID_ = ? WHERE UID_ = ?",
		[task.text, task.start_date, task.end_date, task.duration, task.progress, task.worktime, task.parent, sid],
		function (err, result) {
			sendResponse(res, "updated", null, err);
		});
});

app.delete("/data/task/:id", function (req, res) {
	var sid = req.params.id;
	db.query("DELETE FROM plus_task WHERE UID_ = ?", [sid],
		function (err, result) {
			sendResponse(res, "deleted", null, err);
		});
});

app.post("/data/link", function (req, res) {
	var link = getLink(req.body);
	var arr = [];
	arr.push({
		PredecessorUID: link.source,
		Type: link.type
	})
	var json = JSON.stringify(arr);

	db.query("update plus_task set PREDECESSORLINK_ = ? where UID_ = ?",
		[json, link.target],
		function (err, result) {
			sendResponse(res, "inserted", result ? result.insertId : null, err);
		});
});

app.put("/data/link/:id", function (req, res) {
	var sid = req.params.id,
		link = getLink(req.body);

	db.query("UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?",
		[link.source, link.target, link.type, sid],
		function (err, result) {
			sendResponse(res, "updated", null, err);
		});
});

app.delete("/data/link/:id", function (req, res) {
	var sid = req.params.id;
	db.query("DELETE FROM gantt_links WHERE id = ?", [sid],
		function (err, result) {
			sendResponse(res, "deleted", null, err);
		});
});

function getTask(data) {
	return {
		text: data.text,
		start_date: data.start_date.date("YYYY-MM-DD hh:mm:ss"),
		end_date: data.end_date.date("YYYY-MM-DD hh:mm:ss"),
		duration: data.duration,
		progress: data.progress || 0,
		parent: data.parent,
		worktime: data.worktime
	};
}

function getLink(data) {
	return {
		source: data.source,
		target: data.target,
		type: data.type
	};
}

function sendResponse(res, action, tid, error) {
	if (error) {
		console.log(error);
		action = "error";
	}

	var result = {
		action: action
	};
	if (tid !== undefined && tid !== null)
		result.tid = tid;

	res.send(result);
}


app.listen(port, function () {
	console.log("Server is running on port " + port + "...");
});