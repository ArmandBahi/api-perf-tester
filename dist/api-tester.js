"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APITester = void 0;
var axios_1 = __importDefault(require("axios"));
var https_1 = __importDefault(require("https"));
var APITester = /** @class */ (function () {
    function APITester(properties) {
        this.properties = properties;
    }
    /**
     * Starts the test
     */
    APITester.prototype.startTest = function () {
        if (this.properties.scenario) {
            this.runScenario_({
                scenario: this.properties.scenario,
            });
        }
        else if (this.properties.url) {
            this.runRequest_({
                url: this.properties.url,
                headers: this.properties.headers,
                method: this.properties.method,
                params: this.properties.params,
            });
        }
    };
    APITester.prototype.runScenario_ = function (scenario) {
        console.log('runScenario_', scenario);
    };
    /**
     * Runs a request
     * @param opt_options
     */
    APITester.prototype.runRequest_ = function (opt_options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var oAxiosInstanceServer, params, res, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('runRequest_', opt_options);
                        oAxiosInstanceServer = axios_1.default.create({
                            httpsAgent: new https_1.default.Agent({
                                rejectUnauthorized: false
                            }),
                            headers: (_a = opt_options.headers) !== null && _a !== void 0 ? _a : {},
                        });
                        params = {
                            method: opt_options.method ? opt_options.method.toLowerCase() : 'get',
                            url: opt_options.url,
                        };
                        if (opt_options.params) {
                            if (params.method === 'get') {
                                params.params = opt_options.params;
                            }
                            else {
                                params.data = opt_options.params;
                            }
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, oAxiosInstanceServer(params)];
                    case 2:
                        res = _b.sent();
                        console.log('Request ok', res.data);
                        return [2 /*return*/, res];
                    case 3:
                        err_1 = _b.sent();
                        console.log('Request failed', err_1, err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return APITester;
}());
exports.APITester = APITester;
//# sourceMappingURL=api-tester.js.map