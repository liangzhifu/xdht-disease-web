import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../core/http/http.service';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {ToastType} from '../../toast/toast-type.enum';
import {FormBuilder} from '@angular/forms';
import {ModalService} from '../../modal/modal.service';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {ToastConfig} from '../../toast/toast-config';
import {SystemConstant} from '../../core/class/system-constant';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SelectEmployeeComponent} from '../select-employee/select-employee.component';
import {AlertType} from '../../modal/alert/alert-type';
import {AlertConfig} from '../../modal/alert/alert-config';
import {ActivatedRoute, Router} from '@angular/router';
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
  addFlag: boolean;
  action = '';
  // 输入填写内容
  @Input() recordSceneRequest = {
    recordScene: {
      id: '',
      recordNo: '',
      projectName: '',
      inquiryType: '',
      inquiryPerson: '',
      inquiryCompany: '',
      inquiryCompanyEmployee: '',
      inquiryCompanyEmployeeName: '',
      inquiryDate: '',
      inquiryDatepicker: {
        year : null,
        month: null,
        day: null
      }
    },
    recordScenQuestionnaireList: [{
      id: '',
      sceneId: '',
      questionnaireId: '',
      generatorRecord: null,
      questionnaireName: ''
    }]
  };
  inquiryTypeList = [{
    id : '',
    dictionaryName: ''
  }];

  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private waitService: WaitService,
    private activeRoute: ActivatedRoute,
    private router: Router
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
    // 获取调查类型
    this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 7}).subscribe({
      next: (data) => {
        this.inquiryTypeList = data;
      },
      complete: () => {
      }
    });
    this.activeRoute.queryParams.subscribe(params => {
      const id = params['id'];
      if (id === undefined || id === null || id === '') {
        this.action = '新增';
        this.addFlag = true;
        this.recordSceneEditTitle = '新增--职业卫生现场调查记录';
        // 获取问卷的列表
        this.httpService.post(SystemConstant.QUESTION_LIST, null).subscribe({
          next: (data) => {
            this.recordSceneRequest.recordScenQuestionnaireList = [];
            for (let i = 0; i < data.length; i++) {
              const recordSceneQuestionData = {
                'id': '',
                'sceneId': '',
                'questionnaireId': data[i].id,
                'generatorRecord': '',
                'questionnaireName': data[i].questionnaireName
              };
              this.recordSceneRequest.recordScenQuestionnaireList.push(recordSceneQuestionData);
            }
          },
          complete: () => {
          }
        });
      } else {
        this.action = '修改';
        this.addFlag = false;
        this.recordSceneEditTitle = '修改--职业卫生现场调查记录';
        // 获取职业卫生现场调查记录数据
        this.httpService.get(SystemConstant.RECORD_SCENE_DETAIL + '/' + id).subscribe({
          next: (data) => {
            this.recordSceneRequest = data;
            $('#inquiryDate').val(this.recordSceneRequest.recordScene.inquiryDate);
            this.recordSceneRequest.recordScene.inquiryDatepicker = {
              year: Number(this.recordSceneRequest.recordScene.inquiryDate.substring(0, 4)),
              month: Number(this.recordSceneRequest.recordScene.inquiryDate.substring(5, 7)),
              day: Number(this.recordSceneRequest.recordScene.inquiryDate.substring(8, 10))
            };
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取用户详情失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    });
  }


  /**
   * 关闭对话框
   */
  close() {
    this.router.navigate(['/main/record/recordSceneManage']);
  }

  /**
   * 提交
   */
  submitData() {
    let num = 0;
    this.recordSceneRequest.recordScene.inquiryDate = $('#inquiryDate').val();
    for (let i = 0; i < this.recordSceneRequest.recordScenQuestionnaireList.length; i++) {
      if ($('#checkbox-' + this.recordSceneRequest.recordScenQuestionnaireList[i].questionnaireId).is(':checked')) {
        this.recordSceneRequest.recordScenQuestionnaireList[i].generatorRecord = '1';
        num++;
      } else {
        this.recordSceneRequest.recordScenQuestionnaireList[i].generatorRecord = '0';
      }
    }
    if (num === 0) {
      // 验证是否勾选调查表
      const alertRecordConfig: AlertConfig = new AlertConfig(AlertType.INFO, '至少选择一个调查表！');
      this.modalService.alert(alertRecordConfig);
      return false;
    } else {
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
          this.router.navigate(['/main/record/recordSceneManage']);
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
  }

  /**
   * 根据单位改变单位下的人员
   */
  changeCompany() {
    this.recordSceneRequest.recordScene.inquiryCompanyEmployee = '';
    this.recordSceneRequest.recordScene.inquiryCompanyEmployeeName = '';
  }

  /**
   * 选择陪同人
   */
  selectEmployee() {
    const modalRef = this.ngbModal.open(SelectEmployeeComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.componentInstance.companyId = this.recordSceneRequest.recordScene.inquiryCompany;
    modalRef.result.then(
      (result) => {
        if (result.success === 'success') {
          this.recordSceneRequest.recordScene.inquiryCompanyEmployee = result.sysEmployee.id;
          this.recordSceneRequest.recordScene.inquiryCompanyEmployeeName = result.sysEmployee.empName;
        }
      }
    );
  }

  change() {
    const inquiryDate = $('#inquiryDate').val().substring(0, 4);
    $('#year').val(inquiryDate);
  }
}
