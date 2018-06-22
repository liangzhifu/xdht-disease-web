import {Component, Input, OnInit} from '@angular/core';
import {SystemConstant} from '../../core/class/system-constant';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../modal/modal.service';
import {FormBuilder} from '@angular/forms';
import {WaitService} from '../../core/wait/wait.service';
import {ActivatedRoute} from '@angular/router';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';

@Component({
  selector: 'app-record-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.scss']
})
export class SceneDetailComponent implements OnInit {

  recordSceneTitle: '职业卫生现场调查记录-详情';
  companyData: any;
  // 输入填写内容
  @Input() recordSceneRequest = {
    'recordScene': {
      'id': '',
      'recordNo': '',
      'projectName': '',
      'inquiryType': '',
      'inquiryPerson': '',
      'inquiryCompany': '',
      'inquiryCompanyEmployee': '',
      'inquiryCompanyEmployeeName': '',
      'inquiryDate': ''
    },
    'recordScenQuestionnaireList': [{
      'id': '',
      'sceneId': '',
      'questionnaireId': '',
      'generatorRecord': '',
      'questionnaireName': ''
    }]
  };

  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private waitService: WaitService,
    private activeRoute: ActivatedRoute
  ) {
    // 获取单位列表
    this.httpService.post(SystemConstant.COMPANY_LIST, {}).subscribe({
      next: (data) => {
        this.companyData = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      const id = params['id'];
      this.httpService.get(SystemConstant.RECORD_SCENE_DETAIL + '/' + id).subscribe({
        next: (data) => {
          this.recordSceneRequest = data;
        },
        error: (err) => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取职业卫生现场调查记录数据失败！' + '失败原因：' + err, 3000);
          this.toastService.toast(toastCfg);
        },
        complete: () => {}
      });
    });
  }

}
