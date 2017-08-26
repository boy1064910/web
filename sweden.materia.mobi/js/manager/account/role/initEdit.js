

Ding.ready(function(){
	Ding.ajax({
		'url':projectName+'/manager/account/role/authority/selectAuthorityListByRoleId.shtml',
		'params':{
			'roleId':$("#roleId").val()
		},
		'successCallback':function(result){
			exsitAuthorityIds = result.data;
			loadChildrenAuthorities();
		}
	});
});

function reloadAuthority(pid){
	loadAuthorityTab(pid);
}
