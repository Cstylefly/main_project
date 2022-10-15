import './css/index.css'
import './less/index.less'
import './sass/index.scss'

var chartDom = document.getElementById('echarts_div');
var myChart = echarts.init(chartDom);
var option;
option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
  myChart.on('click',function(){
    console.log('dasda')
  })
  option && myChart.setOption(option);
