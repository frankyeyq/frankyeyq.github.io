/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
//颜色表
var cols = ['#303069','#E85FAB','#FFC456','#B7FE62','#E0E73F','#BFB636','#F2C572','#F27405','#F25C05','#F23207'];
/**
 * 渲染图表
 */
function renderChart() {
    var div_W;
    var wrap_W = document.getElementsByClassName("aqi-chart-wrap")[0];
    var dataNum;
    var left;
    wrap_W.innerHTML = '';
    dataNum = Object.getOwnPropertyNames(chartData).length;
    for( key in chartData){
        var div = document.createElement("div");
        // console.log(div_W);
        div_W = Math.floor((wrap_W.clientWidth-40)/(dataNum*2-1));
        div.style.width = div_W + 'px';    
        div.style.height = chartData[key] +'px';
        // div.innerHTML = chartData[key];
        wrap_W.appendChild(div);
        // console.log(wrap_W.clientWidth);
    }
    for( var i = 0; i<dataNum; i++){
        var wrapDiv = wrap_W.getElementsByTagName("div");
        wrapDiv[i].style.left = (div_W*2*i+20)+'px';
        wrapDiv[i].style.backgroundColor = cols[Math.floor(Math.random()*10)];
    }
    setScale();
}
/**
 * 设置刻度
 */
 function setScale(){
    var wrap_W = document.getElementsByClassName("aqi-chart-wrap")[0];
    sacleDiv1 = document.createElement('div');
    sacleDiv2 = document.createElement('div');
    sacleDiv3 = document.createElement('div');
    sacleDiv1.setAttribute('class','scale0');
    sacleDiv1.innerHTML = '0';
    sacleDiv2.setAttribute('class','scale250');
    sacleDiv2.innerHTML = '250';
    sacleDiv3.setAttribute('class','scale500');
    sacleDiv3.innerHTML = '500';
    wrap_W.appendChild(sacleDiv1);
    wrap_W.appendChild(sacleDiv2);
    wrap_W.appendChild(sacleDiv3);
 }

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if(pageState.nowGraTime == this.value){
    return;
  } else{
    pageState.nowGraTime = this.value;
    console.log(pageState.nowGraTime == 'week');
  // 设置对应数据
    initAqiChartData();
  // 调用图表渲染函数
    renderChart();
  }

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if(document.getElementById("city-select").value == pageState.nowSelectCity){
    return;
  } else{
    pageState.nowSelectCity = document.getElementById("city-select").value;
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }


}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    // pageState.nowGraTime = document.getElementById('city-select').value;
    var radios = document.getElementsByName("gra-time");
        for( var i = 0;i< radios.length; i++){
            radios[i].addEventListener('click',graTimeChange);
    }
    
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var citySelect = document.getElementById("city-select");
    var cityArr = Object.getOwnPropertyNames(aqiSourceData);
    citySelect.innerHTML = '';
     // console.log(cityArr);
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    for( var i = 0; i < cityArr.length; i++){
        var html = "<option>"+cityArr[i]+"</option>";
        citySelect.innerHTML += html;
    }
    citySelect.options[1].selected = true;
    pageState.nowSelectCity = cityArr[1];
    // console.log(citySelect.options[2].selected = true);

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener("change",function(){
    citySelectChange();
  })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    console.log('开始初始化数据');
    chartData= {};
    console.log('原始数据：');
    console.log(chartData);
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var cityDate = aqiSourceData[pageState.nowSelectCity];
    var dateArr = Object.getOwnPropertyNames(cityDate);
    var dayData = 0;
    var dayCount = 0;
    var weekCount = 0;
    var monthCount = 0;
    for( key in cityDate){
        dayData +=cityDate[key];
        dayCount++;
        if(pageState.nowGraTime == 'day'){
            chartData["第"+dayCount+"天"] = cityDate[key];
            // dayCount = 0;
        }
        if(pageState.nowGraTime == 'week'){
            if(new Date(key).getDay() == 6){
                weekCount ++;
                chartData["第"+weekCount+"周"] = Math.floor(dayData/dayCount);
                dayData = 0;
                dayCount = 0;
            }

        }
        if(pageState.nowGraTime == 'month'){
            if(new Date(key).getMonth() != monthCount){
                // console.log(new Date(key).getMonth());
                monthCount++;
                chartData["第"+monthCount+"个月"] = Math.floor(dayData/dayCount);
                dayData = 0;
                dayCount = 0;
            }
        }

    }
    if(dayData != 0){
        switch(pageState.nowGraTime){
            case 'week':
            // console.log("week");
            weekCount++;
            chartData["第"+weekCount+"周"] = Math.floor(dayData/dayCount);
            break;
            case 'month':
            monthCount++;
            chartData["第"+monthCount+"个月"] = Math.floor(dayData/dayCount);
            // console.log("month");
            break;
            default:
            break;
        }
    }
    console.log('初始化后数据：');
    console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();