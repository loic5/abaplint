import {statementType} from "../utils";
import * as Statements from "../../src/statements/";

let tests = [
  "CALL FUNCTION 'DDIF_TTYP_GET'.",

  "CALL FUNCTION 'DDIF_TTYP_GET' EXPORTING name = lv_name.",

  "CALL FUNCTION 'TYPD_GET_OBJECT'\n" +
  "  EXPORTING\n" +
  "    typdname          = lv_typdname\n" +
  "  TABLES\n" +
  "    psmodisrc         = lt_psmodisrc\n" +
  "    psmodilog         = lt_psmodilog\n" +
  "    psource           = et_source\n" +
  "    ptrdir            = lt_ptrdir\n" +
  "  EXCEPTIONS\n" +
  "    version_not_found = 1\n" +
  "    reps_not_exist    = 2\n" +
  "    OTHERS            = 3.",

  "CALL FUNCTION 'ABAP4_CALL_TRANSACTION'\n" +
  "  STARTING NEW TASK 'GIT'\n" +
  "  EXPORTING\n" +
  "    tcode = 'SE93'.",

  "CALL FUNCTION 'RPY_TRANSACTION_INSERT'\n" +
  "  EXPORTING\n" +
  "    transaction             = ls_tstc-tcode\n" +
  "    program                 = ls_tstc-pgmna\n" +
  "    dynpro                  = lv_dynpro\n" +
  "    language                = mv_language\n" +
  "    development_class       = iv_package\n" +
  "    transaction_type        = lv_type\n" +
  "    shorttext               = ls_tstct-ttext\n" +
  "    foobar                  = sdf-asdf\n" +
  "  TABLES\n" +
  "    param_values            = lt_param_values\n" +
  "  EXCEPTIONS\n" +
  "    cancelled               = 1\n" +
  "    already_exist           = 2\n" +
  "    permission_error        = 3\n" +
  "    name_not_allowed        = 4\n" +
  "    name_conflict           = 5\n" +
  "    illegal_type            = 6\n" +
  "    object_inconsistent     = 7\n" +
  "    db_access_error         = 8\n" +
  "    OTHERS                  = 9.",

  "CALL FUNCTION 'PB_POPUP_PACKAGE_CREATE'\n" +
  "  CHANGING\n" +
  "    p_object_data    = ls_package_data\n" +
  "  EXCEPTIONS\n" +
  "    action_cancelled = 1.",

  "CALL FUNCTION 'BANK_OBJ_WORKL_RELEASE_LOCKS' IN UPDATE TASK.",

  "CALL FUNCTION l_function\n" +
  " EXPORTING\n" +
  "   input  = ip_value\n" +
  " IMPORTING\n" +
  "   output = l_value\n" +
  " EXCEPTIONS\n" +
  "   OTHERS = 1.",

  "CALL FUNCTION 'BAPI_TRANSACTION_COMMIT'\n" +
  " IN BACKGROUND TASK\n" +
  " DESTINATION iv_rfc_dest\n" +
  " EXPORTING\n" +
  "   wait = abap_true.",

  "CALL FUNCTION 'BAPI_TRANSACTION_COMMIT'\n" +
  " DESTINATION iv_rfc_dest\n" +
  " EXPORTING\n" +
  "   wait = abap_true.",

  "CALL FUNCTION 'FM_NAME'\n" +
  " EXPORTING\n" +
  "   input = value\n" +
  " EXCEPTIONS\n" +
  "   OTHERS.",

  "CALL FUNCTION 'ZFOOBAR'\n" +
  " IN BACKGROUND TASK\n" +
  " EXPORTING\n" +
  "   field = lv_value.",

  "CALL FUNCTION 'RSSM_EVENT_RAISE'\n" +
  "  DESTINATION p_rfcdes\n" +
  "   EXPORTING\n" +
  "    i_eventid              = p_evid\n" +
  "    i_eventparm            = space\n" +
  "  EXCEPTIONS\n" +
  "    bad_eventid            = 1\n" +
  "    eventid_does_not_exist = 2\n" +
  "    eventid_missing        = 3\n" +
  "    raise_failed           = 4\n" +
  "    system_failure         = 5  MESSAGE lv_message\n" +
  "    communication_failure  = 6  MESSAGE lv_message\n" +
  "    resource_failure       = 7\n" +
  "    OTHERS                 = 8.",

  "CALL FUNCTION <ls_object_method>-methodname\n" +
  "  EXPORTING\n" +
  "    iv_client = lv_client\n" +
  "  TABLES\n" +
  "    tt_e071   = lt_cts_object_entry\n" +
  "    tt_e071k  = lt_cts_key.",

  "CALL FUNCTION 'WDYC_GET_OBJECT'\n" +
  "  PARAMETER-TABLE\n" +
  "  lt_fm_param\n" +
  "  EXCEPTION-TABLE\n" +
  "  lt_fm_exception.\n",
];

statementType(tests, "CALL FUNCTION", Statements.CallFunction);