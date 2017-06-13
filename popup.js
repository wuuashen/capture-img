


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#capture').addEventListener('click', function(){

        var oImgBox = document.querySelector('#imgBox');

        oImgBox.innerHTML = '<p class="load">Loading...</p>';

        chrome.tabs.getSelected(null, function (tab) {

            function getImgNaturalDimensions(url, callback) {
                var img = new Image();
                img.src = url;
                img.onload = function(){
                    callback(img);
                };
            }

            //向tab发送请求
            chrome.tabs.sendRequest(tab.id, { action: "GetSrc" }, function (response) {
                
                var temp = '';
                var count = 0;
                response.forEach(function(item, key){

                    getImgNaturalDimensions(item.src, function(img){
                        if(img.width > 100 && img.height > 100) { 
                            temp += `<li>`
                            temp +=     `<a href="${item.src}" target="_blank">`;
                            temp +=         `<img src="${item.src}">`;
                            temp +=     `</a>`;
                            temp +=     `<p>${img.width} x ${img.height}</p>`;
                            temp += `</li>`;
                        }

                        appendHtml(temp);
                    })

                    count ++ ;
                })

                function appendHtml(t){
                    console.log(count, response.length);
                    if(count >= response.length) {
                        oImgBox.innerHTML = t;
                    }
                }
            });
        });

    });

});




