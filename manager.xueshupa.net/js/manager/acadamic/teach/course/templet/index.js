var aRandomCode = 'AcadamicCourseTemplet';
var titlePageUrlDiv;
var edittitlePageUrlDiv;
var columns = [];
columns.push({
    field: 'id',
    title: 'ID',
    align: 'center'
});
columns.push({
    field: 'name',
    title: '课程模版名称',
    align: 'center'
});
columns.push({
    field: 'firstCategoryName',
    title: '一级课程类别',
    align: 'center'
});
columns.push({
    field: 'secondCategoryName',
    title: '二级课程类别',
    align: 'center'
});
columns.push({
    field: 'courseStyle',
    title: '课程类型',
    align: 'center'
});
columns.push({
    field: 'minCount',
    title: '最小开班人数（人）',
    align: 'center'
});
columns.push({
    field: 'maxCount',
    title: '最大开班人数（人）',
    align: 'center'
});
columns.push({
    field: 'price',
    title: '课程价格（￥）',
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
    Ding.ajax({
        'url' : projectName + "/manager/data/category/list.shtml",
        'params' : {
            'pid' : 0
        },
        'successCallback':function(result){
            D("#firstCategoryId").loadData(result.data);
            D("#editfirstCategoryId").loadData(result.data);
        }
    });

    Ding.ajax({
        'url':projectName+'/manager/data/dictionary/list.shtml',
        'params' : {
            'code': 'COURSE_STYLE'
        },
        'successCallback':function(result){
            D("#courseStyle").loadData(result.data);
            D("#editcourseStyle").loadData(result.data);
        }
    })

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
        titlePageUrlDiv = new Ding.FileUploader({
            'id' : 'titlePageUrl',
            'limitType' : 'jpg,png,bmp,jpeg',
            'preventDuplicate' : true,
            'needPreview' : false,
            'completeCallback' : function(uploader,files){
                // console.log(uploader);
                $("#cropperImage").cropper('replace',DingUploaderManager.host+"/"+files[0].uploadPath);
            }
        });

        edittitlePageUrlDiv = new Ding.FileUploader({
            'id' : 'edittitlePageUrl',
            'limitType' : 'jpg,png,bmp,jpeg',
            'preventDuplicate' : true,
            'needPreview' : false,
            'completeCallback' : function(uploader,files){
                // console.log(uploader);
                $("#edittitlePageImg").hide();
                $("#editcropperImage").cropper('replace',DingUploaderManager.host+"/"+files[0].uploadPath);
            }
        });
    });

    $('#cropperImage').cropper({
        strict : true,
        viewMode: 3,
        dragMode : 'move',
        aspectRatio: 16 / 9,
        autoCropArea:1,
        cropBoxMovable:true,
        cropBoxResizable:true,
        checkCrossOrigin : false
    });
});

function initAdd(){
    openModal({
        'title':'添加课程模版',
        'targetId':'addForm',
        'sureBtnText':'保存',
        'width':'900px'
    });
}

function initAddDetail(btn){
    var parent = $(btn).parents(".common-after");
    var copyDetail = $(parent).clone();
    $(parent).parent().append(copyDetail);
    copyDetail.find("#btnDiv").empty();
    copyDetail.find("#btnDiv").append('<button class="btn btn-danger" type="button" onclick="deleteDetail(this)"><i class="fa fa-minus"></i></button>');
    copyDetail.find("[name='infos']").val('');
    copyDetail.find("[name='ids']").val('');
    copyDetail.find("[name='times']").val('');

    var detailParent = $(parent).parent();
    renderPlaceHolder(detailParent);
}

function deleteDetail(btn,id){
    var detailParent = $(btn).parents(".common-after").parent();
    $(btn).parent().parent().remove();
    if(!$.isEmpty(id)){
        var val = $("#deleteIds").val()+id+",";
        $("#deleteIds").val(val);
    }
    renderPlaceHolder(detailParent);
}

//重置排序顺序
function renderPlaceHolder(detailParent){
    var inputs = $(detailParent).find("input[name='infos']");
    for(var i=0;i<inputs.length;i++){
        $(inputs[i]).attr("placeholder","第"+(i+1)+"节课课程内容");
    }
}

function firstCategoryChangeEvent(pid,secondDomId,secondDomValue){
    Ding.ajax({
        'url' : projectName + "/manager/data/category/list.shtml",
        'params' : {
            'pid':pid
        },
        'successCallback':function(result){
            D("#"+secondDomId).loadData(result.data);
            $("#"+secondDomId).val(secondDomValue);
        }
    })
}

function submitValidation(){
    if(titlePageUrlDiv.uploader.files.length==0){
        $.alert({
            title:'学术葩提示',
            content: '请上传课程封面图',
            confirmButton:'确定'
        });
        return false;
    }
    if(!titlePageUrlDiv.completed){
        $.alert({
            title:'学术葩提示',
            content: '封面图尚未上传完成，请耐心等待上传完成后再点击保存',
            confirmButton:'确定'
        });
        return false;
    }
    var titlePageUrl = titlePageUrlDiv.uploader.files[0].uploadPath;
    var cropperData = $('#cropperImage').cropper('getData');
    D("#addForm").submitParams = {
        'firstCategoryName' : $("#firstCategoryId").find("option:selected").text(),
        'secondCategoryName' : $("#secondCategoryId").find("option:selected").text(),
        'x' : cropperData.x,
        'y' : cropperData.y,
        'width' : cropperData.width,
        'height' : cropperData.height,
        'titlePageUrl' : titlePageUrl
    }
    return true;
}

function insertSuccess(result){
    titlePageUrlDiv.reset();
    $('#cropperImage').attr('src','');
    $('#cropperImage').next().remove();
    $('#cropperImage').cropper({
        strict : true,
        viewMode: 3,
        dragMode : 'move',
        aspectRatio: 16 / 9,
        autoCropArea:1,
        cropBoxMovable:true,
        cropBoxResizable:true,
        checkCrossOrigin : false
    });
    $("#name").val('');
    $("#firstCategoryId").val('');
    $("#secondCategoryId").val('');
    $("#courseStyle").val('');
    $("#info").val('');
    $("#minCount").val('');
    $("#maxCount").val('');
    $("#price").val('');
    $(".common-after").nextAll().remove();
    $("#dataTable").bootstrapTable('append',result.data);
}

function initEdit(id,index){

    edittitlePageUrlDiv.reset();
    $('#editcropperImage').attr('src','');
    $('#editcropperImage').next().remove();
    $('#editcropperImage').cropper({
        strict : true,
        viewMode: 3,
        dragMode : 'move',
        aspectRatio: 16 / 9,
        autoCropArea:1,
        cropBoxMovable:true,
        cropBoxResizable:true,
        checkCrossOrigin : false
    });

    var children = $("#editForm").find(".common-after").parent().children();    
    for(var i=1;i<children.length;i++){
        $(children[i]).remove();
    }
    $("#deleteIds").val('');
    $("#index").val(index);
    Ding.ajax({
        'url' : projectName + '/manager/acadamic/teach/course/templet/getById.shtml',
        'params' : {
            'id' : id
        },
        'successCallback' : function(result){
            var data = result.data;
            $("#index").val(index);
            $("#editid").val(data.id); 
            $("#editname").val(data.name);
            $("#edittitlePageImg").attr("src",data.titlePageUrl);
            $("#edittitlePageImg").show();
            $("#editfirstCategoryId").val(data.firstCategoryId);
            firstCategoryChangeEvent(data.firstCategoryId,"editsecondCategoryId",data.secondCategoryId);
            $("#editcourseStyle").val(data.courseStyle);
            $("#editinfo").val(data.info);
            $("#editminCount").val(data.minCount);
            $("#editmaxCount").val(data.maxCount);
            $("#editprice").val(data.price);

            var detailList = data.detailList;
            $("#editForm").find("[name='infos']").val(detailList[0].info);
            $("#editForm").find("[name='times']").val(detailList[0].times);
            $("#editForm").find("[name='ids']").val(detailList[0].id);

            if(detailList.length>1){
                for(var i=1;i<detailList.length;i++){
                    var copyDetail = $(children[0]).clone();
                    $(children[0]).parent().append(copyDetail);
                    copyDetail.find("[name='infos']").val(detailList[i].info);
                    copyDetail.find("[name='times']").val(detailList[i].times);
                    copyDetail.find("[name='ids']").val(detailList[i].id);
                    copyDetail.find("#btnDiv").empty();
                    copyDetail.find("#btnDiv").append('<button class="btn btn-danger" type="button" onclick="deleteDetail(this,'+detailList[i].id+')"><i class="fa fa-minus"></i></button>');
                }
            }

            openModal({
                'title':'编辑课程模版',
                'targetId':'editForm',
                'sureBtnText':'保存',
                'width':'900px'
            });
        }
    });
}   

function editsubmitValidation(){
    if(edittitlePageUrlDiv.uploader.files.length!=0){
        if(!edittitlePageUrlDiv.completed){
            $.alert({
                title:'学术葩提示',
                content: '封面图尚未上传完成，请耐心等待上传完成后再点击保存',
                confirmButton:'确定'
            });
            return false;
        }
        var titlePageUrl = edittitlePageUrlDiv.uploader.files[0].uploadPath;
        var cropperData = $('#editcropperImage').cropper('getData');
        D("#editForm").submitParams.titlePageUrl = titlePageUrl;
        D("#editForm").submitParams.x = cropperData.x;
        D("#editForm").submitParams.y = cropperData.y;
        D("#editForm").submitParams.width = cropperData.width;
        D("#editForm").submitParams.height = cropperData.height;
    }
    D("#editForm").submitParams.firstCategoryName = $("#editfirstCategoryId").find("option:selected").text();
    D("#editForm").submitParams.secondCategoryName = $("#editsecondCategoryId").find("option:selected").text();
    return true;
}

function initDelete(id){
    $.confirm({
        backgroundDismiss: true,
        title:'删除课程模版',
        content: '是否删除课程模版 !',
        confirmButton:'删除',
        cancelButton:'取消',
        confirmButtonClass:'btn-success',
        confirm:function(){
            Ding.ajax({
                'url':projectName+'/manager/acadamic/teach/course/templet/deleteCourseTemplet.shtml',
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

function editupdateSuccess(result){
    $("#dataTable").bootstrapTable('updateRow',{
        'index' : $("#index").val(),
        'row' : result.data
    });
}