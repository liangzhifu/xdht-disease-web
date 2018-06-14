import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../core/http/http.service';
import { SimpleDataHttpPageComponent } from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import { ToastType } from '../../toast/toast-type.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../../modal/modal.service';
import { ToastService } from '../../toast/toast.service';
import { WaitService } from '../../core/wait/wait.service';
import { ToastConfig } from '../../toast/toast-config';
import { SystemConstant} from '../../core/class/system-constant';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-record-scene-edit',
  templateUrl: './scene-edit.component.html',
  styleUrls: ['./scene-edit.component.scss']
})
export class SceneEditComponent implements OnInit {

  recordSceneEditTitle: string;
  // 查询问卷列表
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  companyData: any;
  employeeData: any;
  // 输入填写内容
  @Input() recordSceneRequest = {
    'recordScene' : {
      'id': '',
      'recordNo' : '',
      'projectName' : '',
      'inquiryType' : '',
      'inquiryPerson' : '',
      'inquiryCompany' : '',
      'inquiryCompanyEmployee' : '',
      'inquiryDate': ''
    },
    'recordScenQuestionnaireList' : [{
      'id': '',
      'sceneId': '',
      'questionnaireId' : '',
      'generatorRecord' : '',
      'questionnaireName': ''
    }]
  };
  addFlag: boolean;
  action = '';
  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private activeModal: NgbActiveModal,
    private waitService: WaitService
  ) {
    // 获取问卷的列表
    this.httpService.post(SystemConstant.QUESTION_LIST, null ).subscribe({
      next: (data) => {
        this.recordSceneRequest.recordScenQuestionnaireList = [];
        for (let i = 0; i < data.length; i ++) {
          const recordSceneQuestionData = {
            'id': '',
            'sceneId': '',
            'questionnaireId': data[i].id,
            'generatorRecord' : '',
            'questionnaireName': data[i].questionnaireName
          };
          this.recordSceneRequest.recordScenQuestionnaireList.push(recordSceneQuestionData);
        }
      },
      complete: () => {
      }
    });
    // 获取单位列表
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.companyData = data;
      },
      complete: () => {
      }
    });

  }

  ngOnInit() {
    if (this.recordSceneRequest.recordScene.id === undefined
      || this.recordSceneRequest.recordScene.id === null
      || this.recordSceneRequest.recordScene.id === '') {
      this.addFlag = true;
      this.action = '新增';
      this.recordSceneEditTitle = '新增--职业卫生现场调查记录';
    } else {
      this.addFlag = false;
      this.action = '修改';
      this.recordSceneEditTitle = '修改--职业卫生现场调查记录';
    }
  }

  /**
   * 关闭对话框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交
   */
  addEditSubmit() {
    for (let i = 0; i < this.recordSceneRequest.recordScenQuestionnaireList.length; i ++) {
      if ($('#checkbox-' + this.recordSceneRequest.recordScenQuestionnaireList[i].id).is(':checked')) {
        this.recordSceneRequest.recordScenQuestionnaireList[i].generatorRecord = '1';
      } else {
        this.recordSceneRequest.recordScenQuestionnaireList[i].generatorRecord = '0';
      }
    }
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.RECORD_SCENE_ADD;
    } else {
      url = SystemConstant.RECORD_SCENE_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordSceneRequest).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '操作失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }

  /**
   * 根据单位改变单位下的人员
   */
  changeCompany(companyId) {
    const param = {'companyId': companyId};
    this.httpService.post(SystemConstant.COMPANY_EMPLOYEE_LIST, param).subscribe({
      next: (data) => {
        this.employeeData = data;
      },
      complete: () => {
      }
    });
  }

}
