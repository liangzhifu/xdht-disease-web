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
    counts: ''
  }];
  companySummaryPercentEchartList = [{
    year: '',
    percent: ''
  }];
  yearData = [];
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
    this.httpService.post(SystemConstant.COMPANY_SUMMARY_ECHART_DETAIL, {}).subscribe({
      next: (myData) => {
        for (let i = 0; i < myData.length; i++) {
          this.yearData.push(myData[i].year);
        }
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
    this.httpService.post(SystemConstant.COMPANY_SUMMARY_ECHART_DETAIL, this.companySummaryRequest).subscribe({
      next: (companySummaryData) => {
        this.companySummaryEchartList = companySummaryData;
        if (this.companySummaryEchartList.length > 0 ) {
          for (let i = 0; i < this.companySummaryEchartList.length; i++) {
            years.push(this.companySummaryEchartList[i].year +  '年');
          }
        }
        this.chartOption = {
          title: {
            text:  '企业体检-职业病患者所占人数',
            x: 'center',
            y: 'bottom'
          },
          tooltip : {
            trigger: 'axis',
            formatter: '{b0}:{c0}人'
          },
          legend: {
            // data: years
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
          xAxis : [
            {
              name: '年份',
              position: 'bottom',
              type : 'category',
              boundaryGap : true,
              data : years,
            }
          ],
          yAxis : [
            {
              name: '人数',
              type : 'value',
              axisLabel: {
                show: true,
                formatter: '{value}人'
              },
            }
          ],
          series: function() {
            const serie = [];
            const dataArray = [];
            if (companySummaryData.length > 0) {
              for (let i = 0; i < companySummaryData.length; i++) {
                dataArray.push(companySummaryData[i].counts);
              }
              const item = {
                type: 'line',
                smooth: true,
                data: dataArray
              };
              serie.push(item);
              return serie;
            }
          }(),
        };
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取信息失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
    // 获取百分比数据
    const percentYear = [];
    this.httpService.post(SystemConstant.COMPANY_SUMMARY_PERCENT_ECHART_DETAIL, this.companySummaryRequest).subscribe({
      next: (companySummaryPercentData) => {
        this.companySummaryPercentEchartList = companySummaryPercentData;
        if (this.companySummaryPercentEchartList.length > 0 ) {
          for (let i = 0; i < this.companySummaryPercentEchartList.length; i++) {
            percentYear.push(this.companySummaryPercentEchartList[i].year +  '年');
          }
        }
        this.chartPercentOption = {
          title: {
            text:  '企业体检-职业病患者所占比例',
            x: 'center',
            y: 'bottom'
          },
          tooltip : {
            trigger: 'axis',
            formatter: '{b0}:{c0}%'
          },
          legend: {
            // data: percentYear
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
          xAxis : [
            {
              name: '年份',
              position: 'bottom',
              type : 'category',
              boundaryGap : true,
              data : percentYear,
            }
          ],
          yAxis : [
            {
              name: '百分比/(%)',
              type : 'value',
              axisLabel: {
                show: true,
                formatter: '{value}%'
              },
            }
          ],
          series: function() {
            const serie = [];
            const dataArray = [];
            if (companySummaryPercentData.length > 0) {
              for (let i = 0; i < companySummaryPercentData.length; i++) {
                dataArray.push(companySummaryPercentData[i].percent);
              }
              const item = {
                type: 'line',
                smooth: true,
                data: dataArray
              };
              serie.push(item);
              return serie;
            }
          }(),
        };
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取信息失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

}
