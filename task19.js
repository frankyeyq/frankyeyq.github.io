    var leftInBtn = document.getElementById('left-in');
    var leftOutBtn = document.getElementById('left-out');
    var rightInBtn = document.getElementById('right-in');
    var rightOutBtn = document.getElementById('right-out');
    var item = document.getElementById('input-text');
    var queue = document.getElementById('queue');
    //左侧进
        function leftIn(){
            if(item.value != '' && (item.value >10 && item.value <100) && dataArr.length < 60){
              dataArr.unshift(item.value);
              render(dataArr);
            }
             if(!(item.value >10 && item.value <100)){
                alert('请输入大于10小于100的数值');
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
            if(item.value != '' && (item.value >10 && item.value <100) && dataArr.length < 60){
                dataArr.push(item.value);
                render(dataArr);
            } 
            if(!(item.value >10 && item.value <100)){
                alert('请输入大于10小于100的数值');
            }
        }
    //右侧出
        function rightOut(){
            if(dataArr != ''){
                dataArr.pop();
                render(dataArr);
            }
        }
    //用来存储队列数组
    // var dataArr = ["123", "98"];
    // var dataArr = ["123", "98", "12", "56", "32", "7", "52", "66"];
    // var dataArr = ["90", "80", "70", "60", "50", "40", "30", "20"];
    var dataArr = [];
    //渲染队列（在渲染是绑定删除事件）
        function render(array){
            console.log("开始渲染："+array);
            queue.innerHTML = '';
            for( var i = 0; i < array.length;i++){
                var div = document.createElement('div');
                div.addEventListener('click',deleteArr);
                queue.appendChild(div);
                div.setAttribute('index',i);
                div.style.height = array[i]+'px';
            }
        }
    //删除点击元素
    function deleteArr(){
       alert(this.innerHTML);
        dataArr.splice(this.getAttribute('index'),1);
        render(dataArr);
    }
    //绑定按钮事件
    leftInBtn.onclick = leftIn;
    leftOutBtn.onclick = leftOut;
    rightInBtn.onclick = rightIn;
    rightOutBtn.onclick = rightOut;
    window.onload = function(){
        render(dataArr);
    }
    //冒泡排序
    var sortStep = [];
    var sortLeng;//排序完后排序步骤的长度
    function bubbleSort(array){
        console.log("sortLeng:"+sortLeng);
        
        console.log("开始排序的数组："+array);
        var index = 0;
        for( var i = 0;i < array.length;i++) {
            for( var j=0; j < array.length-i;j++){
                if(parseInt(array[j])>parseInt(array[j+1])){
                    var temp;
                    temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] =temp;
                    sortStep.push(JSON.parse(JSON.stringify(array)));
                }
              
            }
        }
        sortLeng = sortStep.length;
    }
    //排序动画

    function sortAnimation(){
        var runTimes = 0;
        var i = 0;
        var timer = setInterval(function(){
            if(i==sortLeng){
                clearInterval(timer);
                sortLeng = 0;
            }else{
                render(sortStep[0]);
                sortStep.shift();
                i++;
            }
        },100);
    }
 var sortBtn = document.getElementById('sort');
 sortBtn.addEventListener('click',function(){
    bubbleSort(dataArr);
    sortAnimation();
 });