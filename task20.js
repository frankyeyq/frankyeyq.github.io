var leftInBtn = document.getElementById('left-in');
        var leftOutBtn = document.getElementById('left-out');
        var rightInBtn = document.getElementById('right-in');
        var rightOutBtn = document.getElementById('right-out');
        var searchBtn = document.getElementById('searchBtn');
        var item = document.getElementById('input-text');
        var queue = document.getElementById('queue');
    //左侧进
        function leftIn(){
            if(item.value != ''){
            var arr = item.value.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
            for(var i = 0;i<arr.length;i++){
                dataArr.unshift(arr[i]);
            }
              render(dataArr);
            }

        }
    //左侧出
        function leftOut(){
            if(dataArr != ''){
                dataArr.shift();
                render(dataArr);
            }
        }
    //右侧进
        function rightIn(){
            var arr = item.value.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
            for(var i = 0;i<arr.length;i++){
                dataArr.push(arr[i]);
            }
            render(dataArr);
        }
    //右侧出
        function rightOut(){
            if(dataArr != ''){
                dataArr.pop();
                render(dataArr);
            }
        }
    //用来存储队列数组
    // var dataArr = ["356", "123", "312", "1", "123", "1234", "321", "854"];
    var dataArr = [];
    //渲染队列（在渲染是绑定删除事件）
        function render(dataArr){
            var winWidth = document.documentElement.clientWidth;
            queue.innerHTML = '';
            var width = 0;
            for( var i = 0; i < dataArr.length;i++){
                var div = document.createElement('div');
                div.innerHTML = dataArr[i];
                div.addEventListener('click',deleteArr);
                queue.appendChild(div);
                div.setAttribute('index',i);
                width += parseInt(div.clientWidth)+25;
            }
            queue.style.maxWidth = winWidth + "px";
            queue.style.width = width+"px";
        }
    //删除点击元素
    function deleteArr(){
       alert(this.innerHTML);
        dataArr.splice(this.getAttribute('index'),1);
        render(dataArr);
    }
    function search(){
        var search = document.getElementById('searchInput');
        var dataArr2 = dataArr.slice(0);
        console.log("search dataArr2:"+dataArr2);
        var match = search.value;
        for(var i = 0;i<dataArr2.length;i++){
            dataArr2[i] = dataArr2[i].replace(new RegExp(match,"g"),"<span class='selected'>" + match + "</span>");
            // dataArr[i] = "<span class='selected'>"+dataArr[i]+"</span>";
        }
        render(dataArr2);
    }
    //绑定按钮事件
    leftInBtn.onclick = leftIn;
    leftOutBtn.onclick = leftOut;
    rightInBtn.onclick = rightIn;
    rightOutBtn.onclick = rightOut;
    searchBtn.onclick = search;



