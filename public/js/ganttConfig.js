var scaleLevel = 6;
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";

gantt.config.columns = [
    {resize:true, name:"text",  label:"任务名称", with:'*',min_width: 329, tree:true },
    {resize:true, name:"start_date", label:"开始日期",width:90, align:"center" },
    {resize:true, name:"end_date", label:"结束日期",width:90, align:"center" },
    {resize:true, name:"duration",   label:"工期", width:40,align:"center" },
    {resize:true, name:"worktime",  label:"工时",  width:50, align:"center" },
    {resize:true, name:"add",  label:"",width:40, align:"center" }
];


gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"time", height:24, map_to:"auto", type:"duration", time_format:["%Y","%m","%d"]},
	{name:"worktime", height:50, map_to:"worktime", type:"textarea",focus:true}
];

gantt.locale.labels.section_worktime = "工时";
gantt.config.auto_scheduling = true;
gantt.config.work_time = true;
gantt.config.scale_unit = "year";
gantt.config.step = 1;
gantt.config.scale_height = 54; 
gantt.config.task_date = "%Y-%m-%d";
gantt.config.date_scale = "%Y年";
gantt.templates.date_scale = null;
gantt.config.open_tree_initially = true;
gantt.config.subscales = [
     {unit: "month", step: 4, date: "%M"}
 ];

gantt.templates.time_picker = function(date){
    return gantt.date.date_to_str(gantt.config.time_picker)(date);
};

function setScaleConfig(level) {
    switch (level) {
        case 1:		           
        	gantt.config.scale_unit = "month";
			gantt.config.date_scale = "%Y年%M";
			gantt.config.scale_height = 54; 

			var weekScaleTemplate = function (date) {
				var dateToStr = gantt.date.date_to_str("%M%d号");
				var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
				return dateToStr(date) + " - " + dateToStr(endDate);
			};


			gantt.config.subscales = [
			    {unit:"week", step:1, template:weekScaleTemplate},
			    {unit:"day", step:1, date:"星期%D" }
			];
            break;
        case 2:		            
        	gantt.config.scale_unit = "month";
			gantt.config.date_scale = "%Y年%M";
			gantt.config.scale_height = 54; 

			var weekScaleTemplate = function (date) {
				var dateToStr = gantt.date.date_to_str("%M%d号");
				var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
				return dateToStr(date) + " - " + dateToStr(endDate);
			};


			gantt.config.subscales = [
			    {unit:"week", step:1, template:weekScaleTemplate},
			    {unit:"day", step:2, date:"星期%D" }
			];
            break;
        case 3:
            gantt.config.scale_unit = "month";
			gantt.config.date_scale = "%Y年%M";
			gantt.config.scale_height = 54; 

			var weekScaleTemplate = function (date) {
				var dateToStr = gantt.date.date_to_str("%M%d号");
				var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
				return dateToStr(date) + " - " + dateToStr(endDate);
			};


			gantt.config.subscales = [
			    {unit:"week", step:1, template:weekScaleTemplate},
			    {unit:"day", step:3, date:"星期%D" }
			];
            break;
        case 4:
            gantt.config.scale_unit = "month";
			gantt.config.date_scale = "%Y年%M";
			gantt.config.scale_height = 54; 

			var weekScaleTemplate = function (date) {
				var dateToStr = gantt.date.date_to_str("%d");
				var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
				return dateToStr(date) + " - " + dateToStr(endDate);
			};


			gantt.config.subscales = [
			    {unit:"week", step:1, template:weekScaleTemplate},
			];
            break;
        case 5:
            gantt.config.scale_unit = "year";
            gantt.config.step = 1;
            gantt.config.date_scale = "%Y年";
            gantt.templates.date_scale = null;
 
            gantt.config.min_column_width = 50;
			gantt.config.scale_height = 54; 
 
            gantt.config.subscales = [
                {unit: "month", step: 1, date: "%M"}
            ];
            break;
        case 6:
            gantt.config.scale_unit = "year";
            gantt.config.step = 1;
            gantt.config.date_scale = "%Y年";
            gantt.templates.date_scale = null;
 
            gantt.config.min_column_width = 50;
            gantt.config.scale_height = 54;
 
            gantt.config.subscales = [
                {unit: "month", step: 2, date: "%M"}
            ];
            break;
        case 7:
            gantt.config.scale_unit = "year";
            gantt.config.step = 1;
            gantt.config.scale_height = 54; 

            gantt.config.date_scale = "%Y年";
            gantt.templates.date_scale = null;
	
            gantt.config.subscales = [
                {unit: "month", step: 4, date: "%M"}
            ];
            break;
    }
}
