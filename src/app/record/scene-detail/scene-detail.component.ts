import { Component, OnInit } from '@angular/core';
import { ToastConfig } from '../../toast/toast-config';
import { ToastType } from '../../toast/toast-type.enum';
import { SystemConstant } from '../../core/class/system-constant';
import { HttpService } from '../../core/http/http.service';
import { ToastService } from '../../toast/toast.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostPersonelComponent } from '../post-personel/post-personel.component';

@Component({
  selector: 'app-record-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.scss']
})
export class SceneDetailComponent implements OnInit {

  sceneId: any = null;
  sceneMap = {
    'projectName': ''
  };
  scenQuestionnaireMapList = [];
  constructor(
    private ngbModal: NgbModal,
    private routeInfo: ActivatedRoute,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.routeInfo.queryParams
      .subscribe((params: Params) => {
        this.sceneId = params['id'];
        this.httpService.get(SystemConstant.RECORD_SCENE_DETAIL + '/' + this.sceneId).subscribe({
          next: (data) => {
            this.sceneMap = data.recordSceneMap;
            this.scenQuestionnaireMapList = data.scenQuestionnaireMapList;
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取职业卫生现场调查记录表信息失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      });
  }

  editRecord(questionnaireAlias) {
    if (questionnaireAlias === 'post_personnel') {
      // 表2岗位定员及工作制度调查表【工时调查】
      this.openPostPersonnel(null);
    }
  }

  /**
   * 打开修改用户对话框
   */
  openPostPersonnel(postPersonnelData) {
    const modalRef = this.ngbModal.open(PostPersonelComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
        }
      }
    );
  }
}
