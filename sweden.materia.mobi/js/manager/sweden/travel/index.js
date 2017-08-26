var picIntroduces = {};

var aRandomCode = 'SwedenTravel';
var surface;
var edittitlePageUrlDiv;
var columns = [];
columns.push({
    field: 'id',
    title: 'ID',
    align: 'center'
});
columns.push({
    field: 'surface',
    title: '行程封面',
    align: 'center',
    formatter: function(value,row,index){
        return '<img src="'+value+'" width="30px" />';
    }
});
columns.push({
    field: 'name',
    title: '行程标题',
    align: 'center'
});
columns.push({
    field: 'userCount',
    title: '行程人数',
    align: 'center'
});
columns.push({
    field: 'id',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result ;
        result = '<a href="javascript:void(0)" onclick="initEdit('+row.id+','+index+')" title="编辑">编辑</a>';
        result += '<a href="javascript:void(0)" onclick="loadTravelUserData('+row.id+')" title="配置成员信息">配置成员信息</a>';
        result +='<a href="javascript:void(0)" onclick="initDelete('+row.id+')" title="删除">删除</a>';
        return result;
    }
});

var travelUserColumns = [];
travelUserColumns.push({
    field: 'id',
    title: 'ID',
    align: 'center'
});
travelUserColumns.push({
    field: 'head',
    title: '用户头像',
    align: 'center',
    formatter: function(value,row,index){
        if($.isEmpty(value)) return '';
        return '<img src="'+value+'" width="30px" />';
    }
});
travelUserColumns.push({
    field: 'userPhone',
    title: '用户手机号',
    align: 'center'
});
travelUserColumns.push({
    field: 'nickName',
    title: '昵称',
    align: 'center'
});
travelUserColumns.push({
    field: 'name',
    title: '姓名',
    align: 'center'
});
travelUserColumns.push({
    field: 'id',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result = '';
        result+='<a href="javascript:void(0)" onclick="initDeleteTravelUser('+row.id+')" title="删除">删除</a>';
        return result;
    }
});

var travelDateCompanyColumns = [];
travelDateCompanyColumns.push({
    field: 'companyName',
    title: '企业名称',
    align: 'center'
});
travelDateCompanyColumns.push({
    field: 'id',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result = '';
        result+='<a href="javascript:void(0)" onclick="deleteTravelDateCompany('+row.id+')" title="删除">删除</a>';
        return result;
    }
});

var companyColumns = [];
companyColumns.push({
    checkbox: true,
    title: 'ID',
    align: 'center'
});
companyColumns.push({
    field: 'logo',
    align: 'center',
    title: '企业LOGO',
    formatter: function(value,row,index){
        if($.isEmpty(value)) return '';
        return '<img src="'+value+'" width="30px" />';
    }
});
companyColumns.push({
    field: 'name',
    title: '企业名称',
    align: 'center',
});

Ding.ready(function(){
    $("#dataTable").bootstrapTable({
        method: 'get',
        striped: true,
        cache: false,     
        pagination: true,   
        sortable: false,    
        sortOrder: "asc",    
        pageNumber:1,   
        pageSize: 50,  
        pageList: [20, 50, 150, 300],
        showRefresh:false,
        showToggle:false,
        singleSelect: false,
        url: projectName+"/manager/data/pageInfo.shtml",
        queryParams : function(params) {
            return {
                currentIndex : params.offset + 1,
                pageSize : params.limit,
                aRandomCode : aRandomCode
            };
        },
        sidePagination: "server",
        search: false,  
        idField : "id",
        uniqueId: "id",
        columns: columns,
        onLoadSuccess:function(result){
            commonResultCallback(result);
        }
    });

    $("#travelUserDataTable").bootstrapTable({
        method: 'get',
        striped: true,
        cache: false,    
        pagination: false,   
        sortable: false,    
        sortOrder: "asc",    
        showRefresh:false,
        singleSelect: false,
        sidePagination: "server",
        search: false,
        searchOnEnterKey:false,
        idField : "id",
        uniqueId: "id",
        url: '',
        columns: travelUserColumns
    });

    $("#travelDateCompanyTable").bootstrapTable({
        method: 'get',
        striped: true,
        cache: false,    
        pagination: false,   
        sortable: false,    
        sortOrder: "asc",    
        showRefresh:false,
        singleSelect: false,
        sidePagination: "server",
        search: false,  
        searchOnEnterKey:false,
        idField : "id",
        uniqueId: "id",
        columns: travelDateCompanyColumns
    });

    $("#companyTable").bootstrapTable({
        method: 'get',
        striped: true,
        cache: false,    
        pagination: false,   
        sortable: false,    
        sortOrder: "asc",    
        showRefresh:false,
        singleSelect: false,
        sidePagination: "server",
        search: false,  
        searchOnEnterKey:false,
        idField : "id",
        uniqueId: "id",
        checkboxHeader: true,
        clickToSelect:true,
        columns: companyColumns
    });

    Ding.ajax({
        'url' : projectName+"/manager/sweden/travel/date/company/selectCompanyList.shtml",
        'successCallback' : function(result){
            var data = {};
            data.rows = result.data;
            $("#companyTable").bootstrapTable('load',data);
        }
    })

    DingUploaderManager.loadSign(function() {
        surface = new Ding.FileUploader({
            'id' : 'surface',
            'limitType' : 'jpg,png,bmp,jpeg',
            'preventDuplicate' : false,
            'needPreview' : false,
            'completeCallback' : function(uploader,files){
                // console.log(uploader);
                $("#logoTip").next('img').remove();
                $("#cropperImage").cropper('replace',DingUploaderManager.host+"/"+files[0].uploadPath);
            }
        });

        photoUploader = new Ding.FileUploader({
            'id' : 'photoUploader',
            'limitType' : 'jpg,png,bmp,jpeg',
            'multiSelection' : true,
            'preventDuplicate' : false,
            'needPreview' : true,
            'showChecker' : true,
            'initCallback':function(){
                this.jselector.after('<button class="btn btn-danger" style="margin-left:8px;" onclick="deletePhotos()" type="button"><i class="fa fa-minus"> 删除照片</i></button>');
            },
            'completeCallback' : function(uploader,files){
                var filePaths = [];
                for(var i=0;i<files.length;i++){
                    filePaths.push(files[i].uploadPath);
                }
                Ding.ajax({
                    'url' : projectName + '/manager/sweden/travel/uploadTravelDatePic.shtml',
                    'params':{
                        'filePaths' : filePaths,
                        'travelDateId' : $("#travelDateId").val()
                    },
                    'successCallback' : function(result){
                        var ids = result.data;
                        for(var i=0;i<files.length;i++){
                            photoUploader.setCheckerDataId(files[i].id,ids[i]);
                        }
                        //清除上传器中的文件
                        for(var i=uploader.files.length-1;i>=0;i--){
                            $("#progress"+uploader.files[i].id).remove();
                            $("#percentSpan"+uploader.files[i].id).parent().remove();
                            uploader.removeFile(uploader.files[i]);
                        }
                    }
                })
            }
        });
    });

    $('#cropperImage').cropper({
        strict : true,
        viewMode: 2,
        dragMode : 'move',
        aspectRatio: 17/8,
        autoCropArea:1,
        cropBoxMovable:true,
        cropBoxResizable:true,
        checkCrossOrigin : false
    });
});

function loadTravelUserData(id){
    $("#travelId").val(id);
    Ding.ajax({
        'url' : projectName+"/manager/sweden/travel/user/selectListByTravelId.shtml",
        'params' : {
            'travelId' : id
        },
        'successCallback' : function(result){
            var data = {};
            data.rows = result.data;
            $("#travelUserDataTable").bootstrapTable('load',data);
            openModal({
                'title':'配置用户信息',
                'targetId':'userForm'
            });
        }
    })
}

function resetForm(){
    surface.reset();
    $("#logoTip").nextAll('img').remove();
    $("#addBtnDiv").nextAll().remove();

    $("input[name='delTravelDateIds']").remove();
    $("input[name='delTravelDateDetailIds']").remove();

    $('#cropperImage').attr('src','');
    $('#cropperImage').next().remove();
    $('#cropperImage').cropper({
        strict : true,
        viewMode: 2,
        dragMode : 'move',
        aspectRatio: 17/8,
        autoCropArea:1,
        cropBoxMovable:true,
        cropBoxResizable:true,
        checkCrossOrigin : false
    });
    $("#id").val('');
    $("#index").val('');
    $("#name").val('');
}

function initAdd(){
    resetForm();
    openModal({
        'title':'添加行程信息',
        'targetId':'form',
        'sureBtnText':'保存',
        'width':'900px'
    });
}

function initAddDatePoint(detail){
    var travelDateId = $.isEmpty(detail)?'0':detail.id;
    var travelDate = $.isEmpty(detail)?'':Ding.formatDate(new Date(detail.travelDate),'%Y-%M-%d');
    
    //初始化日期节点
    var dateEventDiv = $('<div></div>');
    var dateInput = $('<input class="form-control form-control-30" name="travelDates" type="text"'
        +' placeholder="请选择行程节点日期" value="'+travelDate+'"'
        +' validations="required" validationTips="不能为空" />');
    var dateIdInput = $('<input name="travelDateIds" type="hidden" value="'+travelDateId+'"/>');
    dateInput.datetimepicker({
        format: 'yyyy-mm-dd',
        startView: 2,
        minView:2,
        todayBtn: true,
        autoclose: true,
        startDate: new Date(),
        pickerPosition: 'top-left'
    });
    var addTimeBtn = $('<button type="button" class="btn btn-primary travel-time-event-input" onclick="initAddTimePoint(this)">添加时间节点</button>');
    var delBtn;
    var ablumBtn;
    var companyBtn;
    if($.isEmpty(detail)){
        delBtn = $('<button type="button" class="btn btn-danger travel-time-event-input" onclick="removeTravelDate(this)">删除行程节点</button>');
    }
    else{
        delBtn = $('<button type="button" class="btn btn-danger travel-time-event-input" onclick="removeTravelDate(this,'+detail.id+')">删除行程节点</button>');
        ablumBtn = $('<button type="button" class="btn btn-default travel-time-event-input" onclick="checkAlbum(this,\''+detail.id+'\',\''+detail.photoAlbumName+'\')">查看相册</button>');
        companyBtn = $('<button type="button" class="btn btn-default travel-time-event-input" onclick="checkCompany(this,\''+detail.id+'\')">关联企业信息</button>');
    }
    dateEventDiv.append(dateInput).append(dateIdInput).append(addTimeBtn).append(delBtn).append(ablumBtn).append(companyBtn);
    var contentDiv = $('<div class="col-lg-9 travel-date-point"></div>');
    contentDiv.append(dateEventDiv);
    
    //左侧时间节点内容
    var label = $('<label class="col-lg-2 col-sm-2 control-label" style="padding-top:0"></label>');

    //时间节点group
    var formGroup = $('<div class="form-group"></div>');
    formGroup.append(label).append(contentDiv);
    $("#addBtnDiv").parent().append(formGroup);

    return addTimeBtn;
}

function initAddTimePoint(btn,detail){
    var parent = $(btn).parent().parent();
    var index = parent.parent().index() - $("#addBtnDiv").index() - 1;
    var travelDateDetailId='',timePoint='',timeEvent='';
    if(!$.isEmpty(detail)){
        travelDateDetailId = detail.id;
        timePoint = detail.timePoint;
        timeEvent = detail.timeEvent;
    }
    var div = $('<div class="time-detail-line">'
        +'<div>'
        +'<input type="text" class="form-control form-control-20" name="timePoints" value="'+timePoint+'" placeholder="请输入时间" validations="required" validationTips="不能为空"/>'
        +'<button type="button" class="btn btn-default travel-time-event-input" onclick="delTimePoint(this,\''+travelDateDetailId+'\')" >删除时间节点</button>'
        +'</div>'
        +'<div>'
        +'<input type="text" class="form-control" name="timeEvents" value="'+timeEvent+'" placeholder="请输入时间节点事件" validations="required" validationTips="不能为空" />'
        +'<input type="hidden" name="travelDateDetailIds" value="'+travelDateDetailId+'" />'
        +'</div>'
        +'</div>');
    parent.append(div);
}

function delTimePoint(btn,id){
    $(btn).parent().parent().remove();
    if(!$.isEmpty(id))
        $("#index").after('<input type="hidden" name="delTravelDateDetailIds" value="'+id+'" />');
}


function removeTravelDate(btn,id){
    $(btn).parent().parent().parent().remove();
    if(!$.isEmpty(id))
        $("#index").after('<input type="hidden" name="delTravelDateIds" value="'+id+'" />');
}

function checkAlbum(btn,id,name){
    photoUploader.empty();
    Ding.ajax({
        'url': projectName + '/manager/sweden/travel/selectTravelDatePicList.shtml',
        'params':{
            'travelDateId':id
        },
        'successCallback':function(result){
            $("#travelDateId").val(id);
            var dataList = result.data;
            if(!$.isEmpty(dataList)){
                var picArray = [];
                for(var i=0;i<dataList.length;i++){
                    picArray.push({
                        'dataId' : dataList[i].id,
                        'url' : dataList[i].picUrl
                    });
                }
                photoUploader.appendArray(picArray);
            }
            openModal({
                'title':name+'相册信息',
                'targetId':'ablumForm',
                'width':'700px',
                'zIndex':1060
            });
        }
    })
}

function deletePhotos(){
    var checkedList = photoUploader.getCheckedList();
    if(checkedList.length==0){
        $.alert({
            title:'温馨提示',
            content: '请选择要删除的照片',
            confirmButton:'确定'
        });
        return ;
    }
    var deleteIds = [];
    for(var i=0;i<checkedList.length;i++){
        deleteIds.push($(checkedList[i]).attr("data-id"));
    }
    Ding.ajax({
        'url' : projectName + '/manager/sweden/travel/deleteByIds.shtml',
        'params':{
            'deleteIds' : deleteIds,
            'travelDateId' : $("#travelDateId").val()
        },
        'successCallback' : function(){
            for(var i=0;i<checkedList.length;i++){
                $(checkedList[i]).parent().parent().remove();
            }
        }
    })
}

function submitValidation(){
    if($.isEmpty($("#id").val())){
        if(surface.uploader.files.length==0){
            $.alert({
                title:'温馨提示',
                content: '请上传行程封面图片',
                confirmButton:'确定'
            });
            return false;
        }
        if(!surface.completed){
            $.alert({
                title:'温馨提示',
                content: '行程封面图片尚未上传完成，请耐心等待上传完成后再点击保存',
                confirmButton:'确定'
            });
            return false;
        }
    }

    var result = true;
    var travelDates = $("input[name='travelDates']");
    if(travelDates.length==0){
        $.alert({
            title:'温馨提示',
            content: '请添加行程日期节点',
            confirmButton:'确定'
        });
        return false;
    }
    for(var i=0;i<travelDates.length;i++){
        var nextList = $(travelDates[i]).parent().nextAll();
        if(nextList.length==0){
            addValidationTips($(travelDates[i]).parent().parent(),"该行程节点尚无时间节点安排");
            result = false;
        }
        else{
            removeValidationTips($(travelDates[i]).parent().parent());
        }
    }
    if(!result){
        return false;
    }

    var timeEventInputs = $("input[name='timeEvents']");
    var timeEvents = [];
    var timeIndexs = [];
    for(var i=0;i<timeEventInputs.length;i++){
        timeEvents.push(encodeURIComponent($(timeEventInputs[i]).val()));
        var index = $(timeEventInputs[i]).parent().parent().parent().parent().index() - $("#addBtnDiv").index() - 1;
        timeIndexs.push(index);
    }
    
    D("#form").submitParams['timeEvents'] = timeEvents;
    D("#form").submitParams['timeIndexs'] = timeIndexs;

    if(surface.uploader.files.length!=0){
        var cropperData = $('#cropperImage').cropper('getData');
        D("#form").submitParams['x'] = cropperData.x;
        D("#form").submitParams['y'] = cropperData.y;
        D("#form").submitParams['width'] = cropperData.width;
        D("#form").submitParams['height'] = cropperData.height;
        D("#form").submitParams['surface'] = surface.uploader.files[0].uploadPath;
    }
    return true;
}

function insertSuccess(result){
    var index = $("#index").val();
    var id = $("#id").val();
    if(!$.isEmpty(id)){
        var row = $("#dataTable").bootstrapTable('getRowByUniqueId',id);
        var data = result.data;
        row.name = data.name;
        if(!$.isEmpty(data.surface)){
            row.surface = data.surface;
        }
        $("#dataTable").bootstrapTable('updateRow',{
            'index' : index,
            'row': row
        });
    }
    else{
        var row = result.data;
        row.userCount = 0;
        $("#dataTable").bootstrapTable('prepend',row);
    }
}

function initDelete(id){
    $.confirm({
        backgroundDismiss: true,
        title:'删除行程信息',
        content: '是否删除行程信息 ?',
        confirmButton:'删除',
        cancelButton:'取消',
        confirmButtonClass:'btn-success',
        confirm:function(){
            Ding.ajax({
                'url':projectName+'/manager/sweden/travel/deleteTravel.shtml',
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
    $("#index").val(index);
    $("#id").val(id);
    Ding.ajax({
        'url' : projectName + '/manager/sweden/travel/getById.shtml',
        'params' : {
            'id' : id
        },
        'successCallback' : function(result){
            var data = result.data;
            $("#logoTip").after('<img height="150px" src="'+data.surface+'" />');
            $("#name").val(data.name);

            var travelDateList = data.travelDateList;
            for(var i=0;i<travelDateList.length;i++){
                var travelDate = travelDateList[i];
                var btn = initAddDatePoint(travelDate);
                var detailList = travelDate.detailList;
                for(var j=0;j<detailList.length;j++){
                    initAddTimePoint(btn,detailList[j]);
                }
            }
            openModal({
                'title':'编辑行程信息',
                'targetId':'form',
                'sureBtnText':'保存',
                'width':'900px'
            });
        }
    });
}   

function initAddTravelUser(){
    openModal({
        'title':'添加成员信息',
        'targetId':'addUserform',
        'sureBtnText':'保存'
    });
}

function travelUserSubmitValidation(){
    D("#addUserform").submitParams['travelId'] = $("#travelId").val();
    return true;
}

function insertTravelUserSuccess(result){
    var row = result.data;
    $("#travelUserDataTable").bootstrapTable('append',row);
}

function initDeleteTravelUser(id){
    Ding.ajax({
        'url' : projectName + '/manager/sweden/travel/user/initDeleteTravelUser.shtml',
        'params' : {
            'id' : id
        },
        'successCallback' : function(result){
            $("#travelUserDataTable").bootstrapTable('removeByUniqueId',id);
        }
    });
}

function checkCompany(btn,id){
    $("#companyTravelDateId").val(id);
    Ding.ajax({
        'url' : projectName+"/manager/sweden/travel/date/company/selectListByTravelId.shtml",
        'params' : {
            'travelDateId' : id
        },
        'successCallback' : function(result){
            var data = {};
            data.rows = result.data;
            $("#travelDateCompanyTable").bootstrapTable('load',data);
            openModal({
                'title':'配置企业信息',
                'targetId':'travelDateCompanyForm',
                'zIndex':1060
            });
        }
    })
}

function deleteTravelDateCompany(id){
    Ding.ajax({
        'url' : projectName + '/manager/sweden/travel/date/company/deleteTravelDateCompany.shtml',
        'params' : {
            'id' : id
        },
        'successCallback' : function(result){
            $("#travelDateCompanyTable").bootstrapTable('removeByUniqueId',id);
        }
    });
}

function initAddTravelDateCompany(){
    openModal({
        'title':'选择关联企业信息',
        'targetId':'companyForm',
        'sureBtnText':'确定选择',
        'zIndex':1070,
        'sureCallback': function(){
            saveTravelDateCompany();
            $("#companyTable").bootstrapTable('uncheckAll');
            return true;
        }
    });
}

function saveTravelDateCompany(){
    var selectedRows = $("#companyTable").bootstrapTable('getAllSelections');
    if(selectedRows.length==0){
        $.alert({
            title:'温馨提示',
            content: '请选择关联企业信息',
            confirmButton:'确定'
        });
        return false;
    }
    var companyIds = [];
    for(var i=0;i<selectedRows.length;i++){
        companyIds.push(selectedRows[i].id);
    }
    Ding.ajax({
        'url' : projectName + '/manager/sweden/travel/date/company/saveTravelDateCompany.shtml',
        'params' : {
            'companyIds' : companyIds,
            'travelDateId' : $("#companyTravelDateId").val()
        },
        'async' : false,
        'successCallback' : function(result){
            console.log(result);
            var data = {};
            data.rows = result.data;
            $("#travelDateCompanyTable").bootstrapTable('load',data);
        }
    })
}