		var data0={
			'title':'当前获利总额来源',
			'name':[/*'d1','d2','d3','d4','d5','d6','d7','d8','d9','d10','其他'*/],
			'data':[/*3000,2600,2200,1943,1478,1233,800,789,564,200,300*/]
		}
		var data1={
			'title':'最近一日收益来源',
			'name':[/*'d1','d2','d3','d4','d5','d6','d7','d8','d9','d10','其他'*/],
			'data':[/*160,50,45,23,12,4,2.6,1.9,0.81,0.33,0.3*/]
		}
	    var data2={
			'title':'交易总笔数',
			'data': [['盈利笔数', 0],['亏损笔数', 0]]
		}
		var data3={
		    'title': '总收益',
			'time':[/*'2015/1/1','2015/2/1','2015/3/1','2015/4/1','2015/5/1','2015/6/1'*/],
			'data':[/*800,4360,3400,12100,15107,14558*/]
		}
		var data4={
			'title':'日盈亏额浮动趋势',
			'time':[/*'2015/4/27','2015/4/28','2015/4/29','2015/4/30','2015/5/1','2015/5/2'*/],
			'data':[/*3,110,46,20,300,125*/]
		}
        //设置图表没数据的时候的默认数据。创建一个星期的时间轴
		var defaultDates = [];
		var defaultDate = [];
		var today = (new Date()).getTime();
		for (var i = 0; i < 7; i++) {
		    if (i != 0) {
		        today = today - 24 * 60 * 60 * 1000;
		    }
		    var newToday = new Date(today);
		    var newDstr = newToday.getMonth()+1 + '/' + newToday.getDate();
		    defaultDates.push(newDstr);
		}
		for (var i = defaultDates.length-1; i >=0; i--) {
		    defaultDate.push(defaultDates[i]);
		}
		Highcharts.setOptions({
	        lang: {
	            numericSymbols: null
	        },
		    yAxis: {
		        lineColor: "#cccccc",
		        tickColor: "#cccccc",
		        gridLineColor: "#f0f0f0"
		    },
		    xAxis: {
		        gridLineWidth: 1,
		        lineColor: "#cccccc",
		        tickColor: "#cccccc",
		        gridLineColor: "#f0f0f0",
		        labels: {
		            autoRotationLimit: 40
		        }
		    },
            chart: {
                //plotBackgroundImage:'~Themes/DefaultClean/images/123456789.jpg'  
            },
		    tooltip: {
		        style: {
		            color: "white"
		        },
                borderWidth:0,
		        shadow: false,
		        backgroundColor: "rgba(34,34,34, 0.85)"
		    }
	    });
	    function creatChart2(id,data){
	    	return new Highcharts.Chart({
	    		chart:{
	    			renderTo:id
	    		},
	    		title:{
					text:null
				},
	    		colors: ['#62a8ff', '#ffbe61'],
				tooltip:{
					pointFormat:'{series.name}:<b>{point.percentage:.1f}%</b>'
				},
				credits:{
					enabled:false
				},
				legend:{
				    itemMarginBottom:-15
				},
				plotOptions:{
					pie: {
		                dataLabels: {
		                    enabled: true,
		                    distance: -15,
		                    style: {
		                        fontWeight: 'normal',
		                        color: '#000',
		                        textShadow: false
		                    },
		                    formatter:function(){
		                    	return this.y
		                    }
		                },
		              	showInLegend:true
	            	}
				},
				series: [{
		            type: 'pie',
		            name: '占比',
		            innerSize: '60%',
		            data: data.data
	        	}]
	    	});
	    }

	    function creatChart2a(id, data) {
	        return new Highcharts.Chart({
	            chart: {
	                renderTo: id
	            },
	            title: {
	                text: null
	            },
	            colors: ['#62a8ff', '#ffbe61'],
	            tooltip: {
	                pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
	            },
	            credits: {
	                enabled: false
	            },
	            legend:{
	                itemMarginBottom:-15
	            },
	            plotOptions: {
	                pie: {
	                    dataLabels: {
	                        enabled: true,
	                        distance: -15,
	                        style: {
	                            fontWeight: 'normal',
	                            color: '#000',
	                            textShadow: false
	                        },
	                        formatter: function () {
	                            return this.y
	                        }
	                    },
	                    showInLegend: true
	                }
	            },
	            series: [{
	                type: 'pie',
	                name: '占比',
	                innerSize: '60%',
	                data: data.data
	            }]
	        });
	    }
	    function creatChart(id,data){
	    	return new Highcharts.Chart({
	    		chart:{
					type:'bar',
					renderTo:id
				},
				colors:['#f89748'],
				title:{
					text:null,
					align:'left'
				},
				legend:{
					enabled:false
				},
				credits:{
					enabled:false
				},
				xAxis: {
				    gridLineWidth: null,
					categories:data.name,
					tickLength:0
				},
				plotOptions:{
					bar:{
						dataLabels:{
							enabled:true,
							allowOverlap:true
						}
					}
				},
				yAxis:{
					min:0,
					lineWidth:1,
					title:{
						text:null
					},
					tickLength:0
				},
				series:[{
					name:'a',
					data:data.data
				}]
	    	});
	    }

        /*
            通过status判断图表格式及颜色参数，0：总服务费，1：总收益，3：总收益，4:交易盈亏
        */
	    function creatChart3(id, data, status) {
	        var name = "总收益";
	        var bgColor = "rgba(255,102,0, 0.15)";
	        var lineColor = "#fc7575";
	        if (status === 0) {
	            name = "服务费";
	            bgColor = "rgba(98,168,255,0.3)";
	            lineColor = "#62a8ff";
	        }
	        if (data === null || data === undefined || data.data.length === 0) {
	             data = {
	                 'title': '总收益浮动趋势',
	                'time': defaultDate,
	                'data':[0, 0, 0, 0, 0, 0,0]
	            }
	        }
			return new Highcharts.Chart({
				chart:{
					renderTo:id
				},
				title:{
					text:''
				},
				credits:{
					enabled:false
				},
				xAxis: {
				    categories: data.time,
				    tickInterval: Math.ceil(data.time.length / 7)
		        },
		        yAxis: {
		            title: {
		                text: ''
		            },
		            labels: {
		                format: '${value}'
		            }
		        },
		        tooltip: {
		            formatter: function () {
		                var a, b, color,s;
		                if (this.y >= 0) {
		                    a = name;
		                    color = "#41ae1a";
		                } else {
		                    a = '总亏损';
		                    color = "#ff0000";
		                }
		                if (status === 0) {
		                    s = this.x + ' ' + a + ' <span style="color:' + color + '">$' + this.y + '</span>';
		                } else {
		                    s ='截止至'+ this.x + ' 的' + a + ' <span style="color:' + color + '">$' + this.y + '</span>';
		                }
		                return s;
		            }
		        },
		        legend: {
		            enabled:false
		        },
		        plotOptions: {
		            area: {
		                marker: {
		                    radius: 0,
		                    fillColor: 'white',
		                    lineWidth: 2,
		                    lineColor: lineColor
		                },
		                lineWidth: 2,
		                states: {
		                    hover: {
		                        lineWidth: 2
		                    }
		                },
		                threshold: null
		            },
		            series: {
		                fillColor: bgColor,
		                lineColor:lineColor
		            }
		        },
		        series: [{
		            type: 'area',
		            name: name,
		            data: data.data,
                    zIndex:1
		        }]
			});
	    }
	    function creatChart4(id, data) {
	        if (data === null || data === undefined || data.data.length === 0) {
	            data = {
	                'title': '总收益',
	                'time': defaultDate,
	                'data': [0, 0, 0, 0, 0, 0, 0]
	            }
	        }
	        return new Highcharts.Chart({
	            chart: {
	                renderTo: id
	            },
	            title: {
	                text: ''
	            },
	            credits: {
	                enabled: false
	            },
	            colors: ['#f89748'],
	            xAxis: {
	                categories: data.time,
	                tickInterval: Math.ceil(data.time.length / 5)
	            },
	            yAxis: {
	                title: {
	                    text: ''
	                },
	                labels: {
	                    format: '${value}'
	                }
	            },
	            tooltip: {
	                valuePrefix: '$'
	            },
	            legend: {
	                enabled: false
	            },
	            plotOptions: {
	                line: {
	                    stacking: 'normal',
	                    dataLabels: {
	                        enabled: true,
	                        color: 'black'
	                    }
	                }
	            },
	            series: [{
	                name: '获利',
	                data: data.data
	            }]
	        });
	    }
		function creatChart5(id,data){
			return new Highcharts.Chart({
				chart:{
					renderTo:id,
					type:'column'
				},
				title:{
					text:data.title,
					align:'left'
				},
				credits:{
					enabled:false
				},
				colors:['#6bbc5d','#fe470e'],
				xAxis: {
	            	categories: data.time,
	            	labels:{
			        	rotation: -45
			        }
		        },
		        yAxis: {
		            title: {
		                text: ''
		            },
		            min:0
		        },
		         tooltip: {
		            formatter: function () {
		                return '<b>' + this.x + '</b><br/>' +
		                    this.series.name + ': ' + this.y + '<br/>' +
		                    'Total: ' + this.point.stackTotal;
		            }
		        },
		        legend: {
		            align: 'right',
		            verticalAlign: 'top',
		            floating: true,
		            backgroundColor:'white'
		        },
		        plotOptions:{
		        	column: {
		                stacking: 'normal',
		                dataLabels: {
		                    enabled: true,
		                    color: 'white'
		                }
		            }
		        },
		        series: data.data
			});
		}
		function creatChart6(id, data) {
		    if (data === null || data === undefined || data.data.length === 0) {
		        data = {
		            'title': '当前获利总额来源',
		            'name': ['交易员'],
		            'data': [0]
		        }
		    }
		    var chart = new Highcharts.Chart({
		        chart: {
		            type: 'bar',
		            renderTo: id,
		            style: {
		                //paddingTop:30
		            },
		            marginBottom: 10
		        },
		        credits: {
		            enabled: false
		        },
		        colors: ['#f89748'],
		        title: {
		            text: ''
		        },
		        legend: {
		            enabled: false
		        },
		        xAxis: {
		            gridLineWidth: 1,
		            categories: data.name
		        },
		        tooltip: {
		            formatter: function () {
		                var a,b,color;
		                if (this.y >= 0) {
		                    a = '盈利';
		                    color = "#41ae1a";
		                } else {
		                    a = '亏损';
		                    color = "#ff0000";
		                }
		                
		                var s = '跟随' + this.x + '共' + a + ' <span style="color:' + color + '">$' + this.y + '</span>';
		                if (this.point.status === true) {
		                    b = ',您现在正在跟随他。';
                            s=s+b
		                } else {
		                    s = s + '。';
		                }
		                return s;
		            }
		        },
		        plotOptions: {
		            bar: {
		                dataLabels: {
		                    enabled: true,
		                    allowOverlap: true
		                }
		            },
		            series: {
		                pointPadding: 0.3
		            }
		        },
		        yAxis: {
		            lineWidth: 1,
		            title: {
		                text: ''
		            },
		            labels: {
		                useHTML: true
		            }
		        },
		        series: [{
		            name: 'a',
		            data: data.data
		        }]
		    });
		    var a = $(".highcharts-yaxis-labels")[1];
		    //$(a).children('span').css('top', '0px');
		    $("#aaa").append($(a));
		}
		function creatChart7(id, data) {
		    if (data === null || data === undefined || data.data.length === 0) {
		        data = {
		            'title': '日交易手数',
		            'time': defaultDate,
		            'data': [0,0,0,0,0,0,0],
		        }
		    }
		    return new Highcharts.Chart({
		        chart: {
		            type: 'column',
		            renderTo:id
		        },
		        title: {
		            text: ''
		        },
		        colors: ['rgba(98,168,255,0.3)'],
		        xAxis: {
		            categories: data.time,
		            tickInterval: Math.ceil(data.time.length / 7)
		        },
		        credits: {
                    enabled:false
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        plotOptions: {
		            column: {
		                borderColor: "#a1cafc",
		                states: {
		                    hover: {
		                        color: "#62a8ff",
		                        borderColor: "#62a8ff"
		                    }
		                },
		            }
		        },
		        tooltip: {
		            formatter: function () {
		                if (this.point.k === undefined) {
		                    this.point.k = 0;
		                }
		                var s = this.x + '    交易：' + this.point.k + '笔，共' + this.y + '手。';
		                return s;
		            }
		        },
		        series: [{
		            name: 'Population',
		            data: data.data
		        }]
		    });
		}
		function creatChart8(id, data) {
		    if (data === null || data === undefined || data.data.length === 0) {
		        data = {
		            'title': '最近一日收益',
		            'name': ['交易员'],
		            'data': [0]
		        }
		    }
		    return new Highcharts.Chart({
		        chart: {
		            type: 'column',
		            renderTo:id
		        },
		        title: {
		            text: ''
		        },
		        legend: {
		            enabled: false
		        },
		        xAxis: {
		            categories: data.name,
		            labels: {
		                autoRotationLimit: 40
		            }
		        },
		        yAxis:{
		            title: {
                        text:''
		            }
		        },
		        credits: {
		            enabled: false
		        },
		        plotOptions:{
		            column: {
		                dataLabels: {
		                    enabled: true,
		                    allowOverlap: true
		                }
		            }
		        },
		        tooltip:{
		            enabled:false
		        },
		        series: [{
		            data: data.data,
		            dataLabels: {
		                enabled: true
		            }
		        }]
		    });
		}
		
		function creatChart9(id, data) {
		    return new Highcharts.Chart({
		        chart: {
		            type: 'pie',
		            renderTo: id
		        },
		        credits: {
		            enabled: false
		        },
		        title: {
		            text: ''
		        },
		        plotOptions: {
		            pie: {
		                showInLegend: true
		            },
		            series: {
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.name}: {point.y:.1f}%'
		                }
		            },
		            
		        },
		        //legend:{
		        //    layout: 'vertical',
                //    align:'right',
                //    verticalAlign: 'middle'
		        //},
		        tooltip: {
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
		        },
		        series: [{
		            name: "Brands",
		            colorByPoint: true,
		            data: data.data
		        }]
            })
		}
        //重构当前盈利总额来源数据格式，给加上颜色参数
		function reBuildData(oldData) {
		    var data = oldData.data;
		    for (var i = 0; i < data.length; i++) {
		        if (data[i].y < 0 && data[i].status === true) {
		            $.extend(data[i], { color: '#fc7575' });
		        } else if (data[i].y < 0 && data[i].status === false) {
		            $.extend(data[i], { color: '#d8dae6' });
		        } else if (data[i].y >= 0 && data[i].status === true) {
		            $.extend(data[i], { color: '#76d8ac' });
		        } else if (data[i].y >= 0 && data[i].status === false) {
		            $.extend(data[i], { color: '#d8dae6' });
		        }
		    }
		}

//最近一日收益数据格式重构，加上颜色参数
		function reBuildData_yes(oldData, status) {
		    var data = oldData.data;
		    for (var i = 0; i < data.length; i++) {
		        if (data[i].y >= 0) {
		            if (status === undefined) {
		                $.extend(data[i], { color: '#62a8ff' });
		            } else {
		                $.extend(data[i], { color: '#76d8ac' });
		            }
		        } else {
		            if (status === undefined) {
		                $.extend(data[i], { color: '#ffbe61' });
		            } else {
		                $.extend(data[i], { color: '#fc7575' });
		            }
		        }
		    }
		}