var preOrderBtn = document.getElementById('preOrder');
var inOrderBtn = document.getElementById('inOrder');
var postOrderBtn = document.getElementById('postOrder');
var box1 = document.getElementsByClassName('box1')[0];
var orderArr = [];

function preOrder(node){
    orderArr.push(node);
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
function render(arr){
    console.log(arr);
    var timer;
    var index = 0;
    timer = setInterval(function(){
        if(index == orderArr.length){
            clearInterval(timer);
            orderArr[index-1].style.backgroundColor = "#ffffff";
            alert("遍历完毕");
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