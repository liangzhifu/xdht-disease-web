import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TitleService} from '../../title.service';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {ToastConfig} from '../../toast/toast-config';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';

@Component({
  selector: 'app-workplace-noise-echarts',
  templateUrl: './workplace-noise-echarts.component.html',
  styleUrls: ['./workplace-noise-echarts.component.scss']
})
export class WorkplaceNoiseEchartsComponent implements OnInit {

  workplaceNoiseList = [{
    id: '',
    workshop: '',
    postId: '',
    postName: '',
    stopPlace: '',
    checkPlace: '',
    testResult: '',
    analysisResult: '',
    contactTime: '',
    soundLevel: ''
  }];
  chartOption: any;
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
    this.titleService.titleEventEmitter.emit('工作场所噪声暴露评估');
  }

  ngOnInit() {
    const  postNames = [];
    const  postIds = [];
    const  year = [];
    this.httpService.get(SystemConstant.RECORD_WORKPLACE_NOISE_ECHARS_DETAIL).subscribe({
      next: (workplaceNoiseData) => {
        this.workplaceNoiseList = workplaceNoiseData;
        if (this.workplaceNoiseList.length > 0 ) {
          for (let i = 0; i < this.workplaceNoiseList.length; i++) {
            if (!postNames.includes(this.workplaceNoiseList[i].postName)) {
              postNames.push(this.workplaceNoiseList[i].postName);
              postIds.push(this.workplaceNoiseList[i].postId);
            }
            if (!year.includes(this.workplaceNoiseList[i].contactTime.substring(0, 4) + '年')) {
              year.push(this.workplaceNoiseList[i].contactTime.substring(0, 4) + '年');
            }
          }
        }
        this.chartOption = {
          title: {
            text:  '工作场所噪声暴露评估图',
            x: 'center',
            y: 'bottom'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data: year
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
              name: '岗位名称',
              position: 'bottom',
              type : 'category',
              boundaryGap : true,
              data : postNames,
            }
          ],
          yAxis : [
            {
              name: '强度dB',
              type : 'value'
            }
          ],
          series: function() {
            const serie = [];
            let dataArray = [];
            let everyYear = '';
            // 取每个岗位同一年份的值放在一起
            for (let j = 0; j < year.length; j++) {
              everyYear = year[j];
              for (let i = 0; i < workplaceNoiseData.length; i++) {
                for (let k = 0; k < postIds.length; k++) {
                  const postId = postIds[k];
                  if (postId === workplaceNoiseData[i].postId && everyYear === workplaceNoiseData[i].contactTime.substring(0, 4) + '年') {
                    dataArray.push(workplaceNoiseData[i].soundLevel);
                  }
                }
              }
              const item = {
                name: everyYear,
                type: 'line',
                smooth: true,
                // itemStyle : { normal: {label : {show: true}}},
                data: dataArray
              };
              serie.push(item);
              dataArray = [];
          }
            return serie;
          }(),
/*
          series: function() {
            const serie = [];
            let dataArray = [];
            let num = 0;
            // 取每个岗位不同年份的值放在一起
            for (let i = 0; i < workplaceNoiseData.length; i++) {
              const years =  [];
              if (!years.includes(workplaceNoiseData[i].contactTime.substring(0, 4))) {
                years.push(workplaceNoiseData[i].contactTime.substring(0, 4));
              }
               if (num > postIds.length - 1) {
                    num = 1;
                    dataArray = [];
                    dataArray.push(workplaceNoiseData[i].soundLevel);
               } else {
                 num++;
                 dataArray.push(workplaceNoiseData[i].soundLevel);
               }
                const item = {
                  name : years + '年',
                  type: 'line',
                  // symbol: 'none',  //折点处小圆点设置
                  // itemStyle : { normal: {label : {show: true}}},
                  data: dataArray
                };
                serie.push(item);
            }
            return serie;
          }(),
*/
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
