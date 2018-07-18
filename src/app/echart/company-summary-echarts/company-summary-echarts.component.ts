import { Component, OnInit } from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../../modal/modal.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {TitleService} from '../../title.service';
import {WaitService} from '../../core/wait/wait.service';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {SystemConstant} from '../../core/class/system-constant';
import 'jquery';
declare var $: any;
@Component({
  selector: 'app-company-summary-echarts',
  templateUrl: './company-summary-echarts.component.html',
  styleUrls: ['./company-summary-echarts.component.scss']
})
export class CompanySummaryEchartsComponent implements OnInit {
  companySummaryEchartList = [{
    year: '',
    companyId: '',
    companyName: '',
    counts: ''
  }];
  companySummaryPercentEchartList = [{
    year: '',
    companyId: '',
    companyName: '',
    percent: ''
  }];
  yearData = [{
    year: ''
  }];
  companySummaryRequest = {
    startTime: '',
    endTime: ''
  };
  chartOption: any;
  chartPercentOption: any;
  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private waitService: WaitService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('企业体检信息');
    this.httpService.post(SystemConstant.COMPANY_SUMMARY_YEAR, {}).subscribe({
      next: (myData) => {
        this.yearData = myData;
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取信息失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  ngOnInit() {
  }

  selectCompanySummaryEchartsInfo() {
    this.companySummaryRequest.startTime = $('#startTime').val();
    this.companySummaryRequest.endTime = $('#endTime').val();
    const years = [];
    const companyIds = [];
    const companyNames = [];
    for (let i = 0; i < this.yearData.length; i++) {
      years.push(this.yearData[i].year);
    }
    this.httpService.post(SystemConstant.COMPANY_SUMMARY_ECHART_DETAIL, this.companySummaryRequest).subscribe({
      next: (companySummaryData) => {
        this.companySummaryEchartList = companySummaryData;
        for (let i = 0; i < companySummaryData.length; i++) {
          if (!companyIds.includes(companySummaryData[i].companyId)) {
            companyIds.push(companySummaryData[i].companyId);
            companyNames.push((companySummaryData[i].companyName));
          }
        }
        this.chartOption = {
          title: {
            text: '企业体检-每个企业体检人数',
            x: 'center',
            y: 'bottom'
          },
          tooltip: {
            trigger: 'axis',
            // formatter: '{b0}:{c0}人'
          },
          legend: {
            data: companyNames
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: '10%',
            containLabel: true
          },
          xAxis: [
            {
              name: '年份',
              position: 'bottom',
              type: 'category',
              boundaryGap: true,
              data: years,
            }
          ],
          yAxis: [
            {
              name: '人数',
              type: 'value',
              axisLabel: {
                show: true,
                formatter: '{value}人'
              },
            }
          ],
          series: function () {
            const serie = [];
            let dataArray = [];
            let companyName = [];
            // 取每个企业每年的数据
            if (companySummaryData.length > 0) {
              for (let k = 0; k < companyIds.length; k++) {
                companyName.push(companyNames[k]);
                for (let i = 0; i < companySummaryData.length; i++) {
                  if (companyIds[k] === companySummaryData[i].companyId) {
                    dataArray.push((companySummaryData[i].counts));
                  }
                }
                const item = {
                  name: companyName,
                  type: 'line',
                  smooth: true,
                  data: dataArray
                };
                serie.push(item);
                dataArray = [];
                companyName = [];
              }
              return serie;
            }
          }(),
        };
        // START
        // 获取百分比数据
        // const percentYear = [];
        const percentCompanyIds = [];
        const percentCompanyNames = [];
        this.httpService.post(SystemConstant.COMPANY_SUMMARY_PERCENT_ECHART_DETAIL, this.companySummaryRequest).subscribe({
          next: (companySummaryPercentData) => {
            this.companySummaryPercentEchartList = companySummaryPercentData;
            for (let i = 0; i < companySummaryPercentData.length; i++) {
              if (!percentCompanyIds.includes(companySummaryPercentData[i].companyId)) {
                percentCompanyIds.push(companySummaryPercentData[i].companyId);
                percentCompanyNames.push((companySummaryPercentData[i].companyName));
              }
            }
            this.chartPercentOption = {
              title: {
                text: '企业体检-每个企业职业病患者所占比例',
                x: 'center',
                y: 'bottom'
              },
              tooltip: {
                trigger: 'axis',
                // formatter: '{b0}:{c0}%'
              },
              legend: {
                data: percentCompanyNames
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                top: '10%',
                containLabel: true
              },
              xAxis: [
                {
                  name: '年份',
                  position: 'bottom',
                  type: 'category',
                  boundaryGap: true,
                  data: years,
                }
              ],
              yAxis: [
                {
                  name: '百分比/(%)',
                  type: 'value',
                  axisLabel: {
                    show: true,
                    formatter: '{value}%'
                  },
                }
              ],
              series: function () {
                const serie = [];
                let dataArray = [];
                let companyName = [];
                // 获取每个企业的职业病百分比数据
                if (companySummaryPercentData.length > 0) {
                  for (let k = 0; k < companyIds.length; k++) {
                    companyName.push(percentCompanyNames[k]);
                    for (let i = 0; i < companySummaryPercentData.length; i++) {
                      if (companyIds[k] === companySummaryPercentData[i].companyId) {
                        dataArray.push((companySummaryPercentData[i].percent));
                      }
                    }
                    const item = {
                      name: companyName,
                      type: 'line',
                      smooth: true,
                      data: dataArray
                    };
                    serie.push(item);
                    dataArray = [];
                    companyName = [];
                  }
                  return serie;
                }
              }(),
            };
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取信息失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {
          }
        });
        // END
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取信息失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {
      }
    });
  }

}
