var preOrderBtn = document.getElementById('preOrder');
var inOrderBtn = document.getElementById('inOrder');
var postOrderBtn = document.getElementById('postOrder');
var deepfirstBtn = document.getElementById('deepfirst');
var breadthfirstBtn = document.getElementById('breadthfirst');
var box1 = document.getElementsByClassName('box1')[0];
var delBtn = document.getElementById('delete');
var addBtn = document.getElementById('addNode');
var nodeText = document.getElementById('nodeText');

var orderArr = [];

function preOrder(node){
    orderArr.push(node);
    console.log("子节点的个数："+node.children.length);
    if(node.firstElementChild){
        preOrder(node.firstElementChild);
    }
    if(node.lastElementChild){
        preOrder(node.lastElementChild);
    }
}

function inOrder(node){
    if(node.firstElementChild){
        inOrder(node.firstElementChild);
    }
    orderArr.push(node);
    if(node.lastElementChild){
        inOrder(node.lastElementChild);
    }
}

function postOrder(node){
    if(node.firstElementChild){
        postOrder(node.firstElementChild);
    }
    if(node.lastElementChild){
        postOrder(node.lastElementChild);
    }
    orderArr.push(node);
}
function deepOrder(node){
    orderArr.push(node);
    if(node.children.length){
        for(var i = 0;i<node.children.length;i++){
            deepOrder(node.children[i]);
        }
    }
}

function breadthOrder(node){
    var currentNode=[];
    currentNode.push(node); 
    while(currentNode.length !== 0){
        node = currentNode.shift();
        orderArr.push(node);
        for(var i=0;i<node.children.length;i++){
            currentNode.push(node.children[i]);
        }
    }

}

function deepfirstBtn(node){
    orderArr.push(node);
    if(node.children.length){
        for(var i = 0;i<node.children.length;i++){
            deepOrder(node.children[i]);
        }
    }
}



function render(arr){
    for(var i = 0;i<document.getElementsByClassName('box').length;i++){
        document.getElementsByClassName('box')[i].style.backgroundColor="#fff";
    }
    var timer;
    var index = 0;
    timer = setInterval(function(){
        if(index == orderArr.length){
            clearInterval(timer);
        } else{
            console.log(orderArr[index]);
            if(index>0){
                orderArr[index-1].style.backgroundColor = "#ffffff";
            }
            orderArr[index].style.backgroundColor = "#F125C2";
            index++;
        }
    },600);
}
preOrderBtn.addEventListener('click',function(){
    preOrder(box1);
    render(orderArr);
});
inOrderBtn.addEventListener('click',function(){
    inOrder(box1);
    render(orderArr);
});
postOrderBtn.addEventListener('click',function(){
    postOrder(box1);
    render(orderArr);
});
deepfirstBtn.addEventListener('click',function(){
    deepOrder(box1);
    render(orderArr);
});
breadthfirstBtn.addEventListener('click',function(){
    breadthOrder(box1);
    render(orderArr);
});
delBtn.addEventListener('click',function(){
    var len = document.getElementsByClassName('box').length;
    for(var i = 0;i<len;i++){
        var sel = document.getElementsByClassName('box')[i].getAttribute('data-selected');
        if(sel == 'true'){
            document.getElementsByClassName('box')[i].remove();
        }
    }
});
addBtn.addEventListener('click',function(){
    var len = document.getElementsByClassName('box').length;
    for(var i = 0;i<len;i++){
        // console.log("I:"+i+"     document.getElementsByClassName('box')[i]:"+document.getElementsByClassName('box')[i]);
        var sel = document.getElementsByClassName('box')[i].getAttribute('data-selected');
        if(sel == 'true' && nodeText.value !==''){
            var node = document.createElement('div');
            node.className = 'box boxChild';
            node.innerHTML = nodeText.value;
            document.getElementsByClassName('box')[i].appendChild(node);
            bindEvent();
        }
    }
});
var bindEvent = function(){
    //为每个节点添加单击选中样式的事件
    var len = document.getElementsByClassName('box').length;
    for(var i = 0;i<len;i++){
        document.getElementsByClassName('box')[i].onclick = function(e){
            var len = document.getElementsByClassName('box').length;
            e.stopPropagation();
            if(this.getAttribute('data-selected')=='true') {
                this.style.backgroundColor = "";
                this.setAttribute('data-selected',false);
            }else{
                for(var i = 0;i<len;i++){
                    document.getElementsByClassName('box')[i].setAttribute('data-selected',false);
                    document.getElementsByClassName('box')[i].style.backgroundColor = "";
                }
                this.setAttribute('data-selected',true);
                this.style.backgroundColor = "rgb(153, 136, 119)";
            }
            
        }
    }
}
window.onload = function(){
    bindEvent();
}