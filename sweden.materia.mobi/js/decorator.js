Ding.ready(function(){
	Ding.ajax({
		'url':projectName+'/manager/data/authority/getUserAuthorityList.shtml',
		successCallback:function(result){
			var data = result.data;
			var firstMenuList = [];
			var secondMenuList = {};
			var firstIndex = 0;
			var currentSelectMenuId = 0;//当前选中的菜单ID和父级菜单ID

			for(var index in data){//处理菜单分类（一级、二级）
				if(data[index].pid==0){
					firstMenuList.push(data[index]);
				}
				else{
					if(Ding.isEmpty(secondMenuList[data[index].pid]))
						secondMenuList[data[index].pid] = [];
					secondMenuList[data[index].pid].push(data[index]);
				}
				if(!Ding.isEmpty(data[index].url)){
					var menuCatalog = window.location.pathname.substring(window.location.pathname.indexOf("/",2));//从链接当中截取第二个"/"分隔符，获取菜单目录
					var centerMenuCatalog = menuCatalog.substring(0,menuCatalog.lastIndexOf("/"));//倒数截取第一个分隔符前面的字段，获取菜单目录
					var dataUrl = data[index].url.substring(0,data[index].url.lastIndexOf("/"));//倒数截取最后一个分隔符之前的字段，获取配置的菜单目录
					// 正斜线个数大于1并且路径前缀一致
					if(data[index].url.match(/(\/)/g).length>1&&centerMenuCatalog.indexOf(dataUrl)!=-1){
						//当前选中菜单
						currentSelectMenuId = data[index].id;
					}
				}
			}

			var selectedMenu = null;
			for(var index in firstMenuList){
				var a = $('<a href="#"></a>');
				//菜单图标
				var ico = $('<i class="fa"></i>');
				if(Ding.isEmpty(firstMenuList[index].ico)){
					ico.addClass("fa-laptop");
				}
				else{
					ico.addClass("fa-"+firstMenuList[index].ico);
				}
				//菜单栏名称
				var span = $('<span>'+firstMenuList[index].name+'</span>');
				a.append(ico).append(span);
				var li = $('<li class="menu-list"></li>');
				li.append(a);
				$("#mNavMenu").append(li);
				//二级菜单
				var ul = $('<ul class="sub-menu-list"></ul>');
				for(var secondIndex in secondMenuList[firstMenuList[index].id]){
					var sli = $('<li><a href="'+projectName+secondMenuList[firstMenuList[index].id][secondIndex].url+'" >'+secondMenuList[firstMenuList[index].id][secondIndex].name+'</a></li>');
					ul.append(sli);
					if(currentSelectMenuId==secondMenuList[firstMenuList[index].id][secondIndex].id){
						selectedMenu = sli;
					}
				}
				li.append(ul);
			}
			
			if(Ding.isEmpty(selectedMenu)){
				$($("#mNavMenu").children()[0]).addClass("active");
				$("#mMenuText").html("HOME");
				$("#mBreadCrumb").remove();
			}
			else{
				$(selectedMenu).addClass("active");
				$(selectedMenu).parent().parent().addClass("nav-active");

				var currentMenuName = $(selectedMenu).children()[0].innerHTML;
				var currentParentMenuName = $(selectedMenu).parent().prev().children()[1].innerHTML;
				$("#mMenuText").html(currentMenuName);
				$("#mMenuText").attr("href",$($(selectedMenu).children()[0]).attr("href"));
				$("#pMenuText").html(currentParentMenuName);
			}
			controlMenu();
		}
	});

	// Ding.ajax({
	// 	'url':projectName+'/system/user/info/list.shtml',
	// 	successCallback:function(result){
	// 		var data = result.data;
	// 		$("#mSystemInfoCount").html(result.count);
	// 		$("#mSystemInfoCountHtml").html("您有"+result.count+"条新消息");
	// 		if($.isEmpty(data)) return;
	// 		for(var i=0;i<data.length;i++){
	// 			var info = data[i];
	// 			var li = $('<li></li>');
 //    			var descSpan = $('<span class="desc"></span>');
 //    			var nameSpan = $('<span class="name">'+info.sender+'</span>');
 //    			if(info.status==0){
 //    				nameSpan.append('<span class="badge badge-success">new</span>');
 //    			}
 //    			var msgSpan = $('<span class="msg">'+info.title+'</span>');
 //    			descSpan.append(nameSpan).append(msgSpan);

 //    			var a = $('<a></a>');
 //    			a.append('<span class="thumb"><img src="'+info.senderHeader+'"/></span>');
 //    			a.append(descSpan);
 //    			a.attr("onclick","openSystemInfoModal('"+info.id+"','"+info.sender+"','"+info.senderHeader+"','"+info.lastUpdateTime+"','"+info.title+"','"+info.content+"','"+info.status+"',this)");
 //    			// a.on("click",function(){
 //    			// 	openSystemInfoModal(info);
 //    			// })

 //    			li.append(a);
 //    			$('#mSystemInfo').prepend(li);
	// 		}
	// 	}
	// });
});

//注销
function logout(){
	Ding.ajax({
		'url':projectName+'/manager/entry/logout.shtml',
		'params':{
			'domain' : document.domain,
			'path' : "/"
		},
		successCallback:function(result){
			window.location.href = "/login.html";
		}
	});
}

function openSystemInfoModal(id,sender,senderHeader,lastUpdateTime,title,content,status,info){
	var modal = $("#mSystemInfoModal");
	modal.find(".modal-title").html(title);

	$("#mSystemInfoSenderHeader").attr("src",senderHeader);
	$("#mSystemInfoSender").html(sender);
	$("#mSystemInfoTime").html(Ding.formatDate(new Date(parseInt(lastUpdateTime)),'%Y-%M-%d %H:%m'));

	modal.find(".view-mail").html(content);
	modal.modal();

	if(status==1) return;
	Ding.ajax({
		'url':projectName+"/system/user/info/updateStatus.shtml",
		'params':{
			'id':id
		},
		'successCallback':function(result){
			var count = parseInt($("#mSystemInfoCount").html())-1;
			$("#mSystemInfoCount").html(count);
			$("#mSystemInfoCountHtml").html("您有"+count+"条新消息");
			// $(info).parent().remove();
		}
	});
}

var modal_z_index = 1050;
function openModal(options){
	var targetId = options.targetId;
	var modal;
	if($.isEmpty($("#mModal"+targetId)[0])){
		modal = $("#mModal").clone();
		modal.attr("id","mModal"+targetId);
		$("body").append(modal);
		
		if($.isEmpty(options.zIndex)){
			modal.css("z-index",modal_z_index);
			modal_z_index++;
		}
		else{
			modal.css("z-index",options.zIndex);
		}

		modal.find(".modal-body").append($("#"+options.targetId));
	}
	else{
		modal = $("#mModal"+targetId);
	}

	if(!Ding.isEmpty(options.title)){
		modal.find(".modal-title").html(options.title);
	}

	if(!$.isEmpty(options.width)){
		modal.find(".modal-dialog").width(options.width);
	}

	if(!$.isEmpty(options.height)){
		modal.find(".modal-body").height(options.height);
		modal.find(".modal-body").css("overflow-y","auto");
	}

	if(!$.isEmpty(options.cancelBtnText)){
		modal.find("#mCancelBtn").html(options.cancelBtnText);
	}

	if(!$.isEmpty(options.sureBtnText)){
		modal.find("#mSureBtn").html(options.sureBtnText);
	}
	else{
		modal.find("#mSureBtn").hide();
	}

	if(!$.isEmpty(options.sureNextBtnText)){
		modal.find("#mSureNextBtn").html(options.sureNextBtnText);
	}

	if(!Ding.isEmpty(options.sureCallback)){
		modal.find("#mSureBtn").show();
		modal.find("#mSureBtn").off("click");
		modal.find("#mSureBtn").on("click",function(){
			var result = options.sureCallback();			
			if(result!=false){
				modal.modal('hide');
			}
		});
	}
	else{
		modal.find("#mSureBtn").off("click");
		modal.find("#mSureBtn").on("click",function(){		
			var result = D("#"+options.targetId).submit();
			if(result!=false){
				modal.modal('hide');
			}
		});
	}

	if(!Ding.isEmpty(options.sureNextCallback)){
		modal.find("#mSureNextBtn").show();
		modal.find("#mSureNextBtn").off("click");
		modal.find("#mSureNextBtn").on("click",function(){
			options.sureNextCallback();
		});
	}
	else{
		modal.find("#mSureNextBtn").hide();
	}


	$("#"+options.targetId).show();
	modal.modal();

	var targetModalZindex = $("#mModal"+targetId).css('z-index');
	modal.next(".modal-backdrop").css('z-index',targetModalZindex-1);
}

function closeModal(id){
	$("#mModal"+id).modal('hide');
}



function previewImg(img){
    if(!$.isEmpty(img.src)){
        var offset = $(img).offset();

        var top=0,left=0;
        if($(document).height()-offset.top<200){
            top = offset.top-200;
        }
        else{
            top = offset.top;
        }

        if($(document).width()-offset.left<200){
            left = offset.left-200;
        }
        else{
            left = offset.left+$(img).width();
        }

        var previewImg = $('<img src="'+img.src+'" class="img-preview-d" />');
        $("body").append(previewImg);
        previewImg.css({
            'top':top,
            'left':left
        });
    }
    
}
function hidePreviewImg(){
    $(".img-preview-d").remove();
}