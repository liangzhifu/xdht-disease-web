import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {HttpService} from '../../core/http/http.service';
import {QuillEditorComponent} from 'ngx-quill';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';

@Component({
  selector: 'app-knowledge-edit',
  templateUrl: './knowledge-edit.component.html',
  styleUrls: ['./knowledge-edit.component.scss']
})
export class KnowledgeEditComponent implements OnInit {
  knowledgeEditTitle = '';
  action = '';
  addFlag = null;
  @Input() catalogId = 0;
  @Input() sysKnowledge = {
    id : '',
    catalogId: 0,
    knowledgeTitle: '',
    knowledgeContent: '',
    knowledgeVersion: ''
  };
  @ViewChild('editor') editor: QuillEditorComponent;
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) { }

  ngOnInit() {
    if (this.sysKnowledge.id === undefined || this.sysKnowledge.id  === null || this.sysKnowledge.id === '') {
      this.action = '新增';
      this.addFlag = true;
      this.knowledgeEditTitle = '新增知识库';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.knowledgeEditTitle = '修改知识库';
    }
    this.editor.writeValue(this.sysKnowledge.knowledgeContent);
  }

  /**
   * 内容改变
   * @param data 值
   */
  contentChanged(data) {
    this.sysKnowledge.knowledgeContent = data.html;
  }

  /**
   * 关闭模态框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交数据
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.KNOWLEDGE_ADD;
      this.sysKnowledge.catalogId = this.catalogId;
    } else {
      url = SystemConstant.KNOWLEDGE_EDIT;
    }
    this.httpService.post(url, this.sysKnowledge).subscribe({
      next: () => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '知识库成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '知识库失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }

}
