document.domain = "materia.mobi";
accessid = ''
accesskey = ''
host = ''
policyBase64 = ''
signature = ''
callbackbody = ''
filename = ''
key = ''
expire = 0
g_object_name = ''
now = timestamp = Date.parse(new Date()) / 1000; 

function send_request()
{
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    if (xmlhttp!=null)
    {
        serverUrl = 'http://business.materia.mobi/decked-web-platform-business/business/postObjectPolicy/list.shtml'
        xmlhttp.open( "GET", serverUrl, false );
        xmlhttp.send( null );
        return xmlhttp.responseText
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
};



function get_signature()
{
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000; 
    if (expire < now + 3)
    {
        body = send_request()
        var obj = eval ("(" + body + ")");
        host = obj.data['host']
        policyBase64 = obj.data['policy']
        accessid = obj.data['accessid']
        signature = obj.data['signature']
        expire = parseInt(obj.data['expire'])
        callbackbody = obj.data['callback'] 
        key = obj.data['dir']
        return true;
    }
    return false;
};

function random_string(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}



function set_upload_param(up, filename, ret)
{
    if (ret == false)
    {
        ret = get_signature()
    }
    g_object_name = key;
    if (filename != '') { suffix = get_suffix(filename)
    	 g_object_name = key + random_string(10) + suffix
    }
    new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid, 
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'callback' : callbackbody,
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}

function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
    if(!file || !/image\//.test(file.type)) return; //确保文件是图片
    if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
        var fr = new mOxie.FileReader();
        fr.onload = function(){
            callback(fr.result);
            fr.destroy();
            fr = null;
        }
        fr.readAsDataURL(file.getSource());
    }else{
        var preloader = new mOxie.Image();
        preloader.onload = function() {
            preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
            var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
            callback && callback(imgsrc); //callback传入的参数为预览图片的url
            preloader.destroy();
            preloader = null;
        };
        preloader.load( file.getSource() );
    }    
}
var uploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button :'selectfiles', 
    //multi_selection: false,
	/*container: document.getElementById('container'),*/
	flash_swf_url : 'plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'plupload-2.1.2/js/Moxie.xap',
    url : 'http://oss.aliyuncs.com',//<%=request.getContextPath()%>/upload/image  http://oss.aliyuncs.com

    filters: {
        mime_types : [ //只允许上传图片和zip文件
        { title : "Image files", extensions : "jpg,gif,png,bmp" }, 
        { title : "Zip files", extensions : "zip,rar" }
        ],
        max_file_size : '100000mb', //最大只能上传10mb的文件
        prevent_duplicates : true //不允许选取重复文件
    },
//当Plupload初始化完成后触发1
	init: {
		PostInit: function() {
			
			
		},
//当文件添加到上传队列后触发1
		FilesAdded: function(up, files) {
            console.log("file-add");
			 for(var i = 0, len = files.length; i<len; i++){
		            //构造html来更新UI
		            var html = '<li id="file-' + files[i].id +'"><p id="file-name' + files[i].id +'"></p><p class="progress"></p></li>';
		            $(html).appendTo('#file-list');
		           
		        }
			 
			
				 set_upload_param(uploader, '', false);
			
		},
//当队列中的某一个文件正要开始上传前触发
		BeforeUpload: function(up, file) {
            set_upload_param(up, file.name, true);
            var file_name = file.name; //文件名
            $('#file-name'+file.id).text(file_name)
        },
//会在文件上传过程中不断触发，可以用此事件来显示上传进度
		UploadProgress: function(up, file) {
			  $('#file-'+file.id+' .progress').css('width',file.percent + '%');//控制进度条
	},
//当队列中的某一个文件上传完成后触发
		FileUploaded: function(up, file, info) {
            if (info.status == 200)
            {
		            previewImage(file,function(imgsrc){
	                    $('#image11').append('<li><img src="'+imgsrc +'" /></li>');
	                })
	                $('#file-list').html("");
            }
            else
            {
            	alert("文件上传失败，请重新上传" );
            } 
		},
//当发生错误时触发
		Error: function(up, err) {
            if (err.code == -600) {
            	 alert("选择的文件太大了");
            }
            else if (err.code == -601) {
            	alert("选择的文件格式不对");
            }
            else if (err.code == -602) {
               alert("这个文件已经上传过一遍了");
            }
            else 
            {
            	alert("文件上传失败，请重新上传" );
            }
		}
	}
});

uploader.init();
