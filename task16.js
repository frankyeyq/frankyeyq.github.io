/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value;
    var val = document.getElementById("aqi-value-input").value;
    aqiData[city] = val;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table");
    table.innerHTML = '';
    for( city in aqiData ) {
        var tr = document.createElement('tr');
        var str = '';
        str = '<td>'+city+'</td><td>'+aqiData[city]+'</td><td><button class="btn-del">删除</button></td>';
        tr.innerHTML = str;
        table.appendChild(tr);
    }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  var tr = target.parentElement.parentElement;
  var city = tr.children[0].innerHTML;
  console.log(aqiData);
  console.log(aqiData[city]);
  delete aqiData[city];
  console.log(aqiData);
  renderAqiList();
}

function init() {

 // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btnAdd = document.getElementById("add-btn");
    btnAdd.onclick = addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table = document.getElementById("aqi-table");
    var arrBtnDel = table.getElementsByClassName("del-btn");

    table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
    })
}

init();