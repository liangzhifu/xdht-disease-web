import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SystemConstant} from '../../core/class/system-constant';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {ModalService} from '../../modal/modal.service';
import {FormBuilder} from '@angular/forms';
import {WaitService} from '../../core/wait/wait.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-record-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.scss']
})
export class SceneDetailComponent implements OnInit {

  recordSceneTitle: string;
  // 查询问卷列表
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  companyData: any;
  addFlag: boolean;
  action = '';
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
    private activeModal: NgbActiveModal,
    private waitService: WaitService
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
    this.recordSceneTitle = '职业卫生现场调查记录-详情';
  }

  /**
   * 关闭对话框
   */
  close() {
    this.activeModal.dismiss('failed');
  }
}
