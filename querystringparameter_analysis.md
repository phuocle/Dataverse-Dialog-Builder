# QueryString Parameter Analysis Report

This document provides a comprehensive analysis of all `querystringparameter` nodes found in the XML dialog files.

## Summary Statistics

- **Total XML files scanned**: 430
- **Files containing querystringparameter**: 367
- **Total querystringparameter instances**: 1740
- **Unique parameter combinations**: 1076
- **Unique attribute names**: 2
- **Different parameter types**: 9

## Attribute Names Found

The following attribute names were discovered in querystringparameter nodes:

- `name`
- `type`

## Parameter Types Distribution

| Type | Count | Description |
|------|-------|-------------|
| `SafeString` | 1257 | Safe string value that has been sanitized for security |
| `Object` | 218 | Complex object or reference |
| `Boolean` | 116 | True/false value |
| `Integer` | 75 | Whole number value |
| `UniqueId` | 45 | GUID or unique identifier |
| `DateTime` | 16 | Date and time value |
| `PositiveInteger` | 9 | Positive whole number (greater than 0) |
| `EntityType` | 3 | Entity type identifier in Dataverse |
| `Long` | 1 | Unknown type |

## Detailed Attribute Explanations

### `name`

The logical name/identifier of the parameter. This is used to reference the parameter value in the dialog code.

### `type`

The data type of the parameter value. This determines how the value should be interpreted and validated.

## Files with QueryString Parameters

The following files contain querystringparameter nodes:

### AccessCheckerDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_accesschecker_objectid"` `type="SafeString"`
2. `name="param_accesschecker_entityname"` `type="SafeString"`

### ActivityDistributionOwnershipPropagation.xml

Contains 9 querystringparameter(s):

1. `name="activity_name_pluralized"` `type="SafeString"`
2. `name="close_email_activity"` `type="Boolean"`
3. `name="is_email_activity"` `type="Integer"`
4. `name="add_to_queue"` `type="Boolean"`
5. `name="context_serialized"` `type="SafeString"`
6. `name="ownership_option"` `type="Integer"`
7. `name="owner_id"` `type="Object"`
8. `name="queue_id"` `type="Object"`
9. `name="param_lastButtonClicked"` `type="SafeString"`

### AddAttachmentToActivity.xml

Contains 14 querystringparameter(s):

1. `name="param_entityId"` `type="SafeString"`
2. `name="param_entityName"` `type="SafeString"`
3. `name="param_gridControl"` `type="Object"`
4. `name="param_attachmentId"` `type="SafeString"`
5. `name="param_objectid"` `type="UniqueId"`
6. `name="param_objecttypecode"` `type="PositiveInteger"`
7. `name="param_AttachmentFileName"` `type="SafeString"`
8. `name="param_AttachmentFileMode"` `type="SafeString"`
9. `name="param_AttachmentFileSize"` `type="SafeString"`
10. `name="param_AttachmentFileType"` `type="SafeString"`
11. `name="param_AttachmentFileContent"` `type="SafeString"`
12. `name="param_AttachmentIsFollowed"` `type="SafeString"`
13. `name="param_IsEmailFollowed"` `type="SafeString"`
14. `name="param_EntityName"` `type="SafeString"`

### AddAttachmentToEmail.xml

Contains 14 querystringparameter(s):

1. `name="param_entityId"` `type="SafeString"`
2. `name="param_entityName"` `type="SafeString"`
3. `name="param_gridControl"` `type="Object"`
4. `name="param_attachmentId"` `type="SafeString"`
5. `name="param_objectid"` `type="UniqueId"`
6. `name="param_objecttypecode"` `type="PositiveInteger"`
7. `name="param_AttachmentFileName"` `type="SafeString"`
8. `name="param_AttachmentFileMode"` `type="SafeString"`
9. `name="param_AttachmentFileSize"` `type="SafeString"`
10. `name="param_AttachmentFileType"` `type="SafeString"`
11. `name="param_AttachmentFileContent"` `type="SafeString"`
12. `name="param_AttachmentIsFollowed"` `type="SafeString"`
13. `name="param_IsEmailFollowed"` `type="SafeString"`
14. `name="param_EntityName"` `type="SafeString"`

### AddExisting_KBSearchDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_entityId"` `type="SafeString"`
2. `name="param_entityTypeName"` `type="SafeString"`
3. `name="param_actionList"` `type="SafeString"`
4. `name="param_entityDisplayName"` `type="SafeString"`
5. `name="param_relationshipName"` `type="SafeString"`

### AddMembers.xml

Contains 6 querystringparameter(s):

1. `name="target_entities"` `type="SafeString"`
2. `name="entity_records"` `type="Object"`
3. `name="last_button_clicked"` `type="SafeString"`
4. `name="selected_records"` `type="Object"`
5. `name="total_records_selected"` `type="SafeString"`
6. `name="custom_label"` `type="SafeString"`

### AddProductInOpportunity.xml

Contains 10 querystringparameter(s):

1. `name="param_entityName"` `type="SafeString"`
2. `name="param_recordId"` `type="UniqueId"`
3. `name="param_recordName"` `type="SafeString"`
4. `name="param_priceLevelId"` `type="UniqueId"`
5. `name="param_ispricelocked"` `type="Boolean"`
6. `name="param_transactionCurrencyId"` `type="UniqueId"`
7. `name="param_caller"` `type="SafeString"`
8. `name="param_callerparameters"` `type="Object"`
9. `name="param_hideCompetitorField"` `type="Object"`
10. `name="param_lastButtonClicked"` `type="SafeString"`

### AddRMAProduct.xml

Contains 6 querystringparameter(s):

1. `name="param_VendorId"` `type="SafeString"`
2. `name="param_RtvId"` `type="SafeString"`
3. `name="param_TransactionCurrencyid"` `type="SafeString"`
4. `name="param_originatingRMAId"` `type="SafeString"`
5. `name="param_rmaProductIds"` `type="SafeString"`
6. `name="param_lastButtonClicked"` `type="SafeString"`

### AddSharePointLocation.xml

Contains 9 querystringparameter(s):

1. `name="entity_Id"` `type="SafeString"`
2. `name="entity_Type_Code"` `type="Integer"`
3. `name="entity_Name"` `type="SafeString"`
4. `name="location_Id"` `type="SafeString"`
5. `name="location_Name"` `type="SafeString"`
6. `name="folder_Name"` `type="SafeString"`
7. `name="mode_Value"` `type="Integer"`
8. `name="regarding_Object_EntityName"` `type="SafeString"`
9. `name="last_Button_Clicked"` `type="SafeString"`

### AddSubject.xml

Contains 2 querystringparameter(s):

1. `name="selected_subject"` `type="Object"`
2. `name="last_selected_button"` `type="SafeString"`

### AddToQueue.xml

Contains 2 querystringparameter(s):

1. `name="param_records"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`

### AddWoProduct.xml

Contains 4 querystringparameter(s):

1. `name="param_RMAId"` `type="Object"`
2. `name="param_ParentFormContext"` `type="Object"`
3. `name="param_WorkOrderId"` `type="Object"`
4. `name="param_lastButtonClicked"` `type="SafeString"`

### AddresSuggestionsDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_parentPage"` `type="Object"`
2. `name="param_ParentFormContext"` `type="Object"`

### Administration.DataProvider.Dialog.xml

Contains 1 querystringparameter(s):

1. `name="param_okButtonClicked"` `type="SafeString"`

### Administration.DocTemplateEnableSecurityRoles.Dialog.xml

Contains 1 querystringparameter(s):

1. `name="document_template_id"` `type="SafeString"`

### ApplyCadence.xml

Contains 5 querystringparameter(s):

1. `name="params_entitytypename"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_salesCadenceId"` `type="SafeString"`
4. `name="param_entityselectedlist"` `type="SafeString"`
5. `name="params_filterxml"` `type="SafeString"`

### ApplyEmailTemplate.xml

Contains 7 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="SafeString"`
3. `name="param_entityType"` `type="SafeString"`
4. `name="param_emailFormData"` `type="SafeString"`
5. `name="param_emailsubject"` `type="SafeString"`
6. `name="param_emaildescription"` `type="SafeString"`
7. `name="param_templateId"` `type="SafeString"`

### ApplyRecordsToSequence.xml

Contains 5 querystringparameter(s):

1. `name="params_entitytypename"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_entityrecordslist"` `type="SafeString"`
4. `name="param_entityviewid"` `type="SafeString"`
5. `name="param_entityselectedlist"` `type="SafeString"`

### AppointmentSchedulingConfirmDialog.xml

Contains 3 querystringparameter(s):

1. `name="param_engineIsURS"` `type="Boolean"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_firstTimeOpen"` `type="Boolean"`

### AppointmentSchedulingConflict.xml

Contains 4 querystringparameter(s):

1. `name="param_isDraft"` `type="SafeString"`
2. `name="param_activityType"` `type="SafeString"`
3. `name="param_notificationsData"` `type="SafeString"`
4. `name="param_lastButtonClicked"` `type="SafeString"`

### ApproveEmail.xml

Contains 6 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_isGrid"` `type="Boolean"`
3. `name="param_gridControl"` `type="Object"`
4. `name="param_selectedQueues"` `type="Object"`
5. `name="param_action"` `type="Object"`
6. `name="param_objectType"` `type="Object"`

### ArticleToArticleAssociation.xml

Contains 5 querystringparameter(s):

1. `name="param_knowledgeArticleId"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_associationType"` `type="SafeString"`
4. `name="param_statecode"` `type="Integer"`
5. `name="param_statuscode"` `type="Integer"`

### ArticleToCategoryAssociation.xml

Contains 5 querystringparameter(s):

1. `name="param_knowledgeArticleId"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_associationType"` `type="SafeString"`
4. `name="param_statecode"` `type="Integer"`
5. `name="param_statuscode"` `type="Integer"`

### ArticleToProductAssociation.xml

Contains 5 querystringparameter(s):

1. `name="param_knowledgeArticleId"` `type="UniqueId"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_associationType"` `type="SafeString"`
4. `name="param_statecode"` `type="Integer"`
5. `name="param_statuscode"` `type="Integer"`

### Assign.xml

Contains 8 querystringparameter(s):

1. `name="entity_name"` `type="SafeString"`
2. `name="entity_type_code"` `type="SafeString"`
3. `name="selected_records_count"` `type="PositiveInteger"`
4. `name="entity_records"` `type="Object"`
5. `name="last_button_clicked"` `type="SafeString"`
6. `name="owner_id"` `type="SafeString"`
7. `name="owner_type"` `type="SafeString"`
8. `name="entity_id"` `type="SafeString"`

### AssignQueue.xml

Contains 9 querystringparameter(s):

1. `name="entity_name"` `type="SafeString"`
2. `name="last_button_clicked"` `type="SafeString"`
3. `name="selected_records_count"` `type="SafeString"`
4. `name="entity_records"` `type="SafeString"`
5. `name="entity_id"` `type="SafeString"`
6. `name="owner_id"` `type="SafeString"`
7. `name="owner_type"` `type="SafeString"`
8. `name="show_assign_to_me_option"` `type="Boolean"`
9. `name="assign_request"` `type="Boolean"`

### AssociateCase.xml

Contains 4 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityLogicalName"` `type="SafeString"`
3. `name="param_queryParameters"` `type="SafeString"`
4. `name="param_gridColumns"` `type="SafeString"`

### AttachFileAlert.xml

Contains 1 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`

### AttachmentPreviewDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_attachmentId"` `type="SafeString"`

### AuditDetailsInfo.xml

Contains 5 querystringparameter(s):

1. `name="auditrecord_id"` `type="SafeString"`
2. `name="entitytype_name"` `type="SafeString"`
3. `name="objecttype_code"` `type="SafeString"`
4. `name="objectid_value"` `type="SafeString"`
5. `name="created_on"` `type="SafeString"`

### Auditing.AuditDetails.SidePanel.xml

Contains 1 querystringparameter(s):

1. `name="audit_id"` `type="SafeString"`

### BookingRule.xml

Contains 1 querystringparameter(s):

1. `name="param_bookingRules"` `type="Object"`

### BotDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_BotUserId"` `type="UniqueId"`
2. `name="param_BotUserName"` `type="SafeString"`

### BuildTopicModel.xml

Contains 5 querystringparameter(s):

1. `name="param_iTotal"` `type="Integer"`
2. `name="param_iId"` `type="UniqueId"`
3. `name="param_iObjType"` `type="Integer"`
4. `name="param_iIndex"` `type="Integer"`
5. `name="param_lastButtonClicked"` `type="SafeString"`

### BulkEmailDialog.xml

Contains 8 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="SafeString"`
3. `name="param_otc"` `type="SafeString"`
4. `name="param_selectedRecords"` `type="Object"`
5. `name="param_gridControl"` `type="Object"`
6. `name="internalparam_entityId"` `type="SafeString"`
7. `name="internalparam_template"` `type="SafeString"`
8. `name="internalparam_entityType"` `type="SafeString"`

### BulkEmailSendLaterDialog.xml

Contains 4 querystringparameter(s):

1. `name="params_scheduledate"` `type="SafeString"`
2. `name="params_scheduletime"` `type="SafeString"`
3. `name="param_emailscheduledatetime"` `type="SafeString"`
4. `name="param_lastButtonClicked"` `type="SafeString"`

### BulkUpdateCopilotRecommendedTemplatesOptionDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButton_clicked"` `type="SafeString"`
2. `name="param_selectedOption"` `type="SafeString"`

### BusinessClosureDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_type"` `type="SafeString"`

### CancelCase.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="UniqueId"`

### CancelContract.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="UniqueId"`

### CancelEntitlement.xml

Contains 2 querystringparameter(s):

1. `name="param_entityRecords"` `type="Object"`
2. `name="param_lastButtonClicked"` `type="SafeString"`

### CaseSettings.xml

Contains 2 querystringparameter(s):

1. `name="values_xml"` `type="Object"`
2. `name="all_attributes"` `type="SafeString"`

### ChangeManager.xml

Contains 4 querystringparameter(s):

1. `name="total_records_selected"` `type="SafeString"`
2. `name="last_button_clicked"` `type="SafeString"`
3. `name="selected_records"` `type="Object"`
4. `name="parent_id"` `type="SafeString"`

### CloseCampaignActivityDialog.xml

Contains 9 querystringparameter(s):

1. `name="entity_name"` `type="SafeString"`
2. `name="last_button_clicked"` `type="SafeString"`
3. `name="entity_records"` `type="Object"`
4. `name="selected_state"` `type="Integer"`
5. `name="allowed_transitions"` `type="Object"`
6. `name="action_name"` `type="SafeString"`
7. `name="default_close_state"` `type="Integer"`
8. `name="initial_start_date"` `type="DateTime"`
9. `name="initial_end_date"` `type="DateTime"`

### CloseOpportunity.xml

Contains 7 querystringparameter(s):

1. `name="param_opportunityId"` `type="UniqueId"`
2. `name="param_won"` `type="Object"`
3. `name="param_caller"` `type="SafeString"`
4. `name="param_callerparameters"` `type="Object"`
5. `name="param_hideCompetitorField"` `type="Object"`
6. `name="param_lastButtonClicked"` `type="SafeString"`
7. `name="param_timezone"` `type="Object"`

### CloseOrder.xml

Contains 3 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_salesorderid"` `type="UniqueId"`
3. `name="param_closedstate"` `type="Integer"`

### CloseQuote.xml

Contains 6 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_quoteid"` `type="UniqueId"`
3. `name="param_cancloseopportunity"` `type="Object"`
4. `name="param_opportunityid"` `type="UniqueId"`
5. `name="param_closedstate"` `type="Integer"`
6. `name="param_timezone"` `type="Object"`

### CompletePhoneCall.xml

Contains 5 querystringparameter(s):

1. `name="id_entityId"` `type="SafeString"`
2. `name="id_description"` `type="SafeString"`
3. `name="id_actionCardId"` `type="SafeString"`
4. `name="id_cardType"` `type="SafeString"`
5. `name="id_message_id"` `type="SafeString"`

### ConfigureFieldServiceAutoNumberingDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_callbackSuccess"` `type="Object"`
2. `name="param_initialEntityName"` `type="Object"`

### ConfirmReparent.xml

Contains 1 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`

### ConnectionRoleManageRecordTypesDialog.xml

Contains 3 querystringparameter(s):

1. `name="param_selectedEntities"` `type="SafeString"`
2. `name="param_stateCode"` `type="SafeString"`
3. `name="param_recordId"` `type="SafeString"`

### ContactHierarchyDetails.xml

Contains 10 querystringparameter(s):

1. `name="linkedinimagecontrol_inputs"` `type="Object"`
2. `name="notescontrol_inputs"` `type="Object"`
3. `name="linkedindialogcontrol_inputs"` `type="Object"`
4. `name="target_entities"` `type="SafeString"`
5. `name="disabled_mru"` `type="Object"`
6. `name="lookup_customFilters"` `type="Object"`
7. `name="disabled_state"` `type="Object"`
8. `name="entity_records"` `type="Object"`
9. `name="selected_node"` `type="Object"`
10. `name="last_button_clicked"` `type="SafeString"`

### ContactPreferencesControl.xml

Contains 5 querystringparameter(s):

1. `name="id_preferences"` `type="SafeString"`
2. `name="id_tableHeaderLeft"` `type="SafeString"`
3. `name="id_tableHeaderRight"` `type="SafeString"`
4. `name="id_followText"` `type="SafeString"`
5. `name="id_donotFollowText"` `type="SafeString"`

### ContentBlockSaveAsConfirmDialog.xml

Contains 1 querystringparameter(s):

1. `name="dialog_result"` `type="SafeString"`

### ContentBlockSaveAsDialog.xml

Contains 13 querystringparameter(s):

1. `name="designerhtml_snippet"` `type="SafeString"`
2. `name="finalizedhtml_snippet"` `type="SafeString"`
3. `name="previewhtml_snippet"` `type="SafeString"`
4. `name="preview_dialog_result"` `type="SafeString"`
5. `name="preview_selected_item"` `type="SafeString"`
6. `name="tags_param"` `type="SafeString"`
7. `name="title_param"` `type="SafeString"`
8. `name="statuscode_param"` `type="Integer"`
9. `name="isprotected_param"` `type="Boolean"`
10. `name="contentblockid_param"` `type="SafeString"`
11. `name="local_config"` `type="SafeString"`
12. `name="dialog_thumbnail"` `type="SafeString"`
13. `name="customFormAttributes_param"` `type="SafeString"`

### ConversationAssignDialog.xml

Contains 8 querystringparameter(s):

1. `name="is_dialog"` `type="Boolean"`
2. `name="entity_name"` `type="SafeString"`
3. `name="assign_to"` `type="SafeString"`
4. `name="is_assign_requested"` `type="Boolean"`
5. `name="selected_record_id"` `type="SafeString"`
6. `name="oc_endpoint_url"` `type="SafeString"`
7. `name="selected_record_agentAdId"` `type="SafeString"`
8. `name="selected_conversation_queueid"` `type="SafeString"`

### ConvertActivity.xml

Contains 13 querystringparameter(s):

1. `name="param_entityId"` `type="SafeString"`
2. `name="param_entityTypeCode"` `type="SafeString"`
3. `name="param_leadId"` `type="SafeString"`
4. `name="param_subject"` `type="SafeString"`
5. `name="param_ownerId"` `type="SafeString"`
6. `name="param_ownerType"` `type="SafeString"`
7. `name="param_ownerName"` `type="SafeString"`
8. `name="param_opportunityId"` `type="SafeString"`
9. `name="param_saveActivity"` `type="SafeString"`
10. `name="param_openNewRecord"` `type="SafeString"`
11. `name="param_lastButtonClicked"` `type="SafeString"`
12. `name="param_currencyId"` `type="SafeString"`
13. `name="param_customerId"` `type="SafeString"`

### ConvertCampaignResponse.xml

Contains 3 querystringparameter(s):

1. `name="convert_option"` `type="Integer"`
2. `name="response_context_data"` `type="Object"`
3. `name="default_customer_lookup"` `type="Object"`

### ConvertEmailToLead.xml

Contains 12 querystringparameter(s):

1. `name="param_entityId"` `type="SafeString"`
2. `name="param_entityTypeCode"` `type="SafeString"`
3. `name="param_firstName"` `type="SafeString"`
4. `name="param_lastName"` `type="SafeString"`
5. `name="param_email"` `type="SafeString"`
6. `name="param_company"` `type="SafeString"`
7. `name="param_subject"` `type="SafeString"`
8. `name="param_saveActivity"` `type="SafeString"`
9. `name="param_openNewRecord"` `type="SafeString"`
10. `name="param_leadId"` `type="SafeString"`
11. `name="param_lastButtonClicked"` `type="SafeString"`
12. `name="param_ownerId"` `type="SafeString"`

### ConvertEmailToTemplateDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_category"` `type="SafeString"`
2. `name="param_body"` `type="SafeString"`
3. `name="param_subject"` `type="SafeString"`
4. `name="param_emailId"` `type="SafeString"`
5. `name="param_templateRecord"` `type="Object"`

### ConvertLeadDialog.xml

Contains 3 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_isGrid"` `type="Boolean"`
3. `name="param_recordCount"` `type="Integer"`

### ConvertLeadDialogV2.xml

Contains 11 querystringparameter(s):

1. `name="param_qualifyLeadParam"` `type="Object"`
2. `name="param_qualifyStatus"` `type="Integer"`
3. `name="param_parentAccountId"` `type="Object"`
4. `name="param_parentContactId"` `type="Object"`
5. `name="param_parentAccountName"` `type="Object"`
6. `name="param_parentContactName"` `type="Object"`
7. `name="param_isLeadQualificationInProgress"` `type="Boolean"`
8. `name="param_entityReferenceSetV2Request"` `type="Object"`
9. `name="param_entityReferenceSetV2Response"` `type="Object"`
10. `name="param_showCopilotSummary"` `type="Boolean"`
11. `name="param_isCopilotSummaryEnabled"` `type="Boolean"`

### ConvertToCase.xml

Contains 13 querystringparameter(s):

1. `name="param_customerLookup"` `type="Object"`
2. `name="param_entityId"` `type="SafeString"`
3. `name="param_entityTypeCode"` `type="Integer"`
4. `name="param_subject"` `type="SafeString"`
5. `name="param_ownerId"` `type="SafeString"`
6. `name="param_ownerType"` `type="SafeString"`
7. `name="param_ownerName"` `type="SafeString"`
8. `name="param_incidentId"` `type="SafeString"`
9. `name="param_saveActivity"` `type="SafeString"`
10. `name="param_openNewRecord"` `type="SafeString"`
11. `name="param_lastButtonClicked"` `type="SafeString"`
12. `name="param_emailSubject"` `type="SafeString"`
13. `name="param_emailDescription"` `type="SafeString"`

### ConvertToKnowledgeArticle.xml

Contains 14 querystringparameter(s):

1. `name="param_entityId"` `type="UniqueId"`
2. `name="param_entityTypeCode"` `type="SafeString"`
3. `name="param_incident_title"` `type="SafeString"`
4. `name="param_incident_description"` `type="SafeString"`
5. `name="param_incidentresolution_description"` `type="SafeString"`
6. `name="param_incident_resolution"` `type="SafeString"`
7. `name="param_ownerId"` `type="SafeString"`
8. `name="param_ownerName"` `type="SafeString"`
9. `name="param_ownerType"` `type="SafeString"`
10. `name="param_knowledgeArticleId"` `type="SafeString"`
11. `name="param_subjectId"` `type="SafeString"`
12. `name="param_subjectName"` `type="SafeString"`
13. `name="param_openNewRecord"` `type="SafeString"`
14. `name="param_lastButtonClicked"` `type="SafeString"`

### CopilotAgentDraftKA.xml

Contains 3 querystringparameter(s):

1. `name="entity_id"` `type="Object"`
2. `name="knowledgearticle_id"` `type="Object"`
3. `name="sna_id"` `type="Object"`

### CopyAgreement.xml

Contains 5 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_name"` `type="SafeString"`
3. `name="param_agreementIds"` `type="Object"`
4. `name="param_newAgreementId"` `type="SafeString"`
5. `name="param_navigateToNewAgreement"` `type="SafeString"`

### CopyContract.xml

Contains 3 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="UniqueId"`
3. `name="param_clonedContractId"` `type="UniqueId"`

### CopyContractDlg.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_controlValues"` `type="Object"`

### CopyOpportunityDlg.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_controlValues"` `type="Object"`

### CopyQuoteDlg.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_controlValues"` `type="Object"`

### CopyUrlDialog.xml

Contains 7 querystringparameter(s):

1. `name="param_urltocopy"` `type="Object"`
2. `name="param_AccessType"` `type="Object"`
3. `name="param_PageType"` `type="Object"`
4. `name="param_ShareAccess"` `type="Object"`
5. `name="param_EntityName"` `type="Object"`
6. `name="param_EntityId"` `type="Object"`
7. `name="param_OpenedBy"` `type="Object"`

### CreateAnalysisJobDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_callbackSuccess"` `type="Object"`
2. `name="param_callbackFailure"` `type="Object"`

### CreateAndUpdateBusinessClosure.xml

Contains 1 querystringparameter(s):

1. `name="param_businessclosure_id"` `type="Object"`

### CreateAutomatedMessage.xml

Contains 5 querystringparameter(s):

1. `name="language_id"` `type="SafeString"`
2. `name="language_name"` `type="SafeString"`
3. `name="widget_id"` `type="SafeString"`
4. `name="primary_entity_name"` `type="SafeString"`
5. `name="stream_source"` `type="Long"`

### CreateDiscountList.xml

Contains 7 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_name"` `type="SafeString"`
3. `name="param_isamounttype"` `type="SafeString"`
4. `name="param_transactioncurrencyid"` `type="UniqueId"`
5. `name="param_transactioncurrencyname"` `type="SafeString"`
6. `name="param_crmwrpctoken"` `type="SafeString"`
7. `name="param_crmwrpctokentimestamp"` `type="SafeString"`

### CreateMacrosMDD_v2.xml

Contains 1 querystringparameter(s):

1. `name="record_Id"` `type="SafeString"`

### CreateOpportunity.xml

Contains 3 querystringparameter(s):

1. `name="member_type"` `type="SafeString"`
2. `name="members_array"` `type="Object"`
3. `name="form_values"` `type="SafeString"`

### CreateOrUpdateBusinessClosure.xml

Contains 3 querystringparameter(s):

1. `name="holidayItem_state"` `type="Object"`
2. `name="calendar_id"` `type="Object"`
3. `name="calendarRule_id"` `type="Object"`

### CreateOrUpdateCustomerServiceScheduleRule.xml

Contains 6 querystringparameter(s):

1. `name="calendar_Id"` `type="Object"`
2. `name="weeklyScheduleControl_Input"` `type="Object"`
3. `name="weeklyScheduleControl_Output"` `type="Object"`
4. `name="customerServiceSchedule_Status"` `type="Object"`
5. `name="calendarShareControl_Input"` `type="Object"`
6. `name="deleteWeeklyScheduleStatus_Output"` `type="Object"`

### CreateOrUpdateHolidayItem.xml

Contains 3 querystringparameter(s):

1. `name="holidayItem_state"` `type="Object"`
2. `name="calendar_id"` `type="Object"`
3. `name="calendarRule_id"` `type="Object"`

### CreateOrUpdateSurveyQuestion.xml

Contains 7 querystringparameter(s):

1. `name="is_createmode"` `type="Boolean"`
2. `name="liveworkstream_id"` `type="SafeString"`
3. `name="livechatconfig_id"` `type="SafeString"`
4. `name="question_order"` `type="SafeString"`
5. `name="questionsequence_id"` `type="SafeString"`
6. `name="surveyquestion_id"` `type="SafeString"`
7. `name="questionnaire_type"` `type="SafeString"`

### CreateOrUpdateTimeSheetDetails.xml

Contains 2 querystringparameter(s):

1. `name="setWorkHourControl_Input"` `type="Object"`
2. `name="setWorkHourControl_Output"` `type="Object"`

### CreateOrder.xml

Contains 6 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_quoteid"` `type="UniqueId"`
3. `name="param_cancloseopportunity"` `type="Object"`
4. `name="param_opportunityid"` `type="UniqueId"`
5. `name="param_closedstate"` `type="Integer"`
6. `name="param_createorderstatusreasondescription_id"` `type="SafeString"`

### CreatePlaybookActivity.xml

Contains 5 querystringparameter(s):

1. `name="activity_type"` `type="SafeString"`
2. `name="playbook_activity_id"` `type="SafeString"`
3. `name="playbook_template_id"` `type="SafeString"`
4. `name="form_type"` `type="SafeString"`
5. `name="playbook_activities_grid"` `type="Object"`

### CreateQuickCampaign.xml

Contains 21 querystringparameter(s):

1. `name="activity_id"` `type="Integer"`
2. `name="activity_type"` `type="SafeString"`
3. `name="email_description"` `type="SafeString"`
4. `name="email_selected_template_id"` `type="SafeString"`
5. `name="entity_ids"` `type="SafeString"`
6. `name="entity_type_code"` `type="SafeString"`
7. `name="fetch_xml"` `type="SafeString"`
8. `name="is_email_activity"` `type="Integer"`
9. `name="add_to_queue"` `type="Boolean"`
10. `name="owner_id"` `type="Object"`
11. `name="ownership_option"` `type="Integer"`
12. `name="queue_id"` `type="Object"`
13. `name="selected_records_count"` `type="Integer"`
14. `name="selection_mode"` `type="Integer"`
15. `name="send_email"` `type="Boolean"`
16. `name="transaction_currency"` `type="Object"`
17. `name="form_values_phonecall"` `type="SafeString"`
18. `name="form_values_appointment"` `type="SafeString"`
19. `name="form_values_letter"` `type="SafeString"`
20. `name="form_values_fax"` `type="SafeString"`
21. `name="form_values_email"` `type="SafeString"`

### CreateRTV.xml

Contains 2 querystringparameter(s):

1. `name="param_originatingRMAId"` `type="SafeString"`
2. `name="param_RmaProductDetails"` `type="Object"`

### CreateSchedule.xml

Contains 3 querystringparameter(s):

1. `name="Calendar_Grid"` `type="Object"`
2. `name="Calendar_Type"` `type="Object"`
3. `name="Calendar_Record"` `type="Object"`

### CreateTemplateDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_category"` `type="SafeString"`
2. `name="param_templateRecord"` `type="Object"`

### CreateUnitGroup.xml

Contains 3 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_name"` `type="SafeString"`
3. `name="param_primaryunit"` `type="SafeString"`

### Custom_CommonDialog.xml

Contains 9 querystringparameter(s):

1. `name="param_entityname"` `type="SafeString"`
2. `name="param_dialogtype"` `type="SafeString"`
3. `name="param_Header"` `type="SafeString"`
4. `name="param_grid_Control"` `type="Object"`
5. `name="param_records"` `type="Object"`
6. `name="param_dontShowCBValue"` `type="SafeString"`
7. `name="param_status"` `type="SafeString"`
8. `name="param_control"` `type="SafeString"`
9. `name="param_dialogdescription"` `type="SafeString"`

### DashboardSaveAs.xml

Contains 2 querystringparameter(s):

1. `name="last_button_clicked"` `type="SafeString"`
2. `name="alert_text"` `type="SafeString"`

### DataManagement.DataImport.SidePanel.xml

Contains 2 querystringparameter(s):

1. `name="file_supported"` `type="SafeString"`
2. `name="is_refresh_required"` `type="Boolean"`

### DataManagement.DuplicateDetectionJobsGridActionsForm.Dialog.xml

Contains 4 querystringparameter(s):

1. `name="selected_entities"` `type="SafeString"`
2. `name="selected_action"` `type="SafeString"`
3. `name="selected_job"` `type="SafeString"`
4. `name="param_lastButtonClicked"` `type="SafeString"`

### DelaySendControl.xml

Contains 6 querystringparameter(s):

1. `name="id_delayedSendTime"` `type="SafeString"`
2. `name="id_footerText"` `type="SafeString"`
3. `name="id_dateErrorText"` `type="SafeString"`
4. `name="id_lastButtonClicked"` `type="SafeString"`
5. `name="id_now"` `type="SafeString"`
6. `name="id_suggestedDelaySendTime"` `type="SafeString"`

### DeleteRecurrentEventDialog.xml

Contains 3 querystringparameter(s):

1. `name="param_baserecurrenteventid"` `type="SafeString"`
2. `name="param_radiobuttonresponse"` `type="SafeString"`
3. `name="param_isok"` `type="Boolean"`

### DeleteRecurringAppointment.xml

Contains 4 querystringparameter(s):

1. `name="input_entityid"` `type="SafeString"`
2. `name="input_seriesid"` `type="SafeString"`
3. `name="input_records"` `type="Object"`
4. `name="input_lastButtonClicked"` `type="SafeString"`

### DeviceSettings.xml

Contains 5 querystringparameter(s):

1. `name="device_settings"` `type="Object"`
2. `name="is_saved"` `type="Boolean"`
3. `name="is_offline_control_hidden"` `type="Boolean"`
4. `name="is_offlinesync_enabled"` `type="Boolean"`
5. `name="is_offline_initializing"` `type="Boolean"`

### DeviceSettingsConsentDialog.xml

Contains 1 querystringparameter(s):

1. `name="is_confirmed"` `type="Boolean"`

### DigitalAssetsFileUploadDialog.xml

Contains 1 querystringparameter(s):

1. `name="is_mdd"` `type="Boolean"`

### DigitalAssetsLibraryDialog.xml

Contains 4 querystringparameter(s):

1. `name="dialog_config"` `type="SafeString"`
2. `name="dialog_result"` `type="Boolean"`
3. `name="selected_item"` `type="SafeString"`
4. `name="selected_items"` `type="SafeString"`

### DigitalAssetsPreviewDialog.xml

Contains 3 querystringparameter(s):

1. `name="input_config"` `type="SafeString"`
2. `name="dialog_result"` `type="Boolean"`
3. `name="selected_item"` `type="SafeString"`

### DigitalAssetsUploadDialog.xml

Contains 3 querystringparameter(s):

1. `name="is_mdd"` `type="Boolean"`
2. `name="selected_items"` `type="SafeString"`
3. `name="default_business_unit"` `type="SafeString"`

### DocumentManagement.SharepointSitesValidationForm.Dialog.xml

Contains 1 querystringparameter(s):

1. `name="sharepoint_site_id"` `type="SafeString"`

### DocumentTemplateDownload.xml

Contains 7 querystringparameter(s):

1. `name="DocTemplateFile_Type"` `type="Integer"`
2. `name="DocTemplate_Type"` `type="Integer"`
3. `name="file_data"` `type="SafeString"`
4. `name="Entity_Name"` `type="SafeString"`
5. `name="View_Id"` `type="SafeString"`
6. `name="fetch_xmldata"` `type="SafeString"`
7. `name="current_view"` `type="SafeString"`

### DocumentTemplateUpload.xml

Contains 9 querystringparameter(s):

1. `name="DocTemplateFile_Type"` `type="Integer"`
2. `name="DocTemplate_Type"` `type="Integer"`
3. `name="DocTemplate_FileName"` `type="SafeString"`
4. `name="DocTemplate_Size"` `type="Integer"`
5. `name="Is_DocumentTemplate_Uploaded"` `type="Integer"`
6. `name="DocumentTemplate_index"` `type="SafeString"`
7. `name="current_view"` `type="SafeString"`
8. `name="Entity_Name"` `type="SafeString"`
9. `name="DocTemplate_ExpectedFileType"` `type="SafeString"`

### DownloadExcelTemplate.xml

Contains 12 querystringparameter(s):

1. `name="DocTemplateFile_Type"` `type="Integer"`
2. `name="file_data"` `type="SafeString"`
3. `name="Entity_Name"` `type="SafeString"`
4. `name="View_Id"` `type="SafeString"`
5. `name="fetch_xmldata"` `type="SafeString"`
6. `name="current_view"` `type="SafeString"`
7. `name="entity_typeName"` `type="SafeString"`
8. `name="entity_typeCode"` `type="Integer"`
9. `name="entity_fetchXml"` `type="SafeString"`
10. `name="entity_exportType"` `type="Integer"`
11. `name="entity_layoutXml"` `type="SafeString"`
12. `name="entity_viewName"` `type="SafeString"`

### DupWarningDialog.xml

Contains 9 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="SafeString"`
3. `name="param_parentAccountId"` `type="SafeString"`
4. `name="param_parentAccountName"` `type="SafeString"`
5. `name="param_parentContactId"` `type="SafeString"`
6. `name="param_parentContactName"` `type="SafeString"`
7. `name="param_transactioncurrencyid"` `type="UniqueId"`
8. `name="param_qualifyStatus"` `type="Integer"`
9. `name="param_emailAddress"` `type="SafeString"`

### DuplicateChart.xml

Contains 10 querystringparameter(s):

1. `name="paramduplicate_id"` `type="SafeString"`
2. `name="paramduplicate_name"` `type="SafeString"`
3. `name="paramduplicate_description"` `type="SafeString"`
4. `name="paramduplicate_presentationdescription"` `type="SafeString"`
5. `name="paramduplicate_primaryentitytypecode"` `type="SafeString"`
6. `name="paramduplicate_datadescription"` `type="SafeString"`
7. `name="paramduplicate_entityname"` `type="SafeString"`
8. `name="paramduplicate_chartid"` `type="SafeString"`
9. `name="paramduplicate_visualizationtype"` `type="SafeString"`
10. `name="paramduplicate_recordslength"` `type="Integer"`

### DuplicateQualifyLeadDialog.xml

Contains 12 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="SafeString"`
3. `name="param_parentAccountId"` `type="SafeString"`
4. `name="param_parentAccountName"` `type="SafeString"`
5. `name="param_parentContactId"` `type="SafeString"`
6. `name="param_parentContactName"` `type="SafeString"`
7. `name="param_transactioncurrencyid"` `type="UniqueId"`
8. `name="param_qualifyStatus"` `type="Integer"`
9. `name="param_emailAddress"` `type="SafeString"`
10. `name="entity_record_account"` `type="Object"`
11. `name="entity_record_contact"` `type="Object"`
12. `name="param_qualifyLeadParam"` `type="Object"`

### EditContact.xml

Contains 5 querystringparameter(s):

1. `name="record_id"` `type="SafeString"`
2. `name="type_Name"` `type="SafeString"`
3. `name="grid_Control"` `type="Object"`
4. `name="param_accountRecordId"` `type="Object"`
5. `name="param_accountName"` `type="Object"`

### EditCustomisedSystemMessage.xml

Contains 2 querystringparameter(s):

1. `name="is_editmode"` `type="Boolean"`
2. `name="customisedrecord_id"` `type="SafeString"`

### EditPersonalViewInfo.xml

Contains 1 querystringparameter(s):

1. `name="last_button_clicked"` `type="SafeString"`

### EditProperties.xml

Contains 4 querystringparameter(s):

1. `name="param_productid"` `type="SafeString"`
2. `name="param_productname"` `type="SafeString"`
3. `name="param_entityname"` `type="SafeString"`
4. `name="param_gridentityname"` `type="SafeString"`

### EditSharePointDocumentProperties.xml

Contains 15 querystringparameter(s):

1. `name="location_Id"` `type="SafeString"`
2. `name="regarding_Object_Id"` `type="SafeString"`
3. `name="regarding_Object_EntityName"` `type="SafeString"`
4. `name="document_Id"` `type="SafeString"`
5. `name="last_Button_Clicked"` `type="SafeString"`
6. `name="full_Name"` `type="SafeString"`
7. `name="title_Value"` `type="SafeString"`
8. `name="extension_Value"` `type="SafeString"`
9. `name="use_Fallback"` `type="SafeString"`
10. `name="sharePoint_Document_Id"` `type="SafeString"`
11. `name="created_By"` `type="SafeString"`
12. `name="created_On"` `type="SafeString"`
13. `name="modified_By"` `type="SafeString"`
14. `name="modified_On"` `type="SafeString"`
15. `name="file_Type"` `type="SafeString"`

### EditSubject.xml

Contains 3 querystringparameter(s):

1. `name="selected_subject"` `type="Object"`
2. `name="last_selected_button"` `type="SafeString"`
3. `name="edit_subject_id"` `type="SafeString"`

### EditSuggestedActivity.xml

Contains 8 querystringparameter(s):

1. `name="Entity_Records"` `type="Object"`
2. `name="Entity_Grid"` `type="Object"`
3. `name="param_edit_activity_msg"` `type="SafeString"`
4. `name="param_regardingRecordId"` `type="SafeString"`
5. `name="param_entityName"` `type="SafeString"`
6. `name="param_recordName"` `type="SafeString"`
7. `name="param_status"` `type="SafeString"`
8. `name="param_control"` `type="SafeString"`

### EditTagsDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_selectedRecords"` `type="SafeString"`

### EditTrainingRecord.xml

Contains 1 querystringparameter(s):

1. `name="msdyn_entityid"` `type="SafeString"`

### Email.Mailbox.ApplyDefaultSettings.xml

Contains 4 querystringparameter(s):

1. `name="selected_mailboxes"` `type="SafeString"`
2. `name="operation_type"` `type="SafeString"`
3. `name="is_refresh_required"` `type="Boolean"`
4. `name="is_operation_from_grid"` `type="Boolean"`

### Email.Mailbox.ApproveEmail.xml

Contains 4 querystringparameter(s):

1. `name="selected_mailboxes"` `type="SafeString"`
2. `name="operation_type"` `type="SafeString"`
3. `name="is_refresh_required"` `type="Boolean"`
4. `name="is_operation_from_grid"` `type="Boolean"`

### Email.Mailbox.FolderLevelTracking.xml

Contains 1 querystringparameter(s):

1. `name="selected_mailbox_id"` `type="SafeString"`

### Email.Mailbox.PendingEmailApprovalDialog.xml

Contains 2 querystringparameter(s):

1. `name="show_pending_email_approval_users_message"` `type="Boolean"`
2. `name="show_pending_email_approval_queues_message"` `type="Boolean"`

### Email.Mailbox.RejectEmail.xml

Contains 4 querystringparameter(s):

1. `name="selected_mailboxes"` `type="SafeString"`
2. `name="operation_type"` `type="SafeString"`
3. `name="is_refresh_required"` `type="Boolean"`
4. `name="is_operation_from_grid"` `type="Boolean"`

### Email.Mailbox.TestAndEnable.xml

Contains 4 querystringparameter(s):

1. `name="selected_mailboxes"` `type="SafeString"`
2. `name="operation_type"` `type="SafeString"`
3. `name="is_refresh_required"` `type="Boolean"`
4. `name="is_operation_from_grid"` `type="Boolean"`

### Email.TracelogDetails.SidePanel.xml

Contains 1 querystringparameter(s):

1. `name="tracelog_id"` `type="SafeString"`

### EmailConsentDialog.xml

Contains 5 querystringparameter(s):

1. `name="header_label"` `type="SafeString"`
2. `name="ok_button_label"` `type="SafeString"`
3. `name="cancel_button_label"` `type="SafeString"`
4. `name="html_page_url"` `type="SafeString"`
5. `name="last_button_clicked"` `type="SafeString"`

### EmailForAContentBlockDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_fragmentid"` `type="SafeString"`

### EmailReminderControl.xml

Contains 14 querystringparameter(s):

1. `name="id_reminderOptionSelected"` `type="SafeString"`
2. `name="id_reminderTextSelected"` `type="SafeString"`
3. `name="id_reminderDateSelected"` `type="SafeString"`
4. `name="id_dateErrorText"` `type="SafeString"`
5. `name="id_recipientName"` `type="SafeString"`
6. `name="id_footerTextOption1_single_recipient"` `type="SafeString"`
7. `name="id_footerTextOption1_ignore_recipient"` `type="SafeString"`
8. `name="id_footerTextOption2_single_recipient"` `type="SafeString"`
9. `name="id_footerTextOption2_ignore_recipient"` `type="SafeString"`
10. `name="id_footerTextOption3"` `type="SafeString"`
11. `name="id_invalidChoice"` `type="SafeString"`
12. `name="id_isEmailFollowedValue"` `type="SafeString"`
13. `name="id_lastButtonClicked"` `type="SafeString"`
14. `name="id_now"` `type="SafeString"`

### EmailTemplateDialog.xml

Contains 8 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="SafeString"`
3. `name="param_entityType"` `type="SafeString"`
4. `name="param_emailFormData"` `type="SafeString"`
5. `name="param_emailsubject"` `type="SafeString"`
6. `name="param_emaildescription"` `type="SafeString"`
7. `name="param_templateId"` `type="SafeString"`
8. `name="param_templateTitle"` `type="SafeString"`

### EmailTemplateInsertDataValue.xml

Contains 3 querystringparameter(s):

1. `name="param_templateEntity"` `type="SafeString"`
2. `name="param_datafield_control_output"` `type="SafeString"`
3. `name="param_last_button_clicked"` `type="SafeString"`

### EmailTemplatePreviewDialog.xml

Contains 3 querystringparameter(s):

1. `name="msdynce_custom_dialog_templateId"` `type="SafeString"`
2. `name="msdynce_custom_dialog_objectType"` `type="SafeString"`
3. `name="msdynce_custom_dialog_objectId"` `type="SafeString"`

### EmailTemplatesForAContentBlockDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_fragmentid"` `type="SafeString"`

### EnableDisableDiagnosticsDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_is_enable_dialog"` `type="Boolean"`

### EndSeriesDialog.xml

Contains 6 querystringparameter(s):

1. `name="param_options"` `type="SafeString"`
2. `name="param_selectedValue"` `type="SafeString"`
3. `name="param_lastButtonClicked"` `type="SafeString"`
4. `name="param_seriesid"` `type="SafeString"`
5. `name="param_isVertical"` `type="SafeString"`
6. `name="param_controlLabel"` `type="SafeString"`

### EnhancedEmailTemplateDialog.xml

Contains 7 querystringparameter(s):

1. `name="input_config"` `type="SafeString"`
2. `name="dialog_result"` `type="Boolean"`
3. `name="selected_item"` `type="SafeString"`
4. `name="param_lastButtonClicked"` `type="SafeString"`
5. `name="param_entityId"` `type="SafeString"`
6. `name="param_entityType"` `type="SafeString"`
7. `name="param_emailFormData"` `type="SafeString"`

### EnhancedErrorDialog.xml

Contains 1 querystringparameter(s):

1. `name="input_options"` `type="SafeString"`

### EntityImageUpload.xml

Contains 7 querystringparameter(s):

1. `name="entityimageurl_id"` `type="SafeString"`
2. `name="entitylogicalname_id"` `type="SafeString"`
3. `name="entityprimaryattribute_id"` `type="SafeString"`
4. `name="entity_id"` `type="SafeString"`
5. `name="cameraenabled_id"` `type="Boolean"`
6. `name="entityimagedata_id"` `type="SafeString"`
7. `name="formattedPrimaryImage_Attribute"` `type="SafeString"`

### EventTemplateMDD.xml

Contains 1 querystringparameter(s):

1. `name="is_mdd"` `type="Boolean"`

### Excel_Word_Template.xml

Contains 12 querystringparameter(s):

1. `name="Import_FileName"` `type="SafeString"`
2. `name="Import_Size"` `type="SafeString"`
3. `name="Tab_To_Open"` `type="SafeString"`
4. `name="entity_id"` `type="SafeString"`
5. `name="view_id"` `type="SafeString"`
6. `name="entityview_fetchxml"` `type="SafeString"`
7. `name="entityview_layoutxml"` `type="SafeString"`
8. `name="uploaded_template_id"` `type="SafeString"`
9. `name="Import_FileValue"` `type="SafeString"`
10. `name="template_info"` `type="SafeString"`
11. `name="uploadLater_checkbox"` `type="SafeString"`
12. `name="filter_entity"` `type="Object"`

### ExportToExcel.xml

Contains 15 querystringparameter(s):

1. `name="entity_oId"` `type="SafeString"`
2. `name="entity_oType"` `type="SafeString"`
3. `name="entity_rollupType"` `type="SafeString"`
4. `name="entity_typeName"` `type="SafeString"`
5. `name="entity_typeCode"` `type="Integer"`
6. `name="entity_fetchXml"` `type="SafeString"`
7. `name="entity_effectiveFetchXml"` `type="SafeString"`
8. `name="entity_exportType"` `type="Integer"`
9. `name="file_data"` `type="SafeString"`
10. `name="entity_layoutXml"` `type="SafeString"`
11. `name="entity_effectiveLayoutXml"` `type="SafeString"`
12. `name="entity_viewId"` `type="SafeString"`
13. `name="entity_viewName"` `type="SafeString"`
14. `name="entity_viewType"` `type="SafeString"`
15. `name="entity_totalRecordCount"` `type="Integer"`

### ExportToExcelOnlineDialog.xml

Contains 9 querystringparameter(s):

1. `name="current_view"` `type="SafeString"`
2. `name="fetch_xml"` `type="SafeString"`
3. `name="layout_xml"` `type="SafeString"`
4. `name="file_id"` `type="SafeString"`
5. `name="entityType_name"` `type="SafeString"`
6. `name="entity_is_importable"` `type="Boolean"`
7. `name="entity_oId"` `type="SafeString"`
8. `name="entity_oType"` `type="SafeString"`
9. `name="entity_rollupType"` `type="SafeString"`

### FragmentSaveAsConfirmDialog.xml

Contains 1 querystringparameter(s):

1. `name="dialog_result"` `type="SafeString"`

### FragmentSaveAsDialog.xml

Contains 13 querystringparameter(s):

1. `name="designerhtml_snippet"` `type="SafeString"`
2. `name="finalizedhtml_snippet"` `type="SafeString"`
3. `name="previewhtml_snippet"` `type="SafeString"`
4. `name="preview_dialog_result"` `type="SafeString"`
5. `name="preview_selected_item"` `type="SafeString"`
6. `name="tags_param"` `type="SafeString"`
7. `name="title_param"` `type="SafeString"`
8. `name="statuscode_param"` `type="Integer"`
9. `name="isprotected_param"` `type="Boolean"`
10. `name="contentblockid_param"` `type="SafeString"`
11. `name="local_config"` `type="SafeString"`
12. `name="dialog_thumbnail"` `type="SafeString"`
13. `name="customFormAttributes_param"` `type="SafeString"`

### FrontlineWorkerQuickCreate.xml

Contains 5 querystringparameter(s):

1. `name="param_defaultMobileOfflineProfile"` `type="SafeString"`
2. `name="param_defaultFieldSecurityProfile"` `type="SafeString"`
3. `name="param_defaultSecurityRole"` `type="SafeString"`
4. `name="param_defaultTimezone"` `type="Integer"`
5. `name="is_FLW_EmailChecked"` `type="Boolean"`

### GeoCodeDialog.xml

Contains 3 querystringparameter(s):

1. `name="param_workOrderIds"` `type="Object"`
2. `name="param_parentPage"` `type="Object"`
3. `name="param_ParentFormContext"` `type="Object"`

### GetProducts.xml

Contains 4 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_opportunityid"` `type="UniqueId"`
3. `name="param_name"` `type="SafeString"`
4. `name="param_transactioncurrencyid"` `type="UniqueId"`

### GoalSettingMDD.xml

Contains 1 querystringparameter(s):

1. `name="is_Form"` `type="Boolean"`

### GrantAccessDialog.xml

Contains 4 querystringparameter(s):

1. `name="param_last_button_clicked"` `type="SafeString"`
2. `name="param_user_list"` `type="Object"`
3. `name="param_entity_id"` `type="SafeString"`
4. `name="param_entity_type"` `type="SafeString"`

### HierarchicalDropDownLanguageAndRegion.xml

Contains 2 querystringparameter(s):

1. `name="attribute_name"` `type="SafeString"`
2. `name="user_id"` `type="SafeString"`

### ImportAsChart.xml

Contains 6 querystringparameter(s):

1. `name="paramimport_name"` `type="SafeString"`
2. `name="paramimport_presentationdescription"` `type="SafeString"`
3. `name="paramimport_primaryentitytypecode"` `type="SafeString"`
4. `name="paramimport_datadescription"` `type="SafeString"`
5. `name="paramimport_entityname"` `type="SafeString"`
6. `name="paramimport_chartid"` `type="SafeString"`

### ImportChart.xml

Contains 9 querystringparameter(s):

1. `name="ChartImportFile_Type"` `type="Integer"`
2. `name="ChartImport_FileName"` `type="SafeString"`
3. `name="ChartImport_Description"` `type="SafeString"`
4. `name="ChartImport_Size"` `type="Integer"`
5. `name="Entity_Name"` `type="SafeString"`
6. `name="ChartImport_ChartId"` `type="SafeString"`
7. `name="ChartImport_ChartName"` `type="SafeString"`
8. `name="ChartImport_DataDescription"` `type="SafeString"`
9. `name="ChartImport_PresentationDescription"` `type="SafeString"`

### ImportProjectEstimatesDialog.xml

Contains 3 querystringparameter(s):

1. `name="param_entityName"` `type="SafeString"`
2. `name="param_entityRecordId"` `type="UniqueId"`
3. `name="param_lastButtonClicked"` `type="SafeString"`

### ImportWizard.xml

Contains 21 querystringparameter(s):

1. `name="id_ImportId"` `type="SafeString"`
2. `name="id_ImportType"` `type="SafeString"`
3. `name="id_ImportFileType"` `type="Integer"`
4. `name="id_ImportFileName"` `type="SafeString"`
5. `name="id_ImportFileSize"` `type="SafeString"`
6. `name="id_ImportFileId"` `type="SafeString"`
7. `name="id_FieldDelimiter"` `type="SafeString"`
8. `name="id_EntityLogicalName"` `type="SafeString"`
9. `name="id_EntityLabel"` `type="SafeString"`
10. `name="id_HeaderColumnIndexesToBeIgnored"` `type="SafeString"`
11. `name="id_IsFirstRowHeader"` `type="SafeString"`
12. `name="id_DefaultOwnerType"` `type="SafeString"`
13. `name="id_DefaultOwner"` `type="SafeString"`
14. `name="id_DuplicateDetection"` `type="SafeString"`
15. `name="id_MapChanged"` `type="SafeString"`
16. `name="id_EntityKey"` `type="SafeString"`
17. `name="id_EntityKeyAttributes"` `type="SafeString"`
18. `name="id_UpsertMode"` `type="SafeString"`
19. `name="id_ImportMapName"` `type="SafeString"`
20. `name="id_IsMandatoryFieldValid"` `type="SafeString"`
21. `name="id_UploadedFileSize"` `type="Integer"`

### InFormSchedule.xml

Contains 4 querystringparameter(s):

1. `name="param_PrimaryControl"` `type="Object"`
2. `name="param_RecordId"` `type="Object"`
3. `name="param_EntityTypeName"` `type="Object"`
4. `name="param_Localization"` `type="Object"`

### InsertCopilotPromptsDialog.xml

Contains 7 querystringparameter(s):

1. `name="param_insertCopilotPromptsControlOutput"` `type="SafeString"`
2. `name="param_insertCopilotPromptsAltTextOutput"` `type="SafeString"`
3. `name="param_lastButton_clicked"` `type="SafeString"`
4. `name="param_isKnowledgSourcesEnabled"` `type="Boolean"`
5. `name="param_insertCopilotPromptsIdValue"` `type="SafeString"`
6. `name="param_isPromptContentElementDiv"` `type="Boolean"`
7. `name="param_insertCopilotPromptsAltTextStyle"` `type="SafeString"`

### InsertEmailTemplate_MultiPage_MDD.xml

Contains 4 querystringparameter(s):

1. `name="email_form_data"` `type="Object"`
2. `name="template_id"` `type="Object"`
3. `name="regarding_object_id"` `type="Object"`
4. `name="regarding_object_type"` `type="SafeString"`

### InsertSignature.xml

Contains 5 querystringparameter(s):

1. `name="param_signaturetext"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_ownerId"` `type="SafeString"`
4. `name="param_senderId"` `type="SafeString"`
5. `name="param_sendertype"` `type="SafeString"`

### InsightsControlDialog.xml

Contains 4 querystringparameter(s):

1. `name="insights_config"` `type="SafeString"`
2. `name="insights_filter"` `type="SafeString"`
3. `name="filter_target_name"` `type="SafeString"`
4. `name="insights_entity_name"` `type="SafeString"`

### InvoiceClose.xml

Contains 3 querystringparameter(s):

1. `name="param_invoiceid"` `type="UniqueId"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_closedstate"` `type="Integer"`

### IoTFlows.xml

Contains 1 querystringparameter(s):

1. `name="param_flowTemplatesURL"` `type="SafeString"`

### IoTPowerBIConfiguration.xml

Contains 2 querystringparameter(s):

1. `name="param_pbiconfigurl"` `type="SafeString"`
2. `name="param_pbiseturl"` `type="SafeString"`

### IoTWelcome.xml

Contains 4 querystringparameter(s):

1. `name="param_msdyn_welcometitletext"` `type="SafeString"`
2. `name="param_msdyn_welcomecaptiontext"` `type="SafeString"`
3. `name="param_msdyn_iotdeploymentlink"` `type="SafeString"`
4. `name="param_msdyn_iotcentrallink"` `type="SafeString"`

### JoinTeams.xml

Contains 6 querystringparameter(s):

1. `name="target_entities"` `type="SafeString"`
2. `name="entity_records"` `type="Object"`
3. `name="last_button_clicked"` `type="SafeString"`
4. `name="entity_id"` `type="SafeString"`
5. `name="total_records_selected"` `type="SafeString"`
6. `name="selected_records"` `type="Object"`

### KMChooseLanguage.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_selectedLanguage"` `type="SafeString"`

### KMInsertArticleV2.xml

Contains 1 querystringparameter(s):

1. `name="param_isMultipleSelectionEnabled"` `type="SafeString"`

### KnowledgeArticleReadDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_articleid"` `type="SafeString"`
2. `name="param_showcontrol"` `type="SafeString"`

### KnowledgeSettings.xml

Contains 4 querystringparameter(s):

1. `name="param_clonePrivileges"` `type="Boolean"`
2. `name="param_noteMigration"` `type="Boolean"`
3. `name="param_file_store_migration_status"` `type="SafeString"`
4. `name="param_file_store_migration_turnedon"` `type="Boolean"`

### LaunchPlaybook.xml

Contains 3 querystringparameter(s):

1. `name="params_entitylogicalname"` `type="SafeString"`
2. `name="params_entityid"` `type="SafeString"`
3. `name="params_out_trackprogress"` `type="Boolean"`

### LeadHygieneDuplicateDialog.xml

Contains 3 querystringparameter(s):

1. `name="current_record_id"` `type="SafeString"`
2. `name="duplicate_record_count"` `type="SafeString"`
3. `name="current_record_delete_requested"` `type="Boolean"`

### LearnMoreDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_primarytext"` `type="SafeString"`
2. `name="param_titletext"` `type="SafeString"`
3. `name="param_continueLabel"` `type="SafeString"`
4. `name="param_learnMoreLabel"` `type="SafeString"`
5. `name="param_lastButtonClicked"` `type="SafeString"`

### LookUpAddress.xml

Contains 4 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_parentId"` `type="UniqueId"`
3. `name="param_addressId"` `type="UniqueId"`
4. `name="param_disableShipToCall"` `type="Boolean"`

### LookUpDetailAddress.xml

Contains 3 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_parentId"` `type="UniqueId"`
3. `name="param_addressId"` `type="UniqueId"`

### MacrosMonitorMDD_v2.xml

Contains 1 querystringparameter(s):

1. `name="record_Id"` `type="SafeString"`

### MailAppAppointmentConflict.xml

Contains 2 querystringparameter(s):

1. `name="calendar_edit_link_url"` `type="SafeString"`
2. `name="is_keep_button"` `type="Boolean"`

### MailAppKnowledgeArticle.xml

Contains 10 querystringparameter(s):

1. `name="last_button_clicked"` `type="SafeString"`
2. `name="entity_id"` `type="SafeString"`
3. `name="entity_typecode"` `type="Integer"`
4. `name="email_form_data"` `type="Object"`
5. `name="email_subject"` `type="SafeString"`
6. `name="email_description"` `type="SafeString"`
7. `name="entity_type_info"` `type="SafeString"`
8. `name="cursor_info"` `type="SafeString"`
9. `name="template_id"` `type="SafeString"`
10. `name="is_select_button"` `type="Boolean"`

### MailAppSalesLiterature.xml

Contains 1 querystringparameter(s):

1. `name="id_map"` `type="Object"`

### ManageDuplicates.xml

Contains 2 querystringparameter(s):

1. `name="entity_record"` `type="Object"`
2. `name="param_lastButtonClicked"` `type="SafeString"`

### ManageSystemUserRoles.xml

Contains 6 querystringparameter(s):

1. `name="rows_data"` `type="SafeString"`
2. `name="columns_definition"` `type="SafeString"`
3. `name="selected_records"` `type="Object"`
4. `name="user_rolesmap"` `type="Object"`
5. `name="last_button_clicked"` `type="SafeString"`
6. `name="total_records_selected"` `type="SafeString"`

### ManageTeamRoles.xml

Contains 6 querystringparameter(s):

1. `name="rows_data"` `type="SafeString"`
2. `name="columns_definition"` `type="SafeString"`
3. `name="selected_records"` `type="Object"`
4. `name="team_rolesmap"` `type="Object"`
5. `name="last_button_clicked"` `type="SafeString"`
6. `name="total_records_selected"` `type="SafeString"`

### MarkExternal.xml

Contains 3 querystringparameter(s):

1. `name="param_knowledgeArticleId"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_articlePublicNumber"` `type="SafeString"`

### MarkInternal.xml

Contains 3 querystringparameter(s):

1. `name="param_knowledgeArticleId"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_articlePublicNumber"` `type="SafeString"`

### MaximumPopupsAlert.xml

Contains 1 querystringparameter(s):

1. `name="param_maximumpopupsalert"` `type="SafeString"`

### MergeCase.xml

Contains 4 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityLogicalName"` `type="SafeString"`
3. `name="param_queryParameters"` `type="SafeString"`
4. `name="param_gridColumns"` `type="SafeString"`

### MergeRecordsDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="entity_record"` `type="SafeString"`
3. `name="entity_type"` `type="SafeString"`
4. `name="param_MergeFlag"` `type="SafeString"`
5. `name="param_parental_check"` `type="Boolean"`

### MergeSuccessMessage.xml

Contains 2 querystringparameter(s):

1. `name="param_result_description"` `type="SafeString"`
2. `name="param_request_type"` `type="SafeString"`

### MicrosoftFlowsDialog.xml

Contains 27 querystringparameter(s):

1. `name="flow_id"` `type="SafeString"`
2. `name="entity_ids"` `type="SafeString"`
3. `name="environment_id"` `type="SafeString"`
4. `name="org_unique_name"` `type="SafeString"`
5. `name="entity_logical_collection_name"` `type="SafeString"`
6. `name="entity_logical_name"` `type="SafeString"`
7. `name="flows_destination_url"` `type="SafeString"`
8. `name="flows_fpi_site_url"` `type="SafeString"`
9. `name="last_button_clicked"` `type="SafeString"`
10. `name="dynamics365_access_token"` `type="SafeString"`
11. `name="flows_authentication_string"` `type="SafeString"`
12. `name="flows_enable_widget_v2"` `type="Boolean"`
13. `name="flows_wflog_id"` `type="SafeString"`
14. `name="bpf_instance_id"` `type="SafeString"`
15. `name="bpf_instance_entity_name"` `type="SafeString"`
16. `name="bpf_definition_id"` `type="SafeString"`
17. `name="bpf_definition_entity_name"` `type="SafeString"`
18. `name="bpf_step_id"` `type="SafeString"`
19. `name="bpf_definition_name"` `type="SafeString"`
20. `name="bpf_instance_name"` `type="SafeString"`
21. `name="bpf_flowstage_localized_name"` `type="SafeString"`
22. `name="bpf_flowstage_entity_name"` `type="SafeString"`
23. `name="bpf_flowstage_entity_collection_name"` `type="SafeString"`
24. `name="bpf_flowstage_entity_record_id"` `type="SafeString"`
25. `name="bpf_activestage_id"` `type="SafeString"`
26. `name="bpf_activestageentity_name"` `type="SafeString"`
27. `name="bpf_activestage_localized_name"` `type="SafeString"`

### MoveRoutingRuleItem.xml

Contains 5 querystringparameter(s):

1. `name="param_RoutingRuleId"` `type="SafeString"`
2. `name="param_SelectedRuleItemId"` `type="SafeString"`
3. `name="param_SelectedRuleItemName"` `type="SafeString"`
4. `name="param_IsMoveBefore"` `type="Boolean"`
5. `name="param_IsRefreshNeeded"` `type="Boolean"`

### MsTeamsMultiChannelDialog.xml

Contains 12 querystringparameter(s):

1. `name="param_entityName"` `type="SafeString"`
2. `name="param_entityTypeCode"` `type="SafeString"`
3. `name="param_entityId"` `type="SafeString"`
4. `name="param_modeForTeam"` `type="PositiveInteger"`
5. `name="param_teamNameForTeam"` `type="SafeString"`
6. `name="param_modeForChannel"` `type="PositiveInteger"`
7. `name="param_teamNameForChannel"` `type="SafeString"`
8. `name="param_selectedTeamName"` `type="SafeString"`
9. `name="param_previousTabId"` `type="SafeString"`
10. `name="param_teamsRecord"` `type="SafeString"`
11. `name="param_nextTabId"` `type="SafeString"`
12. `name="param_ownerShipType"` `type="SafeString"`

### MultiGeoCodeDialog.xml

Contains 3 querystringparameter(s):

1. `name="param_workOrderIds"` `type="Object"`
2. `name="param_parentPage"` `type="Object"`
3. `name="param_ParentFormContext"` `type="Object"`

### NewAppointmentsForDistributeCampaignActivity.xml

Contains 7 querystringparameter(s):

1. `name="action_name"` `type="SafeString"`
2. `name="activity_serialized"` `type="SafeString"`
3. `name="activity_type"` `type="SafeString"`
4. `name="entity_id"` `type="Object"`
5. `name="param_lastButtonClicked"` `type="SafeString"`
6. `name="channel_name"` `type="SafeString"`
7. `name="form_values_appointment"` `type="SafeString"`

### NewEmailTemplateDialog.xml

Contains 7 querystringparameter(s):

1. `name="input_config"` `type="SafeString"`
2. `name="dialog_result"` `type="Boolean"`
3. `name="selected_item"` `type="SafeString"`
4. `name="param_lastButtonClicked"` `type="SafeString"`
5. `name="param_entityId"` `type="SafeString"`
6. `name="param_entityType"` `type="SafeString"`
7. `name="param_emailFormData"` `type="SafeString"`

### NewEmailsForDistributeCampaignActivity.xml

Contains 9 querystringparameter(s):

1. `name="action_name"` `type="SafeString"`
2. `name="activity_serialized"` `type="SafeString"`
3. `name="activity_type"` `type="SafeString"`
4. `name="email_description"` `type="SafeString"`
5. `name="email_selected_template_id"` `type="SafeString"`
6. `name="entity_id"` `type="Object"`
7. `name="param_lastButtonClicked"` `type="SafeString"`
8. `name="channel_name"` `type="SafeString"`
9. `name="form_values_email"` `type="SafeString"`

### NewFaxesForDistributeCampaignActivity.xml

Contains 7 querystringparameter(s):

1. `name="action_name"` `type="SafeString"`
2. `name="activity_serialized"` `type="SafeString"`
3. `name="activity_type"` `type="SafeString"`
4. `name="entity_id"` `type="Object"`
5. `name="param_lastButtonClicked"` `type="SafeString"`
6. `name="channel_name"` `type="SafeString"`
7. `name="form_values_fax"` `type="SafeString"`

### NewLettersForDistributeCampaignActivity.xml

Contains 7 querystringparameter(s):

1. `name="action_name"` `type="SafeString"`
2. `name="activity_serialized"` `type="SafeString"`
3. `name="activity_type"` `type="SafeString"`
4. `name="entity_id"` `type="Object"`
5. `name="param_lastButtonClicked"` `type="SafeString"`
6. `name="channel_name"` `type="SafeString"`
7. `name="form_values_letter"` `type="SafeString"`

### NewPhoneCallsForDistributeCampaignActivity.xml

Contains 7 querystringparameter(s):

1. `name="action_name"` `type="SafeString"`
2. `name="activity_serialized"` `type="SafeString"`
3. `name="activity_type"` `type="SafeString"`
4. `name="entity_id"` `type="Object"`
5. `name="param_lastButtonClicked"` `type="SafeString"`
6. `name="channel_name"` `type="SafeString"`
7. `name="form_values_phonecall"` `type="SafeString"`

### NewSharePointDocument.xml

Contains 8 querystringparameter(s):

1. `name="location_Id"` `type="SafeString"`
2. `name="last_Button_Clicked"` `type="SafeString"`
3. `name="regarding_Object_Id"` `type="SafeString"`
4. `name="entity_Type_Code"` `type="EntityType"`
5. `name="document_Type"` `type="SafeString"`
6. `name="relative_Location"` `type="SafeString"`
7. `name="regarding_Object_EntityName"` `type="SafeString"`
8. `name="entity_Name"` `type="SafeString"`

### NoChannelMDD.xml

Contains 11 querystringparameter(s):

1. `name="param_entityName"` `type="SafeString"`
2. `name="param_entityTypeCode"` `type="SafeString"`
3. `name="param_entityId"` `type="SafeString"`
4. `name="param_modeForTeam"` `type="PositiveInteger"`
5. `name="param_teamNameForTeam"` `type="SafeString"`
6. `name="param_modeForChannel"` `type="PositiveInteger"`
7. `name="param_teamNameForChannel"` `type="SafeString"`
8. `name="param_selectedTeamName"` `type="SafeString"`
9. `name="param_previousTabId"` `type="SafeString"`
10. `name="param_ownerShipType"` `type="SafeString"`
11. `name="param_nextTabId"` `type="SafeString"`

### OCVFeedbackDlg.xml

Contains 1 querystringparameter(s):

1. `name="window_hash"` `type="SafeString"`

### OfflineStatus.xml

Contains 7 querystringparameter(s):

1. `name="offline_status"` `type="Object"`
2. `name="offlinestatus_reason"` `type="Object"`
3. `name="offlinemetadata_sync"` `type="Object"`
4. `name="offline_enabled_json_string"` `type="Object"`
5. `name="offline_disabled_json_string"` `type="Object"`
6. `name="offline_enable_string"` `type="Object"`
7. `name="offline_disable_string"` `type="Object"`

### OneDriveConfigurationDialog.xml

Contains 6 querystringparameter(s):

1. `name="last_Button_Clicked"` `type="SafeString"`
2. `name="regarding_Object_Id"` `type="SafeString"`
3. `name="entity_Type_Code"` `type="EntityType"`
4. `name="folder_Name"` `type="SafeString"`
5. `name="regarding_Object_EntityName"` `type="SafeString"`
6. `name="entity_Name"` `type="SafeString"`

### OneDriveFolderSettings.xml

Contains 6 querystringparameter(s):

1. `name="last_Button_Clicked"` `type="SafeString"`
2. `name="regarding_Object_Id"` `type="SafeString"`
3. `name="entity_Type_Code"` `type="EntityType"`
4. `name="regarding_Object_EntityName"` `type="SafeString"`
5. `name="entity_Name"` `type="SafeString"`
6. `name="folder_Name"` `type="SafeString"`

### OpenActivitiesDialog.xml

Contains 6 querystringparameter(s):

1. `name="param_sourceaction"` `type="SafeString"`
2. `name="param_confirmbuttonclicked"` `type="Boolean"`
3. `name="param_navigationtabname"` `type="SafeString"`
4. `name="param_openactivities_redirection_tabname"` `type="SafeString"`
5. `name="param_openactivitiesoropenswarmsstring"` `type="SafeString"`
6. `name="param_openrecords_redirection_tabs"` `type="Object"`

### OpenExpressionBuilderV2.xml

Contains 1 querystringparameter(s):

1. `name="record_Id"` `type="SafeString"`

### OpenRecurrentEventDialog.xml

Contains 3 querystringparameter(s):

1. `name="param_baserecurrenteventid"` `type="SafeString"`
2. `name="param_radiobuttonresponse"` `type="SafeString"`
3. `name="param_isok"` `type="Boolean"`

### OutboundMarketingDeprecationDialog.xml

Contains 2 querystringparameter(s):

1. `name="input_config"` `type="SafeString"`
2. `name="dialog_result"` `type="Boolean"`

### OutlookFreeBusyNewFeatureDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_firstTimeOpen"` `type="Boolean"`

### PersonalSettingsDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_saveButtonClicked"` `type="SafeString"`

### PowerBIQuickReport.xml

Contains 3 querystringparameter(s):

1. `name="fetch_xml_sql"` `type="Object"`
2. `name="view_name"` `type="SafeString"`
3. `name="grid_column_info"` `type="Object"`

### PreviewProductProperties.xml

Contains 4 querystringparameter(s):

1. `name="param_productid"` `type="SafeString"`
2. `name="param_productname"` `type="SafeString"`
3. `name="param_entityname"` `type="SafeString"`
4. `name="param_gridentityname"` `type="SafeString"`

### ProductDetailsOnInfoIcon.xml

Contains 8 querystringparameter(s):

1. `name="param_productName"` `type="SafeString"`
2. `name="param_productId"` `type="SafeString"`
3. `name="param_validFrom"` `type="SafeString"`
4. `name="param_validTo"` `type="SafeString"`
5. `name="param_description"` `type="SafeString"`
6. `name="param_unitGroup"` `type="SafeString"`
7. `name="param_defaultUnit"` `type="SafeString"`
8. `name="param_dafaultPriceList"` `type="SafeString"`

### PublishKnowledgeArticle.xml

Contains 10 querystringparameter(s):

1. `name="param_selectedrecords"` `type="Object"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_isprimary"` `type="SafeString"`
4. `name="param_parentarticlecontentid"` `type="SafeString"`
5. `name="param_languagelocaleid"` `type="SafeString"`
6. `name="param_articlePublicNumber"` `type="SafeString"`
7. `name="param_isbulkpublishaction"` `type="SafeString"`
8. `name="param_majorversionnumber"` `type="SafeString"`
9. `name="param_minorversionnumber"` `type="SafeString"`
10. `name="param_datetimefixoffset"` `type="SafeString"`

### QueueItemPick.xml

Contains 3 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="entity_records"` `type="SafeString"`
3. `name="param_gridControl"` `type="Object"`

### ReactivateCase.xml

Contains 3 querystringparameter(s):

1. `name="param_entityId"` `type="UniqueId"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_records"` `type="SafeString"`

### ReassignAllRecords.xml

Contains 8 querystringparameter(s):

1. `name="entity_name"` `type="SafeString"`
2. `name="entity_type_code"` `type="SafeString"`
3. `name="selected_records_count"` `type="PositiveInteger"`
4. `name="entity_records"` `type="Object"`
5. `name="last_button_clicked"` `type="SafeString"`
6. `name="owner_id"` `type="SafeString"`
7. `name="owner_type"` `type="SafeString"`
8. `name="entity_id"` `type="SafeString"`

### ReassignAllRecordsTeam.xml

Contains 8 querystringparameter(s):

1. `name="entity_name"` `type="SafeString"`
2. `name="entity_type_code"` `type="SafeString"`
3. `name="selected_records_count"` `type="PositiveInteger"`
4. `name="entity_records"` `type="Object"`
5. `name="last_button_clicked"` `type="SafeString"`
6. `name="owner_id"` `type="SafeString"`
7. `name="owner_type"` `type="SafeString"`
8. `name="entity_id"` `type="SafeString"`

### RecallApprovedEntriesDlg.xml

Contains 3 querystringparameter(s):

1. `name="param_primaryControl"` `type="Object"`
2. `name="param_EntityRecordIds"` `type="Object"`
3. `name="param_lastButtonClicked"` `type="SafeString"`

### RecurrenceDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_parentPage"` `type="Object"`

### RejectEmail.xml

Contains 6 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_isGrid"` `type="Boolean"`
3. `name="param_gridControl"` `type="Object"`
4. `name="param_selectedQueues"` `type="Object"`
5. `name="param_action"` `type="Object"`
6. `name="param_objectType"` `type="Object"`

### RejectKnowledgeArticle.xml

Contains 4 querystringparameter(s):

1. `name="param_knowledgeArticleId"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_primaryauthorid"` `type="SafeString"`
4. `name="param_Review"` `type="SafeString"`

### RejectionComment.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_description"` `type="SafeString"`

### RelationshipAnalyticsKpi.xml

Contains 4 querystringparameter(s):

1. `name="param_ScoreReasonjsonData"` `type="Object"`
2. `name="param_attributeName"` `type="SafeString"`
3. `name="param_regardingId"` `type="SafeString"`
4. `name="param_regardingEntityName"` `type="SafeString"`

### RelationshipSelectionWordTemplate.xml

Contains 1 querystringparameter(s):

1. `name="template_info"` `type="SafeString"`

### RemoveMembers.xml

Contains 6 querystringparameter(s):

1. `name="target_entities"` `type="SafeString"`
2. `name="entity_records"` `type="Object"`
3. `name="last_button_clicked"` `type="SafeString"`
4. `name="selected_records"` `type="Object"`
5. `name="total_records_selected"` `type="SafeString"`
6. `name="custom_label"` `type="SafeString"`

### RenewContract.xml

Contains 3 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="UniqueId"`
3. `name="param_renewedContractId"` `type="UniqueId"`

### RenewEntitlement.xml

Contains 2 querystringparameter(s):

1. `name="param_entityId"` `type="UniqueId"`
2. `name="param_lastButtonClicked"` `type="SafeString"`

### ReportViewer.xml

Contains 5 querystringparameter(s):

1. `name="param_reportname"` `type="SafeString"`
2. `name="param_reporturl"` `type="SafeString"`
3. `name="param_entitytypecode"` `type="Integer"`
4. `name="param_reportid"` `type="SafeString"`
5. `name="param_entityname"` `type="SafeString"`

### ResolveCase.xml

Contains 6 querystringparameter(s):

1. `name="param_is_time_allotment"` `type="Integer"`
2. `name="param_allotments_remaining"` `type="Integer"`
3. `name="param_time_spent"` `type="Integer"`
4. `name="param_lastButtonClicked"` `type="SafeString"`
5. `name="param_entityId"` `type="UniqueId"`
6. `name="param_proposeNewKA"` `type="Boolean"`

### ResourceResourceGroups.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="UniqueId"`

### ResourceServices.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="UniqueId"`

### RouteQueuedItem.xml

Contains 2 querystringparameter(s):

1. `name="param_records"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`

### RoutingRuleSetAcivateDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_isGrid"` `type="Boolean"`
3. `name="param_selectedItems"` `type="Object"`
4. `name="param_selectedEntity"` `type="SafeString"`
5. `name="param_gridControl"` `type="Object"`

### RoutingRuleSetDeactivateDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_isGrid"` `type="Boolean"`
3. `name="param_selectedItems"` `type="Object"`
4. `name="param_selectedEntity"` `type="SafeString"`
5. `name="param_gridControl"` `type="Object"`

### RoutingRuleSetSaveAs.xml

Contains 3 querystringparameter(s):

1. `name="param_RoutingRuleSetIdToClone"` `type="SafeString"`
2. `name="param_IsRefreshNeeded"` `type="Boolean"`
3. `name="param_RoutingRuleSetName"` `type="SafeString"`

### RunReport.xml

Contains 7 querystringparameter(s):

1. `name="param_reportid"` `type="SafeString"`
2. `name="param_reporttype"` `type="SafeString"`
3. `name="param_recordsselected"` `type="Integer"`
4. `name="param_filename"` `type="SafeString"`
5. `name="param_returnType"` `type="Boolean"`
6. `name="param_name"` `type="SafeString"`
7. `name="param_entitytypecode"` `type="SafeString"`

### SMBAddNewTeam.xml

Contains 2 querystringparameter(s):

1. `name="save_success"` `type="Boolean"`
2. `name="businessUnit_data"` `type="Object"`

### SMBAppViewCustomizationEntityListDialog.xml

Contains 3 querystringparameter(s):

1. `name="appmodule_id"` `type="SafeString"`
2. `name="parkingsolution_id"` `type="SafeString"`
3. `name="dialogselect_options"` `type="SafeString"`

### SMBBPFDialog.xml

Contains 4 querystringparameter(s):

1. `type="SafeString"` `name="appmoduleid_param"`
2. `type="SafeString"` `name="solutionid_param"`
3. `type="SafeString"` `name="entitylist_param"`
4. `type="SafeString"` `name="shouldcreatebpf_param"`

### SMBEditTeam.xml

Contains 3 querystringparameter(s):

1. `name="businessUnit_data"` `type="Object"`
2. `name="team_data"` `type="Object"`
3. `name="administrator_data"` `type="Object"`

### SMBEditUserCustomControlMDD.xml

Contains 1 querystringparameter(s):

1. `name="user_id"` `type="SafeString"`

### SMBMailboxAlertListDialog.xml

Contains 1 querystringparameter(s):

1. `name="mailbox_id"` `type="SafeString"`

### SMSTemplateDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_entityId"` `type="SafeString"`

### SaveAndReRouteDialog.xml

Contains 4 querystringparameter(s):

1. `name="last_button_clicked"` `type="SafeString"`
2. `name="entity_id"` `type="SafeString"`
3. `name="has_LOB_Changed"` `type="Boolean"`
4. `name="redetermined_LOB"` `type="SafeString"`

### SaveAndRouteForPickFailure.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="entity_records"` `type="SafeString"`

### SaveAsChart.xml

Contains 5 querystringparameter(s):

1. `name="param_presentationdescription"` `type="SafeString"`
2. `name="param_primaryentitytypecode"` `type="SafeString"`
3. `name="param_datadescription"` `type="SafeString"`
4. `name="param_entityname"` `type="SafeString"`
5. `name="param_chartid"` `type="SafeString"`

### SaveListAsStatic.xml

Contains 1 querystringparameter(s):

1. `name="entity_id"` `type="SafeString"`

### SaveNewPersonalView.xml

Contains 4 querystringparameter(s):

1. `name="param_fetchxml"` `type="SafeString"`
2. `name="param_layoutxml"` `type="SafeString"`
3. `name="param_entityname"` `type="SafeString"`
4. `name="param_viewid"` `type="SafeString"`

### SaveSelectionOfResources.xml

Contains 2 querystringparameter(s):

1. `name="last_button_clicked"` `type="SafeString"`
2. `name="selected_node"` `type="Object"`

### ScoreReasonsDialog.xml

Contains 4 querystringparameter(s):

1. `name="param_ScoreReasonjsonData"` `type="Object"`
2. `name="param_attributeName"` `type="SafeString"`
3. `name="param_regardingId"` `type="SafeString"`
4. `name="param_regardingEntityName"` `type="SafeString"`

### SegmentAddRemoveMembersDialog.xml

Contains 10 querystringparameter(s):

1. `name="query_param"` `type="SafeString"`
2. `name="operation_param"` `type="SafeString"`
3. `name="segmentid_param"` `type="SafeString"`
4. `name="segmentinternalid_param"` `type="SafeString"`
5. `name="ownerid_param"` `type="SafeString"`
6. `name="ownertype_param"` `type="SafeString"`
7. `name="scope_param"` `type="Integer"`
8. `name="selectedrecordids_param"` `type="SafeString"`
9. `name="openquerytab_param"` `type="SafeString"`
10. `name="segmenttimezone_param"` `type="Integer"`

### SegmentMembersOverrideDialog.xml

Contains 3 querystringparameter(s):

1. `name="Entity_Type"` `type="SafeString"`
2. `name="Selected_Ids"` `type="SafeString"`
3. `name="Is_Exclusion"` `type="Boolean"`

### SegmentMembersOverrideDialogRtm.xml

Contains 3 querystringparameter(s):

1. `name="Entity_Type"` `type="SafeString"`
2. `name="Selected_Ids"` `type="SafeString"`
3. `name="Is_Exclusion"` `type="Boolean"`

### SelectEmailTemplate.xml

Contains 4 querystringparameter(s):

1. `name="activity_type"` `type="SafeString"`
2. `name="selected_template_id"` `type="SafeString"`
3. `name="selected_template_title"` `type="SafeString"`
4. `name="param_lastButtonClicked"` `type="SafeString"`

### SelectEntitlementTemplate.xml

Contains 3 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="UniqueId"`
3. `name="param_entityType"` `type="Integer"`

### SelectKnowledgeArticleTemplate.xml

Contains 4 querystringparameter(s):

1. `name="param_knowledgeArticleId"` `type="SafeString"`
2. `name="param_msdyn_knowledgearticletemplateId"` `type="SafeString"`
3. `name="param_lastButtonClicked"` `type="SafeString"`
4. `name="param_articlePublicNumber"` `type="SafeString"`

### SelectTemplateRecipient.xml

Contains 4 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="SafeString"`
3. `name="param_entityType"` `type="SafeString"`
4. `name="param_emailFormData"` `type="SafeString"`

### SelectionRuleEditDialog.xml

Contains 5 querystringparameter(s):

1. `name="selected_node"` `type="Object"`
2. `name="dialog_label"` `type="SafeString"`
3. `name="show_selection_site"` `type="Boolean"`
4. `name="is_edit_operation"` `type="Boolean"`
5. `name="last_button_clicked"` `type="SafeString"`

### SendIoTCommandDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_msdyn_parentalert"` `type="SafeString"`
2. `name="param_msdyn_parentalertname"` `type="SafeString"`
3. `name="param_msdyn_deviceid"` `type="SafeString"`
4. `name="param_msdyn_device"` `type="SafeString"`
5. `name="param_msdyn_devicename"` `type="SafeString"`

### SeriesActionDialog.xml

Contains 4 querystringparameter(s):

1. `name="input_entityid"` `type="SafeString"`
2. `name="input_seriesid"` `type="SafeString"`
3. `name="input_records"` `type="Object"`
4. `name="input_lastButtonClicked"` `type="SafeString"`

### ServiceActivityScheduleDialog.xml

Contains 9 querystringparameter(s):

1. `name="param_serviceAppointmentId"` `type="SafeString"`
2. `name="param_serviceId"` `type="Object"`
3. `name="param_siteId"` `type="Object"`
4. `name="param_duration"` `type="SafeString"`
5. `name="param_targetentities"` `type="SafeString"`
6. `name="param_selectedresources"` `type="Object"`
7. `name="param_targetentitiescustomers"` `type="SafeString"`
8. `name="param_selectedcustomers"` `type="Object"`
9. `name="param_rootResourceSpecId"` `type="SafeString"`

### ServiceActivityStateChange.xml

Contains 1 querystringparameter(s):

1. `name="last_button_clicked"` `type="SafeString"`

### ServiceAppointmentConflict.xml

Contains 4 querystringparameter(s):

1. `name="param_isDraft"` `type="SafeString"`
2. `name="param_activityType"` `type="SafeString"`
3. `name="param_notificationsData"` `type="SafeString"`
4. `name="param_lastButtonClicked"` `type="SafeString"`

### ServiceConfigurationSettings.xml

Contains 2 querystringparameter(s):

1. `name="all_available_values"` `type="SafeString"`
2. `name="show_teaching_bubble_for_UR"` `type="Boolean"`

### SetAgentPresenceMDD.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_selectedValue"` `type="SafeString"`

### SetAgentsPresenceBySupervisorMDD.xml

Contains 9 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_selectedValue"` `type="SafeString"`
3. `name="param_agentName"` `type="SafeString"`
4. `name="param_agentId"` `type="SafeString"`
5. `name="param_isPresenceChangeRequested"` `type="Boolean"`
6. `name="param_presenceId"` `type="SafeString"`
7. `name="param_presenceText"` `type="SafeString"`
8. `name="param_presenceColour"` `type="SafeString"`
9. `name="param_basePresenceStatus"` `type="SafeString"`

### SetCalendar.xml

Contains 1 querystringparameter(s):

1. `name="param_bookableResourceIds"` `type="Object"`

### SetContractCalendar.xml

Contains 4 querystringparameter(s):

1. `name="entity_id"` `type="UniqueId"`
2. `name="entity_logical_name"` `type="SafeString"`
3. `name="effectivity_calendar"` `type="SafeString"`
4. `name="is_read_only"` `type="Boolean"`

### SetDefaultEntitlement.xml

Contains 4 querystringparameter(s):

1. `name="param_previousDefaultEntitlementId"` `type="UniqueId"`
2. `name="param_currentDefaultEntitlementId"` `type="UniqueId"`
3. `name="param_lastButtonClicked"` `type="SafeString"`
4. `name="param_doesDefaultEntitlementExist"` `type="Boolean"`

### SetRegarding.xml

Contains 3 querystringparameter(s):

1. `name="entity_name"` `type="SafeString"`
2. `name="last_button_clicked"` `type="SafeString"`
3. `name="entity_records"` `type="Object"`

### SetRoleDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_bookableResourceIds"` `type="Object"`

### SetStateDialog.xml

Contains 7 querystringparameter(s):

1. `name="entity_name"` `type="SafeString"`
2. `name="last_button_clicked"` `type="SafeString"`
3. `name="entity_records"` `type="Object"`
4. `name="selected_state"` `type="Integer"`
5. `name="allowed_transitions"` `type="Object"`
6. `name="action_name"` `type="SafeString"`
7. `name="default_close_state"` `type="Integer"`

### Share.xml

Contains 4 querystringparameter(s):

1. `name="entity_name"` `type="Object"`
2. `name="object_id"` `type="Object"`
3. `name="opened_from_grid"` `type="Object"`
4. `name="page_type"` `type="Object"`

### SharePointDocumentCheckIn.xml

Contains 6 querystringparameter(s):

1. `name="entity_Id"` `type="SafeString"`
2. `name="location_Id"` `type="SafeString"`
3. `name="regarding_Object_Id"` `type="SafeString"`
4. `name="regarding_Object_EntityName"` `type="SafeString"`
5. `name="document_Id"` `type="SafeString"`
6. `name="last_Button_Clicked"` `type="SafeString"`

### ShareUrlDialog.xml

Contains 7 querystringparameter(s):

1. `name="param_EntityName"` `type="Object"`
2. `name="param_primaryAttributeValue"` `type="Object"`
3. `name="param_PageType"` `type="Object"`
4. `name="param_ShareAccess"` `type="Object"`
5. `name="param_EntityId"` `type="Object"`
6. `name="param_AccessType"` `type="Object"`
7. `name="param_urltocopy"` `type="Object"`

### ShowPDFPreview.xml

Contains 5 querystringparameter(s):

1. `name="param_entityId"` `type="SafeString"`
2. `name="param_entityType"` `type="SafeString"`
3. `name="param_entityTypeCode"` `type="SafeString"`
4. `name="param_templateType"` `type="SafeString"`
5. `name="param_documentType"` `type="SafeString"`

### ShowProductInformationDialog.xml

Contains 8 querystringparameter(s):

1. `name="param_productName"` `type="SafeString"`
2. `name="param_productId"` `type="SafeString"`
3. `name="param_validFrom"` `type="SafeString"`
4. `name="param_validTo"` `type="SafeString"`
5. `name="param_description"` `type="SafeString"`
6. `name="param_unitGroup"` `type="SafeString"`
7. `name="param_defaultUnit"` `type="SafeString"`
8. `name="param_dafaultPriceList"` `type="SafeString"`

### SocialInsightsConfigurationDialog.xml

Contains 4 querystringparameter(s):

1. `name="param_baseUrl"` `type="SafeString"`
2. `name="param_topicId"` `type="SafeString"`
3. `name="param_widgetName"` `type="SafeString"`
4. `name="param_lastButtonClicked"` `type="SafeString"`

### SubjectProperties.xml

Contains 1 querystringparameter(s):

1. `name="selected_subjectId"` `type="Object"`

### SuggestedKeywordsDesc.xml

Contains 9 querystringparameter(s):

1. `name="param_Title"` `type="SafeString"`
2. `name="param_Content"` `type="SafeString"`
3. `name="param_Language"` `type="SafeString"`
4. `name="param_Keywords"` `type="SafeString"`
5. `name="param_Description"` `type="SafeString"`
6. `name="param_ArticleId"` `type="SafeString"`
7. `name="param_KeywordsCharLimit"` `type="SafeString"`
8. `name="param_DescCharLimit"` `type="SafeString"`
9. `name="param_LastBtnClicked"` `type="SafeString"`

### SuggestionFeedbackDialog.xml

Contains 5 querystringparameter(s):

1. `name="params_headertext"` `type="SafeString"`
2. `name="params_subheadertext"` `type="SafeString"`
3. `name="params_suggestionId"` `type="SafeString"`
4. `name="params_feedbackreason"` `type="SafeString"`
5. `name="params_lastbuttonclicked"` `type="SafeString"`

### SuggestionsControl.xml

Contains 7 querystringparameter(s):

1. `name="param_entityrecordid"` `type="SafeString"`
2. `name="param_entityname"` `type="SafeString"`
3. `name="param_pricelevelid"` `type="SafeString"`
4. `name="param_productid"` `type="SafeString"`
5. `name="param_productname"` `type="SafeString"`
6. `name="param_gridentityname"` `type="SafeString"`
7. `name="param_transactioncurrencyid"` `type="SafeString"`

### SupervisorTransferDialog.xml

Contains 6 querystringparameter(s):

1. `name="is_dialog"` `type="Boolean"`
2. `name="is_transfer_requested"` `type="Boolean"`
3. `name="selected_record_id"` `type="SafeString"`
4. `name="oc_endpoint_url"` `type="SafeString"`
5. `name="selected_record_agentAdId"` `type="SafeString"`
6. `name="selected_record_agentName"` `type="SafeString"`

### SwitchProcess.xml

Contains 6 querystringparameter(s):

1. `name="entity_id"` `type="SafeString"`
2. `name="entity_name"` `type="SafeString"`
3. `name="process_instance_name"` `type="SafeString"`
4. `name="process_id"` `type="SafeString"`
5. `name="process_instance_id"` `type="SafeString"`
6. `name="last_button_clicked"` `type="SafeString"`

### TemplatePreviewGalleryDialog.xml

Contains 3 querystringparameter(s):

1. `name="input_config"` `type="SafeString"`
2. `name="dialog_result"` `type="Boolean"`
3. `name="selected_item"` `type="SafeString"`

### TestTopicModel.xml

Contains 3 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="UniqueId"`
3. `name="param_configurationUsedId"` `type="UniqueId"`

### ThirdPartyChannelPrivacyTermsDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_streamSource"` `type="Integer"`

### TimeEntriesCopyDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_selectedIds"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_startDate"` `type="DateTime"`
4. `name="param_endDate"` `type="DateTime"`
5. `name="param_resourceId"` `type="SafeString"`

### TimeEntriesImportFromExchangeAppointmentsDialog.xml

Contains 3 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_startDate"` `type="DateTime"`
3. `name="param_endDate"` `type="DateTime"`

### TimeEntriesImportFromResourceAssignmentsDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_selectedIds"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_startDate"` `type="DateTime"`
4. `name="param_endDate"` `type="DateTime"`
5. `name="param_resourceId"` `type="SafeString"`

### TimeEntriesImportFromResourceBookingsDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_selectedIds"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_startDate"` `type="DateTime"`
4. `name="param_endDate"` `type="DateTime"`
5. `name="param_resourceId"` `type="SafeString"`

### TimeEntriesSelectorDialog.xml

Contains 4 querystringparameter(s):

1. `name="param_selectedIds"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_source"` `type="SafeString"`
4. `name="param_message"` `type="SafeString"`

### TranslateKnowledgeArticle.xml

Contains 3 querystringparameter(s):

1. `name="param_knowledgeArticleId"` `type="SafeString"`
2. `name="param_lastButtonClicked"` `type="SafeString"`
3. `name="param_articlePublicNumber"` `type="SafeString"`

### UCICaseSettings.xml

Contains 2 querystringparameter(s):

1. `name="values_xml"` `type="Object"`
2. `name="all_attributes"` `type="SafeString"`

### UCIRecurrenceDialog.xml

Contains 16 querystringparameter(s):

1. `name="param_repeatValue"` `type="SafeString"`
2. `name="param_everyFieldValue"` `type="Integer"`
3. `name="param_radioOptionsList"` `type="SafeString"`
4. `name="param_isVertical"` `type="SafeString"`
5. `name="param_sameselectedvalue"` `type="SafeString"`
6. `name="param_patternstartdate"` `type="DateTime"`
7. `name="param_patternenddate"` `type="DateTime"`
8. `name="param_returnValueRecurring"` `type="SafeString"`
9. `name="param_daysofweekmask"` `type="SafeString"`
10. `name="param_starttime"` `type="DateTime"`
11. `name="param_endtime"` `type="DateTime"`
12. `name="param_startTimeName"` `type="SafeString"`
13. `name="param_endTimeName"` `type="SafeString"`
14. `name="param_duration"` `type="SafeString"`
15. `name="param_lastButtonClicked"` `type="SafeString"`
16. `name="param_seriesid"` `type="SafeString"`

### UpdateBillingTypeDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_approvalsIds"` `type="Object"`

### UpdatePriceListDlg.xml

Contains 4 querystringparameter(s):

1. `name="param_primaryEntityRecordId"` `type="SafeString"`
2. `name="param_entityLogicalName"` `type="SafeString"`
3. `name="param_gridControl"` `type="Object"`
4. `name="param_lastButtonClicked"` `type="SafeString"`

### UpdateSeriesDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`

### UploadSharePointDocument.xml

Contains 9 querystringparameter(s):

1. `name="last_Button_Clicked"` `type="SafeString"`
2. `name="regarding_Object_Id"` `type="SafeString"`
3. `name="regarding_Object_EntityName"` `type="SafeString"`
4. `name="folder_Name"` `type="SafeString"`
5. `name="location_Id"` `type="SafeString"`
6. `name="entity_Name"` `type="SafeString"`
7. `name="param_AttachmentFileName"` `type="SafeString"`
8. `name="relative_Location"` `type="SafeString"`
9. `name="id_UploadedFileSize"` `type="Integer"`

### ViewAssignedSequences.xml

Contains 6 querystringparameter(s):

1. `name="param_regardingentityname"` `type="SafeString"`
2. `name="param_regardingentityid"` `type="SafeString"`
3. `name="param_selectedrecords"` `type="SafeString"`
4. `name="param_numberofsequences"` `type="SafeString"`
5. `name="param_selectedowners"` `type="SafeString"`
6. `name="param_action"` `type="SafeString"`

### ViewConnectedSequences.xml

Contains 5 querystringparameter(s):

1. `name="params_tabstate"` `type="SafeString"`
2. `name="param_entityname"` `type="SafeString"`
3. `name="param_selectedrecords"` `type="SafeString"`
4. `name="param_selectedsequences"` `type="SafeString"`
5. `name="param_action"` `type="SafeString"`

### ViewParticipatingRecords.xml

Contains 4 querystringparameter(s):

1. `name="msdyn_forecastinstanceid"` `type="SafeString"`
2. `name="msdyn_forecastconfigurationcolumnid"` `type="SafeString"`
3. `name="msdyn_rollupentityname"` `type="SafeString"`
4. `name="msdyn_recordstype"` `type="SafeString"`

### WorkHourFormDialog.xml

Contains 3 querystringparameter(s):

1. `name="workHourForm_Input"` `type="Object"`
2. `name="workHourForm_Output"` `type="Object"`
3. `name="workHourForm_ClickedButton"` `type="Object"`

### WorkHourFormDialogV2.xml

Contains 3 querystringparameter(s):

1. `name="workHourForm_Input"` `type="Object"`
2. `name="workHourForm_Output"` `type="Object"`
3. `name="workHourForm_ClickedButton"` `type="Object"`

### YammerDialog.xml

Contains 13 querystringparameter(s):

1. `name="param_feedType"` `type="SafeString"`
2. `name="param_yammerNetwork"` `type="SafeString"`
3. `name="param_yammerGroupId"` `type="SafeString"`
4. `name="param_yammerUserId"` `type="SafeString"`
5. `name="param_yammerEmailAddress"` `type="SafeString"`
6. `name="param_postFollowed"` `type="SafeString"`
7. `name="param_yammerPostState"` `type="SafeString"`
8. `name="param_domainName"` `type="SafeString"`
9. `name="param_errorCode"` `type="SafeString"`
10. `name="param_entityId"` `type="SafeString"`
11. `name="param_entityType"` `type="SafeString"`
12. `name="param_entityName"` `type="SafeString"`
13. `name="param_yammerPostMethod"` `type="SafeString"`

### addresourcedialog.xml

Contains 14 querystringparameter(s):

1. `name="param_target_entities"` `type="SafeString"`
2. `name="param_target_entitiesequipment"` `type="SafeString"`
3. `name="param_target_entitiessystemuser"` `type="SafeString"`
4. `name="param_target_entitiesteam"` `type="SafeString"`
5. `name="param_lastButtonClicked"` `type="SafeString"`
6. `name="param_constraintid"` `type="SafeString"`
7. `name="param_entityId"` `type="UniqueId"`
8. `name="param_selectedfacilities"` `type="Object"`
9. `name="param_selectedusers"` `type="Object"`
10. `name="param_selectedteams"` `type="Object"`
11. `name="param_selectedrgs"` `type="Object"`
12. `name="param_parententityname"` `type="SafeString"`
13. `name="last_button_clicked"` `type="SafeString"`
14. `name="selected_node"` `type="Object"`

### advanced_find_members.xml

Contains 8 querystringparameter(s):

1. `name="param_fetch_xml"` `type="SafeString"`
2. `name="param_query_entity_type"` `type="SafeString"`
3. `name="param_layout_xml"` `type="SafeString"`
4. `name="param_invoke_type"` `type="SafeString"`
5. `name="param_selected_records"` `type="SafeString"`
6. `name="entity_id"` `type="SafeString"`
7. `name="param_isvalid"` `type="Boolean"`
8. `name="param_validationerrormessage"` `type="SafeString"`

### adx_Change_Password_MDD.xml

Contains 1 querystringparameter(s):

1. `name="adx_contactId"` `type="SafeString"`

### contentassistdialogv2.xml

Contains 6 querystringparameter(s):

1. `name="dialog_editValue"` `type="SafeString"`
2. `name="dialog_caretPosition"` `type="Integer"`
3. `name="dialog_confirmed"` `type="Boolean"`
4. `name="dialog_entityRecordFilterView"` `type="SafeString"`
5. `name="dialog_entityTypeFilter"` `type="SafeString"`
6. `name="dialog_exclusionEntityTypeFilter"` `type="SafeString"`

### dynamiclist_queryfind.xml

Contains 8 querystringparameter(s):

1. `name="param_fetch_xml"` `type="SafeString"`
2. `name="param_query_entity_type"` `type="SafeString"`
3. `name="param_layout_xml"` `type="SafeString"`
4. `name="param_selected_records"` `type="SafeString"`
5. `name="entity_id"` `type="SafeString"`
6. `name="param_canceled"` `type="Boolean"`
7. `name="param_isvalid"` `type="Boolean"`
8. `name="param_validationerrormessage"` `type="SafeString"`

### incident_summaryControlDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_entityLogicalName"` `type="SafeString"`
2. `name="param_queryParameters"` `type="SafeString"`

### list_campaign_association.xml

Contains 6 querystringparameter(s):

1. `name="lookup_items"` `type="Object"`
2. `name="entity_type"` `type="Integer"`
3. `name="association_sub_value_type"` `type="SafeString"`
4. `name="association_name"` `type="SafeString"`
5. `name="role_ordinal"` `type="Integer"`
6. `name="parent_entity"` `type="Object"`

### migrationwizard.xml

Contains 2 querystringparameter(s):

1. `name="param_wizardtype"` `type="SafeString"`
2. `name="param_recordIds"` `type="SafeString"`

### mktrecaptchakeydialog.xml

Contains 1 querystringparameter(s):

1. `name="dlg_result"` `type="SafeString"`

### msdyn_AdvancedLookupWrapperDialog.xml

Contains 3 querystringparameter(s):

1. `name="configure_value"` `type="Object"`
2. `name="configure_initialSearchText"` `type="Object"`
3. `name="returned_value"` `type="Object"`

### msdyn_CompleteBookings.xml

Contains 3 querystringparameter(s):

1. `name="param_msdyn_workorderid"` `type="SafeString"`
2. `name="param_msdyn_incompletebooking"` `type="SafeString"`
3. `name="param_result"` `type="Boolean"`

### msdyn_ConnectDeviceDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_target_entity_id"` `type="SafeString"`
2. `name="param_target_entity_name"` `type="SafeString"`
3. `name="param_target_entity_plural_name"` `type="SafeString"`
4. `name="param_target_entity_title"` `type="SafeString"`
5. `name="param_is_connected"` `type="Integer"`

### msdyn_CopilotVerbatimFeedbackDialog.xml

Contains 2 querystringparameter(s):

1. `name="interaction_context"` `type="Object"`
2. `name="returned_value"` `type="Object"`

### msdyn_CreateIncidentType.xml

Contains 1 querystringparameter(s):

1. `name="param_msdyn_workorderid"` `type="SafeString"`

### msdyn_IncidentTypeRecommendationDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_isProvisionCompleted"` `type="Integer"`

### msdyn_IoTSuggestionsConfigurationDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_isProvisionCompleted"` `type="Integer"`

### msdyn_OrganizationSettingDialog.xml

Contains 4 querystringparameter(s):

1. `name="param_isConfirmed"` `type="Integer"`
2. `name="param_selectedValue"` `type="SafeString"`
3. `name="param_initialValue"` `type="SafeString"`
4. `name="param_settingName"` `type="SafeString"`

### msdyn_PowerBIPersonalDashboardDialog.xml

Contains 1 querystringparameter(s):

1. `name="fetch_xml_sql"` `type="Object"`

### msdyn_RuleBuilderControlDialog.xml

Contains 6 querystringparameter(s):

1. `name="param_ruleSetId"` `type="SafeString"`
2. `name="param_ruleId"` `type="SafeString"`
3. `name="param_ruleType"` `type="SafeString"`
4. `name="param_queueType"` `type="SafeString"`
5. `name="param_streamSourceType"` `type="SafeString"`
6. `name="param_calledFrom"` `type="SafeString"`

### msdyn_SendIoTCommandDialog.xml

Contains 5 querystringparameter(s):

1. `name="param_msdyn_parentalert"` `type="SafeString"`
2. `name="param_msdyn_parentalertname"` `type="SafeString"`
3. `name="param_msdyn_device"` `type="SafeString"`
4. `name="param_msdyn_devicename"` `type="SafeString"`
5. `name="param_msdyn_parententityid"` `type="SafeString"`

### msdyn_SingleResourceOptimizationDialog.xml

Contains 13 querystringparameter(s):

1. `name="param_resourceid"` `type="UniqueId"`
2. `name="param_startdate"` `type="SafeString"`
3. `name="param_enddate"` `type="SafeString"`
4. `name="param_boardtimezoneoffsetinminutes"` `type="SafeString"`
5. `name="param_bingmapskey"` `type="SafeString"`
6. `name="param_requirementviewid"` `type="SafeString"`
7. `name="param_currenttabid"` `type="SafeString"`
8. `name="param_optimizationrequestparameters"` `type="SafeString"`
9. `name="param_hasappliedsuggestedschedule"` `type="Boolean"`
10. `name="param_timezonedefinitionid"` `type="SafeString"`
11. `name="param_optimizationrequeststatus"` `type="SafeString"`
12. `name="param_applyoptimizationrequeststatus"` `type="SafeString"`
13. `name="param_iswithincopilot"` `type="Boolean"`

### msdyn_SingleResourceOptimizationSettingsDialog.xml

Contains 12 querystringparameter(s):

1. `name="param_resourceid"` `type="SafeString"`
2. `name="param_startdate"` `type="SafeString"`
3. `name="param_enddate"` `type="SafeString"`
4. `name="param_boardtimezoneoffsetinminutes"` `type="SafeString"`
5. `name="param_requirementviewid"` `type="SafeString"`
6. `name="param_currenttabid"` `type="SafeString"`
7. `name="param_shouldstartoptimization"` `type="Boolean"`
8. `name="param_optimizationrequestparameters"` `type="SafeString"`
9. `name="param_timezonedefinitionid"` `type="SafeString"`
10. `name="param_shouldlaunchsro"` `type="Boolean"`
11. `name="param_wasentityselected"` `type="Boolean"`
12. `name="param_iswithincopilot"` `type="Boolean"`

### msdyn_SubjectManagementControlDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_subjectId"` `type="SafeString"`
2. `name="param_parentSubjectId"` `type="SafeString"`

### msdyn_TablePickerDialog.xml

Contains 1 querystringparameter(s):

1. `name="param_selected_entity_type_name"` `type="SafeString"`

### msdyn_ViewManagementDialog.xml

Contains 3 querystringparameter(s):

1. `name="param_entity_name"` `type="SafeString"`
2. `name="param_org_default_view_id"` `type="SafeString"`
3. `name="param_user_default_view_id"` `type="SafeString"`

### msdyn_ViewUser.xml

Contains 2 querystringparameter(s):

1. `name="param_msdyn_resource_id"` `type="SafeString"`
2. `name="param_msdyn_user_id"` `type="SafeString"`

### msdyn_dialerdialog.xml

Contains 3 querystringparameter(s):

1. `name="phone_number"` `type="SafeString"`
2. `name="entity_name"` `type="SafeString"`
3. `name="entity_id"` `type="SafeString"`

### msdyn_iotalert_summaryControlDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_entityLogicalName"` `type="SafeString"`
2. `name="param_queryParameters"` `type="SafeString"`

### msdyn_workorder_summaryControlDialog.xml

Contains 2 querystringparameter(s):

1. `name="param_entityLogicalName"` `type="SafeString"`
2. `name="param_queryParameters"` `type="SafeString"`

### msdyncrm_marketingemail_testsenddialog.xml

Contains 11 querystringparameter(s):

1. `name="testsend_emailid"` `type="SafeString"`
2. `name="testsend_entityname"` `type="SafeString"`
3. `name="testsend_abtestid"` `type="SafeString"`
4. `name="testsend_abtestvariantid"` `type="SafeString"`
5. `name="testsend_contactid"` `type="SafeString"`
6. `name="testsend_contactname"` `type="SafeString"`
7. `name="testsend_contentsettingsid"` `type="SafeString"`
8. `name="testsend_contentsettingsname"` `type="SafeString"`
9. `name="testsend_emailaddress"` `type="SafeString"`
10. `name="testsend_flagshowformsprowarning"` `type="Boolean"`
11. `name="testsend_isemailvalid"` `type="Boolean"`

### msdyncrm_messagewithhelp.xml

Contains 3 querystringparameter(s):

1. `name="dlg_value"` `type="SafeString"`
2. `name="dlg_donotask_enabled"` `type="Boolean"`
3. `name="dlg_donotask_selection"` `type="Boolean"`

### msdyncrm_portalsetuphelp.xml

Contains 2 querystringparameter(s):

1. `name="dlg_admin_mode"` `type="Boolean"`
2. `name="dlg_result"` `type="Boolean"`

### msdyncrm_pushtestsend.xml

Contains 12 querystringparameter(s):

1. `name="msdynmkt_link_dialog"` `type="SafeString"`
2. `name="msdynmkt_body_dialog"` `type="SafeString"`
3. `name="msdynmkt_app_device_registration_dialog"` `type="SafeString"`
4. `name="testsend_placeholderpreviews_dialog"` `type="SafeString"`
5. `name="testsend_audiencerecord_dialog"` `type="SafeString"`
6. `name="testsend_triggerdata_dialog"` `type="SafeString"`
7. `name="msdynmkt_placeholders_dialog"` `type="SafeString"`
8. `name="msdynmkt_title_dialog"` `type="SafeString"`
9. `name="msdynmkt_subtitle_dialog"` `type="SafeString"`
10. `name="msdynmkt_imageid_dialog"` `type="SafeString"`
11. `name="msdynmkt_entityid_dialog"` `type="SafeString"`
12. `name="msdynmkt_owningbusinessunit_dialog"` `type="SafeString"`

### msdyncrm_setupformcapturing.xml

Contains 1 querystringparameter(s):

1. `name="dlg_value"` `type="SafeString"`

### msdyncrm_setupparentfield.xml

Contains 3 querystringparameter(s):

1. `name="dlg_parent"` `type="SafeString"`
2. `name="dlg_child"` `type="SafeString"`
3. `name="dlg_hierarchy"` `type="SafeString"`

### msdynmkt_DetailedAnalyticsDialog.xml

Contains 6 querystringparameter(s):

1. `name="message_template_id_dialog"` `type="SafeString"`
2. `name="message_title_dialog"` `type="SafeString"`
3. `name="layout_id_dialog"` `type="SafeString"`
4. `name="created_on_dialog"` `type="DateTime"`
5. `name="journey_id_dialog"` `type="SafeString"`
6. `name="action_id_dialog"` `type="SafeString"`

### msdynmkt_QuietTimesApplyToAll.xml

Contains 1 querystringparameter(s):

1. `name="quiettimes_id"` `type="SafeString"`

### msdynmkt_acquirephonenumber.xml

Contains 4 querystringparameter(s):

1. `name="dlg_result"` `type="SafeString"`
2. `name="msdynmkt_region_dialog"` `type="SafeString"`
3. `name="msdynmkt_terms_required_dialog"` `type="Boolean"`
4. `name="msdynmkt_terms_accepted_dialog"` `type="Boolean"`

### msdynmkt_contactpoint_custom.xml

Contains 1 querystringparameter(s):

1. `name="dlg_value"` `type="SafeString"`

### msdynmkt_contactpoint_email.xml

Contains 1 querystringparameter(s):

1. `name="dlg_value"` `type="SafeString"`

### msdynmkt_contactpoint_textmessage.xml

Contains 1 querystringparameter(s):

1. `name="dlg_value"` `type="SafeString"`

### msdynmkt_contactpointconsent_newcustom.xml

Contains 1 querystringparameter(s):

1. `name="dlg_value"` `type="SafeString"`

### msdynmkt_contactpointconsent_newemail.xml

Contains 1 querystringparameter(s):

1. `name="dlg_value"` `type="SafeString"`

### msdynmkt_contactpointconsent_newtextmessage.xml

Contains 1 querystringparameter(s):

1. `name="dlg_value"` `type="SafeString"`

### msdynmkt_contactpointconsent_voice.xml

Contains 1 querystringparameter(s):

1. `name="dlg_value"` `type="SafeString"`

### msdynmkt_createkeyword.xml

Contains 3 querystringparameter(s):

1. `name="dlg_result"` `type="SafeString"`
2. `name="msdynmkt_keyword_dialog"` `type="SafeString"`
3. `name="msdynmkt_keywordid_dialog"` `type="SafeString"`

### msdynmkt_customchannelmessagetestsend.xml

Contains 10 querystringparameter(s):

1. `name="dlg_result"` `type="SafeString"`
2. `name="msdynmkt_customchannelmessageid_dialog"` `type="SafeString"`
3. `name="msdynmkt_channelinstanceid_dialog"` `type="SafeString"`
4. `name="msdynmkt_to_dialog"` `type="SafeString"`
5. `name="msdynmkt_messageparts_dialog"` `type="SafeString"`
6. `name="msdynmkt_placeholderpreviews_dialog"` `type="SafeString"`
7. `name="msdynmkt_placeholders_dialog"` `type="SafeString"`
8. `name="msdynmkt_audiencerecord_dialog"` `type="SafeString"`
9. `name="msdynmkt_triggerdata_dialog"` `type="SafeString"`
10. `name="msdynmkt_owningbusinessunit_dialog"` `type="SafeString"`

### msdynmkt_depedententitydialog.xml

Contains 7 querystringparameter(s):

1. `name="dependent_entitylist"` `type="SafeString"`
2. `name="dialog_result"` `type="SafeString"`
3. `name="dialog_mode"` `type="SafeString"`
4. `name="entity_count"` `type="SafeString"`
5. `name="entity_fetchxml"` `type="SafeString"`
6. `name="custom_labels"` `type="SafeString"`
7. `name="prevent_actions"` `type="Boolean"`

### msdynmkt_easymodedialogue.xml

Contains 5 querystringparameter(s):

1. `name="msdynmkt_emailid"` `type="SafeString"`
2. `name="msdynmkt_schedulelater"` `type="Boolean"`
3. `name="msdynmkt_scheduledtime"` `type="SafeString"`
4. `name="msdynmkt_timezoneid"` `type="Integer"`
5. `name="msdynmkt_timezonename"` `type="SafeString"`

### msdynmkt_msgdpr_gdprconfiguration_dialog.xml

Contains 2 querystringparameter(s):

1. `name="msdynmkt_marketingrespectconsentswitch"` `type="Boolean"`
2. `name="msdynmkt_marketinglogconsentchangesswitch"` `type="Boolean"`

### msdynmkt_newchannelmessage.xml

Contains 3 querystringparameter(s):

1. `name="dlg_result"` `type="SafeString"`
2. `name="dlg_channelinstanceid"` `type="SafeString"`
3. `name="dlg_channelinstancejson"` `type="SafeString"`

### msdynmkt_newjourneytemplate.xml

Contains 5 querystringparameter(s):

1. `name="msdynmkt_name"` `type="SafeString"`
2. `name="msdynmkt_description"` `type="SafeString"`
3. `name="dlg_owningBusinessUnitid"` `type="SafeString"`
4. `name="dlg_journeyid"` `type="SafeString"`
5. `name="dlg_createmode"` `type="Boolean"`

### msdynmkt_smstestsend.xml

Contains 11 querystringparameter(s):

1. `name="dlg_result"` `type="SafeString"`
2. `name="msdynmkt_sms_id_dialog"` `type="SafeString"`
3. `name="msdynmkt_recipient_dialog"` `type="SafeString"`
4. `name="testsend_placeholderpreviews_dialog"` `type="SafeString"`
5. `name="testsend_audiencerecord_dialog"` `type="SafeString"`
6. `name="testsend_triggerdata_dialog"` `type="SafeString"`
7. `name="msdynmkt_placeholders_dialog"` `type="SafeString"`
8. `name="msdynmkt_text_dialog"` `type="SafeString"`
9. `name="msdynmkt_senderphonenumber_dialog"` `type="SafeString"`
10. `name="msdynmkt_channeldefinition_id_dialog"` `type="SafeString"`
11. `name="msdynmkt_owningbusinessunit_dialog"` `type="SafeString"`

### new_FollowEmail.xml

Contains 6 querystringparameter(s):

1. `name="is_email_tracked"` `type="Boolean"`
2. `name="help_link_url"` `type="SafeString"`
3. `name="retrieving_crm_data_status_icon"` `type="SafeString"`
4. `name="adding_follow_info_status_icon"` `type="SafeString"`
5. `name="finishing_up_status_icon"` `type="SafeString"`
6. `name="recipients_records"` `type="Object"`

### new_UnfollowEmail.xml

Contains 3 querystringparameter(s):

1. `name="analyzing_email_body_status_icon"` `type="SafeString"`
2. `name="removing_follow_info_status_icon"` `type="SafeString"`
3. `name="finishing_up_status_icon"` `type="SafeString"`

### personalizationdialog.xml

Contains 7 querystringparameter(s):

1. `name="dialog_definedPlaceholders"` `type="SafeString"`
2. `name="dialog_placeHolderName"` `type="SafeString"`
3. `name="dialog_placeHolderData"` `type="SafeString"`
4. `name="dialog_validationErrors"` `type="SafeString"`
5. `name="dialog_confirmed"` `type="Boolean"`
6. `name="dialog_disableName"` `type="SafeString"`
7. `name="dialog_readOnly"` `type="SafeString"`

### promoofferjourneyselectiondialog.xml

Contains 5 querystringparameter(s):

1. `name="msevtmgt_webinarName"` `type="SafeString"`
2. `name="msevtmgt_registeredOnlyJourneyId"` `type="SafeString"`
3. `name="msevtmgt_registeredAndAttendedJourneyId"` `type="SafeString"`
4. `name="msevtmgt_cancelledJourneyId"` `type="SafeString"`
5. `name="msevtmgt_shouldSyncToCjo"` `type="SafeString"`

### quicksendFinalPopup.xml

Contains 2 querystringparameter(s):

1. `name="msdyncrm_customerjourneyId"` `type="SafeString"`
2. `name="msdyncrm_customerjourneyName"` `type="SafeString"`

### quicksenddialog.xml

Contains 11 querystringparameter(s):

1. `name="msdyncrm_subject"` `type="SafeString"`
2. `name="msdyncrm_fromuser"` `type="SafeString"`
3. `name="msdyncrm_quicksendid"` `type="SafeString"`
4. `name="msdyncrm_emailid"` `type="SafeString"`
5. `name="msdyncrm_emailname"` `type="SafeString"`
6. `name="msdyncrm_fromemail"` `type="SafeString"`
7. `name="msdyncrm_receipients_output"` `type="SafeString"`
8. `name="msdyncrm_statuscode"` `type="Integer"`
9. `name="msdyncrm_emailabtestenabled"` `type="Boolean"`
10. `name="dialog_msdyncrm_subject"` `type="SafeString"`
11. `name="dialog_msdyncrm_fromuser"` `type="SafeString"`

### socialconfigurationcreatedialog.xml

Contains 2 querystringparameter(s):

1. `name="msdyncrm_social"` `type="SafeString"`
2. `name="msdyncrm_createdFromPostForm"` `type="Boolean"`

### socialpostingschedulingdialog.xml

Contains 3 querystringparameter(s):

1. `name="msdyncrm_startdate"` `type="DateTime"`
2. `name="msdyncrm_socialchannel"` `type="Integer"`
3. `name="msdyncrm_postinguserid"` `type="SafeString"`

### statetransition.xml

Contains 4 querystringparameter(s):

1. `name="param_lastButtonClicked"` `type="SafeString"`
2. `name="param_entityId"` `type="SafeString"`
3. `name="param_stateTransitionType"` `type="SafeString"`
4. `name="param_fromGrid"` `type="SafeString"`

### stoppingsegmentdialog.xml

Contains 4 querystringparameter(s):

1. `name="entity_id"` `type="SafeString"`
2. `name="entity_type"` `type="SafeString"`
3. `name="dependency_type"` `type="SafeString"`
4. `name="stop_confirmed"` `type="Boolean"`

### testsenddialog.xml

Contains 22 querystringparameter(s):

1. `name="testsend_html"` `type="SafeString"`
2. `name="testsend_email"` `type="SafeString"`
3. `name="testsend_fromemail"` `type="SafeString"`
4. `name="testsend_fromname"` `type="SafeString"`
5. `name="testsend_subject"` `type="SafeString"`
6. `name="testsend_replytoemail"` `type="SafeString"`
7. `name="testsend_textcontent"` `type="SafeString"`
8. `name="testsend_placeholders"` `type="SafeString"`
9. `name="testsend_isemailvalid"` `type="Boolean"`
10. `name="testsend_placeholderpreviews"` `type="SafeString"`
11. `name="testsend_entityid"` `type="SafeString"`
12. `name="testsend_messagedesignation"` `type="Integer"`
13. `name="testsend_messageid"` `type="SafeString"`
14. `name="testsend_messageentityname"` `type="SafeString"`
15. `name="testsend_fieldnames"` `type="SafeString"`
16. `name="testsend_conditionalcontent"` `type="SafeString"`
17. `name="testsend_branddata"` `type="SafeString"`
18. `name="testsend_complianceSettingsId"` `type="SafeString"`
19. `name="testsend_purposeId"` `type="SafeString"`
20. `name="testsend_topicId"` `type="SafeString"`
21. `name="testsend_audiencerecord"` `type="SafeString"`
22. `name="testsend_triggerdata"` `type="SafeString"`

## Parameter Type Usage Examples

### Boolean

True/false value

Examples:
- `dlg_createmode`
- `param_isGrid`
- `param_parental_check`
- `param_isGrid`
- `param_shouldstartoptimization`

### DateTime

Date and time value

Examples:
- `param_startDate`
- `param_endDate`
- `param_startDate`
- `param_endDate`
- `param_patternstartdate`

### EntityType

Entity type identifier in Dataverse

Examples:
- `entity_Type_Code`
- `entity_Type_Code`
- `entity_Type_Code`

### Integer

Whole number value

Examples:
- `DocTemplateFile_Type`
- `entity_typeCode`
- `entity_exportType`
- `activity_id`
- `is_email_activity`

### Long

Examples:
- `stream_source`

### Object

Complex object or reference

Examples:
- `param_callbackSuccess`
- `param_callbackFailure`
- `param_gridControl`
- `param_selectedQueues`
- `param_action`

### PositiveInteger

Positive whole number (greater than 0)

Examples:
- `selected_records_count`
- `selected_records_count`
- `param_modeForTeam`
- `param_modeForChannel`
- `param_objecttypecode`

### SafeString

Safe string value that has been sanitized for security

Examples:
- `param_entityId`
- `param_entityTypeName`
- `param_actionList`
- `param_entityDisplayName`
- `param_relationshipName`

### UniqueId

GUID or unique identifier

Examples:
- `param_transactioncurrencyid`
- `param_iId`
- `param_parentId`
- `param_addressId`
- `param_transactioncurrencyid`

## Implementation Notes


### Understanding QueryString Parameters in Dataverse Dialogs

QueryString parameters in Dataverse dialogs serve as the interface between the calling context and the dialog form. They allow data to be passed into the dialog when it's opened and can be accessed within the dialog's JavaScript code.

#### Key Concepts:

1. **Parameter Passing**: These parameters are typically passed when opening the dialog from ribbon buttons, form scripts, or other contexts.

2. **Type Safety**: Each parameter has a specific type that ensures data integrity and proper handling within the dialog.

3. **Accessibility**: Parameters can be accessed in the dialog's web resources using `Xrm.Page.data.attributes` or through URL parsing.

#### Common Usage Patterns:

- **Entity Context**: Parameters like `param_objectid` and `param_entityname` provide context about the record being operated on
- **Configuration**: Parameters control dialog behavior (e.g., `param_mode`, `param_action`)
- **Data Transfer**: Complex objects and lists can be passed as serialized data
- **UI State**: Parameters can control which tabs or sections are initially visible

#### Best Practices:

- Use descriptive parameter names with consistent prefixes (e.g., `param_`)
- Choose appropriate types for data validation
- Document parameter purpose and expected values
- Validate parameter values in dialog JavaScript code
