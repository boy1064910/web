var classTable;
Ding.ready(function(){
	var length = parseInt($(".course-list").width()/300);
	var detailList = $(".course-list").children();
	for(var i=0;i<detailList.length;i++){
		if(i==length){
			$(detailList[i]).css('clear','left');
		}
	}

	//初始化底部的日期选择器
	$(".course-detail-time-input").datetimepicker({
		'autoclose': true,
		'startDate': Ding.caculateDate(new Date(),1)
	});

	//初始化table每一行的点击事件
	$("#chooseForm tr").on("click",function(){
		$(this).find("input[type='radio']").attr("checked",true); 
	});

	//初始化选择表单中的时间
	$("#selectedTime").datetimepicker({
		'startView':0,
		'maxView':0,
		'autoclose':true,
		'language':"zh",
		'pickerPosition':'top-left'
	});
	$("#selectedTime").datetimepicker().on("show",function(e){
		$("input:radio[name='courseDetailId']").focus();
		if($("input:radio[name='courseDetailId']:checked").length==0){
			$.alert({
				title:'学术葩提示',
                content: '请先选择课时',
                confirmButton:'确定'
			});
		}
	});

	requestClassTableData();
});

function requestClassTableData(firstDate){
	var params = {};
	if(!$.isEmpty(firstDate)){
		params['firstDate'] = firstDate;
	}
	var userId = $("#userId").val();
	Ding.ajax({
		'url' : projectName + '/manager/acadamic/teach/curriculum/getClassTableInfo.shtml',
		'params' : params,
		'successCallback':function(result){
			if($.isEmpty(classTable)){
				var classRoomList = result.data.classRoomList;
				classTable = new Ding.ClassTable({
					'id' : 'classTable',
					'rowData' : classRoomList,
					'lumpClickCallback': function(config){
						clearChooseForm();
						
						$("#classRoomId").val(config.classRoomId);
						$("#classRoomName").val(config.classRoomName);
						$("#selectedDate").val(config.selectedDate);
						$("#rowIndex").val(config.rowIndex);
						$("#colIndex").val(config.colIndex);

						var date = new Date();
						var hour = date.getHours();
						var initialDate = config.selectedDate+" "+hour+":"+date.getMinutes();
						var startDate = config.selectedDate+" 07:00";
						$("#selectedTime").datetimepicker('setStartDate',startDate);
						$("#selectedTime").datetimepicker('setInitialDate',initialDate);
						if($("input:radio[name='courseDetailId']:checked").length>0){
							var tr = $("input:radio[name='courseDetailId']:checked").parent().parent();
							trClick(tr);
						}

						//打开选择窗口
						openModal({
					        'title':'选择课时',
					        'targetId':'chooseForm',
					        'sureBtnText':'分配保存',
					        'width':'900px'
					    });
					},
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
				var type = 'danger';
				if(teacherId==userId){
					if(status==3){
						type = 'success';
					}
					else{
						type = 'info';
					}
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

function submitValidation(){
	if($("input:radio[name='courseDetailId']:checked").length==0){
		$.alert({
			title:'学术葩提示',
            content: '请先选择课时',
            confirmButton:'确定'
		});
		return false;
	}
	if($.isEmpty($("#selectedTime").val())){
		$.alert({
			title:'学术葩提示',
            content: '请先选择课时开始时间',
            confirmButton:'确定'
		});
		return false;
	}
	return true;
}

//操作课时选择教室和时间成功回调方法
function chooseSuccessCallback(result){
	var id = $("input:radio[name='courseDetailId']:checked").val();
	classTable.removeLumpByDataId(id);
	//渲染表格
	var times = $("#times").val();
	var selectedTime = new Date($("#selectedTime").val());
	var startHour = selectedTime.getHours();
	var minutes = selectedTime.getMinutes();
	var endTime = parseInt(parseInt(startHour) + parseInt(times)) + ":" +minutes;
	classTable.fillTable({
		'dataId': id,
		'rowIndex':$("#rowIndex").val(),
		'colIndex':$("#colIndex").val(),
		'times':$("#times").val(),
		'startTime':startHour+":"+minutes,
		'text': $("#code").val(),
		'type': "info",
		'titler': $("#teacherName").val()+"-"+$("#name").val()+"<br/>" + $("#selectedTime").val()+' ~ '+endTime
	});
	//改变chooseForm中选择表格中的数据
	var checkedRadio = $("input:radio[name='courseDetailId']:checked");
	var courseDetailId = checkedRadio.val();
	var tr = $("tr[course-detail-id='"+courseDetailId+"']");
	$(tr.children()[3]).html($("#selectedTime").val());
	$(tr.children()[5]).html($("#classRoomName").val());
	$(tr.children()[6]).html('已安排教室');
	//渲染底部数据
	var courseInfo = $(".course-info[course-detail-id='"+courseDetailId+"']");
	courseInfo.find('input[name="startTime"]').val($("#selectedTime").val());
	courseInfo.find('input[name="classRoomName"]').val($("#classRoomName").val());
	return true;
}

function trClick(tr){
	var times = $(tr).attr("data-times");
	var code = $(tr).attr("data-code");
	var teacherName = $(tr).attr("data-teacher");
	var name = $(tr).attr("data-name");
	var info = $(tr).attr("data-info");
	$("#detailIndex").val($(tr).index());
	$("#code").val(code);
	$("#teacherName").val(teacherName);
	$("#name").val(name);
	$("#times").val(times);
	var endTime = $("#selectedDate").val()+" "+(22-times)+":00";
	$("#selectedTime").datetimepicker('setEndDate',endTime);
}

function clearChooseForm(){
	$("#selectedTime").val('');
	$("#classRoomId").val('');
	$("#rowIndex").val('');
	$("#colIndex").val('');
	$("#selectedDate").val('');
	$("#name").val('');
	$("#code").val('');
	$("#teacherName").val('');
	$("#detailIndex").val('');
	$("#times").val('');
	$("#info").val('');
	$("#classRoomName").val();
}

function submitCourse(id){
	var result = true;
	var startTimeList = $('input[name="startTime"]');
	var classRoomList = $('input[name="classRoomName"]');
	for(var i=0;i<startTimeList.length;i++){
		if($.isEmpty($(startTimeList[i]).val())){
			result = false;
			break;
		}
	}
	if(result){
		for(var i=0;i<classRoomList.length;i++){
			if($.isEmpty($(classRoomList[i]).val())){
				result = false;
				break;
			}
		}
	}
	if(!result){
		$.alert({
			title:'学术葩提示',
            content: '部分课程仍未安排，请先安排完毕再提审',
            confirmButton:'确定'
		});
		return;
	}
	Ding.ajax({
		'url': projectName + "/manager/acadamic/teach/curriculum/submitCourse.shtml",
		'params': {
			'id' : id
		},
		'successCallback': function(result){
			window.location = projectName + '/manager/acadamic/teach/curriculum/index.shtml';
		}
	})
}

// function changeTime(input){
// 	var courseInfo = $(input).parent().parent();
// 	opeateSubmitBtnStatus(courseInfo);
// }

// function changeClassRoom(selector){
// 	var courseInfo = $(selector).parent().parent();
// 	opeateSubmitBtnStatus(courseInfo);
// }

// function opeateSubmitBtnStatus(courseInfo){
// 	var startTime = $(courseInfo).find('input[name="startTime"]').val();
// 	var classRoomId = $(courseInfo).find('select[name="classRoomId"]').val();
// 	var submitBtn = $(courseInfo).children(".confirm-btn");
// 	if(!$.isEmpty(classRoomId)&&!$.isEmpty(startTime)){
// 		$(submitBtn).attr("btn-status","true");
// 		$(submitBtn).toggleClass("confirm-btn-disabled");
// 		$(submitBtn).toggleClass("confirm-btn-enabled");
// 	}
// }