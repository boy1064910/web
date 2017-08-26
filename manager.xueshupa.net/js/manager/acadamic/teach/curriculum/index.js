var aRandomCode = 'AcadamicCurriculum';
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
    title: '课程名称',
    align: 'center'
});
columns.push({
    field: 'firstCategoryName',
    title: '课程类别',
    align: 'center',
    formatter: function(value,row,index){
        return value+"-"+row.secondCategoryName;
    }
});
columns.push({
    field: 'courseStyle',
    title: '课程类型',
    align: 'center'
});
columns.push({
    field: 'price',
    title: '课程价格',
    align: 'center',
    formatter: function(value,row,index){
        return '￥'+value;
    }
});
columns.push({
    field: 'minCount',
    title: '开班人数',
    align: 'center',
    formatter: function(value,row,index){
        return value + " ~ " + row.maxCount;
    }
});
columns.push({
    field: 'enrollCount',
    title: '已报名人数',
    align: 'center'
});
columns.push({
    field: 'submitTime',
    title: '提课时间',
    align: 'center',
    formatter: function(value,row,index){
        return Ding.formatDate(new Date(value),'%Y-%M-%d %H:%m');
    }
});
columns.push({
    field: 'status',
    title: '课程状态',
    align: 'center',
    formatter : function(value,row,index){
        switch(value){
            case 1 : return '<font color="grey">待排课</font>';
            case 2 : return '<font color="blue">课程审核中</font>';
            case 3 : return '<font color="green">课程发布报名中</font>';
            default : return '未知状态';
        }
    }
});
columns.push({
    field: 'id',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result ="";
        if(row.status==1){
            result += '<a href="javascript:void(0)" onclick="initEdit('+row.id+','+index+')" title="编辑">编辑</a>';
            result += '<a href="javascript:void(0)" onclick="initArrangeCourse('+row.id+')" title="排课">排课</a>';
            result+='<a href="javascript:void(0)" onclick="initDelete('+row.id+')" title="删除">删除</a>';
        }
        return result;
    }
});

var choosecolumns = [];
choosecolumns.push({
    radio: true,
    field: 'id',
    title: 'ID',
    align: 'center'
});
choosecolumns.push({
    field: 'name',
    title: '课程模版名称',
    align: 'center'
});
choosecolumns.push({
    field: 'firstCategoryName',
    title: '一级课程类别',
    align: 'center'
});
choosecolumns.push({
    field: 'secondCategoryName',
    title: '二级课程类别',
    align: 'center'
});
choosecolumns.push({
    field: 'courseStyle',
    title: '课程类型',
    align: 'center'
});
choosecolumns.push({
    field: 'titlePageUrl',
    title: '课程模版封面',
    align: 'center',
    formatter : function(value,row,index){
        return '<img src="'+value+'" height="100px" />';
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
        }
    });

    Ding.ajax({
        'url':projectName+'/manager/data/dictionary/list.shtml',
        'params' : {
            'code': 'COURSE_STYLE'
        },
        'successCallback':function(result){
            D("#courseStyle").loadData(result.data);
        }
    })

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

    $("#chooseDataTable").bootstrapTable({
        method: 'get',
        striped: true,    
        cache: false,    
        pagination: false,   
        sortable: false,    
        sortOrder: "asc",    
        clickToSelect: true,
        showRefresh:false,
        showToggle:false,
        singleSelect: false,
        sidePagination: "server",
        search: false,  
        idField : "id",
        uniqueId: "id",
        columns: choosecolumns
    });

    DingUploaderManager.loadSign(function() {
        titlePageUrlDiv = new Ding.FileUploader({
            'id' : 'titlePageUrl',
            'limitType' : 'jpg,png,bmp,jpeg',
            'preventDuplicate' : true,
            'needPreview' : false,
            'completeCallback' : function(uploader,files){
                $("#titlePageImg").hide();
                $("#cropperImage").cropper('replace',DingUploaderManager.host+"/"+files[0].uploadPath);
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

    loadCourseTempletData();
});

function loadCourseTempletData(){
    Ding.ajax({
        'url' : projectName + '/manager/acadamic/teach/course/templet/list.shtml',
        'successCallback' : function(result){
            var data = {};
            data.rows = result.data;
            $("#chooseDataTable").bootstrapTable('load',data);
        }
    })
}

function initAdd(){
    openModal({
        'title':'添加课程',
        'targetId':'addForm',
        'sureBtnText':'保存课程信息',
        'width':'900px',
        'sureCallback': saveCourse
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

//提课前校验
function submitValidation(){
    var aForm = $("#addForm");

    var courseTempletId = aForm.find("#courseTempletId").val();
    //获取封面图链接
    if(courseTempletId==0){//没有使用模版
        if(titlePageUrlDiv.uploader.files.length!=0){//有上传封面图
            D("#addForm").submitParams.titlePageUrl = titlePageUrlDiv.uploader.files[0].uploadPath;
            var cropperData = $('#cropperImage').cropper('getData');
            D("#addForm").submitParams.x = cropperData.x,
            D("#addForm").submitParams.y = cropperData.y,
            D("#addForm").submitParams.width = cropperData.width,
            D("#addForm").submitParams.height = cropperData.height;
        }
        else{//没有上传封面图
            $.alert({
                title:'学术葩提示',
                content: '请上传课程封面图',
                confirmButton:'确定'
            });
            return false;
        }
    }
    else{//使用模版
        if(titlePageUrlDiv.uploader.files.length!=0){//有上传封面图
            if(!titlePageUrlDiv.completed){
                $.alert({
                    title:'学术葩提示',
                    content: '封面图尚未上传完成，请耐心等待上传完成后再点击保存',
                    confirmButton:'确定'
                });
                return false;
            }
            else{
                D("#addForm").submitParams.titlePageUrl = titlePageUrlDiv.uploader.files[0].uploadPath;
                var cropperData = $('#cropperImage').cropper('getData');
                D("#addForm").submitParams.x = cropperData.x,
                D("#addForm").submitParams.y = cropperData.y,
                D("#addForm").submitParams.width = cropperData.width,
                D("#addForm").submitParams.height = cropperData.height;
            }
        }
        else{//没有上传封面图
            D("#addForm").submitParams.titlePageUrl = $("#titlePageImg").attr("src");
        }
    }

    D("#addForm").submitParams.firstCategoryName = $("#firstCategoryId").find("option:selected").text();
    D("#addForm").submitParams.secondCategoryName = $("#secondCategoryId").find("option:selected").text();
    
    return true;
}

function saveCourse(){
    D("#addForm").action = projectName + '/manager/acadamic/teach/curriculum/insertCourse.shtml';
    D("#addForm").submit();
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
    $("#dataTable").bootstrapTable('prepend',result.data);
}

function openChooseModal(formId,btn){
    openModal({
        'title':'选择课程模版信息',
        'targetId':'chooseForm',
        'sureBtnText':'保存',
        'width':'800px',
        'sureCallback':function(){
            var dataList = $("#chooseDataTable").bootstrapTable('getSelections');
            if(dataList.length!=1){
                $.alert({
                    title:'学术葩提示',
                    content: '请选择课程模版',
                    confirmButton:'确定'
                });
                return false;
            }
            var courseTempletData = $("#chooseDataTable").bootstrapTable('getSelections')[0];

            $(btn).nextAll().remove();
            $(btn).after('<span>已选择模版：'+courseTempletData.name+'</span>');

            $("#"+formId).find('[name="courseTempletId"]').val(courseTempletData.id);
            $("#"+formId).find('[name="name"]').val(courseTempletData.name);
            $("#"+formId).find('[name="firstCategoryId"]').val(courseTempletData.firstCategoryId);
            firstCategoryChangeEvent(courseTempletData.firstCategoryId,'secondCategoryId',courseTempletData.secondCategoryId);
            $("#"+formId).find('[name="courseStyle"]').val(courseTempletData.courseStyle);
            $("#"+formId).find('[name="info"]').val(courseTempletData.info);
            $("#"+formId).find('[name="minCount"]').val(courseTempletData.minCount);
            $("#"+formId).find('[name="maxCount"]').val(courseTempletData.maxCount);
            $("#"+formId).find('[name="price"]').val(courseTempletData.price);
            $("#"+formId).find("#titlePageImg").attr('src',courseTempletData.titlePageUrl);
            $("#"+formId).find("#titlePageImg").show();

            var detailList = courseTempletData.detailList;
            $("#"+formId).find("[name='infos']").val(detailList[0].info);
            $("#"+formId).find("[name='times']").val(detailList[0].times);

            var children = $("#"+formId).find(".common-after").parent().children();    
            for(var i=1;i<children.length;i++){
                $(children[i]).remove();
            }

            if(detailList.length>1){
                for(var i=1;i<detailList.length;i++){
                    var copyDetail = $(children[0]).clone();
                    $(children[0]).parent().append(copyDetail);
                    copyDetail.find("[name='infos']").val(detailList[i].info);
                    copyDetail.find("[name='times']").val(detailList[i].times);
                    copyDetail.find("#btnDiv").empty();
                    copyDetail.find("#btnDiv").append('<button class="btn btn-danger" type="button" onclick="deleteDetail(this)"><i class="fa fa-minus"></i></button>');
                }
            }
            return true;
        }
    });
}

function initAddStaggerTime(btn){
    var timeInput = $('<input class="form-control stragger_date" name="straggerDates" type="text" placeholder="请选择日期" />');
    timeInput.datetimepicker({
        format: 'yyyy-mm-dd',
        pickerPosition : 'top-right',
        autoclose : true,
        minView : 2
    });
    var startTimeSelector = $('<select class="form-control stragger_time" name="straggerStartTimes"></select>');
    for(var i=0;i<24;i++){
        startTimeSelector.append('<option value="'+i+'">'+i+'点</option>');
    }
    var endTimeSelector = $('<select class="form-control stragger_time" name="straggerEndTimes"></select>');
    for(var i=0;i<24;i++){
        endTimeSelector.append('<option value="'+i+'">'+i+'点</option>');
    }
    endTimeSelector.val(23);
    var removeBtn = $('<button class="btn btn-danger" type="button" onclick="removeStraggerTime(this)"><i class="fa fa-minus"></i></button>');
    var div = $('<div class="col-lg-12 form-group stragger_div"></div>');
    div.append(timeInput).append(startTimeSelector).append('<span class="stragger_text">至</span>').append(endTimeSelector).append(removeBtn);
    $(btn).parent().parent().append(div);
}

function removeStraggerTime(btn){
    $(btn).parent().remove();
}

function initDelete(id){
    var row = $("#dataTable").bootstrapTable('getRowByUniqueId',id);
    switch(row.status){
        case -2:{
            break;
        }
        case -1:
        case 0:{
            break;
        }
        case 1:{
            $.alert({
                title:'学术葩提示',
                content: '课程正在排课，无法删除，请通知教务老师撤回后即可删除',
                confirmButton:'确定'
            })
            break;
        }
        case -2:{
            break;
        }
        default:{
            break;
        }
    }
}

function initArrangeCourse(id){
    this.location = projectName + '/manager/acadamic/teach/curriculum/initArrangeCourse.shtml?id='+id;
}