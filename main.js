


//监听扩展程序进程或内容脚本发送请求的请求
chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {

	var arr = [];
	document.querySelectorAll('img').forEach(function(item, key){
		arr.push({key: key, src: item.src})
	})

        if (request.action == "GetSrc") {
            sendResponse(arr);
        }
        /*
        if (request.action == "SubmitForm") {
            document.forms[0].submit();
        }
        */
    }
);


