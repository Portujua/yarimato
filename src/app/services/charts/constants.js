angular
  .module('app')
  .constant('LINES_CHART', {
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: null
      }
    },
    yAxis: {
      visible: true,
      title: {
        text: 'Temperature (°C)'
      }
    },
    plotOptions: {
      line: {
        marker: {
          enabled: true,
          radius: 3,
          symbol: 'circle'
        },
        dataLabels: {
          enabled: false,
          style: {
            fontWeight: 'normal',
            textShadow: false,
            textOutline: false
          }
        }
      }
    },
    legend: {
      itemStyle: {
        fontFamily: 'Open Sans, Helvetica',
        fontWeight: 'normal'
      }
    },
    resize: true,
    series: [
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      },
      {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      },
      {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      },
      {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      },
      {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }
    ],
    exporting: {
      enabled: true
    }
  })
  .constant('INVERSE_LINES_CHART', {
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: null
      }
    },
    yAxis: {
      visible: true,
      reversed: true,
      min: 0,
      tickAmount: 5,
      tickInterval: null,
      title: {
        text: 'Temperature (°C)'
      }
    },
    plotOptions: {
      line: {
        marker: {
          enabled: true,
          radius: 3,
          symbol: 'circle'
        },
        dataLabels: {
          enabled: false,
          style: {
            fontWeight: 'normal',
            textShadow: false,
            textOutline: false
          }
        }
      }
    },
    legend: {
      itemStyle: {
        fontFamily: 'Open Sans, Helvetica',
        fontWeight: 'normal'
      }
    },
    resize: true,
    series: [
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      },
      {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      },
      {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      },
      {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      },
      {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }
    ],
    exporting: {
      enabled: true
    }
  })
  .constant('SPLINES_CHART', {
    chart: {
      type: 'spline'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: null
      }
    },
    yAxis: {
      visible: false,
      title: {
        text: 'Temperature (°C)'
      }
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true,
          radius: 3,
          symbol: 'circle'
        },
        dataLabels: {
          enabled: false,
          style: {
            fontWeight: 'normal',
            textShadow: false,
            textOutline: false
          }
        }
      }
    },
    legend: {
      itemStyle: {
        fontFamily: 'Open Sans, Helvetica',
        fontWeight: 'normal'
      }
    },
    resize: true,
    series: [
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      },
      {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      },
      {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      },
      {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      },
      {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }
    ],
    exporting: {
      enabled: true
    }
  })
  .constant('COLUMNS_CHART', {
    chart: {
      type: 'column'
    },
    xAxis: {
      crosshair: true,
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      // tickAmount: 5,
      tickInterval: null,
      visible: true,
      title: {
        text: null
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        groupPadding: 0.05,
        dataLabels: {
          enabled: true,
          format: '{point.y:,.2f}',
          style: {
            fontWeight: 'normal',
            textShadow: false,
            textOutline: false
          }
        }
      }
    },
    legend: {
      itemStyle: {
        fontFamily: 'Open Sans, Helvetica',
        fontWeight: 'normal'
      }
    },
    resize: true,
    series: [
      {
        name: 'Installation',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      },
      {
        name: 'Manufacturing',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
      },
      {
        name: 'Sales & Distribution',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
      },
      {
        name: 'Project Development',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
      }
    ],
    exporting: {
      enabled: true
    }
  })
  .constant('BARS_CHART', {
    chart: {
      type: 'bar'
    },
    xAxis: {
      crosshair: true,
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      tickAmount: 5,
      tickInterval: null,
      visible: true,
      title: {
        text: null
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        dataLabels: {
          enabled: false,
          style: {
            fontWeight: 'normal',
            textShadow: false,
            textOutline: false
          }
        }
      }
    },
    legend: {
      itemStyle: {
        fontFamily: 'Open Sans, Helvetica',
        fontWeight: 'normal'
      }
    },
    resize: true,
    series: [
      {
        name: 'Installation',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      },
      {
        name: 'Manufacturing',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
      },
      {
        name: 'Sales & Distribution',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
      },
      {
        name: 'Project Development',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
      }
    ],
    exporting: {
      enabled: true
    }
  })
  .constant('AREAS_CHART', {
    chart: {
      type: 'area'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: null
      }
    },
    yAxis: {
      visible: false,
      title: {
        text: 'Temperature (°C)'
      }
    },
    plotOptions: {
      area: {
        marker: {
          enabled: true,
          radius: 3,
          symbol: 'circle'
        },
        dataLabels: {
          enabled: false,
          style: {
            fontWeight: 'normal',
            color: '#fff',
            textShadow: false,
            textOutline: false
          }
        }
      }
    },
    resize: true,
    series: [
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      },
      {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      },
      {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      },
      {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      },
      {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }
    ],
    exporting: {
      enabled: true
    }
  })
  .constant('AREA_SPLINES_CHART', {
    chart: {
      type: 'areaspline'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: null
      }
    },
    yAxis: {
      visible: false,
      title: {
        text: 'Temperature (°C)'
      }
    },
    plotOptions: {
      areaspline: {
        marker: {
          enabled: true,
          radius: 3,
          symbol: 'circle'
        },
        dataLabels: {
          enabled: false,
          style: {
            fontWeight: 'normal',
            color: '#fff',
            textShadow: false,
            textOutline: false
          }
        }
      }
    },
    resize: true,
    series: [
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      },
      {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      },
      {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      },
      {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      },
      {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }
    ],
    exporting: {
      enabled: true
    }
  })
  .constant('HALF_DONUT_CHART', {
    chart: {
      type: 'pie'
    },
    xAxis: {
      visible: false
    },
    yAxis: {
      visible: false
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      squareSymbol: false,
      symbolHeight: 12,
      symbolWidth: 40,
      symbolRadius: 0,
      itemMarginBottom: 3,
      labelFormatter: function() {
        return `${this.name}: <strong>${this.y}</strong> (${Math.round(this.percentage * 100) / 100}%)`;
      },
      itemStyle: {
        fontFamily: 'Open Sans, Helvetica',
        fontWeight: 'normal'
      }
    },
    plotOptions: {
      pie: {
        shadow: false,
        startAngle: -90,
        endAngle: 90,
        size: '150%',
        showInLegend: true,
        center: ['50%', '100%'],
        dataLabels: {
          enabled: false,
          distance: -35,
          allowOverlap: true,
          formatter: function() {
            return `<strong>${this.y}</strong><br> (${Math.round(this.percentage * 100) / 100}%)`;
          },
          style: {
            fontWeight: 'normal',
            color: '#fff',
            textShadow: false,
            textOutline: false
          }
        }
      }
    },
    resize: true,
    series: [
      {
        name: 'Downloads',
        innerSize: '50%',
        data: [
          {
            name: 'Firefox',
            y: 20
          },
          {
            name: 'IE',
            y: 20
          },
          {
            name: 'Chrome',
            y: 30
          },
          {
            name: 'Safari',
            y: 14.67
          },
          {
            name: 'Opera',
            y: 13.91
          },
          {
            name: 'Proprietary',
            y: 5
          }
        ]
      }
    ],
    exporting: {
      enabled: true
    }
  })
  .constant('DONUT_CHART', {
    chart: {
      type: 'pie'
    },
    xAxis: {
      visible: false
    },
    yAxis: {
      visible: false
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      squareSymbol: false,
      symbolHeight: 12,
      symbolWidth: 40,
      symbolRadius: 0,
      itemMarginBottom: 3,
      labelFormatter: function() {
        return `${this.name}: ${this.y}`;
      },
      itemStyle: {
        fontWeight: 'normal',
        fontSize: '16px'
      }
    },
    plotOptions: {
      pie: {
        shadow: false,
        size: '115%',
        showInLegend: true,
        center: ['50%', '50%'],
        dataLabels: {
          enabled: false,
          distance: -35,
          allowOverlap: true,
          formatter: function() {
            return `<strong>${this.y}</strong><br> (${Math.round(this.percentage * 100) / 100}%)`;
          },
          style: {
            fontWeight: 'normal',
            color: '#fff',
            textShadow: false,
            textOutline: false
          }
        }
      }
    },
    resize: true,
    series: [
      {
        name: 'Downloads',
        innerSize: '50%',
        data: [
          {
            name: 'Firefox',
            y: 20
          },
          {
            name: 'IE',
            y: 20
          },
          {
            name: 'Chrome',
            y: 30
          },
          {
            name: 'Safari',
            y: 14.67
          },
          {
            name: 'Opera',
            y: 13.91
          },
          {
            name: 'Proprietary',
            y: 5
          }
        ]
      }
    ],
    exporting: {
      enabled: true
    }
  })
  .constant('PIE_CHART', {
    chart: {
      type: 'pie'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      squareSymbol: false,
      symbolHeight: 12,
      symbolWidth: 40,
      symbolRadius: 0,
      itemMarginBottom: 3,
      labelFormatter: function() {
        return `${this.name}: <strong>${this.y}</strong> (${Math.round(this.percentage * 100) / 100}%)`;
      },
      itemStyle: {
        fontFamily: 'Open Sans, Helvetica',
        fontWeight: 'normal'
      }
    },
    plotOptions: {
      pie: {
        shadow: false,
        size: '110%',
        showInLegend: true,
        center: ['50%', '50%'],
        dataLabels: {
          enabled: false,
          distance: -35,
          allowOverlap: true,
          formatter: function() {
            return `<strong>${this.y}</strong><br> (${Math.round(this.percentage * 100) / 100}%)`;
          },
          style: {
            fontWeight: 'normal',
            color: '#fff',
            textShadow: false,
            textOutline: false
          }
        }
      }
    },
    resize: true,
    series: [
      {
        name: 'Downloads',
        data: [
          {
            name: 'Firefox',
            y: 20
          },
          {
            name: 'IE',
            y: 20
          },
          {
            name: 'Chrome',
            y: 30
          },
          {
            name: 'Safari',
            y: 14.67
          },
          {
            name: 'Opera',
            y: 13.91
          },
          {
            name: 'Proprietary',
            y: 5
          }
        ]
      }
    ],
    exporting: {
      enabled: true
    }
  });
