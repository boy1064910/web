var aRandomCode = 'AcadamicEduClassRoom';
var columns = [];
var map, geolocation,placeSearch,citycode,geocoder;
var markers = [];
columns.push({
    field: 'id',
    title: 'ID',
    align: 'center'
});
columns.push({
    field: 'name',
    title: '教室名称',
    align: 'center'
});
columns.push({
    field: 'price',
    title: '价格（每小时）',
    align: 'center'
});
columns.push({
    field: 'maxCount',
    title: '最大容纳人数',
    align: 'center'
});
columns.push({
    field: 'address',
    title: '地址',
    align: 'center',
    formatter: function(value,row,index){
        return value+row.roomInfo;
    }
});
columns.push({
    field: 'status',
    title: '状态',
    align: 'center',
    formatter : function(value,row,index){
        if(value==0){
            return '<font color="red">暂停使用</font>';
        }
        else{
            return '<font color="green">正常使用</font>';   
        }
    }
});
columns.push({
    field: 'remark',
    title: '备注信息',
    align: 'center'
});
columns.push({
    field: 'id',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result = '<a href="javascript:void(0)" onclick="initEdit('+row.id+','+index+')" title="编辑">编辑</a>';
        result+='<a href="javascript:void(0)" onclick="initDelete('+row.id+')" title="删除">删除</a>';
        if(row.status==0){
            result+='<a href="javascript:void(0)" onclick="changeStatus('+row.id+',1,'+index+')" title="启用">启用</a>';
        }
        else{
            result+='<a href="javascript:void(0)" onclick="changeStatus('+row.id+',0,'+index+')" title="禁用">禁用</a>';
        }
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
        // pageNumber:1,   
        // //每页的记录行数（*）   
        // pageSize: 50,  
        // //可供选择的每页的行数（*）    
        // pageList: [20, 50, 150, 300],
        // showRefresh:true,
        // showToggle:true,
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
        onLoadSuccess:function(result){
            commonResultCallback(result);
        }
    });

    
    //地图逻辑：初始化地图-->获取当前定位地址-->初始化搜索模块-->初始化覆盖物点击事件-->初始化地图点击事件
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 18
    });

    //定位当前地址
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        // geolocation.getCurrentPosition();
        // geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });  

    //初始化地址搜索模块
    AMap.service(["AMap.PlaceSearch"], function() {
        placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 5,
            pageIndex: 1,
            // city: citycode, //城市
            map: map
        });
        //标注覆盖物点击事件
        AMap.event.addListener(placeSearch, "markerClick", function(e){
            var result = e.data;
            locationAssignment({
                'province': result.pname,
                'city': $.isEmpty(result.cityname)?result.pname:result.cityname,
                'area': result.adname,
                'cityCode': result.citycode,
                'adCode': result.adcode,
                'lng': result.location.lng,
                'lat': result.location.lat,
                'address': $.isEmpty(result.cityname)?result.pname:result.cityname + result.adname + result.address + result.name
            });
        });
    });

    AMap.service('AMap.Geocoder',function(){//回调函数
        //实例化Geocoder
        geocoder = new AMap.Geocoder();
        //TODO: 使用geocoder 对象完成相关功能
    })

    //地图点击事件
    AMap.event.addListener(map,'click', function(event){
        map.remove(markers);
        var marker = new AMap.Marker({
            position: event.lnglat,
            map: map
        });
        markers.push(marker);
        geocoder.getAddress(event.lnglat, function(status, e) {
            if(status=="no_data"){
                $("#address").val('');
                $.alert({
                    title:'学术葩提示',
                    content: '无法获得定位信息',
                    confirmButton:'确定'
                })
                return;
            }

            if($.isEmpty(e.regeocode)){
                locationAssignment({
                    'province': '',
                    'city': '',
                    'area': '',
                    'cityCode': '',
                    'adCode': '',
                    'lng': event.lnglat.lng,
                    'lat': event.lnglat.lat,
                    'address': ''
                });
            }
            else{
                var result = e.regeocode.addressComponent;
                locationAssignment({
                    'province': result.province,
                    'city': $.isEmpty(result.city)?result.province:result.city,
                    'area': result.district,
                    'cityCode': result.citycode,
                    'adCode': result.adcode,
                    'lng': event.lnglat.lng,
                    'lat': event.lnglat.lat,
                    'address': e.regeocode.formattedAddress
                });
            }
            
        });   
    }); 

    $("#locationSearchBtn").on("click",locationSearch);

    $('#position').keydown(function(e){
        if(e.keyCode==13){
           locationSearch();
        }
    });
});

//解析定位结果成功
function onComplete(data) {
    if(data.info=="SUCCESS"){
        citycode = data.addressComponent.citycode;
    }
    else{
        citycode = "010";
    }
    placeSearch.setCity(citycode);
    // geocoder.setCity(citycode);
    //定位地址赋值
    var result = data.addressComponent;
    locationAssignment({
        'province': result.province,
        'city': $.isEmpty(result.city)?result.province:result.city,
        'area': result.district,
        'cityCode': result.citycode,
        'adCode': result.adcode,
        'lng': data.position.lng,
        'lat': data.position.lat,
        'address': data.formattedAddress
    });

    
}
//解析定位错误信息
function onError(data) {
    console.log("===========location error===============");
    console.log(data);
    placeSearch.setCity("010");
    // geocoder.setCity("010");
    $.alert({
        title:'学术葩提示',
        content: '自动定位失败，请手动搜索',
        confirmButton:'确定'
    })
}


//地址搜索
function locationSearch(){
    if($.isEmpty($("#position").val())){
        return;
    }
    map.remove(markers);
    //关键字查询
    placeSearch.search($("#position").val(),function(status,e){
        if(e.poiList.pois.length==0){
            $("#address").val('');
            $.alert({
                title:'学术葩提示',
                content: '无搜索结果',
                confirmButton:'确定'
            })
            return;
        }
        var result = e.poiList.pois[0];
        locationAssignment({
            'province': result.pname,
            'city': $.isEmpty(result.cityname)?result.pname:result.cityname,
            'area': result.adname,
            'cityCode': result.citycode,
            'adCode': result.adcode,
            'lng': result.location.lng,
            'lat': result.location.lat,
            'address': $.isEmpty(result.cityname)?result.pname:result.cityname + result.adname + result.address + result.name
        });
    });
}



//清空搜索结果-->重新获取当前定位-->打开添加教室窗口
function initAdd(){
    //重新将地图定位到当前位置
    geolocation.getCurrentPosition();
    //清除搜索结果
    map.clearMap();
    
    openModal({
        'title':'添加教室信息',
        'targetId':'addForm',
        'sureBtnText':'保存'
    });
    // setTimeout(function(){
    //     map.panTo(new AMap.LngLat(data.lng,data.lat));
    //     map.setFitView();
    // },500);
}

//定位赋值
function locationAssignment(addressInfo){
    $("#province").val(addressInfo.province);
    $("#city").val(addressInfo.city);
    $("#area").val(addressInfo.area);
    $("#cityCode").val(addressInfo.cityCode);
    $("#adCode").val(addressInfo.adCode);
    $("#lng").val(addressInfo.lng);
    $("#lat").val(addressInfo.lat);

    $("#address").val(addressInfo.address);
}

function insertSuccess(result){
    var index = $("#index").val();

    $("#name").val('');
    $("#price").val('');
    $("#maxCount").val('');
    $("#remark").val('');
    $("#position").val('');
    $("#address").val('');
    $("#roomInfo").val('');
    $("#province").val('');
    $("#city").val('');
    $("#area").val('');
    $("#city").val('');
    $("#lng").val('');
    $("#lat").val('');
    $("#cityCode").val('');
    $("#adCode").val('');

    $("#id").val('');
    $("#index").val('');
    

    var data = result.data;
    var row = $("#dataTable").bootstrapTable('getRowByUniqueId',data.id);
    if($.isEmpty(row)){
        $("#dataTable").bootstrapTable('append',result.data);
    }
    else{
        data.status = row.status;
        $("#dataTable").bootstrapTable('updateRow',{
            'index' : index,
            'row' : data
        });
    }
}

function changeStatus(id,status,index){
    Ding.ajax({
        'url' : projectName + '/manager/acadamic/edu/class/room/changeStatus.shtml',
        'params':{
            'status':status,
            'id':id
        },
        'successCallback':function(result){
            var row = $("#dataTable").bootstrapTable('getRowByUniqueId',id);
            row.status = status;
            $("#dataTable").bootstrapTable('updateRow',{
                'index' : index,
                'row' : row
            });
        }
    })
}

function initDelete(id){
    $.confirm({
        backgroundDismiss: true,
        title:'删除教室信息',
        content: '是否删除 ？',
        confirmButton:'删除',
        cancelButton:'取消',
        confirmButtonClass:'btn-success',
        confirm:function(){
            Ding.ajax({
                'url':projectName+'/manager/acadamic/edu/class/room/deleteById.shtml',
                'params' : {
                    'id' : id
                },
                'successCallback':function(result){
                    $("#dataTable").bootstrapTable('removeByUniqueId',id);
                }
            });
        }
    });
}

function initEdit(id,index){
    //清除搜索结果
    map.clearMap();
    $("#id").val(id);
    $("#index").val(index);
    Ding.ajax({
        'url' : projectName + '/manager/acadamic/edu/class/room/getById.shtml',
        'params' : {
            'id' : id
        },
        'successCallback' : function(result){
            var data = result.data;
            $("#name").val(data.name);
            $("#province").val(data.province);
            $("#city").val(data.city);
            $("#area").val(data.area);
            $("#price").val(data.price);
            $("#maxCount").val(data.maxCount);
            $("#remark").val(data.remark);
            $("#address").val(data.address);
            $("#roomInfo").val(data.roomInfo);
            $("#lng").val(data.lng);
            $("#lat").val(data.lat);
            $("#cityCode").val(data.cityCode);
            $("#adCode").val(data.adCode);

            console.log(data);
            var lnglatXY =[];
            lnglatXY.push(data.lng);
            lnglatXY.push(data.lat);
            var marker = new AMap.Marker({  //加点
                map: map,
                position: lnglatXY
            });
            openModal({
                'title':'编辑教室信息',
                'targetId':'addForm',
                'sureBtnText':'保存'
            });

            setTimeout(function(){
                map.panTo(new AMap.LngLat(data.lng,data.lat));
                map.setFitView();
            },500);
        }
    });
}   