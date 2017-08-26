var picIntroduces = {};

var aRandomCode = 'SwedenCompany';
var logoDiv;
var edittitlePageUrlDiv;
var columns = [];
columns.push({
    field: 'id',
    title: 'ID',
    align: 'center'
});
columns.push({
    field: 'logo',
    title: '企业LOGO',
    align: 'center',
    formatter: function(value,row,index){
        return '<img src="'+value+'" width="30px" />';
    }
});
columns.push({
    field: 'ename',
    title: '企业英文名称',
    align: 'center'
});
columns.push({
    field: 'name',
    title: '企业中文名称',
    align: 'center'
});
columns.push({
    field: 'address',
    title: '企业地址',
    align: 'center'
});
columns.push({
    field: 'contactPhone',
    title: '联系电话',
    align: 'center'
});
columns.push({
    field: 'contactEmail',
    title: '联系邮箱',
    align: 'center'
});
columns.push({
    field: 'id',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result ;
        result = '<a href="javascript:void(0)" onclick="initEdit('+row.id+','+index+')" title="编辑">编辑</a>';
        result+='<a href="javascript:void(0)" onclick="initDelete('+row.id+')" title="删除">删除</a>';
        return result;
    }
});

Ding.ready(function(){
    //请求商品表格数据
    $("#dataTable").bootstrapTable({
        //请求方法
        method: 'get',
        // toolbar:'#toolbar',
         //是否显示行间隔色
        striped: true,
        //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）     
        cache: false,    
        //是否显示分页（*）  
        pagination: true,   
        //是否启用排序  
        sortable: false,    
        //排序方式 
        sortOrder: "asc",    
        //初始化加载第一页，默认第一页
        pageNumber:1,   
        //每页的记录行数（*）   
        pageSize: 50,  
        //可供选择的每页的行数（*）    
        pageList: [20, 50, 150, 300],
        showRefresh:false,
        showToggle:false,
        singleSelect: false,
        //这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  
        url: projectName+"/manager/data/pageInfo.shtml",
        //查询参数,每次调用是会带上这个参数，可自定义
        queryParams : function(params) {
            return {
                currentIndex : params.offset + 1,
                pageSize : params.limit,
                aRandomCode : aRandomCode
            };
        },
        //分页方式：client客户端分页，server服务端分页（*）
        sidePagination: "server",
        //是否显示搜索
        search: false,  
        // formatSearch:function(){
        //     return '买手店名称';
        // },
        // searchOnEnterKey:true,
        idField : "id",
        uniqueId: "id",
        columns: columns,
        // detailFormatter:function(index, row){
        //     console.log(row);
        // },
        onLoadSuccess:function(result){
            commonResultCallback(result);
        }
    });

    DingUploaderManager.loadSign(function() {
        logoDiv = new Ding.FileUploader({
            'id' : 'logo',
            'limitType' : 'jpg,png,bmp,jpeg',
            'preventDuplicate' : false,
            'needPreview' : false,
            'completeCallback' : function(uploader,files){
                // console.log(uploader);
                $("#logoTip").next('img').remove();
                $("#cropperImage").cropper('replace',DingUploaderManager.host+"/"+files[0].uploadPath);
            }
        });
    });

    $('#cropperImage').cropper({
        strict : true,
        viewMode: 2,
        dragMode : 'move',
        aspectRatio: 1,
        autoCropArea:1,
        cropBoxMovable:true,
        cropBoxResizable:true,
        checkCrossOrigin : false
    });
});

function resetForm(){
    logoDiv.reset();
    $("#logoTip").nextAll('img').remove();
    for(var i in picIntroduces){
        delete picIntroduces[i];
    }
    $("#addBtnDiv").nextAll().remove();

    $('#cropperImage').attr('src','');
    $('#cropperImage').next().remove();
    $('#cropperImage').cropper({
        strict : true,
        viewMode: 2,
        dragMode : 'move',
        aspectRatio: 1,
        autoCropArea:1,
        cropBoxMovable:true,
        cropBoxResizable:true,
        checkCrossOrigin : false
    });
    $("#ename").val('');
    $("#name").val('');
    $("#address").val('');
    $("#contactPhone").val('');
    $("#contactEmail").val('');
}

function initAdd(){
    resetForm();
    D("#addForm").submitValidation = 'submitValidation';
    D("#addForm").successCallback = 'insertSuccess';
    D("#addForm").action = projectName+'/manager/sweden/company/insertCompany.shtml';
    openModal({
        'title':'添加企业信息',
        'targetId':'addForm',
        'sureBtnText':'保存',
        'width':'900px'
    });
}

function initAddInfo(detail){
    var contentTextarea = $('<textarea intro-type="info" class="form-control" rows="6"></textarea>');
    var contentDiv = $('<div class="col-lg-8"></div>');
    contentDiv.append(contentTextarea);
    var label = $('<label class="col-lg-2 col-sm-2 control-label" style="padding-top:0"></label>');
    var delBtn;
    if($.isEmpty(detail)){
        delBtn = $('<button type="button" class="btn btn-danger" onclick="removeInfo(this)">删除</button>');
    }
    else{
        delBtn = $('<button type="button" class="btn btn-danger" onclick="removeInfo(this,'+detail.id+')">删除</button>');
    }
    label.append(delBtn);

    var formGroup = $('<div class="form-group"></div>');
    formGroup.append(label).append(contentDiv);
    $("#addBtnDiv").parent().append(formGroup);

    if(!$.isEmpty(detail)){
        delBtn.attr("data-id",detail.id);
        contentTextarea.val(detail.info);
        contentTextarea.attr("data-id",detail.id);
    }
}

function initAddImage(detail){
    var id = Ding.randomId();
    var picContent = $('<div intro-type="pic" id="'+id+'"></div>');
    var contentDiv = $('<div class="col-lg-8"></div>');
    contentDiv.append(picContent);

    var label = $('<label class="col-lg-2 col-sm-2 control-label" style="padding-top:0"></label>');
    var delBtn;
    if($.isEmpty(detail)){
        delBtn = $('<button type="button" class="btn btn-danger" onclick="removeInfo(this)">删除</button>');
    }
    else{
        delBtn = $('<button type="button" class="btn btn-danger" onclick="removeInfo(this,'+detail.id+')">删除</button>');
    }
    label.append(delBtn);
    
    var formGroup = $('<div class="form-group"></div>');
    formGroup.append(label).append(contentDiv);

    $("#addBtnDiv").parent().append(formGroup);

    var picUploader = new Ding.FileUploader({
        'id' : id,
        'limitType' : 'jpg,png,bmp,jpeg',
        'preventDuplicate' : true,
        'needPreview' : true,
        'completeCallback' : function(uploader,files){
            $("#progress"+uploader.files[0].id).parent().prev().remove();
            //清除上传器中的文件
            $("#progress"+uploader.files[0].id).remove();
            $("#percentSpan"+uploader.files[0].id).parent().remove();
        }
    });
    picIntroduces[id] = picUploader;

    if(!$.isEmpty(detail)){
        var previewImg = $('<div class="img-preview-div"></div>');
        previewImg.css('background-image','url("'+detail.imgUrl+'"');
        var jpreviewDiv = $('<div class="preview-div"></div>');
        jpreviewDiv.append(previewImg);
        picUploader.jcontainer.append(jpreviewDiv);
        picContent.attr("data-id",detail.id);
    }
}

function removeInfo(btn,id){
    $(btn).parent().parent().remove();
    if(!$.isEmpty(id)){
        $("#index").after('<input type="hidden" name="deleteIds" value="'+id+'" />');
    }
}

function submitValidation(){
    if(logoDiv.uploader.files.length==0){
        $.alert({
            title:'温馨提示',
            content: '请上传企业LOGO',
            confirmButton:'确定'
        });
        return false;
    }
    if(!logoDiv.completed){
        $.alert({
            title:'温馨提示',
            content: '企业LOGO尚未上传完成，请耐心等待上传完成后再点击保存',
            confirmButton:'确定'
        });
        return false;
    }

    var intros = $("#addBtnDiv").nextAll();
    if(intros.length==0){
        $.alert({
            title:'温馨提示',
            content: '请填写企业相关介绍',
            confirmButton:'确定'
        });
        return false;
    }
    var introInfos = [];
    var introTypes = [];
    var introResult = true;
    for(var i=0;i<intros.length;i++){
        var intro = $(intros[i]).find('[intro-type]');
        if(intro.attr("intro-type")=="info"){
            if($.isEmpty(intro.val())){
                introResult = false;
                break;
            }
            introInfos.push(encodeURIComponent(intro.val()));
            introTypes.push(1);
        }
        else{
            var picIntro = picIntroduces[intro.attr("id")];
            if(picIntro.uploader.files.length==0){
                introResult = false;
                break;
            }
            introInfos.push(picIntro.uploader.files[0].uploadPath);
            introTypes.push(2);
        }
    }
    if(!introResult){
        $.alert({
            title:'温馨提示',
            content: '企业介绍的文字信息或者图片信息不能为空！',
            confirmButton:'确定'
        });
        return false;
    }
    var cropperData = $('#cropperImage').cropper('getData');
    D("#addForm").submitParams = {
        'x' : cropperData.x,
        'y' : cropperData.y,
        'width' : cropperData.width,
        'height' : cropperData.height,
        'logo' : logoDiv.uploader.files[0].uploadPath
    }
    D("#addForm").submitParams['infos'] = introInfos;
    D("#addForm").submitParams['types'] = introTypes;
    return true;
}

function insertSuccess(result){
    $("#dataTable").bootstrapTable('append',result.data);
}

function initDelete(id){
    $.confirm({
        backgroundDismiss: true,
        title:'删除企业信息',
        content: '是否删除企业信息 ?',
        confirmButton:'删除',
        cancelButton:'取消',
        confirmButtonClass:'btn-success',
        confirm:function(){
            Ding.ajax({
                'url':projectName+'/manager/sweden/company/deleteCompany.shtml',
                'params':{
                    'id' : id
                },
                'method':'post',
                'successCallback':function(result){
                    $("#dataTable").bootstrapTable('removeByUniqueId',id);
                }
            });
        }
    });
}


function initEdit(id,index){
    resetForm();
    $("input[name='deleteIds']").remove();

    D("#addForm").submitValidation = 'updateSubmitValidation';
    D("#addForm").successCallback = 'updateSuccess';
    D("#addForm").action = projectName+'/manager/sweden/company/updateCompany.shtml';
    $("#index").val(index);
    $("#id").val(id);
    Ding.ajax({
        'url' : projectName + '/manager/sweden/company/getById.shtml',
        'params' : {
            'id' : id
        },
        'successCallback' : function(result){
            var data = result.data;
            $("#logoTip").after('<img height="150px" src="'+data.logo+'" />');
            $("#ename").val(data.ename);
            $("#name").val(data.name);
            $("#address").val(data.address);
            $("#contactPhone").val(data.contactPhone);
            $("#contactEmail").val(data.contactEmail);

            var detailList = data.detailList;
            for(var i=0;i<detailList.length;i++){
                var detail = detailList[i];
                if(detail.type==1){
                    initAddInfo(detail);
                }
                else{
                    initAddImage(detail);
                }
            }
            openModal({
                'title':'编辑企业信息',
                'targetId':'addForm',
                'sureBtnText':'保存',
                'width':'900px'
            });
        }
    });
}   

function updateSubmitValidation(){
    var intros = $("#addBtnDiv").nextAll();
    if(intros.length==0){
        $.alert({
            title:'温馨提示',
            content: '请填写企业相关介绍',
            confirmButton:'确定'
        });
        return false;
    }
    var introIds = [];
    var introInfos = [];
    var introTypes = [];
    var introResult = true;
    console.log(picIntroduces);
    return false;
    for(var i=0;i<intros.length;i++){
        var intro = $(intros[i]).find('[intro-type]');
        if($.isEmpty(intro.attr("data-id"))){//data-id 属性数据为空，为新增的明细数据
            introIds.push(0);
        }
        else{
            introIds.push(intro.attr("data-id"));
        }
        if(intro.attr("intro-type")=="info"){
            if($.isEmpty(intro.val())){
                introResult = false;
                break;
            }
            introInfos.push(encodeURIComponent(intro.val()));
            introTypes.push(1);
        }
        else{
            var picIntro = picIntroduces[intro.attr("id")];
            if($.isEmpty(intro.attr("data-id"))){//属于新增的明细图片
                if(picIntro.uploader.files.length==0){
                    introResult = false;
                    break;
                }
                else{
                    introInfos.push(picIntro.uploader.files[0].uploadPath);
                }
            }
            else{//属于编辑的明细图片
                if(picIntro.uploader.files.length==0){
                    introInfos.push("old-data");
                }
                else{
                    introInfos.push(picIntro.uploader.files[0].uploadPath);
                }
            }
            introTypes.push(2);
        }
    }
    if(!introResult){
        $.alert({
            title:'温馨提示',
            content: '企业介绍的文字信息或者图片信息不能为空！',
            confirmButton:'确定'
        });
        return false;
    }

    if(logoDiv.uploader.files.length!=0){
        var cropperData = $('#cropperImage').cropper('getData');
        D("#addForm").submitParams = {
            'x' : cropperData.x,
            'y' : cropperData.y,
            'width' : cropperData.width,
            'height' : cropperData.height,
            'logo' : logoDiv.uploader.files[0].uploadPath
        }
    }

    D("#addForm").submitParams['infoIds'] = introIds;
    D("#addForm").submitParams['infos'] = introInfos;
    D("#addForm").submitParams['types'] = introTypes;
    return true;
}

function updateSuccess(result){
    var index = $("#index").val();
    $("#dataTable").bootstrapTable('updateRow',{
        'index' : index,
        'row' : result.data
    });
}