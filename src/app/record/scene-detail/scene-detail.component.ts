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
import {PreEvaluationEditComponent} from '../pre-evaluation-edit/pre-evaluation-edit.component';
import {AntiNoiseEditComponent} from '../anti-noise-edit/anti-noise-edit.component';
import {EmergencyFacilitiesEditComponent} from '../emergency-facilities-edit/emergency-facilities-edit.component';
import {WorkLogEditComponent} from '../work-log-edit/work-log-edit.component';
import {ProductEditComponent} from '../product-edit/product-edit.component';
import {EquipmentEditComponent} from '../equipment-edit/equipment-edit.component';
import {EquipmentLayoutEditComponent} from '../equipment-layout-edit/equipment-layout-edit.component';
import {HazardFactorsEditComponent} from '../hazard-factors-edit/hazard-factors-edit.component';
import {VddEquipmentEditComponent} from '../vdd-equipment-edit/vdd-equipment-edit.component';
import {TemperatureProtectionEditComponent} from '../temperature-protection-edit/temperature-protection-edit.component';
import {OtherProtectiveEditComponent} from '../other-protective-edit/other-protective-edit.component';
import {IndividualProtectiveEditComponent} from '../individual-protective-edit/individual-protective-edit.component';
import {InformingFacilitiesEditComponent} from '../informing-facilities-edit/informing-facilities-edit.component';
import {BuildingBaseEditComponent} from '../building-base-edit/building-base-edit.component';
import {BuildingAerationEditComponent} from '../building-aeration-edit/building-aeration-edit.component';
import {AuxiliaryHealthEditComponent} from '../auxiliary-health-edit/auxiliary-health-edit.component';
import {RecordFundsEditComponent} from '../record-funds-edit/record-funds-edit.component';
import {HealthCareEditComponent} from '../health-care-edit/health-care-edit.component';
import {HealthManagementEditComponent} from '../health-management-edit/health-management-edit.component';

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
      'inquiryTypeName': '',
      'inquiryPerson': '',
      'inquiryCompany': '',
      'inquiryCompanyName': '',
      'inquiryCompanyEmployee': '',
      'inquiryCompanyEmployeeName': '',
      'inquiryDate': ''
    },
    'recordScenQuestionnaireList': [{
      'id': '',
      'sceneId': '',
      'questionnaireId': '',
      'generatorRecord': null,
      'questionnaireName': '',
      'editStatus': ''
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

  openRecordEdit(questionnaireId) {
    let myUrl;
    let options: any = {
      size: 'w80',
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    switch (questionnaireId) {
      case (1) : this.editComponent = PreEvaluationEditComponent;
                  myUrl = SystemConstant.PRE_EVALUATION_DETAIL;
                  options = {
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  };
                  break;
      case (2) : this.editComponent = ControlEffectEditComponent;
                  myUrl = SystemConstant.CONTROL_EFFECT_DETAIL;
                  options = {
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  };
                  break;
      case (3) : this.editComponent = PresentSituationEditComponent;
                  myUrl = SystemConstant.PRESENT_SITUATION_DETAIL;
                  options = {
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  };
                  break;
      case (4) : this.editComponent = PostPersonnelEditComponent;
                  myUrl = SystemConstant.POST_PERSONNEL_DETAIL;
                  options = {
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  };
                  break;
      case (5) : this.editComponent = WorkLogEditComponent;
                  myUrl = SystemConstant.WORK_LOG_DETAIL;
                  break;
      case (6) : this.editComponent = ProductEditComponent;
                  myUrl = SystemConstant.PRODUCT_DETAIL;
                  break;
      case (7) : this.editComponent = EquipmentEditComponent;
                  myUrl = SystemConstant.EQUIPMENT_DETAIL;
                  options = {
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  };
                  break;
      case (8) : this.editComponent = EquipmentLayoutEditComponent;
                  myUrl = SystemConstant.EQUIPMENT_LAYOUT_DETAIL;
                  options = {
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  };
                  break;
      case (9) : this.editComponent = HazardFactorsEditComponent;
                  myUrl = SystemConstant.HAZARD_FACTORS_DETAIL;
                  break;
      case (10) : this.editComponent = VddEquipmentEditComponent;
                  myUrl = SystemConstant.VDD_EQUIPMENT_DETAIL;
                  break;
      case (11) : this.editComponent = AntiNoiseEditComponent;
                  myUrl = SystemConstant.ANTI_NOISE_DETAIL;
                  break;
      case (12) : this.editComponent = TemperatureProtectionEditComponent;
                  myUrl = SystemConstant.TEMPERATURE_DETAIL;
                  break;
      case (13) : this.editComponent = OtherProtectiveEditComponent;
                  myUrl = SystemConstant.OTHER_PROTECTIVE_DETAIL;
                  break;
      case (14) : this.editComponent = IndividualProtectiveEditComponent;
                  myUrl = SystemConstant.INDIVIDUAL_PROTECTIVE_DETAIL;
                  break;
      case (15) : this.editComponent = EmergencyFacilitiesEditComponent;
                  myUrl = SystemConstant.EMERGENCY_FACILITIES_DETAIL;
                  break;
      case (16) : this.editComponent = BuildingBaseEditComponent;
                  myUrl = SystemConstant.BUILDING_BASE_DETAIL;
                  break;
      case (17) : this.editComponent = BuildingAerationEditComponent;
                  myUrl = SystemConstant.BUILDING_AERATION_DETAIL;
                  break;
      case (18) : this.editComponent = AuxiliaryHealthEditComponent;
                  myUrl = SystemConstant.AUXILIARY_HEALTH_DETAIL;
                  break;
      case (19) : this.editComponent = InformingFacilitiesEditComponent;
                  myUrl = SystemConstant.INFORMING_FACILITIES_DETAIL;
                  break;
      case (20) : this.editComponent = HealthManagementEditComponent;
                  myUrl = SystemConstant.HEALTH_MANAGEMENT_DETAIL;
                  options = {
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  };
                  break;
      case (21) : this.editComponent = RecordFundsEditComponent;
                  myUrl = SystemConstant.FUNDS_DETAIL;
                  options = {
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  };
                  break;
      case (22) : this.editComponent = HealthCareEditComponent;
                  myUrl = SystemConstant.HEALTH_CARE_DETAIL;
                  options = {
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    centered: true
                  };
                  break;
    }
    // 根据sceneId 编辑绑定该现场调查表下对应的调查表信息(测试范例)
    this.httpService.get(myUrl + '/' + this.recordSceneRequest.recordScene.id).subscribe({
      next: (data) => {
        const modalRef = this.ngbModal.open(this.editComponent, options);
          modalRef.componentInstance.recordData = data;
          modalRef.componentInstance.sceneId = this.recordSceneRequest.recordScene.id;
          modalRef.componentInstance.questionnaireId = questionnaireId;
          modalRef.componentInstance.companyId = this.recordSceneRequest.recordScene.inquiryCompany;
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
