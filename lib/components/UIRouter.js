"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PropTypes = require("prop-types");
var index_1 = require("../index");
var core_1 = require("@uirouter/core");
/** @hidden */
var InstanceOrPluginsMissingError = new Error("Router instance or plugins missing.\nYou must either provide a location plugin via the plugins prop:\n\n<UIRouter plugins={[pushStateLocationPlugin]} states={[\u00B7\u00B7\u00B7]}>\n  <UIView />\n</UIRouter>\n\nor initialize the router yourself and pass the instance via props:\n\nconst router = new UIRouterReact();\nrouter.plugin(pushStateLocationPlugin);\n\u00B7\u00B7\u00B7\n<UIRouter router={router}>\n  <UIView />\n</UIRouter>\n");
var UIRouter = (function (_super) {
    __extends(UIRouter, _super);
    function UIRouter(props, context) {
        var _this = _super.call(this, props, context) || this;
        // check if a router instance is provided
        if (props.router) {
            _this.router = props.router;
        }
        else if (props.plugins) {
            _this.router = new index_1.UIRouterReact();
            _this.router.plugin(core_1.servicesPlugin);
            props.plugins.forEach(function (plugin) { return _this.router.plugin(plugin); });
            if (props.config)
                props.config(_this.router);
            (props.states || []).forEach(function (state) { return _this.router.stateRegistry.register(state); });
        }
        else {
            throw InstanceOrPluginsMissingError;
        }
        _this.router.start();
        return _this;
    }
    UIRouter.prototype.getChildContext = function () {
        return { router: this.router };
    };
    UIRouter.prototype.render = function () {
        return react_1.Children.only(this.props.children);
    };
    UIRouter.propTypes = {
        plugins: PropTypes.arrayOf(PropTypes.func),
        states: PropTypes.arrayOf(PropTypes.object),
        config: PropTypes.func,
        children: PropTypes.element.isRequired,
        router: PropTypes.object,
    };
    UIRouter.childContextTypes = {
        router: PropTypes.object.isRequired
    };
    return UIRouter;
}(react_1.Component));
exports.UIRouter = UIRouter;
//# sourceMappingURL=UIRouter.js.map