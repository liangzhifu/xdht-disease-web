import { Component, OnInit } from '@angular/core';
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
  selector: 'app-individual-noise-echarts',
  templateUrl: './individual-noise-echarts.component.html',
  styleUrls: ['./individual-noise-echarts.component.scss']
})
export class IndividualNoiseEchartsComponent implements OnInit {
  individualNoiseList = [{
    id: '',
    workshop: '',
    postId: '',
    postName: '',
    stopPlace: '',
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
    this.titleService.titleEventEmitter.emit('劳动者个体噪声暴露评估');
  }

  ngOnInit() {
    const  postNames = [];
    const  postIds = [];
    const  year = [];
    this.httpService.get(SystemConstant.RECORD_INDIVIDUAL_NOISE_ECHARS_DETAIL).subscribe({
      next: (individualNoiseData) => {
        this.individualNoiseList = individualNoiseData;
        if (this.individualNoiseList.length > 0 ) {
          for (let i = 0; i < this.individualNoiseList.length; i++) {
            if (!postNames.includes(this.individualNoiseList[i].postName)) {
              postNames.push(this.individualNoiseList[i].postName);
              postIds.push(this.individualNoiseList[i].postId);
            }
            if (!year.includes(this.individualNoiseList[i].contactTime.substring(0, 4) + '年')) {
              year.push(this.individualNoiseList[i].contactTime.substring(0, 4) + '年');
            }
          }
        }
        this.chartOption = {
          title: {
            text:  '劳动者个体噪声暴露评估图',
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
            for (let j = 0; j < individualNoiseData.length; j++) {
              everyYear = year[j];
              for (let i = 0; i < individualNoiseData.length; i++) {
                for (let k = 0; k < postIds.length; k++) {
                  const postId = postIds[k];
                  if (postId === individualNoiseData[i].postId && everyYear === individualNoiseData[i].contactTime.substring(0, 4) + '年') {
                    dataArray.push(individualNoiseData[i].soundLevel);
                  }
                }
              }
              const item = {
                name : everyYear,
                type: 'line',
                smooth: true,
                // symbol: 'none',  //折点处小圆点设置
                data: dataArray
              };
              serie.push(item);
              dataArray = [];
            }
            return serie;
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
