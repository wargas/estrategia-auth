module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/auth.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/auth.js":
/*!***************************!*\
  !*** ./pages/api/auth.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handler; });
/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chrome-aws-lambda */ "chrome-aws-lambda");
/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var puppeteer_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! puppeteer-core */ "puppeteer-core");
/* harmony import */ var puppeteer_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(puppeteer_core__WEBPACK_IMPORTED_MODULE_1__);


async function handler(req, res) {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    res.send({
      message: 'email ou senha invalidos'
    });
  }

  try {
    const isDev = !process.env.AWS_REGION;
    let options;

    if (isDev) {
      options = {
        args: [],
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        headless: true,
        ignoreHTTPSErrors: true
      };
    } else {
      options = {
        args: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default.a.args,
        executablePath: await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default.a.executablePath,
        headless: true,
        ignoreHTTPSErrors: true
      };
    }

    const browser = await puppeteer_core__WEBPACK_IMPORTED_MODULE_1___default.a.launch(options);
    let page = await browser.newPage(); // await page.setRequestInterception(true);

    page.on('request', request => {
      const url = request.url();

      if (request.method() === 'GET' && url.match('api/aluno/curso')) {
        const {
          authorization: token = ''
        } = request.headers();
        res.send({
          token
        });
      }

      if (url.match('loja/entrar')) {
        res.send({
          message: 'email ou senha invalidos'
        });
      }
    });
    await page.goto('https://www.estrategiaconcursos.com.br/');
    await page.click('.button-header');
    await page.type('[name=email]', 'wargasteixeira@hotmail.com');
    await page.type('[name=senha]', 'Wrgs2703!');
    await page.click('.ui-control [type=submit]');
    await page.waitForNavigation();
    await page.waitForNavigation();
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify(error));
  }
}

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chrome-aws-lambda");

/***/ }),

/***/ "puppeteer-core":
/*!*********************************!*\
  !*** external "puppeteer-core" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puppeteer-core");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2F1dGguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hyb21lLWF3cy1sYW1iZGFcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwdXBwZXRlZXItY29yZVwiIl0sIm5hbWVzIjpbImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJlbWFpbCIsInBhc3N3b3JkIiwiYm9keSIsInNlbmQiLCJtZXNzYWdlIiwiaXNEZXYiLCJwcm9jZXNzIiwiZW52IiwiQVdTX1JFR0lPTiIsIm9wdGlvbnMiLCJhcmdzIiwiZXhlY3V0YWJsZVBhdGgiLCJoZWFkbGVzcyIsImlnbm9yZUhUVFBTRXJyb3JzIiwiY2hyb21pdW0iLCJicm93c2VyIiwicHVwcGV0ZWVyIiwibGF1bmNoIiwicGFnZSIsIm5ld1BhZ2UiLCJvbiIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJtYXRjaCIsImF1dGhvcml6YXRpb24iLCJ0b2tlbiIsImhlYWRlcnMiLCJnb3RvIiwiY2xpY2siLCJ0eXBlIiwid2FpdEZvck5hdmlnYXRpb24iLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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S0FBZixDQUFUO0FBQ0g7QUFHSixDOzs7Ozs7Ozs7OztBQ3JFRCw4Qzs7Ozs7Ozs7Ozs7QUNBQSwyQyIsImZpbGUiOiJwYWdlcy9hcGkvYXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHR2YXIgdGhyZXcgPSB0cnVlO1xuIFx0XHR0cnkge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRcdHRocmV3ID0gZmFsc2U7XG4gXHRcdH0gZmluYWxseSB7XG4gXHRcdFx0aWYodGhyZXcpIGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGFnZXMvYXBpL2F1dGguanNcIik7XG4iLCJpbXBvcnQgY2hyb21pdW0gZnJvbSAnY2hyb21lLWF3cy1sYW1iZGEnO1xyXG5pbXBvcnQgcHVwcGV0ZWVyIGZyb20gJ3B1cHBldGVlci1jb3JlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuXHJcbiAgICBjb25zdCB7ZW1haWwsIHBhc3N3b3JkfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIGlmKCFlbWFpbCB8fCAhcGFzc3dvcmQpIHtcclxuICAgICAgICByZXMuc2VuZCh7bWVzc2FnZTogJ2VtYWlsIG91IHNlbmhhIGludmFsaWRvcyd9KVxyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgaXNEZXYgPSAhcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTjtcclxuICAgICAgICBsZXQgb3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKGlzRGV2KSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBhcmdzOiBbXSxcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGFibGVQYXRoOiBcIkM6XFxcXFByb2dyYW0gRmlsZXMgKHg4NilcXFxcR29vZ2xlXFxcXENocm9tZVxcXFxBcHBsaWNhdGlvblxcXFxjaHJvbWUuZXhlXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkbGVzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGlnbm9yZUhUVFBTRXJyb3JzOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGFyZ3M6IGNocm9taXVtLmFyZ3MsXHJcbiAgICAgICAgICAgICAgICBleGVjdXRhYmxlUGF0aDogYXdhaXQgY2hyb21pdW0uZXhlY3V0YWJsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBoZWFkbGVzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGlnbm9yZUhUVFBTRXJyb3JzOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBicm93c2VyID0gYXdhaXQgcHVwcGV0ZWVyLmxhdW5jaChvcHRpb25zKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcGFnZSA9IGF3YWl0IGJyb3dzZXIubmV3UGFnZSgpO1xyXG4gICAgICAgIC8vIGF3YWl0IHBhZ2Uuc2V0UmVxdWVzdEludGVyY2VwdGlvbih0cnVlKTtcclxuXHJcbiAgICAgICAgcGFnZS5vbigncmVxdWVzdCcsIHJlcXVlc3QgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB1cmwgPSByZXF1ZXN0LnVybCgpO1xyXG5cclxuICAgICAgICAgICAgaWYocmVxdWVzdC5tZXRob2QoKSA9PT0gJ0dFVCcgJiYgdXJsLm1hdGNoKCdhcGkvYWx1bm8vY3Vyc28nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHthdXRob3JpemF0aW9uOiB0b2tlbiA9ICcnfSA9IHJlcXVlc3QuaGVhZGVycygpXHJcblxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoe3Rva2VufSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodXJsLm1hdGNoKCdsb2phL2VudHJhcicpKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7bWVzc2FnZTogJ2VtYWlsIG91IHNlbmhhIGludmFsaWRvcyd9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgYXdhaXQgcGFnZS5nb3RvKCdodHRwczovL3d3dy5lc3RyYXRlZ2lhY29uY3Vyc29zLmNvbS5ici8nKTtcclxuXHJcbiAgICAgICAgYXdhaXQgcGFnZS5jbGljaygnLmJ1dHRvbi1oZWFkZXInKTtcclxuICAgICAgICBhd2FpdCBwYWdlLnR5cGUoJ1tuYW1lPWVtYWlsXScsICd3YXJnYXN0ZWl4ZWlyYUBob3RtYWlsLmNvbScpXHJcbiAgICAgICAgYXdhaXQgcGFnZS50eXBlKCdbbmFtZT1zZW5oYV0nLCAnV3JnczI3MDMhJylcclxuXHJcbiAgICAgICAgYXdhaXQgcGFnZS5jbGljaygnLnVpLWNvbnRyb2wgW3R5cGU9c3VibWl0XScpXHJcbiAgICAgICAgXHJcbiAgICAgICAgYXdhaXQgcGFnZS53YWl0Rm9yTmF2aWdhdGlvbigpO1xyXG4gICAgICAgXHJcbiAgICAgICAgYXdhaXQgcGFnZS53YWl0Rm9yTmF2aWdhdGlvbigpO1xyXG5cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgcmVzLnNlbmQoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKVxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaHJvbWUtYXdzLWxhbWJkYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY29yZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9