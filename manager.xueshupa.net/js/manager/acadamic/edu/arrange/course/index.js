var courseDataList;
var courseDetailList = [];
var courseStaggerDataMap = {};

var calendar;

var columns = [];
columns.push({
    // field: 'id',
    title: 'ID',
    align: 'center',
    radio: true
});
columns.push({
    field: 'teacherName',
    title: '教师名称',
    align: 'center'
});
columns.push({
    field: 'courseName',
    title: '课程名称',
    align: 'center'
});
columns.push({
    field: 'info',
    title: '课时内容标题',
    align: 'left'
});
columns.push({
    field: 'startTime',
    title: '开始时间',
    align: 'center',
    formatter : function(value,row,index){
    	if($.isEmpty(value)) return "";
    	return formatDate(new Date(value),'%Y-%M-%d %H:%m');
    }
});
columns.push({
    field: 'endTime',
    title: '结束时间',
    align: 'center',
    formatter : function(value,row,index){
    	if($.isEmpty(value)) return "";
    	return formatDate(new Date(value),'%Y-%M-%d %H:%m');
    }
});
columns.push({
    field: 'times',
    title: '课时（单位：小时）',
    align: 'center'
});
columns.push({
    field: 'status',
    title: '状态',
    align: 'center',
    formatter: function(value,row,index){
    	switch(value){
    		case 0: return '未排课';
    		case -1: return '<font color="red">该时间段已安排其他课程</font>';
    		case -2: return '<font color="red">该时间段老师无法上课</font>';
    		default : return '未知状态';
    	}
    }
});

Ding.ready(function(){
	//请求商品表格数据
    $("#chooseDataTable").bootstrapTable({
        //请求方法
        method: 'get',
        // toolbar:'#toolbar',
         //是否显示行间隔色
        // striped: true,
        //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）     
        cache: false,    
        //是否显示分页（*）  
        pagination: false,   
        showRefresh:false,
        showToggle:false,
        singleSelect: true,
        //分页方式：client客户端分页，server服务端分页（*）
        sidePagination: "server",
        //是否显示搜索
        search: false,
        idField : "id",
        uniqueId: "id",
        columns: columns,
        clickToSelect: true,
        rowStyle:function(row,index){
        	if(row.status == -1 || row.status == -2){
        		return {classes:"un-selected-tr"};
        	}
        	return "";
        },
        onCheck: function(row,tr){
        	var index = tr.attr("data-index");
        	if(row.status==-1 || row.status == -2)
        		$("#chooseDataTable").bootstrapTable("uncheck",index);
        }
    });

	$("#startTime").datetimepicker({
        format: 'hh:ii',
        pickerPosition : 'top-right',
        autoclose : true,
        minView : 0,
        maxView : 1,
        startView : 0
    });

	calendar = new Ding.Calendar({
		'id' : 'calendar',
		'tdClickCallback' : chooseCourseDetail,
		'renderDateCallback' : renderDateCallback//日历控件重置回调渲染事件
	});

	Ding.ajax({
		'url':projectName+'/manager/acadamic/edu/arrange/course/courseDataList.shtml',
		'successCallback':function(result){
			var clearIndex = $('.un-arrange-list').width() / 275;
			courseDataList = result.data;
			//初始化错开时间数据
			initStaggerData();
			//初始化选择表格数据
			initChooseTableData();
			//初始化渲染日历
			renderDateCallback();
			//渲染底部课程明细
			for(var i=0;i<courseDataList.length;i++){
				var data = courseDataList[i];
				var unArrangeCourseDiv = $('<div class="un-arrange-course"></div>');
				if(i%parseInt(clearIndex)==0){
					unArrangeCourseDiv.css('clear',"left");
				}
				var unHeader = $('<div class="un-arrange-course-header"></div>');

				unHeader.append('<span>'+data.teacherName+'</span>')
					.append('<span>'+data.name+'</span>')
					.append('<span>'+statusRender(data.status)+'</span>');
				var unSecondHeader = $('<div></div>');
				unSecondHeader.append('<span>提课时间：'+Ding.formatDate(new Date(data.submitTime),'%Y-%M-%d %H:%m')+'</span>');
				unArrangeCourseDiv.append(unHeader).append(unSecondHeader);
				var unTable = $('<table class="un-arrange-course-table"></table>');
				for(var j=0;j<data.detailList.length;j++){
					var detail = data.detailList[j];
					var tr = $('<tr></tr>');
					var ftd = $('<td>'+(j+1)+'</td>');
					var std = $('<td>'+detail.info+'</td>');
					var ttd = $('<td>'+detail.times+'小时</td>');
					tr.append(ftd).append(std).append(ttd);

					var str = $('<tr></tr>');
					var timeInput = $('<input class="form-control" type="text" placeholder="请选择上课日期时间" />');
				    timeInput.datetimepicker({
				        format: 'yyyy-mm-dd hh:ii',
				        // pickerPosition : 'top-right',
				        autoclose : true,
				        minView : 0
				    });
				    if(!$.isEmpty(detail.startTime)){
				    	timeInput.val(formatDate(new Date(detail.startTime),'%Y-%M-%d %H:%m'));
				    }
				    timeInput.on("change",datetimeChangeEvent);
				    var clearBtn = $('<button class="btn btn-xs btn-info">重置时间</button>');
				    clearBtn.on("click",clearEvent);
				    var td = $('<td colspan="3"></td>');
				    td.attr("course-detail-id",detail.id);
				    td.append(timeInput).append(clearBtn);
				    str.append(td);
					unTable.append(tr).append(str);
				}
				unArrangeCourseDiv.append(unTable);

				//课程其他相关信息-老师无法上课时间和特殊需求展示
				var courseInfo = $('<div class="course-info"></div>');
				var courseInfoList = $('<div class="course-info-list"></div>');
				var staggerTimeTab = $('<div><i class="fa fa-bell"></i></div>');
				if(data.staggerTimeDetailList.length==0){
					staggerTimeTab.addClass("no-info");
				}
				else{
					staggerTimeTab.attr("title","因私无法上课时间，请尽量避开以下时间");
					staggerTimeTab.append('<i class="fa fa-caret-down"></i>');
					var staggerTimeInfo = $('<div>因私无法上课时间，请尽量避开以下时间</div>');
					for(var j=0;j<data.staggerTimeDetailList.length;j++){
						var endTime = formatDate(new Date(data.staggerTimeDetailList[j].endTime),'%Y-%M-%d %H:%m');
						var endTimeStrArray = endTime.split(" ");
						staggerTimeInfo.append('<li>'+formatDate(new Date(data.staggerTimeDetailList[j].startTime),'%Y-%M-%d %H:%m')+' ~ '+endTimeStrArray[1]+'</li>');
					}
					staggerTimeTab.on("click",function(){
						$($(this).children()[1]).toggleClass("fa-caret-down");
						$($(this).children()[1]).toggleClass("fa-caret-up");
						$($(this).parent().next().children()[0]).slideToggle(200);
					});
					courseInfoList.append(staggerTimeInfo);
				}
				courseInfo.append(staggerTimeTab);
				
				var specialTab = $('<div><i class="fa fa-info"></i></div>');
				specialTab.attr("title","特殊情况说明");
				specialTab.append('<i class="fa fa-caret-down"></i>');
				var specialInfo = $('<div>特殊情况说明</div>');
				var infoIsEmpty = true;
				for(var j=0;j<data.specialDetailList.length;j++){
					var specialDetail = data.specialDetailList[j];
					if(!$.isEmpty(specialDetail.info)){
						specialInfo.append('<li>' + specialDetail.info+'</li>');
						infoIsEmpty = false;
					}
				}
				if(infoIsEmpty){
					specialTab.addClass("no-info");
				}
				else{
					specialTab.on("click",function(){
						$($(this).children()[1]).toggleClass("fa-caret-down");
						$($(this).children()[1]).toggleClass("fa-caret-up");
						$($(this).parent().next().children()[1]).slideToggle(200);
					});
					courseInfoList.append(specialInfo);
				}
				courseInfo.append(specialTab);
				

				unArrangeCourseDiv.append(courseInfo);
				unArrangeCourseDiv.append(courseInfoList);

				var confirmBtn = $('<div class="confirm-btn" course-id="'+data.id+'">通知教师确认课程时间</div>');
				confirmBtn.on("click",noticeEvent);
				unArrangeCourseDiv.append(confirmBtn);
				
				$('.un-arrange-list').append(unArrangeCourseDiv);
			}
		}
	})
})

function statusRender(status){
	switch(status){
		case 1: return '待排课';
		default : return '未知状态';
	}
}

//初始化选择表格数据
function initChooseTableData(){
	for(var i=0;i<courseDataList.length;i++){
		for(var j=0;j<courseDataList[i].detailList.length;j++){
			var detail = courseDataList[i].detailList[j];
			if(!$.isEmpty(detail.startTime)){
				continue;
			}
			var courseDetail = {};
			courseDetail.courseId = courseDataList[i].id;
			courseDetail.teacherId = courseDataList[i].teacherId;
			courseDetail.teacherName = courseDataList[i].teacherName;
			courseDetail.courseName = courseDataList[i].name;
			courseDetail.firstCategoryName = courseDataList[i].firstCategoryName;
			courseDetail.secondCategoryName = courseDataList[i].secondCategoryName;
			// courseDetail.info = detail.info;
			courseDetail.info = "(" +(j+1) + ")" + detail.info;
			courseDetail.id = detail.id;
			courseDetail.times = detail.times;
			courseDetail.startTime = detail.startTime;
			courseDetail.endTime = detail.endTime;
			if($.isEmpty(detail.startTime)){
				courseDetail.status = 0;
			}
			else{
				courseDetail.status = courseDataList[i].status;
			}
			courseDetail.rowIndex = j+(i*courseDataList[i].detailList.length);
			courseDetailList.push(courseDetail);
		}
	}
	var data = {};
	data.rows = courseDetailList;
	$("#chooseDataTable").bootstrapTable('load',data);
}

function initStaggerData(){
	for(var i=0;i<courseDataList.length;i++){
		var course = courseDataList[i];
		if($.isEmpty(courseStaggerDataMap[course.id])){
			courseStaggerDataMap[course.id] = [];
		}
		for(var j=0;j<course.staggerTimeDetailList.length;j++){
			courseStaggerDataMap[course.id].push(course.staggerTimeDetailList[j]);
		}
	}
}

/**
*	chooseDate，当前选择的日期，字符串格式，yyyy-MM-dd年月日格式
*	chooseHours，当前选择的时间，字符串格式，HH，小时格式
*/
function chooseCourseDetail(chooseDate,chooseHours,teacherIds){
	for(var i=0;i<courseDetailList.length;i++){
		courseDetailList[i].status = 0;
	}
	//判断点击的时间段是否存在同个老师的数据，如果是的话，则改变状态码
	if(!$.isEmpty(teacherIds)){
		var teacherIdArray = teacherIds.split(",");
		for(var i=0;i<teacherIdArray.length;i++){
			if(!$.isEmpty(teacherIdArray[i])){
				for(var j=0;j<courseDetailList.length;j++){
					if(courseDetailList[j].teacherId==teacherIdArray[i]){
						courseDetailList[j].status = -1;
					}
				}
			}
		}
	}
	//计算无法上课的课程，置灰
	var currentTime = new Date(chooseDate+" "+chooseHours+":00").getTime();
	for(var i=0;i<courseDetailList.length;i++){
		if(courseDetailList[i].status!=0){
			continue;
		}
		var courseStaggerTimeList = courseStaggerDataMap[courseDetailList[i].courseId];
		// console.log(courseStaggerTimeList);
		var staggerResult = false;
		for(var j=0;j<courseStaggerTimeList.length;j++){
			var startTime = courseStaggerTimeList[j].startTime;
			var endTime = courseStaggerTimeList[j].endTime;
			// console.log(currentTime+"--"+startTime+"--"+endTime+"--"+courseDetailList[i].courseName);
			if(currentTime>=startTime&&currentTime<=endTime){
				staggerResult = true;
				break;
			}
		}
		if(staggerResult){
			courseDetailList[i].status = -2;//时间于无法上课时间冲突
		}
		else{
			courseDetailList[i].status = 0;
		}
	}
	var data = {};
	data.rows = courseDetailList;
	$("#chooseDataTable").bootstrapTable('load',data);

	openModal({
        'title':'选择课程',
        'targetId':'chooseForm',
        'sureBtnText':'确认排课',
        'width':'900px'
    });
    $("#startDate").val(chooseDate);
    $("#startTime").val(chooseHours+":00");
    $("#startTime").datetimepicker('setStartDate',chooseDate+" "+chooseHours+":00");
    $("#startTime").datetimepicker('setEndDate',chooseDate+" "+chooseHours+":55");
}

function submitValidation(){
	var dataList = $("#chooseDataTable").bootstrapTable('getSelections');
	if(dataList.length==0){
		$.alert({
			title:'学术葩提示',
            content: '请选择课程！',
            confirmButton:'确定'
        });
        return false;
	}

	var data = dataList[0];
	if(data.status==-1){
		$.alert({
			title:'学术葩提示',
            content: '同个时间段不能安排一个老师两节课，请选择其他老师课程！',
            confirmButton:'确定'
        });
        return false;
	}
	$("#tableRowIndex").val(data.rowIndex);
	D("#chooseForm").submitParams.id = data.id;
	return true;
}

//排课成功之后回调事件
function chooseSuccess(result){
	var rowData = $("#chooseDataTable").bootstrapTable('getRowByUniqueId',result.data);
	//保存成功后，渲染表格数据
	var datetime = $("#startDate").val()+" "+$("#startTime").val();
	var courseInfo ={
		'teacherName' : rowData.teacherName,
		'info' : rowData.info,
		'startTime' : datetime,
		'endTime' : formatDate(caculateDate(new Date(datetime) , rowData.times/24),'%H:%m')
	};
	var htmler = rowData.teacherName + "<br/>" + rowData.secondCategoryName;
	var titler = rowData.teacherName + "<br/>" + rowData.firstCategoryName + "-" + rowData.secondCategoryName + "<br/>" 
		+ rowData.info + "<br/>"
		+ formatDate(new Date(datetime),'%Y-%M-%d %H:%m') + " ~ " +formatDate(caculateDate(new Date(datetime) , rowData.times/24),'%H:%m');
	calendar.arrange(new Date(datetime),rowData.times,htmler,titler,rowData.teacherId,result.data);
	//从弹出框选择表格中的数据移除数据
	$("#chooseDataTable").bootstrapTable('removeByUniqueId',result.data);

	//补充缓存的json课程明细数据
	for(var i=0;i<courseDataList.length;i++){
		var data = courseDataList[i];
		for(var j=0;j<data.detailList.length;j++){
			var detail = data.detailList[j];
			if(detail.id==result.data){
				courseDataList[i].detailList[j].startTime = new Date(datetime);
				courseDataList[i].detailList[j].endTime = new Date($("#startDate").val()+" "+formatDate(caculateDate(new Date(datetime) , rowData.times/24),'%H:%m'));
				break;
			}
		}
	}
	//从选择表格的数据中剔除已经排课的数据
	for(var i=0;i<courseDetailList.length;i++){
		if(courseDetailList[i].id==result.data){
			courseDetailList.splice(i,1);
			break;
		}
	}
	//补充底部未安排的时间数据
	$("td[course-detail-id='"+result.data+"']").children('input').val(datetime);
}

//日历初始化成功之后回调方法
function renderDateCallback(){
	for(var i=0;i<courseDataList.length;i++){
		var data = courseDataList[i];
		for(var j=0;j<data.detailList.length;j++){
			var detail = data.detailList[j];
			if(!$.isEmpty(detail.startTime)){
				//渲染日历表格
				var htmler = data.teacherName + "<br/>" + data.secondCategoryName;
				var titler = data.teacherName + "<br/>" + data.firstCategoryName + "-" + data.secondCategoryName + "<br/>" 
					+ "(" + (j+1)+")"+detail.info + "<br/>"
					+ formatDate(new Date(detail.startTime),'%Y-%M-%d %H:%m') + " ~ " +formatDate(caculateDate(new Date(detail.startTime) , detail.times/24),'%H:%m');
				calendar.arrange(new Date(detail.startTime),detail.times,htmler,titler,data.teacherId,detail.id);
			}
		}
	}
}

//重置时间按钮点击事件
function clearEvent(){
	var courseDetailId = $(this).parent().attr("course-detail-id");
	var startTime = $(this).prev().val();
	if($.isEmpty(startTime)) return;
	var _this = this;
	Ding.ajax({
		'url' : projectName + '/manager/acadamic/edu/arrange/course/resetCourseDetail.shtml',
		'params' : {
			'id' : courseDetailId
		},
		'successCallback' : function(result){
			$(_this).prev().val('');
			calendar.clear(new Date(startTime),courseDetailId);

			//删除缓存的json课程明细数据
			for(var i=0;i<courseDataList.length;i++){
				var data = courseDataList[i];
				for(var j=0;j<data.detailList.length;j++){
					var detail = data.detailList[j];
					if(detail.id==courseDetailId){
						courseDataList[i].detailList[j].startTime = '';
						courseDataList[i].detailList[j].endTime = '';
						break;
					}
				}
			}

			//重新计算选择表格的数据
			initChooseTableData();
		}
	})
}

function datetimeChangeEvent(){
	if($.isEmpty($(this).val()))
		return;
	var courseDetailId = $(this).parent().attr("course-detail-id");
	var datetimes = $(this).val().split(" ");
	var startDate = datetimes[0];
	var startTime = datetimes[1];
	Ding.ajax({
		'url' : projectName + '/manager/acadamic/edu/arrange/course/arrangeCourseDetail.shtml',
		'params' : {
			'id' : courseDetailId,
			'startDate' : startDate,
			'startTime' : startTime
		},
		'successCallback' : function(result){
			$("#startDate").val(startDate);
			$("#startTime").val(startTime);
			chooseSuccess(result);
		}
	});
}

function noticeEvent(){
	var courseId = $(this).attr("course-id");
	Ding.ajax({
		'url' : projectName + '/manager/acadamic/edu/arrange/course/noticeCourse.shtml',
		'params' : {
			'id' : courseId
		},
		'successCallback' : function(result){
			alert("success");
			// $("#startDate").val(startDate);
			// $("#startTime").val(startTime);
			// chooseSuccess(result);
		}
	});
}