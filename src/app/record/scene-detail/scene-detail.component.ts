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
import {PostPersonnelEditComponent} from '../post-personnel-edit/post-personnel-edit.component';
import {ControlEffectEditComponent} from '../control-effect-edit/control-effect-edit.component';
import {PresentSituationEditComponent} from '../present-situation-edit/present-situation-edit.component';

@Component({
  selector: 'app-record-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.scss']
})
export class SceneDetailComponent implements OnInit {

  companyData: any;
  editComponent: any;
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

  openRecordEdit(questionnaireId, sceneId) {
    console.log('sceneId:' + sceneId)
    console.log('questionnaireId:' + questionnaireId);
    let myUrl;
    switch (questionnaireId) {
      case (1) : this.editComponent = PostPersonnelEditComponent;
                  myUrl = SystemConstant.POST_PERSONNEL_DETAIL;
                  break;
      case (2) : this.editComponent = ControlEffectEditComponent;
                  myUrl = SystemConstant.CONTROL_EFFECT_DETAIL;
                  break;
      case (3) : this.editComponent = PresentSituationEditComponent;
                  myUrl = SystemConstant.PRESENT_SITUATION_DETAIL;
                  break;
      case (4) : this.editComponent = PostPersonnelEditComponent;
                  myUrl = SystemConstant.POST_PERSONNEL_DETAIL;
                  break;
    }
    // 根据sceneId 编辑绑定该现场调查表下对应的调查表信息(测试范例)
    this.httpService.get(myUrl + '/' + sceneId).subscribe({
      next: (data) => {
        const modalRef = this.ngbModal.open(this.editComponent, { size: 'lg'});
        modalRef.componentInstance.recordPostPersonnelInputRequest = data;
        modalRef.result.then(
          (result) => {
            if (result === 'success') {
              console.log('操作成功');
            }
          }
        );
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取职业卫生现场调查记录数据失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });

  }
}
