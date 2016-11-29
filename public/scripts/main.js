'use strict';
//
//
//

// function buildApiUrl(){
//   var api_key = 'CsUgpe3iWvE71GmbFgnT';
//   return 'https://www.quandl.com/api/v3/datasets/YAHOO/ZIV.json?start_date=2015-01-03&end_date=2015-02-03&order=asc&api_key=' + api_key;
// }

$(document).ready(function(){



  var symbols = [];
  $('.stocks').each(function(){
    var item = $(this).text();
    // console.log(item);
    if(!symbols.includes(item)){
      symbols.push(item);
    }else {
      console.log('fart!');
    }
      });


  $('#butts').on('click', function(e){
    e.preventDefault();
    var stock = $(".stock").val();

    console.log(stock);
    $('.picks').append('<h3 class="stocks" id="stocks" name="name">'+stock+'</h3>');

    $.ajax({
      type: 'POST',
      url: '/' + stock,
      success: function(data){
        location.reload();
      }
    });
  });

  $('.delete').on('click', function(){
    // console.log($(this).text());
    var item = $(this).parent().text();
    // console.log(item);

    $.ajax({
      type: 'DELETE',
      url: '/' + item,
      success: function(data){
        location.reload();
      }
    });
  });
  // var startDate = "2016-07-15";
  // var endDate ="2016-11-22";
  var startDate = moment().subtract(3, 'month').format("YYYY-MM-DD");
  var endDate = moment().format("YYYY-MM-DD");
  // var symbol = 'BAC';

  var api_key = 'CsUgpe3iWvE71GmbFgnT';


  function buildApiUrl(startDate, endDate, symbol, number){
  return 'https://www.quandl.com/api/v3/datasets/YAHOO/'+symbol+'.json?start_date='+startDate+'&end_date='+endDate+'&order=asc&api_key=' + api_key;
}




  // var startDate = moment().subtract(3, 'month').format("YYYY-MM-DD")
  // const endDate = moment().format("YYYY-MM-DD")




  // var api_key = 'CsUgpe3iWvE71GmbFgnT';
  // var url = 'https://www.quandl.com/api/v3/datasets/YAHOO/'+symbol+'.json?start_date='+startDate+'&end_date='+endDate+'&order=asc&api_key=' + api_key
  var Labels =[];
  var mydatasets = [];
  $.ajaxSetup({
  async: false
  });


  $.each(symbols, function(index, value){
    var num = (Math.floor(Math.random() * 255));
    console.log(num);

  $.getJSON(buildApiUrl(startDate, endDate, value, num), function(json) {
      // console.log(json);
    var dataset = json.dataset.data
      // console.log(dataset);
    var chartLabels = dataset.map(function(item){
      return item[0];
    });
    var chartData = dataset.map(function(item){
      return item[4];
    });
    // console.log(chartData);
    Labels.push(chartLabels);
    mydatasets.push(
    {
        label: value,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba("+num+",192,192,0.4)",
        borderColor: "rgba("+num+",192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba("+num+",192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData,
        spanGaps: false,
    }
    );

    });

  });
  // console.log("My data: ", mydatasets);
  // console.log("Labels: ", Labels);
  var CHART = document.getElementById('lineChart');
  var lineChart = new Chart(CHART, {
    type: 'line',
    data:  {
      labels: Labels[0],
      datasets: mydatasets
    },
    options: {
      scales: {
          yAxes: [{
            ticks: {
                  callback: function(label, index, labels) {
                      return '$' + label;
                  },
                  beginAtZero: true,


              }

          }]
      }
    }

  });




});
// {
//     label: symbol,
//     fill: false,
//     lineTension: 0.1,
//     backgroundColor: "rgba(75,192,192,0.4)",
//     borderColor: "rgba(75,192,192,1)",
//     borderCapStyle: 'butt',
//     borderDash: [],
//     borderDashOffset: 0.0,
//     borderJoinStyle: 'miter',
//     pointBorderColor: "rgba(75,192,192,1)",
//     pointBackgroundColor: "#fff",
//     pointBorderWidth: 1,
//     pointHoverRadius: 5,
//     pointHoverBackgroundColor: "rgba(75,192,192,1)",
//     pointHoverBorderColor: "rgba(220,220,220,1)",
//     pointHoverBorderWidth: 2,
//     pointRadius: 1,
//     pointHitRadius: 10,
//     data: chartData,
//     spanGaps: false,
// }
