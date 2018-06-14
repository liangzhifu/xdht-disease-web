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
import { PostPersonelComponent } from '../post-personel/post-personel.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  recordData: any;
  companyData: any;
  employeeData: any;
  // 输入填写内容
  @Input() recordSceneRequest = {
    'recordScene' : {
      'recordNo' : '',
      'projectName' : '',
      'inquiryType' : '',
      'inquiryPerson' : '',
      'inquiryCompany' : '',
      'inquiryCompanyEmployee' : '',
      'inquiryDate': ''
    },
    'recordSceneQuestionDataList' : [{
      'questionnaireId' : '',
      'generatorRecord' : ''
    }]
  };
  @Input() recordSceneData: any = null;
  addFlag: boolean;
  action = '';
  // recordSceneEditFormGroup: FormGroup;
  // myFormGroup: FormGroup;
  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private activeModal: NgbActiveModal,
    private waitService: WaitService
  ) {
    // this.recordSceneEditFormGroup = this.formBuilder.group({
    //   id: '',
    //   recordNo: '',
    //   projectName: '',
    //   inquiryType: '',
    //   inquiryPerson: '',
    //   inquiryCompany: '',
    //   inquiryCompanyEmployee: '',
    //   inquiryDate: '',
    //   status: '',
      // generatorRecord: '',
      // questionnaireId: ''
    // });
    // this.myFormGroup = this.formBuilder.group({
    //   generatorRecord: '',
    //   questionnaireId: ''
    // });

    // 获取问卷的列表
    this.httpService.post(SystemConstant.QUESTION_ALL_LIST, null ).subscribe({
      next: (data) => {
        this.recordData = data;
        // this.recordSceneRequest.recordSceneQuestionDataList = data;
      },
      complete: () => {
      }
    });
    // 获取单位列表
    this.httpService.post(SystemConstant.COMPANY_ALL_LIST, null ).subscribe({
      next: (data) => {
        this.companyData = data;
      },
      complete: () => {
      }
    });

  }

  ngOnInit() {
    if (this.recordSceneData === undefined || this.recordSceneData === null) {
      this.action = '新增';
      this.addFlag = true;
      this.recordSceneEditTitle = '新增调查表';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.recordSceneEditTitle = '修改调查表';
      // this.recordSceneEditFormGroup.controls['id'].setValue(this.recordSceneData.id);
      // this.recordSceneEditFormGroup.controls['recordNo'].setValue(this.recordSceneData.recordNo);
      // this.recordSceneEditFormGroup.controls['projectName'].setValue(this.recordSceneData.projectName);
      // this.recordSceneEditFormGroup.controls['inquiryType'].setValue(this.recordSceneData.inquiryType);
      // this.recordSceneEditFormGroup.controls['inquiryPerson'].setValue(this.recordSceneData.inquiryPerson);
      // this.recordSceneEditFormGroup.controls['inquiryCompany'].setValue(this.recordSceneData.inquiryCompany);
      // this.recordSceneEditFormGroup.controls['inquiryCompanyEmployee'].setValue(this.recordSceneData.inquiryCompanyEmployee);
      // this.recordSceneEditFormGroup.controls['inquiryDate'].setValue(this.recordSceneData.inquiryDate);
      // this.recordSceneEditFormGroup.controls['status'].setValue(this.recordSceneData.status);
    }
  }

  editTable() {
    const modalRef = this.ngbModal.open(PostPersonelComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
        }
      }
    );
  }
  /**
   * 提交
   */
  addEditSubmit() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      // url = SystemConstant.RECORD_SCENE_ADD;
      url = SystemConstant.RECORD_SCENE_ADDALL;
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

    // 保存问卷状态表
    // console.log('this.myFormGroup.value:' + this.myFormGroup.value);
    // this.httpService.post(SystemConstant.RECORD_SCENE_QUESTION_ADD, this.myFormGroup.value).subscribe({
    //   next: (data) => {
    //     const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
    //     this.toastService.toast(toastCfg);
    //   },
    //   error: (err) => {
    //     const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '操作失败！' + '失败原因：' + err, 3000);
    //     this.toastService.toast(toastCfg);
    //   },
    //   complete: () => {
    //   }
    // });
    this.waitService.wait(false);
  }

  /**
   * 根据单位改变单位下的人员
   */
  changeUser(item) {
    const myData = {'companyId': item};
    this.httpService.post(SystemConstant.OFFICE_LIST, myData ).subscribe({
      next: (data) => {
        this.employeeData = data;
      },
      complete: () => {
      }
    });
  }

}
