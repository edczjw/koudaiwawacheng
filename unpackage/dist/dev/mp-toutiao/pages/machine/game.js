(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/machine/game"],{

/***/ 344:
/*!**********************************************************************************!*\
  !*** /Users/cengjunwei/Desktop/uniwwj/main.js?{"page":"pages%2Fmachine%2Fgame"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
__webpack_require__(/*! uni-pages */ 25);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
var _game = _interopRequireDefault(__webpack_require__(/*! ./pages/machine/game.vue */ 345));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_game.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 345:
/*!***************************************************************!*\
  !*** /Users/cengjunwei/Desktop/uniwwj/pages/machine/game.vue ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_vue_vue_type_template_id_601fd69a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.vue?vue&type=template&id=601fd69a& */ 346);
/* harmony import */ var _game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.vue?vue&type=script&lang=js& */ 348);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _game_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.vue?vue&type=style&index=0&lang=css& */ 352);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 205);

var renderjs





/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _game_vue_vue_type_template_id_601fd69a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _game_vue_vue_type_template_id_601fd69a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _game_vue_vue_type_template_id_601fd69a___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/machine/game.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 346:
/*!**********************************************************************************************!*\
  !*** /Users/cengjunwei/Desktop/uniwwj/pages/machine/game.vue?vue&type=template&id=601fd69a& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_template_id_601fd69a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./game.vue?vue&type=template&id=601fd69a& */ 347);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_template_id_601fd69a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_template_id_601fd69a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_template_id_601fd69a___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_template_id_601fd69a___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 347:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/cengjunwei/Desktop/uniwwj/pages/machine/game.vue?vue&type=template&id=601fd69a& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    guiPage: function () {
      return __webpack_require__.e(/*! import() | GraceUI5/components/gui-page */ "GraceUI5/components/gui-page").then(__webpack_require__.bind(null, /*! @/GraceUI5/components/gui-page.vue */ 737))
    },
    guiSwitchNavigation: function () {
      return __webpack_require__.e(/*! import() | GraceUI5/components/gui-switch-navigation */ "GraceUI5/components/gui-switch-navigation").then(__webpack_require__.bind(null, /*! @/GraceUI5/components/gui-switch-navigation.vue */ 723))
    },
    guiPopup: function () {
      return __webpack_require__.e(/*! import() | GraceUI5/components/gui-popup */ "GraceUI5/components/gui-popup").then(__webpack_require__.bind(null, /*! @/GraceUI5/components/gui-popup.vue */ 744))
    },
    guiImage: function () {
      return __webpack_require__.e(/*! import() | GraceUI5/components/gui-image */ "GraceUI5/components/gui-image").then(__webpack_require__.bind(null, /*! @/GraceUI5/components/gui-image.vue */ 751))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 =
    _vm.player && _vm.player.userName
      ? _vm.utils.formatImg(_vm.player.icon)
      : null
  var g1 = _vm.active == 0 ? _vm.utils.formatImg(_vm.doll.thumbnail) : null
  var l0 =
    _vm.active == 0
      ? _vm.__map(_vm.doll.imgs, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g2 = _vm.utils.formatImg(item)
          return {
            $orig: $orig,
            g2: g2,
          }
        })
      : null
  var l1 =
    _vm.active == 1
      ? _vm.__map(_vm.catchRecords, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g3 = _vm.utils.formatImg(item.userIcon)
          return {
            $orig: $orig,
            g3: g3,
          }
        })
      : null
  var g4 = _vm.showType == 1 ? _vm.utils.formatImg(_vm.doll.thumbnail) : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, item) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        item = _temp2.item
      var _temp, _temp2
      _vm.navTo(
        "/pages/user/recentCatch?user=" +
          encodeURIComponent(JSON.stringify(item))
      )
    }
    _vm.e1 = function ($event, item) {
      var _temp3 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        item = _temp4.item
      var _temp3, _temp4
      _vm.navTo(
        "/pages/user/recentCatch?user=" +
          encodeURIComponent(JSON.stringify(item))
      )
    }
    _vm.e2 = function ($event, item) {
      var _temp5 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp6 = _temp5.eventParams || _temp5["event-params"],
        item = _temp6.item
      var _temp5, _temp6
      _vm.navTo(
        "/pages/user/recentCatch?user=" +
          encodeURIComponent(JSON.stringify(item))
      )
    }
    _vm.e3 = function ($event) {
      $event.stopPropagation()
      _vm.closeResultPopup()
      _vm.cancalSubribe()
    }
    _vm.e4 = function ($event) {
      $event.stopPropagation()
      _vm.closeResultPopup()
      _vm.cancalSubribe()
    }
    _vm.e5 = function ($event) {
      $event.stopPropagation()
      _vm.closeResultPopup()
      _vm.cancalSubribe()
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        l0: l0,
        l1: l1,
        g4: g4,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 348:
/*!****************************************************************************************!*\
  !*** /Users/cengjunwei/Desktop/uniwwj/pages/machine/game.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./game.vue?vue&type=script&lang=js& */ 349);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 349:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/cengjunwei/Desktop/uniwwj/pages/machine/game.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 225));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 227));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _vuex = __webpack_require__(/*! vuex */ 27);
var _utils = _interopRequireDefault(__webpack_require__(/*! @/common/utils */ 37));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var graceJS = __webpack_require__(/*! @/GraceUI5/js/grace.js */ 350);
var _default = {
  data: function data() {
    return {
      controllPanelIndex: 0,
      // 切换导航
      navItems: [{
        id: 0,
        name: '商品详情'
      }, {
        id: 1,
        name: '最近夹中的人'
      }, {
        id: 2,
        name: '用户须知'
      }],
      active: 0,
      utils: _utils.default,
      machineId: 0,
      name: '',
      status: '',
      player: null,
      viewers: [],
      subscribers: [],
      subscribeOpen: false,
      faces: [],
      collect: false,
      catchRecords: [],
      countdownTime: '',
      isSubscribe: false,
      subscribeSort: 0,
      exchangeJifen: '',
      userNotice: '',
      video: '',
      videoPlayer: null,
      showInmachineAnimation: false,
      operToken: "",
      operUrl: "",
      lastCmd: 0,
      playbtnType: 0,
      //0开始游戏 1预约游戏 2取消预约
      doll: {
        id: 0,
        name: '',
        thumbnail: '',
        detailImgs: '',
        coin: 0,
        imgs: []
      },
      showType: ''
    };
  },
  watch: {
    viewers: {
      handler: function handler(newViewers, oldViewers) {
        var _this = this;
        if (newViewers && newViewers.length > 0) {
          if (newViewers.length > 4) {
            newViewers = newViewers.slice(0, 4);
          }
          this.faces = [];
          newViewers.forEach(function (item) {
            _this.faces.push(_this.utils.formatImg(item.icon));
          });
        }
      }
    },
    player: {
      handler: function handler(newPlayer, oldPlayer) {}
    },
    subscribers: {
      handler: function handler(newSubscribers, oldSubscribers) {
        var _this2 = this;
        var subscribeSort = 0;
        var isSubscribe = false;
        if (newSubscribers && newSubscribers.length > 0) {
          newSubscribers.forEach(function (item, index) {
            if (item.userName == _this2.$store.state.user.id) {
              subscribeSort = index;
              isSubscribe = true;
            }
          });
        }
        this.subscribeSort = subscribeSort;
        this.isSubscribe = isSubscribe;
      }
    },
    status: {
      handler: function handler(newStatus, oldStatus) {
        if (newStatus != 0 && this.player && this.player.userName == this.$store.state.user.id) {
          this.controllPanelIndex = 1;
        } else {
          this.controllPanelIndex = 0;
        }
      }
    }
  },
  onReady: function onReady() {
    // 监听返回按钮按键事件
    /* plus.key.addEventListener("backbutton",function(e){
        uni.navigateBack();
    },false); */
  },
  updated: function updated() {
    var _this3 = this;
    if (!this.initStatus) {
      this.initStatus = true;
      // uni-app 会劫持canvas标签并替换为uni-canvas，无法赋予canvas标签id
      // 这里创建canvas元素，插入到view中
      var cv = document.createElement("canvas");
      cv.id = "video1";
      cv.style.cssText = "width:100%;height:100%;background-color: black;border-radius: 20px;";
      this.$refs.videoView.$el.appendChild(cv);
      /* nnmw.load(()=>{
      	this.videoPlayer = new nnmw();
      	this.videoPlayer.setView(cv.id);
      	this.videoPlayer.setBufferTime(0);
      	this.videoPlayer.setScaleMode(0);
      	this.videoPlayer.start(this.video);
      	this.videoPlayer.on("start", () => {
      		this.clearPlayVideoInterval();
      	});
      }); */

      this.videoPlayer = new NNM();
      this.videoPlayer.setView(cv.id);
      this.videoPlayer.setBufferTime(0);
      this.videoPlayer.setScaleMode(0);
      this.videoPlayer.start(this.video);
      this.videoPlayer.on("start", function () {
        _this3.clearPlayVideoInterval();
      });
    }
  },
  onLoad: function onLoad(option) {
    // const machine = JSON.parse(option.machine);
    // this.machineId = machine.machineId;
    // this.video = machine.video;

    this.machineId = option.machineId;
    this.showInmachineAnimation = true;
    this.getCatchSuccessRecent();
    this.getUserNotice();
    this.$store.dispatch('getUserInfo');
  },
  onHide: function onHide() {
    this.leaveRoom(this.machineId);
    this.clearListener();
  },
  onShow: function onShow() {
    this.addListenerSocketSloginsuccess();
    if (!uni.http.isSocketConnected()) {
      uni.$emit('socketdisconnect');
    }
    this.listener();
    this.loadMachine(this.machineId);
    this.startVideo();
  },
  onUnload: function onUnload() {
    this.clearInterval();
    this.leaveRoom(this.machineId);
    this.clearListener();

    // canvas 是由createElement每次创建，调用这个方法完全释放，避免16次之后WebGL出现警告
    this.videoPlayer.release(true);
  },
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)(['setCurrentMachine'])), {}, {
    addListenerSocketSloginsuccess: function addListenerSocketSloginsuccess() {
      var _this4 = this;
      uni.$once("socketSloginsuccess", function () {
        _this4.listener();
        _this4.loadMachine(_this4.machineId);
        _this4.startVideo();
        _this4.addListenerSocketSloginsuccess();
      });
    },
    startVideo: function startVideo() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // this.$refs.webview.evalJs("start()");
                _this5.backgroundVoice();
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    stopVideo: function stopVideo() {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    } // this.$refs.webview.evalJs("stop()");
    ,

    videoPostMessage: function videoPostMessage(data) {
      var action = data.detail.data[0];
      if (action.action === "onReady") {
        // this.$refs.webview.evalJs("start()");
        this.backgroundVoice();
      }
    },
    listener: function listener() {
      var _this6 = this;
      //倒计时结束
      uni.http.socketOn(10008, function (res) {
        // console.log("------------------------------PushGameStatus-------------------------------");
        if (res.mid == _this6.machineId) {
          _this6.status = res.status;
        }
      });

      //游戏开始
      uni.http.socketOn(10006, function (res) {
        // console.log("------------------------------PushGameStart-------------------------------");
        if (res.mid == _this6.machineId) {
          _this6.player = res.player;
          _this6.subscribers = res.subscribers;
          _this6.status = res.status;
          if (_this6.isSubscribe && res.player && res.player.userName == _this6.$store.state.user.id && _this6.status == 0) {
            //弹出预约玩家开始游戏的倒计时框
            _this6.daoninleVoice();
            _this6.popGameResult(3, Number(res.subscribeEndTime - _this6.utils.getLocalTimestamp() - _this6.$store.state.offsetTime));
          }
        }
      });

      //游戏结果
      uni.http.socketOn(10007, function (res) {
        // console.log("------------------------------PushGameResult-------------------------------");
        if (res.mid == _this6.machineId) {
          if (_this6.player && _this6.player.userName == _this6.$store.state.user.id) {
            if (res.isWin == 1) {
              _this6.gameSuccessVoice();
            } else {
              _this6.gameFailVoice();
            }
            _this6.popGameResult(res.isWin == 1 ? 1 : 2, Number(res.subscribeEndTime - _this6.utils.getLocalTimestamp() - _this6.$store.state.offsetTime));
          }
          _this6.status = 0;
        }
      });

      //监听再来一局事件
      /* uni.$on('againplay',()=>{
      	this.play();
      }); */

      //监听取消开局事件
      /* uni.$on('cancalplay',()=>{
      	this.cancalSubribe();
      }) */
    },

    clearListener: function clearListener() {
      uni.http.clearSocket(10008);
      uni.http.clearSocket(10006);
      uni.http.clearSocket(10007);
      uni.$off('againplay');
      uni.$off('cancalplay');
      this.backgroundVoiceStop();
    },
    closeResultPopup: function closeResultPopup() {
      this.$refs.resultPopup.close();
    },
    popGameResult: function popGameResult(type, countdownTime) {
      var _this7 = this;
      this.showType = type;
      this.clearInterval();
      this.countdownTime = countdownTime;
      this.timer = setInterval(function () {
        if (_this7.countdownTime > 0) {
          _this7.countdownTime--;
        } else {
          _this7.clearInterval();
          _this7.closeResultPopup();
        }
      }, 1000);
      this.$refs.resultPopup.open();
    },
    play: function play() {
      var _this8 = this;
      if (!this.subscribeOpen && this.player && this.player.userName != this.$store.state.user.id) {
        return;
      }
      if (this.isSubscribe) {
        this.btnVoice();
        this.cancalSubribe();
        return;
      }
      if (this.$store.state.socket) {
        //开始游戏
        uni.http.socketReq(10004, {
          "id": this.machineId
        }, function (res) {
          if (res.msg) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
          if (res.rtnCode == 0) {
            _this8.lastCmd = 0;
            if (res.isSubscribe && res.isSubscribe == 1) {
              _this8.btnVoice();
              return;
            }
            _this8.readygoVoice();
            _this8.operToken = res.operToken;
            _this8.operUrl = res.operUrl;
            _this8.$store.state.user.coin = res.coin;
            _this8.setInterval(res.stopTime);
          } else if (res.rtnCode == 100) {
            uni.navigateTo({
              url: '/pages/money/recharge'
            });
          } else if (res.rtnCode == 101) {
            setTimeout(function () {
              uni.switchTab({
                url: '../index/index'
              });
            }, 500);
          } else if (res.rtnCode == 102) {//您正在游戏中
          } else if (res.rtnCode == 199) {//操作过于频繁
          }
        });
      }
    },
    opera: function opera(cmd) {
      var _this9 = this;
      if (this.status != 1 || !this.player || this.player.userName != this.$store.state.user.id || !this.operToken) {
        return;
      }
      if (cmd == 247) {
        if (this.lastCmd == 0) {
          uni.showToast({
            title: "请先移动爪子",
            icon: 'none'
          });
          return;
        } else if (this.lastCmd != 255) {
          this.lastCmd = 255;
          return;
        }
      }
      if (cmd != 255 && cmd != 247) {
        this.btnVoice();
      }
      if (this.$store.state.socket) {
        //操作游戏
        // uni.http.post(this.operUrl + "/operate/cmd",{
        uni.http.post("https://kdwwc.fszhuazhuale.com/facade/operate/cmd", {
          cmd: cmd,
          operToken: this.operToken
        }).then(function (res) {
          if (res.code == 200) {
            _this9.lastCmd = cmd;
            if (cmd === 247) {
              _this9.status = 2;
              _this9.xiazhuaVoice();
            }
          } else if (res.msg) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
        }).catch(function (err) {});

        /* uni.http.socketReq(10005, {
        	"mid": this.machineId,
        	"cmd": cmd
        }, res => {
        	if(res.rtnCode == 0){
        		if(cmd === 247){
        			this.status = 2;
        			this.xiazhuaVoice();
        		}
        	}else if(res.msg) {
        		uni.showToast({
        			title: res.msg,
        			icon: 'none'
        		});
        	}
        }) */
      }
    },
    cancalSubribe: function cancalSubribe() {
      if (this.$store.state.socket) {
        //取消预约
        uni.http.socketReq(10011, {
          "id": this.machineId
        }, function (res) {
          if (res.rtnCode != 0) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
        });
      }
    },
    // 导航切换
    navChange: function navChange(e) {
      this.active = e;
      //最近夹中的人
      if (e == 1) {
        this.getCatchSuccessRecent();
      }
    },
    navTo: function navTo(url) {
      this.btnVoice();
      uni.navigateTo({
        url: url
      });
    },
    getCatchSuccessRecent: function getCatchSuccessRecent() {
      var _this10 = this;
      uni.http.get('machine/catchSuccessRecent?machineId=' + this.machineId).then(function (res) {
        _this10.catchRecords = res.data.catchRecords || [];
      });
    },
    getUserNotice: function getUserNotice() {
      var _this11 = this;
      uni.http.get('article/3').then(function (res) {
        if (res.code == 200) {
          _this11.userNotice = res.data.noticeContent;
        }
      });

      /* uni.http.get(
      	'user/userNotice'
      ).then(res => {
      	this.userNotice = res || '';
      }) */
    },
    complaint: function complaint() {
      this.btnVoice();
      uni.http.get('user/complaintRecordByMachine/' + this.machineId).then(function (res) {
        if (res.code == 200 && res.data.complaintStatus == 0 && res.data.status == 0) {
          uni.navigateTo({
            url: '/pages/complaint/complaint?record=' + encodeURIComponent(JSON.stringify(res.data))
          });
        } else {
          uni.navigateTo({
            url: '/pages/complaint/gameRecord'
          });
        }
      });
    },
    loadMachine: function loadMachine(machineId) {
      var _this12 = this;
      /* try {
          const value = uni.getStorageSync('machineId');
          if (value) {
              machineId = value;
          }
      } catch (e) {} */
      if (machineId >= 0) {
        machineId = this.machineId;
      } else {
        this.leaveRoom(this.machineId);
        this.showInmachineAnimation = true;
      }
      if (!machineId || machineId == 0) {
        return;
      }
      if (this.$store.state.socket) {
        uni.http.socketReq(10001, {
          "id": machineId
        }, function (res) {
          if (res.rtnCode == 0) {
            _this12.doll = res.machine.doll;
            if (_this12.doll && _this12.doll.detailImgs) {
              _this12.doll.imgs = _this12.doll.detailImgs.split(",");
            }

            // let data = {machineId: res.machine.id,video:res.machine.video}
            // this.setCurrentMachine(data)

            _this12.machineId = res.machine.id;
            _this12.status = res.machine.status;
            _this12.player = res.machine.player;
            _this12.viewers = res.machine.viewers;
            _this12.name = res.machine.name;
            _this12.subscribers = res.machine.subscribers;
            _this12.collect = res.machine.isCollect == 1;
            _this12.subscribeOpen = res.subscribeOpen && res.subscribeOpen == 1;
            _this12.operToken = res.operToken || "";
            _this12.operUrl = res.machine.operUrl || "";
            var title = _this12.doll.name;
            uni.setNavigationBarTitle({
              title: title
            });
            if (res.machine.video && res.machine.video.indexOf("https") == -1) {
              res.machine.video = res.machine.video.replace("http", "https");
            }
            if (_this12.video != res.machine.video) {
              _this12.video = res.machine.video;
              _this12.videoPlayer.stop();
              _this12.videoPlayer.clearView();
              _this12.videoPlayer.start(res.machine.video);
              _this12.setPlayVideoInterval();
            }
            if (_this12.status == 1 && _this12.player && _this12.player.userName == _this12.$store.state.user.id) {
              _this12.setInterval(res.machine.stopTime);
            }
            if (_this12.showInmachineAnimation) {
              uni.$emit("goInMachineAnimation", _this12.doll);
              _this12.showInmachineAnimation = false;
            }
          } else if (res.rtnCode == 101) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            setTimeout(function () {
              uni.switchTab({
                url: '../index/index'
              });
            }, 500);
          }
        });
      }
    },
    leaveRoom: function leaveRoom(machineId) {
      if (this.$store.state.socket) {
        uni.http.socketReq(10002, {
          "id": machineId
        }, function (res) {
          console.log("leaveRoom");
        });
      }
    },
    collectMachine: function collectMachine() {
      var _this13 = this;
      this.btnVoice();
      uni.http.get('user/collectMachine?machineId=' + this.machineId).then(function (res) {
        _this13.collect = res.data;
        uni.showToast({
          title: _this13.collect ? '收藏成功' : '已取消收藏',
          icon: 'none'
        });
      });
    },
    clearInterval: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }
      clearInterval.toString = function () {
        return _clearInterval.toString();
      };
      return clearInterval;
    }(function () {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }),
    setInterval: function (_setInterval) {
      function setInterval(_x) {
        return _setInterval.apply(this, arguments);
      }
      setInterval.toString = function () {
        return _setInterval.toString();
      };
      return setInterval;
    }(function (stopTime) {
      var _this14 = this;
      this.clearInterval();
      this.countdownTime = Number(stopTime - this.utils.getLocalTimestamp() - this.$store.state.offsetTime);
      this.timer = setInterval(function () {
        if (_this14.countdownTime > 0) {
          _this14.countdownTime--;
        } else {
          _this14.clearInterval();
        }
      }, 1000);
    }),
    backgroundVoice: function (_backgroundVoice) {
      function backgroundVoice() {
        return _backgroundVoice.apply(this, arguments);
      }
      backgroundVoice.toString = function () {
        return _backgroundVoice.toString();
      };
      return backgroundVoice;
    }(function () {
      if (this.$store.state.gameSet.volume && this.machineId && this.machineId != 0) {
        /* if(this.innerAudioContext){
        	this.innerAudioContext.destroy();
        }
        this.innerAudioContext = uni.createInnerAudioContext();
        this.innerAudioContext.autoplay = true;
        this.innerAudioContext.loop = true;
        this.innerAudioContext.src = './../../static/voice/background.mp3';
        this.innerAudioContext.sessionCategory = "ambient";
        this.innerAudioContext.onPlay(() => {
          console.log('开始播放');
        });
        this.innerAudioContext.onError((res) => {
          console.log(res.errMsg);
          console.log(res.errCode);
        }); */
        // this.$refs.webview.evalJs("backgroundVoice()");

        backgroundVoice();
      }
    }),
    backgroundVoiceStop: function (_backgroundVoiceStop) {
      function backgroundVoiceStop() {
        return _backgroundVoiceStop.apply(this, arguments);
      }
      backgroundVoiceStop.toString = function () {
        return _backgroundVoiceStop.toString();
      };
      return backgroundVoiceStop;
    }(function () {
      /* if(this.innerAudioContext){
      	this.innerAudioContext.destroy();
      } */
      // this.$refs.webview.evalJs("backgroundVoiceStop()");
      backgroundVoiceStop();
    }),
    btnVoice: function btnVoice() {
      if (this.$store.state.gameSet.volume) {
        // this.$refs.webview.evalJs("caozuodianjiVoice()");
        caozuodianjiVoice();
      }
    },
    xiazhuaVoice: function (_xiazhuaVoice) {
      function xiazhuaVoice() {
        return _xiazhuaVoice.apply(this, arguments);
      }
      xiazhuaVoice.toString = function () {
        return _xiazhuaVoice.toString();
      };
      return xiazhuaVoice;
    }(function () {
      if (this.$store.state.gameSet.volume) {
        // this.$refs.webview.evalJs("xiazhuaVoice()");
        xiazhuaVoice();
      }
    }),
    readygoVoice: function (_readygoVoice) {
      function readygoVoice() {
        return _readygoVoice.apply(this, arguments);
      }
      readygoVoice.toString = function () {
        return _readygoVoice.toString();
      };
      return readygoVoice;
    }(function () {
      if (this.$store.state.gameSet.volume) {
        // this.$refs.webview.evalJs("readygoVoice()");
        readygoVoice();
      }
    }),
    gameSuccessVoice: function (_gameSuccessVoice) {
      function gameSuccessVoice() {
        return _gameSuccessVoice.apply(this, arguments);
      }
      gameSuccessVoice.toString = function () {
        return _gameSuccessVoice.toString();
      };
      return gameSuccessVoice;
    }(function () {
      if (this.$store.state.gameSet.volume) {
        // this.$refs.webview.evalJs("gameSuccessVoice()");
        gameSuccessVoice();
      }
    }),
    gameFailVoice: function (_gameFailVoice) {
      function gameFailVoice() {
        return _gameFailVoice.apply(this, arguments);
      }
      gameFailVoice.toString = function () {
        return _gameFailVoice.toString();
      };
      return gameFailVoice;
    }(function () {
      if (this.$store.state.gameSet.volume) {
        // this.$refs.webview.evalJs("gameFailVoice()");
        gameFailVoice();
      }
    }),
    daoninleVoice: function (_daoninleVoice) {
      function daoninleVoice() {
        return _daoninleVoice.apply(this, arguments);
      }
      daoninleVoice.toString = function () {
        return _daoninleVoice.toString();
      };
      return daoninleVoice;
    }(function () {
      if (this.$store.state.gameSet.volume) {
        // this.$refs.webview.evalJs("daoninleVoice()");
        daoninleVoice();
      }
    }),
    changeVolume: function changeVolume() {
      this.$store.state.gameSet.volume = !this.$store.state.gameSet.volume;
      if (this.$store.state.gameSet.volume) {
        this.backgroundVoice();
        // this.$refs.webview.evalJs("backgroundVoice()");
        backgroundVoice();
      } else {
        this.backgroundVoiceStop();
        // this.$refs.webview.evalJs("backgroundVoiceStop()");
        backgroundVoiceStop();
      }
    },
    setPlayVideoInterval: function setPlayVideoInterval() {
      var _this15 = this;
      try {
        this.clearPlayVideoInterval();
        var i = 0;
        this.playVideoTimer = setInterval(function () {
          i++;
          _this15.videoPlayer.stop();
          _this15.videoPlayer.clearView();
          _this15.videoPlayer.start(_this15.video);
          if (i == 30) {
            _this15.clearPlayVideoInterval();
          }
        }, 500);
      } catch (e) {
        console.log(e);
      }
    },
    clearPlayVideoInterval: function clearPlayVideoInterval() {
      if (this.playVideoTimer) {
        clearInterval(this.playVideoTimer);
        this.playVideoTimer = null;
      }
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 352:
/*!************************************************************************************************!*\
  !*** /Users/cengjunwei/Desktop/uniwwj/pages/machine/game.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./game.vue?vue&type=style&index=0&lang=css& */ 353);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 353:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/cengjunwei/Desktop/uniwwj/pages/machine/game.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[344,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-toutiao/pages/machine/game.js.map