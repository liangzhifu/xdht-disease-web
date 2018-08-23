const INTERFACE_ADDRESS = 'http://localhost:7071';
const SYSTEM_GATEWAY = '';
const INTERFACE_VERSION = '/api/v1';
export const SystemConstant = Object.freeze({
  // 个人体检Excel上传
  EMPLOYEE_SUMMARY_EXCEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/summaryExcel/upload',
  // 图片路径
  IMAG_PATH: 'http://localhost:8080/testCom/img/',
  // 字典类型
  DICTIONARY_TYPE_POST: 10,

  LOCAL_STORAGE_PREFIX: 'xdht-disease-',
  SESSION_STORAGE_PREFIX: 'xdht-disease-',

  // 系统配置
  GET_TOKEN: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/login/createToken',
  EDIT_PASSWORD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUser/editPassword',

  // 用户配置
  USER_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUser/pageList',
  USER_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUser/add',
  USER_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUser/update',
  USER_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUser/delete',
  USER_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUser/detail',

  // 角色配置
  ROLE_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysRole/pageList',
  ROLE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysRole/list',
  ROLE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysRole/add',
  ROLE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysRole/update',
  ROLE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysRole/delete',
  ROLE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysRole/detail',

  // 用户角色配置
  USER_ROlE_LIST : INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUserRole/list',
  USER_ROlE_EDIT : INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUserRole/update',

  // 角色菜单配置
  ROLE_MENU_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysRoleMenu/list',
  ROLE_MENU_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysRoleMenu/update',

  // 角色知识库目录
  ROLE_KNOWLEDGE_CATALOG_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysRoleKnowledgeCatalog/list',
  ROLE_KNOWLEDGE_CATALOG_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysRoleKnowledgeCatalog/update',

  // 菜单配置
  MENU_ZTREE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysMenu/zTreeList',
  MENU_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysMenu/list',
  MENU_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysMenu/add',
  MENU_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysMenu/update',
  MENU_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysMenu/delete',
  MENU_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysMenu/detail',

  // 字典配置
  DICTIONARY_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysDictionary/list',
  DICTIONARY_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysDictionary/pageList',
  DICTIONARY_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysDictionary/add',
  DICTIONARY_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysDictionary/update',
  DICTIONARY_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysDictionary/delete',
  DICTIONARY_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysDictionary/detail',
  DICTIONARY_TYPE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysDictionaryType/list',

  // 公告配置
  NOTICE_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysNotice/pageList',
  NOTICE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysNotice/add',
  NOTICE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysNotice/update',
  NOTICE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysNotice/delete',
  NOTICE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysNotice/detail',

  // 知识库目录
  KNOWLEDGE_CATALOG_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledgeCatalog/list',
  KNOWLEDGE_CATALOG_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledgeCatalog/add',
  KNOWLEDGE_CATALOG_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledgeCatalog/update',
  KNOWLEDGE_CATALOG_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledgeCatalog/delete',
  KNOWLEDGE_CATALOG_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledgeCatalog/detail',

  // 知识库
  KNOWLEDGE_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledge/pageList',
  KNOWLEDGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledge/list',
  KNOWLEDGE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledge/add',
  KNOWLEDGE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledge/update',
  KNOWLEDGE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledge/delete',
  KNOWLEDGE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysKnowledge/detail',

  // 文件配置
  FILE_UPLOAD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysFile/uploadFile',

  // 职业卫生现场调查记录表配置
  RECORD_SCENE_PAGE_LIST : INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordScene/pageList',
  RECORD_SCENE_ADD : INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordScene/add',
  RECORD_SCENE_EDIT : INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordScene/update',
  RECORD_SCENE_DEL : INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordScene/delete',
  RECORD_SCENE_DETAIL : INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordScene/detail',

  // 职业卫生调查内容
  QUESTION_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysQuestionnaire/list',

  // 公司配置
  COMPANY_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysCompany/pageList',
  COMPANY_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysCompany/list',
  COMPANY_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysCompany/add',
  COMPANY_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysCompany/update',
  COMPANY_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysCompany/delete',
  COMPANY_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysCompany/detail',

  // 部门配置
  OFFICE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysCompanyOffice/list',
  OFFICE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysCompanyOffice/add',
  OFFICE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysCompanyOffice/update',
  OFFICE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysCompanyOffice/delete',

  // 员工配置
  EMPLOYEE_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysEmployee/pageList',
  EMPLOYEE_ALL_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysEmployee/list',
  EMPLOYEE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysEmployee/add',
  EMPLOYEE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysEmployee/update',
  EMPLOYEE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysEmployee/delete',
  EMPLOYEE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysEmployee/detail',

  // 工种信息
  WORK_TYPE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysWorkType/sysWorkTypeList',

  // 建设项目概况调查表（预评价） 配置
  PRE_EVALUATION_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPreEvaluation/pageList',
  PRE_EVALUATION_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPreEvaluation/add',
  PRE_EVALUATION_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPreEvaluation/update',
  PRE_EVALUATION_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPreEvaluation/delete',
  PRE_EVALUATION_DETAIL : INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPreEvaluation/detail',

  // 建设项目概况调查表（控制效果评价）配置
  CONTROL_EFFECT_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordControlEffect/pageList',
  CONTROL_EFFECT_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordControlEffect/add',
  CONTROL_EFFECT_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordControlEffect/update',
  CONTROL_EFFECT_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordControlEffect/delete',
  CONTROL_EFFECT_DETAIL : INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordControlEffect/detail',

  // 用人单位概况调查表（现状评价） 配置
  PRESENT_SITUATION_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPresentSituation/pageList',
  PRESENT_SITUATION_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPresentSituation/add',
  PRESENT_SITUATION_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPresentSituation/update',
  PRESENT_SITUATION_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPresentSituation/delete',
  PRESENT_SITUATION_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPresentSituation/detail',

  // 用人单位概况调查表（现状评价）-- 对应的项目 配置
  PRESENT_SITUATION_PROJECT_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPresentSituationProject/list',

  // 工作日写实记录表 配置
  WORK_LOG_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkLog/pageList',
  WORK_LOG_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkLog/add',
  WORK_LOG_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkLog/update',
  WORK_LOG_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkLog/delete',
  WORK_LOG_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkLog/detail',
  // 物料及产品调查表 配置
  PRODUCT_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordProduct/pageList',
  PRODUCT_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordProduct/add',
  PRODUCT_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordProduct/update',
  PRODUCT_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordProduct/delete',
  PRODUCT_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordProduct/detail',
  // 设备设施调查表 配置
  EQUIPMENT_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEquipment/pageList',
  EQUIPMENT_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEquipment/add',
  EQUIPMENT_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEquipment/update',
  EQUIPMENT_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEquipment/delete',
  EQUIPMENT_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEquipment/detail',
  // 设备设施布局调查表 配置
  EQUIPMENT_LAYOUT_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEquipmentLayout/pageList',
  EQUIPMENT_LAYOUT_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEquipmentLayout/add',
  EQUIPMENT_LAYOUT_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEquipmentLayout/update',
  EQUIPMENT_LAYOUT_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEquipmentLayout/delete',
  EQUIPMENT_LAYOUT_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEquipmentLayout/detail',
  // 职业病危害因素调查表 配置
  HAZARD_FACTORS_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHazardFactors/pageList',
  HAZARD_FACTORS_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHazardFactors/add',
  HAZARD_FACTORS_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHazardFactors/update',
  HAZARD_FACTORS_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHazardFactors/delete',
  HAZARD_FACTORS_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHazardFactors/detail',
  // 防噪声设施调查表 配置
  ANTI_NOISE_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordAntiNoiseFacilities/pageList',
  ANTI_NOISE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordAntiNoiseFacilities/add',
  ANTI_NOISE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordAntiNoiseFacilities/update',
  ANTI_NOISE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordAntiNoiseFacilities/delete',
  ANTI_NOISE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordAntiNoiseFacilities/detail',
  // 防高温设施调查表 配置
  TEMPERATURE_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordTemperatureProtectionFacilities/pageList',
  TEMPERATURE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordTemperatureProtectionFacilities/add',
  TEMPERATURE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordTemperatureProtectionFacilities/update',
  TEMPERATURE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordTemperatureProtectionFacilities/delete',
  TEMPERATURE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordTemperatureProtectionFacilities/detail',

  // 其他防护设施调查表 配置
  OTHER_PROTECTIVE_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordOtherProtectiveFacilities/pageList',
  OTHER_PROTECTIVE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordOtherProtectiveFacilities/add',
  OTHER_PROTECTIVE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordOtherProtectiveFacilities/update',
  OTHER_PROTECTIVE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordOtherProtectiveFacilities/delete',
  OTHER_PROTECTIVE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordOtherProtectiveFacilities/detail',
  // 个体防护用品调查表 配置
  INDIVIDUAL_PROTECTIVE_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualProtectiveEquipment/pageList',
  INDIVIDUAL_PROTECTIVE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualProtectiveEquipment/add',
  INDIVIDUAL_PROTECTIVE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualProtectiveEquipment/update',
  INDIVIDUAL_PROTECTIVE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualProtectiveEquipment/delete',
  INDIVIDUAL_PROTECTIVE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualProtectiveEquipment/detail',
  // 应急设施调查表 配置
  EMERGENCY_FACILITIES_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmergencyFacilities/pageList',
  EMERGENCY_FACILITIES_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmergencyFacilities/add',
  EMERGENCY_FACILITIES_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmergencyFacilities/update',
  EMERGENCY_FACILITIES_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmergencyFacilities/delete',
  EMERGENCY_FACILITIES_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmergencyFacilities/detail',
  // 职业病危害告知设施调查表 配置
  INFORMING_FACILITIES_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordInformingFacilities/pageList',
  INFORMING_FACILITIES_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordInformingFacilities/add',
  INFORMING_FACILITIES_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordInformingFacilities/update',
  INFORMING_FACILITIES_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordInformingFacilities/delete',
  INFORMING_FACILITIES_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordInformingFacilities/detail',
  // 职业卫生管理情况调查表 配置
  HEALTH_MANAGEMENT_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHealthManagement/pageList',
  HEALTH_MANAGEMENT_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHealthManagement/add',
  HEALTH_MANAGEMENT_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHealthManagement/update',
  HEALTH_MANAGEMENT_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHealthManagement/delete',
  HEALTH_MANAGEMENT_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHealthManagement/detail',
  // 通风排毒除尘设施调查表 配置
  VDD_EQUIPMENT_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordVddEquipment/pageList',
  VDD_EQUIPMENT_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordVddEquipment/add',
  VDD_EQUIPMENT_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordVddEquipment/update',
  VDD_EQUIPMENT_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordVddEquipment/delete',
  VDD_EQUIPMENT_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordVddEquipment/detail',
  // 岗位定员及工作制度调查表 配置
  POST_PERSONNEL_PAGE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPostPersonnel/pageList',
  POST_PERSONNEL_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPostPersonnel/add',
  POST_PERSONNEL_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPostPersonnel/update',
  POST_PERSONNEL_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPostPersonnel/delete',
  POST_PERSONNEL_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordPostPersonnel/detail',

  // 岗位列表
  SYS_POST_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysPost/recordList',

  // 获取调查表 配置
  SYS_QUESTIONNAIRE: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysQuestionnaire/selectOne',

  // 企业体检信息
  COMPANY_SUMMARY_MANAGE_PAGE: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordCompanySummary/pageList',
  COMPANY_SUMMARY_MANAGE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordCompanySummary/add',
  COMPANY_SUMMARY_MANAGE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordCompanySummary/update',
  COMPANY_SUMMARY_MANAGE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordCompanySummary/delete',
  COMPANY_SUMMARY_MANAGE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordCompanySummary/detail',
  COMPANY_SUMMARY_ECHART_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordCompanySummary/echarts/detail',
  COMPANY_SUMMARY_PERCENT_ECHART_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordCompanySummary/percent/detail',
  COMPANY_SUMMARY_YEAR: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordCompanySummary/year',

  // 职工体检信息
  EMPLOYEE_SUMMARY_PAGE: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmployeeSummary/recordPage',
  EMPLOYEE_SUMMARY_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmployeeSummary/add',
  EMPLOYEE_SUMMARY_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmployeeSummary/update',
  EMPLOYEE_SUMMARY_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmployeeSummary/delete',
  EMPLOYEE_SUMMARY_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmployeeSummary/detail',
  EMPLOYEE_SUMMARY_ECHARS_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordEmployeeSummary/echars/detail',

  // 建筑物基本情况及采光照明调查表
  BUILDING_BASE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordBuildingBase/detail',
  BUILDING_BASE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordBuildingBase/add',
  BUILDING_BASE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordBuildingBase/update',

  // 建筑物采暖通风及空调调查表
  BUILDING_AERATION_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordBuildingAeration/detail',
  BUILDING_AERATION_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordBuildingAeration/add',
  BUILDING_AERATION_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordBuildingAeration/update',

  // 辅助卫生用室调查表
  AUXILIARY_HEALTH_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordAuxiliaryHealth/detail',
  AUXILIARY_HEALTH_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordAuxiliaryHealth/add',
  AUXILIARY_HEALTH_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordAuxiliaryHealth/update',

  // 职业病防治经费投入情况调查表
  FUNDS_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordFunds/detail',
  FUNDS_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordFunds/add',
  FUNDS_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordFunds/update',

  // 职业健康监护情况调查表
  HEALTH_CARE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHealthCare/detail',
  HEALTH_CARE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHealthCare/add',
  HEALTH_CARE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordHealthCare/update',

  // 劳动者个体噪声暴露评估 recordIndividualNoise
  RECORD_INDIVIDUAL_NOISE_PAGE: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualNoise/pageList',
  RECORD_INDIVIDUAL_NOISE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualNoise/add',
  RECORD_INDIVIDUAL_NOISE_DELETE: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualNoise/delete',
  RECORD_INDIVIDUAL_NOISE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualNoise/update',
  RECORD_INDIVIDUAL_NOISE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualNoise/detail',
  RECORD_INDIVIDUAL_NOISE_ECHARS_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordIndividualNoise/echarts/detail',


  // 工作场所噪声暴露评估
  RECORD_WORKPLACE_NOISE_PAGE: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkplaceNoise/pageList',
  RECORD_WORKPLACE_NOISE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkplaceNoise/add',
  RECORD_WORKPLACE_NOISE_DELETE: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkplaceNoise/delete',
  RECORD_WORKPLACE_NOISE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkplaceNoise/update',
  RECORD_WORKPLACE_NOISE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkplaceNoise/detail',
  RECORD_WORKPLACE_NOISE_ECHARS_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/recordWorkplaceNoise/echarts/detail',

});
