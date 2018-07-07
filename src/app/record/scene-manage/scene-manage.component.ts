import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../core/http/http.service';
import {ToastConfig} from '../../toast/toast-config';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';
import {SystemConstant} from '../../core/class/system-constant';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {NgbDatepickerI18n, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import 'jquery';
import {TitleService} from '../../title.service';
import {I18nService} from '../../core/I18n/i18n.service';
import {CustomDatepickerI18nService} from '../../core/I18n/custom-datepicker-i18n.service';

declare var $: any;
@Component({
  selector: 'app-record-scene-manage',
  templateUrl: './scene-manage.component.html',
  styleUrls: ['./scene-manage.component.scss'],
  providers: [I18nService, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}]
})
export class SceneManageComponent implements OnInit, AfterViewInit {
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    projectName: '',
    recordNo: '',
    inquiryDate: '',
    inquiryPerson: '',
    inquiryYear: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private router: Router,
    private titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('现场调查记录');
  }

  ngOnInit() {
    this.url = SystemConstant.RECORD_SCENE_PAGE_LIST;
  }

  ngAfterViewInit() {
    this.search();
  }

  /**
   * 查询
   */
  search() {
    this.param.inquiryDate = $('#inquiryDate').val();
    this.waitService.wait(true);
    this.sdhp.search();
    this.waitService.wait(false);
  }

  /**
   * 新增--职业卫生现场调查记录
   */
  addScene() {
    this.router.navigate(['/main/record/recordSceneEdit'], {queryParams: {id: null}});
  }

  /**
   * 修改--职业卫生现场调查记录
   */
  editScene(id) {
    this.router.navigate(['/main/record/recordSceneEdit'], {queryParams: {id: id}});
  }

  /**
   * 详情
   * @param id
   */
  detailScene(id) {
    this.router.navigate(['/main/record/recordSceneDetail'], {queryParams: {id: id}});
  }

  /**
   * 删除--职业卫生现场调查记录
   */
  delScene(id, projectName) {
    const confirmCfg = new ConfirmConfig('确定删除现场调查记录：' + projectName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.RECORD_SCENE_DEL +  '/' + id , {} ).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除现场调查记录成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除现场调查记录失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }
}
