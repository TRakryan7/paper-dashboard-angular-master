import { Component, OnInit } from '@angular/core';
import { dataDummy } from 'app/data';
import Chart from 'chart.js';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public tableData1: TableData;
  public tableData2: TableData;
  public data:any;
  public header:any;
  public dataFacebook:any;
  public dataInstagram:any;
  public dataWhatsapp:any;
  public dataIklan:any;
  public dataPie:any;

    ngOnInit(){
      this.chartColor = "#FFFFFF";
      this.data = dataDummy;
      this.header = ["TANGGAL","NAMA","WHATSAPP","KOTA/KAB","PROV", "SUMBER", "NAMA IKLAN","JAM"];

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");
      this.dataFacebook = this.getDataCount("Facebook","Sabtu, 24 Juni 2023", "Senin, 26 Juni 2023");
      this.dataInstagram = this.getDataCount("Instagram","Sabtu, 24 Juni 2023", "Senin, 26 Juni 2023");
      this.dataIklan = this.getDataCount("Iklan","Sabtu, 24 Juni 2023", "Senin, 26 Juni 2023");
      this.dataWhatsapp = this.getDataCount("Whatsapp","Sabtu, 24 Juni 2023", "Senin, 26 Juni 2023");
      this.dataPie = this.getDataPie()
      console.log(this.dataPie);
      
      this.chartHours = new Chart(this.ctx, {
        type: 'bar',

        data: {
          labels: ["Sabtu, 24 Juni 2023", "Senin, 26 Juni 2023"],
          datasets: [{
              label:"Facebook",
              borderColor: "#6488ea",
              backgroundColor: "#6488ea",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.dataFacebook
            },
            {
              label:"Instagram",
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.dataInstagram
            },
            {
              label:"Iklan",
              borderColor: "#fcc468",
              backgroundColor: "#fcc468",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.dataIklan
            },
            {
              label:"Whatsapp",
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.dataWhatsapp
            },
          ],
        },
        options: {
          legend: {
            display: true, 
          },

          tooltips: {
            enabled: true,
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });


      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ["Facebook", "Instagram", "Iklan", "Whatsapp"],
          datasets: [{
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#6488ea',
              '#f17e5d"',
              '#fcc468',
              '#6bd098'
            ],
            borderWidth: 0,
            data: this.dataPie
          }]
        },

        options: {

          legend: {
            display: true
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: true,
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });

      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        label:"Facebook",
        data: this.dataFacebook,
        fill: false,
        borderColor: '#6488ea',
        backgroundColor: 'transparent',
        pointBorderColor: '#6488ea',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        label:"Instagram",
        data: this.dataInstagram,
        fill: false,
        borderColor: '#f17e5d',
        backgroundColor: 'transparent',
        pointBorderColor: '#f17e5d',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };
      var dataThird = {
        label:"Iklan",
        data: this.dataIklan,
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };
      var dataForth = {
        label:"Whatsapp",
        data: this.dataWhatsapp,
        fill: false,
        borderColor: '#6bd098',
        backgroundColor: 'transparent',
        pointBorderColor: '#6bd098',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["Sabtu, 24 Juni 2023", "Senin, 26 Juni 2023"],
        datasets: [dataFirst, dataSecond, dataThird, dataForth]
      };

      var chartOptions = {
        legend: {
          display: true,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });

    }

    getDataCount(sumber:string,tanggalPertama:string, tanggalKedua:string){
      let dataGet =[];
      let filterData = this.data.filter(item=>item.sumber===sumber && item.tanggal===tanggalPertama);
      dataGet.push(filterData.length);
      let filterSecond = this.data.filter(item=>item.sumber===sumber && item.tanggal===tanggalKedua);
      dataGet.push(filterSecond.length);

      return dataGet;
    }

    getDataPie(){
      let dataGet=[];
      let filterOne = this.data.filter(item=>item.sumber==="Facebook");
      dataGet.push(filterOne.length)
      filterOne = this.data.filter(item=>item.sumber==="Instagram");
      dataGet.push(filterOne.length)
      filterOne = this.data.filter(item=>item.sumber==="Iklan");
      dataGet.push(filterOne.length)
      filterOne = this.data.filter(item=>item.sumber==="Whatsapp");
      dataGet.push(filterOne.length)

      return dataGet;
    }
}
