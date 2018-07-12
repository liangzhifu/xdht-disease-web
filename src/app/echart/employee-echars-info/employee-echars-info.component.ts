import {Component,  OnInit} from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../core/http/http.service';
import {ModalService} from '../../modal/modal.service';
import {WaitService} from '../../core/wait/wait.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {TitleService} from '../../title.service';
import {SelectEmployeeComponent} from '../../record/select-employee/select-employee.component';
import 'jquery';
import {AlertType} from '../../modal/alert/alert-type';
import {AlertConfig} from '../../modal/alert/alert-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
declare var $: any;
@Component({
  selector: 'app-employee-echars-info',
  templateUrl: './employee-echars-info.component.html',
  styleUrls: ['./employee-echars-info.component.scss']
})
export class EmployeeEcharsInfoComponent implements OnInit {
  employeeSummary = {
    id: '',
    empId: '',
    empName: '',
    companyId: '',
    officeId: '',
  };
  employeeSummaryList = [{
    id: '',
    empId: '',
    empName: '',
    companyId: '',
    officeId: '',
    workType: '',
    name: '',
    sex: '',
    age: '',
    inspectDate: '',
    inspect: '',
    contactTime: '',
    hazardFactor: '',
    bloodPressureShrink: '',
    bloodPressureDiastole: '',
    heart: '',
    lungs: '',
    skinMucousMembrane: '',
    lymphNode: '',
    thyroidGland: '',
    ear: '',
    whiteBloodCell: '',
    neutrophileGranulocyte: '',
    redBloodCell: '',
    hemoglobin: '',
    platelet: '',
    whiteBloodCellUrine: '',
    urineProtein: '',
    urineOccultBlood: '',
    urineSugar: '',
    altuL: '',
    electrocardiogram: '',
    dbhl500L: '',
    dbhl1kL: '',
    dbhl2kL: '',
    dbhl3kL: '',
    dbhl4kL: '',
    dbhl6kL: '',
    dbhl500R: '',
    dbhl1kR: '',
    dbhl2kR: '',
    dbhl3kR: '',
    dbhl4kR: '',
    dbhl6kR: ''
  }];
  companyData: any = null;
  chartLeftOption: any;
  chartRightOption: any;
  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private waitService: WaitService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('职工体检报表');
  }

  ngOnInit() {
    // 获取单位列表
    this.httpService.post(SystemConstant.COMPANY_LIST, {}).subscribe({
      next: (data) => {
        this.companyData = data;
      },
      complete: () => {
      }
    });
  }

  /**
   * 修改单位
   */
  changeCompany () {
    this.employeeSummary.empId = '';
    this.employeeSummary.empName = '';
  }

  /**
   * 选择人员
   */
  selectEmployee() {
    const  companyId = $('#companyId').val();
    if (companyId === undefined || companyId === null || companyId === '') {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '公司选择', '公司必须选择！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      const modalRef = this.ngbModal.open(SelectEmployeeComponent, {size: 'lg'});
      modalRef.componentInstance.companyId = companyId;
      modalRef.result.then(
        (result) => {
          if (result.success === 'success') {
            $('#empId').val(result.sysEmployee.id);
            $('#officeId').val(result.sysEmployee.officeId);
            $('#empName').val(result.sysEmployee.empName);
            this.employeeSummary.officeId = result.sysEmployee.officeId;
            this.employeeSummary.empName = result.sysEmployee.empName;
            this.employeeSummary.empId = result.sysEmployee.id;
          }
        }
      );
    }
  }
  /**
   * 选择部门
   * @param data
   */
  // onDataChanged(data) {
  //   this.employeeSummary.officeId = data.officeId;
  // }

  // 查询职工体检报表信息
  selectEmployeeSummaryInfo() {
    const  year = [];
    const  id = $('#empId').val();
    const empName = $('#empName').val();
    if (id === undefined || id === null || id === '') {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '人员选择', '请选择人员！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      this.httpService.get(SystemConstant.EMPLOYEE_SUMMARY_ECHARS_DETAIL + '/' + id).subscribe({
        next: (employeeSummaryData) => {
          this.employeeSummaryList = employeeSummaryData;
          if (this.employeeSummaryList.length > 0 ) {
            for (let i = 0; i < this.employeeSummaryList.length; i++) {
              year.push(this.employeeSummaryList[i].inspectDate.substring(0, 4) + '年');
            }
          }

          this.chartLeftOption = {
            title: {
              text: '职工' + empName + '--左耳听阈测试图',
              x: 'center',
              y: 'bottom'
            },
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data: year
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '15%',
              top: '10%',
              containLabel: true
            },
            xAxis : [
              {
                name: '音阈范围',
                position: 'bottom',
                type : 'category',
                boundaryGap : true,
                data : ['dbhl500L', 'dbhl1kL', 'dbhl2kL', 'dbhl3kL', 'dbhl4kL',  'dbhl6kL'],
              }
            ],
            yAxis : [
              {
                name: '音阈值/ (单位)Hz',
                type : 'value'
              }
            ],
            series: function() {
              const serie = [];
              for (let i = 0; i < employeeSummaryData.length; i++) {
                const dataLeftArray = [];
                year.push(employeeSummaryData[i].inspectDate.substring(0, 4) + '年');
                // 左耳
                dataLeftArray.push(employeeSummaryData[i].dbhl500L);
                dataLeftArray.push(employeeSummaryData[i].dbhl1kL );
                dataLeftArray.push(employeeSummaryData[i].dbhl2kL );
                dataLeftArray.push(employeeSummaryData[i].dbhl3kL );
                dataLeftArray.push(employeeSummaryData[i].dbhl4kL );
                dataLeftArray.push(employeeSummaryData[i].dbhl6kL );
                const item = {
                  name : year[i],
                  type: 'line',
                  data: dataLeftArray
                };
                serie.push(item);
              }
              return serie;
            }(),
          };
          this.chartRightOption = {
            title: {
              text: '职工' + empName + '--右耳听阈测试图',
              x: 'center',
              y: 'bottom'
            },
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data: year
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              top: '10%',
              containLabel: true
            },
            xAxis : [
              {
                name: '音阈范围',
                type : 'category',
                boundaryGap : true,
                data : ['dbhl500R', 'dbhl1kR', 'dbhl2kR', 'dbhl3kR', 'dbhl4kR',  'dbhl6kR']
              }
            ],
            yAxis : [
              {
                name: '音阈值/(单位)Hz',
                type : 'value'
              }
            ],
            series: function() {
              const serie = [];
              for (let i = 0; i < employeeSummaryData.length; i++) {
                const dataRightArray = [];
                year.push(employeeSummaryData[i].inspectDate.substring(0, 4) + '年');
                // 右耳
                dataRightArray.push(employeeSummaryData[i].dbhl500R);
                dataRightArray.push(employeeSummaryData[i].dbhl1kR);
                dataRightArray.push(employeeSummaryData[i].dbhl2kR);
                dataRightArray.push(employeeSummaryData[i].dbhl3kR);
                dataRightArray.push(employeeSummaryData[i].dbhl4kR);
                dataRightArray.push(employeeSummaryData[i].dbhl6kR);
                const item = {
                  name : year[i],
                  type: 'line',
                  data: dataRightArray
                };
                serie.push(item);
              }

              return serie;
            }(),
          };
        },
        error: (err) => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取职工体检信息失败！' + '失败原因：' + err, 3000);
          this.toastService.toast(toastCfg);
        },
        complete: () => {}
      });
    }

  }
}
