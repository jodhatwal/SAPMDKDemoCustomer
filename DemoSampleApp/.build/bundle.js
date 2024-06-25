(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/DemoSampleApp/i18n/i18n.properties":
/*!**************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/i18n/i18n.properties ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/AppUpdateFailure.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/AppUpdateFailure.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/DemoSampleApp/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/AppUpdateSuccess.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/AppUpdateSuccess.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/ClientIsMultiUserMode.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/ClientIsMultiUserMode.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/GetClientSupportVersions.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/GetClientSupportVersions.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/GetClientVersion.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/GetClientVersion.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/OnWillUpdate.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/OnWillUpdate.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/DemoSampleApp/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/ResetAppSettingsAndLogout.js":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/DemoSampleApp/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Customers_DeleteConfirmation.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Customers_DeleteConfirmation.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Customers_DeleteConfirmation)
/* harmony export */ });
/**
* Describe this function...
* @param {IClientAPI} context
*/
function Customers_DeleteConfirmation(context) {
    return context.executeAction('/DemoSampleApp/Actions/Customers_DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return context.executeAction('/DemoSampleApp/Actions/Customers_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}



/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Customers_OrderCount.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Customers_OrderCount.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomerOrderCount)
/* harmony export */ });
/**
* Describe this function...
* @param {IClientAPI} context
*/
function CustomerOrderCount(context) {
    // Retrieves the current customer's information from the context
    const currentCustomer = context.getPageProxy().binding['@odata.readLink'];
    // Counts the number of sales orders associated with the current customer.
    return context.count('/DemoSampleApp/Services/SampleServiceV4.service', currentCustomer + '/SalesOrders', '').then((count) => {
        return count;
    });
}



/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/EmailValidation.js":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/EmailValidation.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EmailValidation)
/* harmony export */ });
/**
* Describe this function...
* @param {IClientAPI} context
*/
function EmailValidation(context) {
    //The following evaluateTargetPath will retrieve the current value of the email control
    if ((context.evaluateTargetPath('#Control:FCEmail/#Value').indexOf('@')) === -1) {
        //If email value does not contain @ display a validation failure message to the end-user
        context.executeAction('/DemoSampleApp/Actions/ValidationFailure.action');
    } else {
        //If @ is present in the email value, return true to indicate validation is successful
        return true;
    }
}



/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
    context.count('/DemoSampleApp/Services/SampleServiceV4.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function() {
                return Promise.reject(false);
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/LogLevels.js":
/*!********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/LogLevels.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/SetTraceCategories.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/SetTraceCategories.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/SetUserLogLevel.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/SetUserLogLevel.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/ToggleLogging.js":
/*!************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/ToggleLogging.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/TraceCategories.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/TraceCategories.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/UserLogSetting.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/UserLogSetting.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Service/Initialize.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Service/Initialize.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _SampleServiceV4 = context.executeAction('/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOffline.action');

    //You can add more service initialize actions here

    return Promise.all([_SampleServiceV4]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/DemoSampleApp/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let demosampleapp_actions_application_appupdate_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/AppUpdate.action */ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdate.action")
let demosampleapp_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateFailureMessage.action")
let demosampleapp_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateProgressBanner.action")
let demosampleapp_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action")
let demosampleapp_actions_application_logout_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/Logout.action */ "./build.definitions/DemoSampleApp/Actions/Application/Logout.action")
let demosampleapp_actions_application_navtoabout_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/NavToAbout.action */ "./build.definitions/DemoSampleApp/Actions/Application/NavToAbout.action")
let demosampleapp_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/NavToActivityLog.action */ "./build.definitions/DemoSampleApp/Actions/Application/NavToActivityLog.action")
let demosampleapp_actions_application_navtosupport_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/NavToSupport.action */ "./build.definitions/DemoSampleApp/Actions/Application/NavToSupport.action")
let demosampleapp_actions_application_onwillupdate_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/OnWillUpdate.action */ "./build.definitions/DemoSampleApp/Actions/Application/OnWillUpdate.action")
let demosampleapp_actions_application_reset_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/Reset.action */ "./build.definitions/DemoSampleApp/Actions/Application/Reset.action")
let demosampleapp_actions_application_resetmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/ResetMessage.action */ "./build.definitions/DemoSampleApp/Actions/Application/ResetMessage.action")
let demosampleapp_actions_application_usermenupopover_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/UserMenuPopover.action */ "./build.definitions/DemoSampleApp/Actions/Application/UserMenuPopover.action")
let demosampleapp_actions_closemodalpage_cancel2_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CloseModalPage_Cancel2.action */ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel2.action")
let demosampleapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel.action")
let demosampleapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Complete.action")
let demosampleapp_actions_closepage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ClosePage.action */ "./build.definitions/DemoSampleApp/Actions/ClosePage.action")
let demosampleapp_actions_createcustomerentityfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action")
let demosampleapp_actions_customers_createentity_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers_CreateEntity.action */ "./build.definitions/DemoSampleApp/Actions/Customers_CreateEntity.action")
let demosampleapp_actions_customers_deleteconfirmation_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers_DeleteConfirmation.action */ "./build.definitions/DemoSampleApp/Actions/Customers_DeleteConfirmation.action")
let demosampleapp_actions_customers_deleteentity_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers_DeleteEntity.action */ "./build.definitions/DemoSampleApp/Actions/Customers_DeleteEntity.action")
let demosampleapp_actions_customers_updateentiry_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers_UpdateEntiry.action */ "./build.definitions/DemoSampleApp/Actions/Customers_UpdateEntiry.action")
let demosampleapp_actions_deletecustomerentityfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/DeleteCustomerEntityFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/DeleteCustomerEntityFailureMessage.action")
let demosampleapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let demosampleapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action")
let demosampleapp_actions_genericbannermessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/GenericBannerMessage.action */ "./build.definitions/DemoSampleApp/Actions/GenericBannerMessage.action")
let demosampleapp_actions_genericmessagebox_action = __webpack_require__(/*! ./DemoSampleApp/Actions/GenericMessageBox.action */ "./build.definitions/DemoSampleApp/Actions/GenericMessageBox.action")
let demosampleapp_actions_genericnavigation_action = __webpack_require__(/*! ./DemoSampleApp/Actions/GenericNavigation.action */ "./build.definitions/DemoSampleApp/Actions/GenericNavigation.action")
let demosampleapp_actions_generictoastmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/GenericToastMessage.action */ "./build.definitions/DemoSampleApp/Actions/GenericToastMessage.action")
let demosampleapp_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Logging/LogUploadFailure.action */ "./build.definitions/DemoSampleApp/Actions/Logging/LogUploadFailure.action")
let demosampleapp_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/DemoSampleApp/Actions/Logging/LogUploadSuccessful.action")
let demosampleapp_actions_logging_uploadlog_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Logging/UploadLog.action */ "./build.definitions/DemoSampleApp/Actions/Logging/UploadLog.action")
let demosampleapp_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Logging/UploadLogProgress.action */ "./build.definitions/DemoSampleApp/Actions/Logging/UploadLogProgress.action")
let demosampleapp_actions_navtocustomers_create_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_Create.action */ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Create.action")
let demosampleapp_actions_navtocustomers_detail_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_Detail.action */ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Detail.action")
let demosampleapp_actions_navtocustomers_edit_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_Edit.action */ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Edit.action")
let demosampleapp_actions_navtocustomers_list_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_List.action */ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_List.action")
let demosampleapp_actions_salesorderheaders_createentity_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SalesOrderHeaders_CreateEntity.action */ "./build.definitions/DemoSampleApp/Actions/SalesOrderHeaders_CreateEntity.action")
let demosampleapp_actions_sampleservicev4_service_closeoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/CloseOffline.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOffline.action")
let demosampleapp_actions_sampleservicev4_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineFailureMessage.action")
let demosampleapp_actions_sampleservicev4_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineSuccessMessage.action")
let demosampleapp_actions_sampleservicev4_service_downloadoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/DownloadOffline.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadOffline.action")
let demosampleapp_actions_sampleservicev4_service_downloadstartedmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/DownloadStartedMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadStartedMessage.action")
let demosampleapp_actions_sampleservicev4_service_initializeoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOffline.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOffline.action")
let demosampleapp_actions_sampleservicev4_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOfflineFailureMessage.action")
let demosampleapp_actions_sampleservicev4_service_syncfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action")
let demosampleapp_actions_sampleservicev4_service_syncstartedmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/SyncStartedMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncStartedMessage.action")
let demosampleapp_actions_sampleservicev4_service_uploadoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/UploadOffline.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/UploadOffline.action")
let demosampleapp_actions_updatecustomerentityfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action")
let demosampleapp_actions_validationfailure_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ValidationFailure.action */ "./build.definitions/DemoSampleApp/Actions/ValidationFailure.action")
let demosampleapp_globals_application_appdefinition_version_global = __webpack_require__(/*! ./DemoSampleApp/Globals/Application/AppDefinition_Version.global */ "./build.definitions/DemoSampleApp/Globals/Application/AppDefinition_Version.global")
let demosampleapp_globals_application_applicationname_global = __webpack_require__(/*! ./DemoSampleApp/Globals/Application/ApplicationName.global */ "./build.definitions/DemoSampleApp/Globals/Application/ApplicationName.global")
let demosampleapp_globals_application_supportemail_global = __webpack_require__(/*! ./DemoSampleApp/Globals/Application/SupportEmail.global */ "./build.definitions/DemoSampleApp/Globals/Application/SupportEmail.global")
let demosampleapp_globals_application_supportphone_global = __webpack_require__(/*! ./DemoSampleApp/Globals/Application/SupportPhone.global */ "./build.definitions/DemoSampleApp/Globals/Application/SupportPhone.global")
let demosampleapp_i18n_i18n_properties = __webpack_require__(/*! ./DemoSampleApp/i18n/i18n.properties */ "./build.definitions/DemoSampleApp/i18n/i18n.properties")
let demosampleapp_jsconfig_json = __webpack_require__(/*! ./DemoSampleApp/jsconfig.json */ "./build.definitions/DemoSampleApp/jsconfig.json")
let demosampleapp_pages_application_about_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Application/About.page */ "./build.definitions/DemoSampleApp/Pages/Application/About.page")
let demosampleapp_pages_application_support_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Application/Support.page */ "./build.definitions/DemoSampleApp/Pages/Application/Support.page")
let demosampleapp_pages_application_useractivitylog_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Application/UserActivityLog.page */ "./build.definitions/DemoSampleApp/Pages/Application/UserActivityLog.page")
let demosampleapp_pages_customer_edit_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customer_Edit.page */ "./build.definitions/DemoSampleApp/Pages/Customer_Edit.page")
let demosampleapp_pages_customers_create_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_Create.page */ "./build.definitions/DemoSampleApp/Pages/Customers_Create.page")
let demosampleapp_pages_customers_detail_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_Detail.page */ "./build.definitions/DemoSampleApp/Pages/Customers_Detail.page")
let demosampleapp_pages_customers_list_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_List.page */ "./build.definitions/DemoSampleApp/Pages/Customers_List.page")
let demosampleapp_pages_customers_orders_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_Orders.page */ "./build.definitions/DemoSampleApp/Pages/Customers_Orders.page")
let demosampleapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page")
let demosampleapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page")
let demosampleapp_pages_main_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Main.page */ "./build.definitions/DemoSampleApp/Pages/Main.page")
let demosampleapp_pages_salesorderheaders_create_page = __webpack_require__(/*! ./DemoSampleApp/Pages/SalesOrderHeaders_Create.page */ "./build.definitions/DemoSampleApp/Pages/SalesOrderHeaders_Create.page")
let demosampleapp_pages_salesorders_details_page = __webpack_require__(/*! ./DemoSampleApp/Pages/SalesOrders_Details.page */ "./build.definitions/DemoSampleApp/Pages/SalesOrders_Details.page")
let demosampleapp_rules_application_appupdatefailure_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/AppUpdateFailure.js */ "./build.definitions/DemoSampleApp/Rules/Application/AppUpdateFailure.js")
let demosampleapp_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/DemoSampleApp/Rules/Application/AppUpdateSuccess.js")
let demosampleapp_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/DemoSampleApp/Rules/Application/ClientIsMultiUserMode.js")
let demosampleapp_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/DemoSampleApp/Rules/Application/GetClientSupportVersions.js")
let demosampleapp_rules_application_getclientversion_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/GetClientVersion.js */ "./build.definitions/DemoSampleApp/Rules/Application/GetClientVersion.js")
let demosampleapp_rules_application_onwillupdate_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/OnWillUpdate.js */ "./build.definitions/DemoSampleApp/Rules/Application/OnWillUpdate.js")
let demosampleapp_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/DemoSampleApp/Rules/Application/ResetAppSettingsAndLogout.js")
let demosampleapp_rules_customers_deleteconfirmation_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Customers_DeleteConfirmation.js */ "./build.definitions/DemoSampleApp/Rules/Customers_DeleteConfirmation.js")
let demosampleapp_rules_customers_ordercount_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Customers_OrderCount.js */ "./build.definitions/DemoSampleApp/Rules/Customers_OrderCount.js")
let demosampleapp_rules_emailvalidation_js = __webpack_require__(/*! ./DemoSampleApp/Rules/EmailValidation.js */ "./build.definitions/DemoSampleApp/Rules/EmailValidation.js")
let demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let demosampleapp_rules_logging_loglevels_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/LogLevels.js */ "./build.definitions/DemoSampleApp/Rules/Logging/LogLevels.js")
let demosampleapp_rules_logging_settracecategories_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/SetTraceCategories.js */ "./build.definitions/DemoSampleApp/Rules/Logging/SetTraceCategories.js")
let demosampleapp_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/DemoSampleApp/Rules/Logging/SetUserLogLevel.js")
let demosampleapp_rules_logging_togglelogging_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/ToggleLogging.js */ "./build.definitions/DemoSampleApp/Rules/Logging/ToggleLogging.js")
let demosampleapp_rules_logging_tracecategories_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/TraceCategories.js */ "./build.definitions/DemoSampleApp/Rules/Logging/TraceCategories.js")
let demosampleapp_rules_logging_userlogsetting_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/UserLogSetting.js */ "./build.definitions/DemoSampleApp/Rules/Logging/UserLogSetting.js")
let demosampleapp_rules_service_initialize_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Service/Initialize.js */ "./build.definitions/DemoSampleApp/Rules/Service/Initialize.js")
let demosampleapp_services_sampleservicev4_service = __webpack_require__(/*! ./DemoSampleApp/Services/SampleServiceV4.service */ "./build.definitions/DemoSampleApp/Services/SampleServiceV4.service")
let demosampleapp_styles_styles_css = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.css */ "./build.definitions/DemoSampleApp/Styles/Styles.css")
let demosampleapp_styles_styles_json = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.json */ "./build.definitions/DemoSampleApp/Styles/Styles.json")
let demosampleapp_styles_styles_less = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.less */ "./build.definitions/DemoSampleApp/Styles/Styles.less")
let demosampleapp_styles_styles_nss = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.nss */ "./build.definitions/DemoSampleApp/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	demosampleapp_actions_application_appupdate_action : demosampleapp_actions_application_appupdate_action,
	demosampleapp_actions_application_appupdatefailuremessage_action : demosampleapp_actions_application_appupdatefailuremessage_action,
	demosampleapp_actions_application_appupdateprogressbanner_action : demosampleapp_actions_application_appupdateprogressbanner_action,
	demosampleapp_actions_application_appupdatesuccessmessage_action : demosampleapp_actions_application_appupdatesuccessmessage_action,
	demosampleapp_actions_application_logout_action : demosampleapp_actions_application_logout_action,
	demosampleapp_actions_application_navtoabout_action : demosampleapp_actions_application_navtoabout_action,
	demosampleapp_actions_application_navtoactivitylog_action : demosampleapp_actions_application_navtoactivitylog_action,
	demosampleapp_actions_application_navtosupport_action : demosampleapp_actions_application_navtosupport_action,
	demosampleapp_actions_application_onwillupdate_action : demosampleapp_actions_application_onwillupdate_action,
	demosampleapp_actions_application_reset_action : demosampleapp_actions_application_reset_action,
	demosampleapp_actions_application_resetmessage_action : demosampleapp_actions_application_resetmessage_action,
	demosampleapp_actions_application_usermenupopover_action : demosampleapp_actions_application_usermenupopover_action,
	demosampleapp_actions_closemodalpage_cancel2_action : demosampleapp_actions_closemodalpage_cancel2_action,
	demosampleapp_actions_closemodalpage_cancel_action : demosampleapp_actions_closemodalpage_cancel_action,
	demosampleapp_actions_closemodalpage_complete_action : demosampleapp_actions_closemodalpage_complete_action,
	demosampleapp_actions_closepage_action : demosampleapp_actions_closepage_action,
	demosampleapp_actions_createcustomerentityfailuremessage_action : demosampleapp_actions_createcustomerentityfailuremessage_action,
	demosampleapp_actions_customers_createentity_action : demosampleapp_actions_customers_createentity_action,
	demosampleapp_actions_customers_deleteconfirmation_action : demosampleapp_actions_customers_deleteconfirmation_action,
	demosampleapp_actions_customers_deleteentity_action : demosampleapp_actions_customers_deleteentity_action,
	demosampleapp_actions_customers_updateentiry_action : demosampleapp_actions_customers_updateentiry_action,
	demosampleapp_actions_deletecustomerentityfailuremessage_action : demosampleapp_actions_deletecustomerentityfailuremessage_action,
	demosampleapp_actions_errorarchive_errorarchive_syncfailure_action : demosampleapp_actions_errorarchive_errorarchive_syncfailure_action,
	demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action : demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action,
	demosampleapp_actions_errorarchive_navtoerrorarchive_list_action : demosampleapp_actions_errorarchive_navtoerrorarchive_list_action,
	demosampleapp_actions_genericbannermessage_action : demosampleapp_actions_genericbannermessage_action,
	demosampleapp_actions_genericmessagebox_action : demosampleapp_actions_genericmessagebox_action,
	demosampleapp_actions_genericnavigation_action : demosampleapp_actions_genericnavigation_action,
	demosampleapp_actions_generictoastmessage_action : demosampleapp_actions_generictoastmessage_action,
	demosampleapp_actions_logging_loguploadfailure_action : demosampleapp_actions_logging_loguploadfailure_action,
	demosampleapp_actions_logging_loguploadsuccessful_action : demosampleapp_actions_logging_loguploadsuccessful_action,
	demosampleapp_actions_logging_uploadlog_action : demosampleapp_actions_logging_uploadlog_action,
	demosampleapp_actions_logging_uploadlogprogress_action : demosampleapp_actions_logging_uploadlogprogress_action,
	demosampleapp_actions_navtocustomers_create_action : demosampleapp_actions_navtocustomers_create_action,
	demosampleapp_actions_navtocustomers_detail_action : demosampleapp_actions_navtocustomers_detail_action,
	demosampleapp_actions_navtocustomers_edit_action : demosampleapp_actions_navtocustomers_edit_action,
	demosampleapp_actions_navtocustomers_list_action : demosampleapp_actions_navtocustomers_list_action,
	demosampleapp_actions_salesorderheaders_createentity_action : demosampleapp_actions_salesorderheaders_createentity_action,
	demosampleapp_actions_sampleservicev4_service_closeoffline_action : demosampleapp_actions_sampleservicev4_service_closeoffline_action,
	demosampleapp_actions_sampleservicev4_service_closeofflinefailuremessage_action : demosampleapp_actions_sampleservicev4_service_closeofflinefailuremessage_action,
	demosampleapp_actions_sampleservicev4_service_closeofflinesuccessmessage_action : demosampleapp_actions_sampleservicev4_service_closeofflinesuccessmessage_action,
	demosampleapp_actions_sampleservicev4_service_downloadoffline_action : demosampleapp_actions_sampleservicev4_service_downloadoffline_action,
	demosampleapp_actions_sampleservicev4_service_downloadstartedmessage_action : demosampleapp_actions_sampleservicev4_service_downloadstartedmessage_action,
	demosampleapp_actions_sampleservicev4_service_initializeoffline_action : demosampleapp_actions_sampleservicev4_service_initializeoffline_action,
	demosampleapp_actions_sampleservicev4_service_initializeofflinefailuremessage_action : demosampleapp_actions_sampleservicev4_service_initializeofflinefailuremessage_action,
	demosampleapp_actions_sampleservicev4_service_syncfailuremessage_action : demosampleapp_actions_sampleservicev4_service_syncfailuremessage_action,
	demosampleapp_actions_sampleservicev4_service_syncstartedmessage_action : demosampleapp_actions_sampleservicev4_service_syncstartedmessage_action,
	demosampleapp_actions_sampleservicev4_service_uploadoffline_action : demosampleapp_actions_sampleservicev4_service_uploadoffline_action,
	demosampleapp_actions_updatecustomerentityfailuremessage_action : demosampleapp_actions_updatecustomerentityfailuremessage_action,
	demosampleapp_actions_validationfailure_action : demosampleapp_actions_validationfailure_action,
	demosampleapp_globals_application_appdefinition_version_global : demosampleapp_globals_application_appdefinition_version_global,
	demosampleapp_globals_application_applicationname_global : demosampleapp_globals_application_applicationname_global,
	demosampleapp_globals_application_supportemail_global : demosampleapp_globals_application_supportemail_global,
	demosampleapp_globals_application_supportphone_global : demosampleapp_globals_application_supportphone_global,
	demosampleapp_i18n_i18n_properties : demosampleapp_i18n_i18n_properties,
	demosampleapp_jsconfig_json : demosampleapp_jsconfig_json,
	demosampleapp_pages_application_about_page : demosampleapp_pages_application_about_page,
	demosampleapp_pages_application_support_page : demosampleapp_pages_application_support_page,
	demosampleapp_pages_application_useractivitylog_page : demosampleapp_pages_application_useractivitylog_page,
	demosampleapp_pages_customer_edit_page : demosampleapp_pages_customer_edit_page,
	demosampleapp_pages_customers_create_page : demosampleapp_pages_customers_create_page,
	demosampleapp_pages_customers_detail_page : demosampleapp_pages_customers_detail_page,
	demosampleapp_pages_customers_list_page : demosampleapp_pages_customers_list_page,
	demosampleapp_pages_customers_orders_page : demosampleapp_pages_customers_orders_page,
	demosampleapp_pages_errorarchive_errorarchive_detail_page : demosampleapp_pages_errorarchive_errorarchive_detail_page,
	demosampleapp_pages_errorarchive_errorarchive_list_page : demosampleapp_pages_errorarchive_errorarchive_list_page,
	demosampleapp_pages_main_page : demosampleapp_pages_main_page,
	demosampleapp_pages_salesorderheaders_create_page : demosampleapp_pages_salesorderheaders_create_page,
	demosampleapp_pages_salesorders_details_page : demosampleapp_pages_salesorders_details_page,
	demosampleapp_rules_application_appupdatefailure_js : demosampleapp_rules_application_appupdatefailure_js,
	demosampleapp_rules_application_appupdatesuccess_js : demosampleapp_rules_application_appupdatesuccess_js,
	demosampleapp_rules_application_clientismultiusermode_js : demosampleapp_rules_application_clientismultiusermode_js,
	demosampleapp_rules_application_getclientsupportversions_js : demosampleapp_rules_application_getclientsupportversions_js,
	demosampleapp_rules_application_getclientversion_js : demosampleapp_rules_application_getclientversion_js,
	demosampleapp_rules_application_onwillupdate_js : demosampleapp_rules_application_onwillupdate_js,
	demosampleapp_rules_application_resetappsettingsandlogout_js : demosampleapp_rules_application_resetappsettingsandlogout_js,
	demosampleapp_rules_customers_deleteconfirmation_js : demosampleapp_rules_customers_deleteconfirmation_js,
	demosampleapp_rules_customers_ordercount_js : demosampleapp_rules_customers_ordercount_js,
	demosampleapp_rules_emailvalidation_js : demosampleapp_rules_emailvalidation_js,
	demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js : demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js,
	demosampleapp_rules_logging_loglevels_js : demosampleapp_rules_logging_loglevels_js,
	demosampleapp_rules_logging_settracecategories_js : demosampleapp_rules_logging_settracecategories_js,
	demosampleapp_rules_logging_setuserloglevel_js : demosampleapp_rules_logging_setuserloglevel_js,
	demosampleapp_rules_logging_togglelogging_js : demosampleapp_rules_logging_togglelogging_js,
	demosampleapp_rules_logging_tracecategories_js : demosampleapp_rules_logging_tracecategories_js,
	demosampleapp_rules_logging_userlogsetting_js : demosampleapp_rules_logging_userlogsetting_js,
	demosampleapp_rules_service_initialize_js : demosampleapp_rules_service_initialize_js,
	demosampleapp_services_sampleservicev4_service : demosampleapp_services_sampleservicev4_service,
	demosampleapp_styles_styles_css : demosampleapp_styles_styles_css,
	demosampleapp_styles_styles_json : demosampleapp_styles_styles_json,
	demosampleapp_styles_styles_less : demosampleapp_styles_styles_less,
	demosampleapp_styles_styles_nss : demosampleapp_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.css":
/*!***********************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.css ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/DemoSampleApp/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.less":
/*!************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.less ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/DemoSampleApp/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.nss":
/*!***********************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.nss ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Application/About.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Application/About.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/DemoSampleApp/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/DemoSampleApp/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/DemoSampleApp/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/DemoSampleApp/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Application/Support.page":
/*!************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Application/Support.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/DemoSampleApp/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/DemoSampleApp/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/DemoSampleApp/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/DemoSampleApp/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Application/UserActivityLog.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Application/UserActivityLog.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/DemoSampleApp/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/DemoSampleApp/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/DemoSampleApp/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/DemoSampleApp/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/DemoSampleApp/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/DemoSampleApp/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/DemoSampleApp/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/DemoSampleApp/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Customer_Edit.page":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customer_Edit.page ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Controls":[{"Value":"{FirstName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCFirstName","IsVisible":true,"Separator":true,"Caption":"First Name","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"{LastName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCLastName","IsVisible":true,"Separator":true,"Caption":"Last Name","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCPhone","IsVisible":true,"Separator":true,"Caption":"Phone","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCEmail","IsVisible":true,"Separator":true,"Caption":"Email","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true}]}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Customer_Edit","Caption":"Update Customer","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Cancel2.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/Customers_UpdateEntiry.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Customers_Create.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_Create.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateFirstName","IsVisible":true,"Separator":true,"Caption":"First Name","PlaceHolder":"Enter Value","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateLastName","IsVisible":true,"Separator":true,"Caption":"Last Name","PlaceHolder":"Enter Value","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreatePhone","IsVisible":true,"Separator":true,"Caption":"Phone","PlaceHolder":"Enter Value","KeyboardType":"Phone","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateEmail","IsVisible":true,"Separator":true,"Caption":"Email","PlaceHolder":"Enter Value","KeyboardType":"Email","Enabled":true,"IsEditable":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCCreateDOB","IsVisible":true,"Separator":true,"Caption":"DOB","IsEditable":true,"Mode":"Datetime"}]}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Customers_Create","Caption":"Create Customer","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/Customers_CreateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Customers_Detail.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_Detail.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"{FirstName}","Footnote":"{EmailAddress}","Description":"{CustomerID}","StatusText":"{PhoneNumber}","DetailImage":"sap-icon://customer","DetailImageIsCircular":false,"BodyText":"{DateOfBirth}","HeadlineText":"{LastName}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KeyAndValues":[{"Value":"{HouseNumber} {Street}","_Name":"KeyValue0","KeyName":"Address","Visible":true},{"Value":"{City}","_Name":"KeyValue1","KeyName":"City","Visible":true},{"Value":"{PostalCode}","_Name":"KeyValue2","KeyName":"Postal Code","Visible":true},{"Value":"{Country}","_Name":"KeyValue3","KeyName":"Country","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}},{"Header":{"Styles":{"Caption":"Customer Orders"},"_Name":"SectionHeader0","AccessoryType":"None","UseTopPadding":true,"Caption":"Customer Orders"},"Footer":{"_Name":"SectionFooter0","Caption":"See All","AttributeLabel":"/DemoSampleApp/Rules/Customers_OrderCount.js","AccessoryType":"DisclosureIndicator","FooterStyle":"Attribute","Visible":true,"OnPress":{"Name":"/DemoSampleApp/Actions/GenericNavigation.action","Properties":{"PageToOpen":"/DemoSampleApp/Pages/Customers_Orders.page"}},"UseBottomPadding":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","DataSubscriptions":["SalesOrderHeaders"],"Target":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"{@odata.readLink}/SalesOrders","QueryOptions":"$top=5&$orderby=CreatedAt desc"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"Caption":"No Customer Orders Found","FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[]},"Title":"$(D,{CreatedAt},'','',{format:'medium'})","Subhead":"{CustomerID}","DisplayDescriptionInMobile":true,"StatusText":"$(C,{GrossAmount},{CurrencyCode},'',{minimumIntegerDigits:1,minimumFractionDigits:0,maximumFractionDigits:2,useGrouping:true})","PreserveIconStackSpacing":false,"AccessoryType":"DisclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"OnPress":{"Name":"/DemoSampleApp/Actions/GenericNavigation.action","Properties":{"PageToOpen":"/DemoSampleApp/Pages/SalesOrders_Details.page"}},"Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"DesignTimeTarget":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"Customers"},"_Type":"Page","_Name":"Customers_Detail","Caption":"Details","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/NavToCustomers_Edit.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Trash","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Rules/Customers_DeleteConfirmation.js"}],"_Name":"ActionBar1"},"FioriToolbar":{"_Type":"Control.Type.FioriToolbar","_Name":"FioriToolbar0","Items":[{"_Type":"FioriToolbarItem.Type.Button","_Name":"ToolbarItem0","Visible":true,"Title":"Create Order","OnPress":{"Name":"/DemoSampleApp/Actions/GenericNavigation.action","Properties":{"PageToOpen":"/DemoSampleApp/Pages/SalesOrderHeaders_Create.page","ModalPage":true}},"Enabled":true,"ButtonType":"Primary","Semantic":"Tint","ImagePosition":"Leading"}]}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Customers_List.page":
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_List.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ContactCell","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"Customers"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"ContactCell":{"Visible":true,"ContextMenu":{"PerformFirstActionWithFullSwipe":true},"DetailImage":"","Headline":"{LastName}","Subheadline":"{FirstName}","Description":"{City}","OnPress":"/DemoSampleApp/Actions/NavToCustomers_Detail.action","ActivityItems":[{"_Name":"SectionContactCell0ActivityItems0","ActivityType":"Phone","ActivityValue":"{PhoneNumber}"},{"_Name":"SectionContactCell0ActivityItems1","ActivityType":"Email","ActivityValue":"{EmailAddress}"}]},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"Search":{"Enabled":true,"BarcodeScanner":true}}]}],"_Type":"Page","_Name":"Customers_List","Caption":"Customers","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Add","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/NavToCustomers_Create.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Customers_Orders.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_Orders.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"SalesOrderHeaders","QueryOptions":"$filter=CustomerID eq {CustomerID}&$orderby=CreatedAt desc"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"Caption":"No Orders Found","FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[]},"Title":"$(D,{CreatedAt},'','',{format:'medium'})","Subhead":"{CustomerID}","DisplayDescriptionInMobile":true,"StatusText":"$(C,{GrossAmount},{CurrencyCode},'',{minimumIntegerDigits:1,minimumFractionDigits:0,maximumFractionDigits:2,useGrouping:true})","PreserveIconStackSpacing":false,"AccessoryType":"DisclosureIndicator","ProgressIndicator":"InProgress","Tags":[{"Text":"tag"}],"AvatarStack":{"Avatars":[],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"OnPress":{"Name":"/DemoSampleApp/Actions/GenericNavigation.action","Properties":{"PageToOpen":"/DemoSampleApp/Pages/SalesOrders_Details.page"}},"Selected":false},"Search":{"Enabled":true,"BarcodeScanner":true},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"Customers_Orders","Caption":"Customer Orders","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"None","OnPress":"/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Main.page":
/*!*********************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Main.page ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Customers","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://customer","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/DemoSampleApp/Actions/NavToCustomers_List.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Jodh Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/SalesOrderHeaders_Create.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/SalesOrderHeaders_Create.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Controls":[{"Value":"EUR","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateCurrencyCode","IsVisible":true,"Separator":true,"Caption":"Currency Code","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"18.010","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateNetAmount","IsVisible":true,"Separator":true,"Caption":"Net Amount","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"108.010","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateTaxAmount","IsVisible":true,"Separator":true,"Caption":"Tax Amount","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"126.02","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateGrossAmount","IsVisible":true,"Separator":true,"Caption":"Gross Amount","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"N","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateLifeCycleStatus","IsVisible":true,"Separator":true,"Caption":"Lifecycle Status","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"New","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateLifeCycleStatusName","IsVisible":true,"Separator":true,"Caption":"Lifecycle Status Name","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCCreatedate","IsVisible":true,"Separator":true,"Caption":"Creation Date","IsEditable":true,"Mode":"Datetime"}]}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"SalesOrderHeaders_Create","Caption":"Create Order","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/SalesOrderHeaders_CreateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/SalesOrders_Details.page":
/*!************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/SalesOrders_Details.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KeyAndValues":[{"Value":"{SalesOrderID}","_Name":"KeyValue0","KeyName":"Order Number","Visible":true},{"Value":"{LifeCycleStatusName}","_Name":"KeyValue1","KeyName":"Status","Visible":true},{"Value":"$(D,{CreatedAt},'','',{format:'medium'})","_Name":"KeyValue2","KeyName":"Created At","Visible":true},{"Value":"$(C,{NetAmount},{CurrencyCode},'',{minimumIntegerDigits:1,minimumFractionDigits:0,maximumFractionDigits:2,useGrouping:true})","_Name":"KeyValue3","KeyName":"Net Amount","Visible":true},{"Value":"Value$(C,{TaxAmount},{CurrencyCode},'',{minimumIntegerDigits:1,minimumFractionDigits:0,maximumFractionDigits:2,useGrouping:true})","_Name":"KeyValue4","KeyName":"Tax Amount","Visible":true},{"Value":"$(C,{GrossAmount},{CurrencyCode},'',{minimumIntegerDigits:1,minimumFractionDigits:0,maximumFractionDigits:2,useGrouping:true})","_Name":"KeyValue5","KeyName":"Total Amount","Visible":true}],"MaxItemCount":1,"Layout":{"NumberOfColumns":2}}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"SalesOrders_Details","Caption":"Order Details","PrefersLargeCaption":true,"DesignTimeTarget":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"SalesOrderHeaders"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"DemoSampleApp","Version":"/DemoSampleApp/Globals/Application/AppDefinition_Version.global","MainPage":"/DemoSampleApp/Pages/Main.page","OnLaunch":"/DemoSampleApp/Rules/Service/Initialize.js","OnWillUpdate":"/DemoSampleApp/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/DemoSampleApp/Rules/Service/Initialize.js","Styles":"/DemoSampleApp/Styles/Styles.less","Localization":"/DemoSampleApp/i18n/i18n.properties","_SchemaVersion":"24.4","StyleSheets":{"Styles":{"css":"/DemoSampleApp/Styles/Styles.css","ios":"/DemoSampleApp/Styles/Styles.nss","android":"/DemoSampleApp/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdate.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/AppUpdate.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/DemoSampleApp/Rules/Application/AppUpdateFailure.js","OnSuccess":"/DemoSampleApp/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateFailureMessage.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/AppUpdateFailureMessage.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateProgressBanner.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/AppUpdateProgressBanner.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/DemoSampleApp/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/Logout.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/Logout.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/NavToAbout.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/NavToAbout.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/DemoSampleApp/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/NavToActivityLog.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/NavToActivityLog.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/DemoSampleApp/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/NavToSupport.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/NavToSupport.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/DemoSampleApp/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/OnWillUpdate.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/OnWillUpdate.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/Reset.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/Reset.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/ResetMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/ResetMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/DemoSampleApp/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/UserMenuPopover.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/UserMenuPopover.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://synchronize","OnPress":"/DemoSampleApp/Actions/SampleServiceV4/Service/SyncStartedMessage.action","Title":"Sync Changes","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/DemoSampleApp/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/DemoSampleApp/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/DemoSampleApp/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/DemoSampleApp/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/DemoSampleApp/Actions/Application/Logout.action","Title":"Logout","Visible":"/DemoSampleApp/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel2.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel2.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Cancel2"},"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Complete.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CloseModalPage_Complete.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"NavigateBackToPage":"Customers_List"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ClosePage.action":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ClosePage.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"CreateCustomerEntityFailureMessage"},"Message":"Failed to Create Customer record - {#ActionResults:Customers_CreateEntity/error}","Title":"Create Customer","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Customers_CreateEntity.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers_CreateEntity.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"Customers_CreateEntity"},"OnFailure":"/DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action","OnSuccess":"/DemoSampleApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"Customers"},"Properties":{"DateOfBirth":"#Control:FCCreateDOB/#Value","EmailAddress":"#Control:FCCreateEmail/#Value","FirstName":"#Control:FCCreateFirstName/#Value","LastName":"#Control:FCCreateLastName/#Value","PhoneNumber":"#Control:FCCreatePhone/#Value"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Customers_DeleteConfirmation.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers_DeleteConfirmation.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"Customers_DeleteConfirmation"},"Message":"Delete current entiry?","Title":"Delete Confirmation","OKCaption":"OK","CancelCaption":"Cancel"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Customers_DeleteEntity.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers_DeleteEntity.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DeleteEntity","ActionResult":{"_Name":"Customers_DeleteEntity"},"OnFailure":"/DemoSampleApp/Actions/DeleteCustomerEntityFailureMessage.action","OnSuccess":"/DemoSampleApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"Customers","ReadLink":"{@odata.readLink}"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Customers_UpdateEntiry.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers_UpdateEntiry.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"Customers_UpdateEntiry"},"OnFailure":"/DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action","OnSuccess":"/DemoSampleApp/Actions/CloseModalPage_Complete.action","ValidationRule":"/DemoSampleApp/Rules/EmailValidation.js","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"Customers","ReadLink":"{@odata.readLink}"},"Properties":{"EmailAddress":"#Control:FCEmail/#Value","FirstName":"#Control:FCFirstName/#Value","LastName":"#Control:FCLastName/#Value","PhoneNumber":"#Control:FCPhone/#Value"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/DeleteCustomerEntityFailureMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/DeleteCustomerEntityFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"DeleteCustomerEntityFailureMessage"},"Message":"Delete entity failure - {#ActionResults:Customers_DeleteEntity/error}","Title":"Delete Customer","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/GenericBannerMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/GenericBannerMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/GenericMessageBox.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/GenericMessageBox.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/GenericNavigation.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/GenericNavigation.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/DemoSampleApp/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/GenericToastMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/GenericToastMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Logging/LogUploadFailure.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Logging/LogUploadFailure.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Logging/LogUploadSuccessful.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Logging/LogUploadSuccessful.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Logging/UploadLog.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Logging/UploadLog.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/DemoSampleApp/Actions/Logging/LogUploadFailure.action","OnSuccess":"/DemoSampleApp/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Logging/UploadLogProgress.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Logging/UploadLogProgress.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/DemoSampleApp/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Create.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_Create.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Create"},"PageToOpen":"/DemoSampleApp/Pages/Customers_Create.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Detail.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_Detail.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Detail"},"PageToOpen":"/DemoSampleApp/Pages/Customers_Detail.page"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Edit.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_Edit.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Edit"},"PageToOpen":"/DemoSampleApp/Pages/Customer_Edit.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_List.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_List.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_List"},"PageToOpen":"/DemoSampleApp/Pages/Customers_List.page"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SalesOrderHeaders_CreateEntity.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SalesOrderHeaders_CreateEntity.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateRelatedEntity","ActionResult":{"_Name":"SalesOrderHeaders_CreateEntity"},"OnFailure":{"Name":"/DemoSampleApp/Actions/GenericMessageBox.action","Properties":{"Message":"Failed to Create Sales Order record - {#ActionResults:SalesOrderHeaders_CreateEntity/error}","Title":"Create Sales Order"}},"OnSuccess":"/DemoSampleApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"SalesOrderHeaders"},"ParentLink":{"Target":{"EntitySet":"Customers","ReadLink":"{@odata.readLink}"},"Property":"SalesOrders"},"Properties":{"CreatedAt":"#Control:FCCreatedate/#Value","CurrencyCode":"#Control:FCCreateCurrencyCode/#Value","GrossAmount":"#Control:FCCreateGrossAmount/#Value","LifeCycleStatus":"#Control:FCCreateLifeCycleStatus/#Value","LifeCycleStatusName":"#Control:FCCreateLifeCycleStatusName/#Value","NetAmount":"#Control:FCCreateNetAmount/#Value","TaxAmount":"#Control:FCCreateTaxAmount/#Value"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOffline.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOffline.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/DemoSampleApp/Services/SampleServiceV4.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineSuccessMessage.action","OnFailure":"/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineFailureMessage.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineFailureMessage.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineSuccessMessage.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineSuccessMessage.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadOffline.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadOffline.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV4.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action","OnSuccess":"/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadStartedMessage.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadStartedMessage.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOffline.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOffline.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV4.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnFailure":"/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOfflineFailureMessage.action":
/*!****************************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOfflineFailureMessage.action ***!
  \****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncStartedMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncStartedMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/DemoSampleApp/Actions/SampleServiceV4/Service/UploadOffline.action","OnFailure":"/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/UploadOffline.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/UploadOffline.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV4.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadStartedMessage.action","OnFailure":"/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"UpdateCustomerEntityFailureMessage"},"Message":"Failed to Save Customer Updates ","Title":"Update Customer","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ValidationFailure.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ValidationFailure.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"ValidationFailure"},"Message":"Email address is not in the correct format recipient @ domain . domaintype","Title":"Validate Email","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Globals/Application/AppDefinition_Version.global":
/*!******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Globals/Application/AppDefinition_Version.global ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Globals/Application/ApplicationName.global":
/*!************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Globals/Application/ApplicationName.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Globals/Application/SupportEmail.global":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Globals/Application/SupportEmail.global ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Globals/Application/SupportPhone.global":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Globals/Application/SupportPhone.global ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Services/SampleServiceV4.service":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Services/SampleServiceV4.service ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV4","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"OfflineOptions":{"StoreParameters":{}},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.json":
/*!************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.json ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/DemoSampleApp/jsconfig.json":
/*!*******************************************************!*\
  !*** ./build.definitions/DemoSampleApp/jsconfig.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map