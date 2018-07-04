import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysRoutingModule } from './sys-routing.module';
import { SysComponent } from './sys.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { RoleManageComponent } from './role-manage/role-manage.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';
import { CoreModule } from '../core/core.module';
import { SimpleDataTableModule } from '../simple-data-table/simple-data-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyManageComponent } from './company-manage/company-manage.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { CompanyOfficeManageComponent } from './company-office-manage/company-office-manage.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { MenuChooseComponent } from './menu-choose/menu-choose.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleChooseComponent } from './role-choose/role-choose.component';
import { CompanyOfficeEditComponent } from './company-office-edit/company-office-edit.component';

import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmpoiyeeInfoComponent } from './empoiyee-info/empoiyee-info.component';
import { DictionaryManageComponent } from './dictionary-manage/dictionary-manage.component';
import { DictionaryEditComponent } from './dictionary-edit/dictionary-edit.component';
import {EditPasswordComponent} from './edit-password/edit-password.component';
import { CompanyOfficeChooseComponent } from './company-office-choose/company-office-choose.component';
import { NoticeManageComponent } from './notice-manage/notice-manage.component';
import { NoticeEditComponent } from './notice-edit/notice-edit.component';
import {QuillModule} from 'ngx-quill';
import {FileUploadModule} from 'ng2-file-upload';
import { KnowledgeCatalogManageComponent } from './knowledge-catalog-manage/knowledge-catalog-manage.component';
import { KnowledgeCatalogChooseComponent } from './knowledge-catalog-choose/knowledge-catalog-choose.component';
import { KnowledgeCatalogTreeComponent } from './knowledge-catalog-tree/knowledge-catalog-tree.component';
import { KnowledgeManageComponent } from './knowledge-manage/knowledge-manage.component';
import { KnowledgeEditComponent } from './knowledge-edit/knowledge-edit.component';
import { KnowledgeDetailComponent } from './knowledge-detail/knowledge-detail.component';
import { KnowledgeHistoryComponent } from './knowledge-history/knowledge-history.component';
import { KnowledgeCatalogEditComponent } from './knowledge-catalog-edit/knowledge-catalog-edit.component';
import { SystemNoticeManageComponent } from './system-notice-manage/system-notice-manage.component';
import { SystemNoticeDetailComponent } from './system-notice-detail/system-notice-detail.component';
import { CompanyOfficeDropdownComponent } from './company-office-dropdown/company-office-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FileUploadModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SimpleDataTableModule,
    SysRoutingModule,
    QuillModule
  ],
  entryComponents: [
    CompanyEditComponent,
    CompanyOfficeChooseComponent,
    CompanyOfficeEditComponent,
    CompanyOfficeManageComponent,
    DictionaryEditComponent,
    EmployeeEditComponent,
    KnowledgeCatalogChooseComponent,
    KnowledgeCatalogEditComponent,
    KnowledgeEditComponent,
    MenuChooseComponent,
    MenuEditComponent,
    NoticeEditComponent,
    RoleChooseComponent,
    RoleEditComponent,
    UserEditComponent,
    EmpoiyeeInfoComponent,
    NoticeManageComponent,
    SystemNoticeManageComponent,
    SystemNoticeDetailComponent
  ],
  declarations: [
    CompanyEditComponent,
    CompanyManageComponent,
    CompanyOfficeEditComponent,
    CompanyOfficeManageComponent,
    EditPasswordComponent,
    EmployeeManageComponent,
    MenuChooseComponent,
    MenuEditComponent,
    MenuManageComponent,
    RoleChooseComponent,
    RoleEditComponent,
    RoleManageComponent,
    SysComponent,
    UserEditComponent,
    UserManageComponent,
    CompanyManageComponent,
    EmployeeManageComponent,
    CompanyOfficeManageComponent,
    CompanyEditComponent,
    MenuChooseComponent,
    RoleChooseComponent,
    CompanyEditComponent,
    EmployeeEditComponent,
    EmpoiyeeInfoComponent,
    DictionaryManageComponent,
    DictionaryEditComponent,
    CompanyOfficeChooseComponent,
    NoticeManageComponent,
    NoticeEditComponent,
    KnowledgeCatalogManageComponent,
    KnowledgeCatalogChooseComponent,
    KnowledgeCatalogTreeComponent,
    KnowledgeManageComponent,
    KnowledgeEditComponent,
    KnowledgeDetailComponent,
    KnowledgeHistoryComponent,
    KnowledgeCatalogEditComponent,
    SystemNoticeManageComponent,
    SystemNoticeDetailComponent,
    CompanyOfficeDropdownComponent
  ],
  exports: [
    CompanyOfficeDropdownComponent
  ]
})
export class SysModule { }
