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
    res.end({
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
    let page = await browser.newPage();
    await page.goto('https://www.estrategiaconcursos.com.br/');
    await page.click('.button-header');
    await page.type('[name=email]', email);
    await page.type('[name=senha]', password);
    await page.click('.ui-control [type=submit]');
    await page.waitForNavigation();
    await page.goto('https://www.estrategiaconcursos.com.br/oauth/token/');
    const body = await page.evaluate(() => {
      return {
        body: document.body.textContent
      };
    });
    res.end(body.body);
  } catch (error) {
    console.log(error);
    res.end(JSON.stringify(error));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2F1dGguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hyb21lLWF3cy1sYW1iZGFcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwdXBwZXRlZXItY29yZVwiIl0sIm5hbWVzIjpbImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJlbWFpbCIsInBhc3N3b3JkIiwiYm9keSIsImVuZCIsIm1lc3NhZ2UiLCJpc0RldiIsInByb2Nlc3MiLCJlbnYiLCJBV1NfUkVHSU9OIiwib3B0aW9ucyIsImFyZ3MiLCJleGVjdXRhYmxlUGF0aCIsImhlYWRsZXNzIiwiaWdub3JlSFRUUFNFcnJvcnMiLCJjaHJvbWl1bSIsImJyb3dzZXIiLCJwdXBwZXRlZXIiLCJsYXVuY2giLCJwYWdlIiwibmV3UGFnZSIsImdvdG8iLCJjbGljayIsInR5cGUiLCJ3YWl0Rm9yTmF2aWdhdGlvbiIsImV2YWx1YXRlIiwiZG9jdW1lbnQiLCJ0ZXh0Q29udGVudCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4RkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVlLGVBQWVBLE9BQWYsQ0FBdUJDLEdBQXZCLEVBQTRCQyxHQUE1QixFQUFpQztBQUU1QyxRQUFNO0FBQUNDLFNBQUQ7QUFBUUM7QUFBUixNQUFvQkgsR0FBRyxDQUFDSSxJQUE5Qjs7QUFFQSxNQUFHLENBQUNGLEtBQUQsSUFBVSxDQUFDQyxRQUFkLEVBQXdCO0FBQ3BCRixPQUFHLENBQUNJLEdBQUosQ0FBUTtBQUFDQyxhQUFPLEVBQUU7QUFBVixLQUFSO0FBQ0g7O0FBRUQsTUFBSTtBQUNBLFVBQU1DLEtBQUssR0FBRyxDQUFDQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsVUFBM0I7QUFDQSxRQUFJQyxPQUFKOztBQUVBLFFBQUlKLEtBQUosRUFBVztBQUNQSSxhQUFPLEdBQUc7QUFDTkMsWUFBSSxFQUFFLEVBREE7QUFFTkMsc0JBQWMsRUFBRSxrRUFGVjtBQUdOQyxnQkFBUSxFQUFFLElBSEo7QUFJTkMseUJBQWlCLEVBQUU7QUFKYixPQUFWO0FBTUgsS0FQRCxNQU9PO0FBQ0hKLGFBQU8sR0FBRztBQUNOQyxZQUFJLEVBQUVJLHdEQUFRLENBQUNKLElBRFQ7QUFFTkMsc0JBQWMsRUFBRSxNQUFNRyx3REFBUSxDQUFDSCxjQUZ6QjtBQUdOQyxnQkFBUSxFQUFFLElBSEo7QUFJTkMseUJBQWlCLEVBQUU7QUFKYixPQUFWO0FBTUg7O0FBRUQsVUFBTUUsT0FBTyxHQUFHLE1BQU1DLHFEQUFTLENBQUNDLE1BQVYsQ0FBaUJSLE9BQWpCLENBQXRCO0FBRUEsUUFBSVMsSUFBSSxHQUFHLE1BQU1ILE9BQU8sQ0FBQ0ksT0FBUixFQUFqQjtBQUdBLFVBQU1ELElBQUksQ0FBQ0UsSUFBTCxDQUFVLHlDQUFWLENBQU47QUFFQSxVQUFNRixJQUFJLENBQUNHLEtBQUwsQ0FBVyxnQkFBWCxDQUFOO0FBQ0EsVUFBTUgsSUFBSSxDQUFDSSxJQUFMLENBQVUsY0FBVixFQUEwQnRCLEtBQTFCLENBQU47QUFDQSxVQUFNa0IsSUFBSSxDQUFDSSxJQUFMLENBQVUsY0FBVixFQUEwQnJCLFFBQTFCLENBQU47QUFFQSxVQUFNaUIsSUFBSSxDQUFDRyxLQUFMLENBQVcsMkJBQVgsQ0FBTjtBQUVBLFVBQU1ILElBQUksQ0FBQ0ssaUJBQUwsRUFBTjtBQUVBLFVBQU1MLElBQUksQ0FBQ0UsSUFBTCxDQUFVLHFEQUFWLENBQU47QUFFQSxVQUFNbEIsSUFBSSxHQUFHLE1BQU1nQixJQUFJLENBQUNNLFFBQUwsQ0FBYyxNQUFNO0FBQ25DLGFBQU87QUFDSHRCLFlBQUksRUFBRXVCLFFBQVEsQ0FBQ3ZCLElBQVQsQ0FBY3dCO0FBRGpCLE9BQVA7QUFHSCxLQUprQixDQUFuQjtBQU1BM0IsT0FBRyxDQUFDSSxHQUFKLENBQVFELElBQUksQ0FBQ0EsSUFBYjtBQUVILEdBN0NELENBNkNFLE9BQU95QixLQUFQLEVBQWM7QUFDWkMsV0FBTyxDQUFDQyxHQUFSLENBQVlGLEtBQVo7QUFDQTVCLE9BQUcsQ0FBQ0ksR0FBSixDQUFRMkIsSUFBSSxDQUFDQyxTQUFMLENBQWVKLEtBQWYsQ0FBUjtBQUNIO0FBR0osQzs7Ozs7Ozs7Ozs7QUM5REQsOEM7Ozs7Ozs7Ozs7O0FDQUEsMkMiLCJmaWxlIjoicGFnZXMvYXBpL2F1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uLy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL2FwaS9hdXRoLmpzXCIpO1xuIiwiaW1wb3J0IGNocm9taXVtIGZyb20gJ2Nocm9tZS1hd3MtbGFtYmRhJztcclxuaW1wb3J0IHB1cHBldGVlciBmcm9tICdwdXBwZXRlZXItY29yZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcblxyXG4gICAgY29uc3Qge2VtYWlsLCBwYXNzd29yZH0gPSByZXEuYm9keTtcclxuXHJcbiAgICBpZighZW1haWwgfHwgIXBhc3N3b3JkKSB7XHJcbiAgICAgICAgcmVzLmVuZCh7bWVzc2FnZTogJ2VtYWlsIG91IHNlbmhhIGludmFsaWRvcyd9KVxyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgaXNEZXYgPSAhcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTjtcclxuICAgICAgICBsZXQgb3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKGlzRGV2KSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBhcmdzOiBbXSxcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGFibGVQYXRoOiBcIkM6XFxcXFByb2dyYW0gRmlsZXMgKHg4NilcXFxcR29vZ2xlXFxcXENocm9tZVxcXFxBcHBsaWNhdGlvblxcXFxjaHJvbWUuZXhlXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkbGVzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGlnbm9yZUhUVFBTRXJyb3JzOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGFyZ3M6IGNocm9taXVtLmFyZ3MsXHJcbiAgICAgICAgICAgICAgICBleGVjdXRhYmxlUGF0aDogYXdhaXQgY2hyb21pdW0uZXhlY3V0YWJsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBoZWFkbGVzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGlnbm9yZUhUVFBTRXJyb3JzOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBicm93c2VyID0gYXdhaXQgcHVwcGV0ZWVyLmxhdW5jaChvcHRpb25zKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcGFnZSA9IGF3YWl0IGJyb3dzZXIubmV3UGFnZSgpO1xyXG5cclxuICAgICAgXHJcbiAgICAgICAgYXdhaXQgcGFnZS5nb3RvKCdodHRwczovL3d3dy5lc3RyYXRlZ2lhY29uY3Vyc29zLmNvbS5ici8nKTtcclxuICAgICAgXHJcbiAgICAgICAgYXdhaXQgcGFnZS5jbGljaygnLmJ1dHRvbi1oZWFkZXInKTtcclxuICAgICAgICBhd2FpdCBwYWdlLnR5cGUoJ1tuYW1lPWVtYWlsXScsIGVtYWlsKVxyXG4gICAgICAgIGF3YWl0IHBhZ2UudHlwZSgnW25hbWU9c2VuaGFdJywgcGFzc3dvcmQpXHJcblxyXG4gICAgICAgIGF3YWl0IHBhZ2UuY2xpY2soJy51aS1jb250cm9sIFt0eXBlPXN1Ym1pdF0nKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGF3YWl0IHBhZ2Uud2FpdEZvck5hdmlnYXRpb24oKTtcclxuICAgICAgIFxyXG4gICAgICAgIGF3YWl0IHBhZ2UuZ290bygnaHR0cHM6Ly93d3cuZXN0cmF0ZWdpYWNvbmN1cnNvcy5jb20uYnIvb2F1dGgvdG9rZW4vJylcclxuXHJcbiAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHBhZ2UuZXZhbHVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYm9keTogZG9jdW1lbnQuYm9keS50ZXh0Q29udGVudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmVzLmVuZChib2R5LmJvZHkpXHJcblxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KGVycm9yKSlcclxuICAgIH1cclxuXHJcblxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hyb21lLWF3cy1sYW1iZGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWNvcmVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==