Ding.ready(function(){
	$("[name='arrangeCourseRoleId']").bootstrapSwitch({
		'size':'mini',
		'onColor':'danger',
		'offColor':'primary',
		'onSwitchChange':request
	});

	$("[name='approveTeacherRoleId']").bootstrapSwitch({
		'size':'mini',
		'onColor':'danger',
		'offColor':'primary',
		'onSwitchChange':configApproveTeacherRole
	});

	//初始化教务处首页功能角色ID switch
	var academicOfficeIndexRoleIds = $("#academicOfficeIndexRoleIds").val().split(",");
	var academicOfficeIndexRoleList = $("[name='academicOfficeIndexRoleId']");
	for(var i=0;i<academicOfficeIndexRoleList.length;i++){
		var state = false;
		for(var j=0;j<academicOfficeIndexRoleIds.length;j++){
			if($(academicOfficeIndexRoleList[i]).val()==academicOfficeIndexRoleIds[j]){
				state = true;
				break;
			}
		}

		$(academicOfficeIndexRoleList[i]).bootstrapSwitch({
			'size':'mini',
			'onColor':'danger',
			'offColor':'primary',
			'state' : state,
			'onSwitchChange':configAcademicOfficeIndexRole
		});
	}
});

function request(e,data){
	var val = "";
	if(data){
		val = $(this).val();
	}
	var _this = this;
	Ding.ajax({
		'url':projectName+'/manager/acadamic/edu/business/config/configArrangeCourseRole.shtml',
		'params':{
			'roleId' : val
		},
		'successCallback':function(result){
			var others = $("input[name='arrangeCourseRoleId']");
			if($(_this).bootstrapSwitch('state')==true){
				for(var i=0;i<others.length;i++){
					if(_this!=others[i]&&$(others[i]).bootstrapSwitch('state')==true){
						$(others[i]).off("switchChange.bootstrapSwitch");
						$(others[i]).bootstrapSwitch('state',!data);
						$(others[i]).on("switchChange.bootstrapSwitch",request);
					}
				}	
			}
		},
		'failCallback':function(result){
			$(_this).off("switchChange.bootstrapSwitch");
			$(_this).bootstrapSwitch('state',!data);
			$(_this).on("switchChange.bootstrapSwitch",request);
		}
	});
}

function configApproveTeacherRole(e,data){
	var val = "";
	if(data){
		val = $(this).val();
	}
	var _this = this;
	Ding.ajax({
		'url':projectName+'/manager/acadamic/edu/business/config/configApproveTeacherRole.shtml',
		'params':{
			'roleId' : val
		},
		'successCallback':function(result){
			var others = $("input[name='approveTeacherRoleId']");
			if($(_this).bootstrapSwitch('state')==true){
				for(var i=0;i<others.length;i++){
					if(_this!=others[i]&&$(others[i]).bootstrapSwitch('state')==true){
						$(others[i]).off("switchChange.bootstrapSwitch");
						$(others[i]).bootstrapSwitch('state',!data);
						$(others[i]).on("switchChange.bootstrapSwitch",configApproveTeacherRole);
					}
				}	
			}
		},
		'failCallback':function(result){
			$(_this).off("switchChange.bootstrapSwitch");
			$(_this).bootstrapSwitch('state',!data);
			$(_this).on("switchChange.bootstrapSwitch",configApproveTeacherRole);
		}
	});
}

function configAcademicOfficeIndexRole(e,data){
	var roleIds = "";
	var list = $("[name='academicOfficeIndexRoleId']");
	for(var i=0;i<list.length;i++){
		if($(list[i]).bootstrapSwitch('state')==true){
			roleIds+=$(list[i]).val()+",";
		}
	}
	console.log(roleIds);
	Ding.ajax({
		'url':projectName+'/manager/acadamic/edu/business/config/configAcademicOfficeIndexRole.shtml',
		'params':{
			'roleIds' : roleIds
		},
		'successCallback':function(result){
			
		},
		'failCallback':function(result){
			$(_this).bootstrapSwitch('state',!data);
		}
	});
}