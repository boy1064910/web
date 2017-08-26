var classTable;
var queryClassRoomData = 0;
Ding.ready(function(){
	//初始化选择表单中的时间
	$("#selectedTime").datetimepicker({
		// 'startView':0,
		'maxView':1,
		'autoclose':true,
		'language':"zh",
		'startDate':new Date()	
	});
	var firstDate = new Date(Ding.formatDate(new Date($("#startDate").val())).split(" ")[0]+" 00:00");
	requestClassTableData(firstDate);
});

function requestClassTableData(firstDate){
	var params = {};
	params['firstDate'] = firstDate;
	params['courseId'] = $("#courseId").val();
	params['queryClassRoomData'] = queryClassRoomData;
	var requestTeacherId = $("#requestTeacherId").val();
	Ding.ajax({
		'url' : projectName + '/manager/acadamic/edu/course/audit/getClassTableInfo.shtml',
		'params' : params,
		'successCallback':function(result){
			queryClassRoomData = 1;
			if($.isEmpty(classTable)){
				D("#classRoomId").loadData(result.data.classRoomList);//教室选择器加载数据
				var classRoomList = result.data.classRoomList;
				classTable = new Ding.ClassTable({
					'id' : 'classTable',
					'firstDate': firstDate,
					'rowData' : classRoomList,
					'dateChangedCallback':function(config){
						requestClassTableData(config.firstDate);
					}
				});

				var classRoomSelectors = $(".course-detail-classroom-selector");
				for(var i=0;i<classRoomSelectors.length;i++){
					D("#"+$(classRoomSelectors[i]).attr("id")).loadData(classRoomList);
				}
			}
			else{
				classTable.firstDate = firstDate;
				classTable.renderDate();
				classTable.clearTable();
			}
			
			var courseDetailList = result.data.courseDetailList;
			for(var i=0;i<courseDetailList.length;i++){
				var courseDetail = courseDetailList[i];
				var times = courseDetail.times;
				var selectedTime = new Date(courseDetail.startTime);
				var startTime = Ding.formatDate(selectedTime,'%H:%m');
				var endTime = Ding.formatDate(new Date(selectedTime.getTime() + times * 60*60*1000),'%H:%m');
				var teacherName = courseDetail.teacherName;
				var courseName = courseDetail.courseName;
				var teacherId = courseDetail.teacherId;
				var status = courseDetail.status;
				var classRoomId = courseDetail.classRoomId;
				var code = courseDetail.code;
				var type = 'success';
				if(teacherId==requestTeacherId){
					type = 'danger';
				}
				classTable.fillTable({
					'dataId': courseDetail.id,
					'rowIndex':classTable.getRowIndex(classRoomId),
					'colIndex':classTable.getColIndex(selectedTime),
					'times':times,
					'startTime':startTime,
					'text': code,
					'type': type,
					'titler': teacherName+"-"+courseName+"<br/>" + startTime+' ~ '+endTime
				});
			}
		}
	});
}

function trClick(tr){
	var startTime = $(tr).attr("data-start-time");

	if(new Date(startTime).getTime()<classTable.firstDate.getTime() || new Date(startTime).getTime()>classTable.lastDate.getTime()){
		var firstDate = startTime.split(" ")[0];
		requestClassTableData(new Date(firstDate));
	}
}

function trMourseOver(id){
	$("div[data-id='"+id+"']").addClass("ding-class-table-body-r-time-lump-hover");
}

function trMourseOut(id){
	$("div[data-id='"+id+"']").removeClass("ding-class-table-body-r-time-lump-hover");
}

function initChangeDate(btn,trId){
	$("#courseTime").html($(btn).attr("course-time"));
	$("#courseInfo").html($(btn).attr("course-info"));
	$("#courseTimes").html($(btn).attr("course-times-text"));
	$("#times").val($(btn).attr("course-times"));
	$("#selectedTime").val($(btn).attr("start-time"));
	D("#classRoomId").setValue($(btn).attr("class-room-id"));
	$("#courseDetailId").val($(btn).attr("course-detail-id"));
	$("#trId").val($(btn).attr("tr-id"));
	$("#courseCode").val($(btn).attr("course-code"));
	$("#teacherName").val($(btn).attr("teacher-name"));
	openModal({
		'title':'调整课时',
		'targetId':'changeForm',
		'sureBtnText':'提交保存'
	});
}

function changeSuccessCallback(result){
	var trId = $("#trId").val();
	var tr = $("#"+trId);
	var startTimeTd = tr.children()[4];
	var endTimeTd = tr.children()[5];
	var classRoomTd = tr.children()[6];

	var startTime = $("#selectedTime").val();
	var endTime = Ding.formatDate(new Date(new Date($("#selectedTime").val()).getTime() + $("#times").val() * 60 * 60 * 1000),'%Y-%M-%d %H:%m');
	var classRoom = $("#classRoomId option:selected").text(); 
	var classRoomId = $("#classRoomId").val();

	$(startTimeTd).html(startTime);
	$(endTimeTd).html(endTime);
	$(classRoomTd).html(classRoom);

	var id = $("#courseDetailId").val();
	classTable.removeLumpByDataId(id);
	var times = $("#times").val();
	var selectedTime = new Date($("#selectedTime").val());
	var startHour = selectedTime.getHours();
	var minutes = selectedTime.getMinutes();
	var endTime = parseInt(parseInt(startHour) + parseInt(times)) + ":" +minutes;

	var rowIndex = classTable.getRowIndex(classRoomId);
	var colIndex = classTable.getColIndex(new Date(startTime.split(" ")[0]));
	classTable.fillTable({
		'dataId': id,
		'rowIndex':rowIndex,
		'colIndex':colIndex,
		'times':times,
		'startTime':startHour+":"+minutes,
		'text': $("#courseCode").val(),
		'type': "danger",
		'titler': $(tr.children()[1]).html()+"-"+$(tr.children()[2]).html()+"<br/>" + startHour+":"+minutes+' ~ '+endTime
	});
}

function checkDetail(btn){
	var dataChecked = $(btn).attr("data-checked");
	if(dataChecked=="true"){
		$(btn).attr("data-checked","false");
	}
	else{
		$(btn).attr("data-checked","true");
	}
	$(btn).toggleClass('fa-checked-success');
}

function submitCourse(id){
	var checkerList = $('i[name="courseDetailChecker"]');
	var result = true;
	for(var i=0;i<checkerList.length;i++){
		console.log($(checkerList[i]).attr('data-checked'));
		if($(checkerList[i]).attr('data-checked')=="false"){
			result = false;
			break;
		}
	}
	if(!result){
		$.alert({
			title:'学术葩提示',
            content: '有课时尚未确认，请先确认时间和教室是否需要重新安排，如不需要重新安排，请点击最右侧的勾！',
            confirmButton:'确定'
		})
		return;
	}

	$.confirm({
        backgroundDismiss: true,
        title:'审核课程',
        content: '课程是否审核通过 ？',
        confirmButton:'确定',
        cancelButton:'取消',
        confirmButtonClass:'btn-success',
        confirm:function(){
            Ding.ajax({
                'url':projectName+'/manager/acadamic/edu/course/audit/auditCourse.shtml',
                'params':{
                    'id' : id
                },
                'method':'post',
                'successCallback':function(result){
                    window.location = projectName + '/manager/acadamic/edu/course/audit/index.shtml';
                }
            });
        }
    });
}