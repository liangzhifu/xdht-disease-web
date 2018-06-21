import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {ModalService} from '../../modal/modal.service';
import {FormBuilder} from '@angular/forms';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SceneEditComponent} from '../scene-edit/scene-edit.component';

@Component({
  selector: 'app-select-employee',
  templateUrl: './select-employee.component.html',
  styleUrls: ['./select-employee.component.scss']
})
export class SelectEmployeeComponent implements OnInit {
  sysEmployeeTitle: string;
  sysEmployeeRequest = {
    'sysEmployeeList': [{
      'id': '',
      'empName': ''
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
  }

  ngOnInit() {
    this.sysEmployeeTitle = '选择陪同人';
  }

  updateSelection(item) {
    console.log('item.id:' + item.id)
    // item.checked = true;
    const dataList = this.sysEmployeeRequest.sysEmployeeList;
    for (let i = 0; i < dataList.length; i++) {
      $('#checkbox-' + dataList[i].id).checked = false;
    }
    $('#checkbox-' + item.id).checked = true;

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
  submitData() {
    const dataList = this.sysEmployeeRequest.sysEmployeeList;
    for (let i = 0; i < dataList.length; i++) {
      if ($('#checkbox-' + dataList[i].id).is(':checked')) {
        const modalRef = this.ngbModal.open(SceneEditComponent);
        modalRef.componentInstance.recordSceneRequest.recordScene.inquiryCompanyEmployee = dataList[i].id;
        modalRef.componentInstance.recordSceneRequest.recordScene.inquiryCompanyEmployeeName = dataList[i].empName;
        modalRef.result.then(
          (result) => {
            if (result === 'success') {
              // this.search();
            }
          }
        );
        this.activeModal.dismiss('failed');

      }
    }
  }
}
