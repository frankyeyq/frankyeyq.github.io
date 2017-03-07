var preOrderBtn = document.getElementById('preOrder');
var inOrderBtn = document.getElementById('inOrder');
var postOrderBtn = document.getElementById('postOrder');
var deepfirstBtn = document.getElementById('deepfirst');
var breadthfirstBtn = document.getElementById('breadthfirst');
var box1 = document.getElementsByClassName('box1')[0];
var searchInput = document.getElementById('searchInput');
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


var orderFlag = true;

function render(arr){
    for(var i = 0;i<document.getElementsByClassName('box').length;i++){
        document.getElementsByClassName('box')[i].style.backgroundColor="#fff";
    }
    var timer;
    var index = 0;
    var searchFlag = true;
    timer = setInterval(function(){
        orderFlag = false;
        if(index == orderArr.length){
            clearInterval(timer);
            orderFlag = true;
            orderArr =[];

        } else{
            console.log(orderArr[index].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, ""));
            if(index>0&&searchFlag){
                orderArr[index-1].style.backgroundColor = "#ffffff";
            }
            orderArr[index].style.backgroundColor = "#F125C2";
            if(orderArr[index].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "")== searchInput.value){
                searchFlag = false;
                orderArr[index].style.backgroundColor = "#f00";
            }else{
                searchFlag = true;
            }
            index++;
        }
    },600);
}
preOrderBtn.addEventListener('click',function(){
    if(orderFlag){
        preOrder(box1);
        render(orderArr);
    }else{
        alert("正在遍历！");
    }
});
inOrderBtn.addEventListener('click',function(){
    if(orderFlag){
        inOrder(box1);
        render(orderArr);
    }else{
        alert("正在遍历！");
    }
});
postOrderBtn.addEventListener('click',function(){
    if(orderFlag){
        postOrder(box1);
        render(orderArr);
    }else{
        alert("正在遍历！");
    }
});
deepfirstBtn.addEventListener('click',function(){
    if(orderFlag){
        deepOrder(box1);
        render(orderArr);
    }else{
        alert("正在遍历！");
    }
});
breadthfirstBtn.addEventListener('click',function(){
    if(orderFlag){
        breadthOrder(box1);
        render(orderArr);
    }else{
        alert("正在遍历！");
    }
});
window.onload = function(){
    //为每个节点添加单击选中样式的事件
    for(var i = 0;i<document.getElementsByClassName('box').length;i++){
        document.getElementsByClassName('box')[i].onclick = function(e){
            e.stopPropagation();
            console.log(this.style.backgroundColor);
            if(this.style.backgroundColor == "" ||this.style.backgroundColor == "rgb(255, 255, 255)") {
              this.style.backgroundColor = "#987";
            }else{
                this.style.backgroundColor = "";
            }
        }
    }
}