document.domain = "xueshupa.net";

var domainName = "manager.xueshupa.net";
var projectName = "/acadamic-web-platform";


Ding.ajaxComplete = function(json){
	commonResultCallback(json);
}

$(document).ajaxComplete(function (evt, request, settings) {
	if(settings.dataType=="script"){//
		//TODO 加载script文件格式处理待定
	}
	else if(settings.dataType = "json"){
		//加载json文件格式处理待定
	}
	else{
		var text = request.responseText;
	    if(!Ding.isEmpty(text)){
	    	var json = eval("(" + text + ")");
	    	commonResultCallback(json);
	    }
	}
});

function commonResultCallback(json){
	if(json.code == 200){

	}
	else{
		switch(json.code){
			case 2:{
				$.alert({
					title:'学术葩提示',
		            content: '系统调用服务超时，请联系管理员',
		            confirmButton:'确定'
		        });
				break;
			}
			case 101:{
				break;
			}
			case 102:{
				break;
			}
			case 103:{
				$.alert({
					title:'学术葩提示',
		            content: '系统服务异常，请稍候重试，如需帮助，请打开公众号【学术葩教育资源平台】在线联系客服或者拨打客服电话',
		            confirmButton:'确定'
				});
				break;
			}
			case 201:{
				$.alert({
					title:'学术葩提示',
		            content: '权限受限,请联系管理员!',
		            confirmButton:'确定'
				});
				break;
			}
			case 1001:{
				$.alert({
					title:'学术葩提示',
		            content: '登录超时，请重新登录！',
		            confirmButton:'确定'
		        });
		        break;
			}
			default:{
				$.alert({
					title:'学术葩提示',
		            content: json.msg,
		            confirmButton:'确定'
		        });
			}
		}
	}
}

function back(){
	history.go(-1);
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
		modal.css("z-index",modal_z_index);
		modal_z_index++;

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