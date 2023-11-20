var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AwesomeCordovaNativePlugin, cordovaPropertyGet, cordovaPropertySet, cordova } from '@awesome-cordova-plugins/core';
import { Observable } from 'rxjs';
var ScreenOrientationOriginal = /** @class */ (function (_super) {
    __extends(ScreenOrientationOriginal, _super);
    function ScreenOrientationOriginal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Convenience enum for possible orientations
         */
        _this.ORIENTATIONS = {
            PORTRAIT_PRIMARY: 'portrait-primary',
            PORTRAIT_SECONDARY: 'portrait-secondary',
            LANDSCAPE_PRIMARY: 'landscape-primary',
            LANDSCAPE_SECONDARY: 'landscape-secondary',
            PORTRAIT: 'portrait',
            LANDSCAPE: 'landscape',
            ANY: 'any',
        };
        return _this;
    }
    ScreenOrientationOriginal.prototype.onChange = function () { return cordova(this, "onChange", { "eventObservable": true, "event": "orientationchange", "element": "window" }, arguments); };
    ScreenOrientationOriginal.prototype.lock = function (orientation) { return cordova(this, "lock", { "otherPromise": true }, arguments); };
    ScreenOrientationOriginal.prototype.unlock = function () { return cordova(this, "unlock", { "sync": true }, arguments); };
    Object.defineProperty(ScreenOrientationOriginal.prototype, "type", {
        get: function () { return cordovaPropertyGet(this, "type"); },
        set: function (value) { cordovaPropertySet(this, "type", value); },
        enumerable: false,
        configurable: true
    });
    ScreenOrientationOriginal.pluginName = "ScreenOrientation";
    ScreenOrientationOriginal.plugin = "cordova-plugin-screen-orientation";
    ScreenOrientationOriginal.pluginRef = "screen.orientation";
    ScreenOrientationOriginal.repo = "https://github.com/apache/cordova-plugin-screen-orientation";
    ScreenOrientationOriginal.platforms = ["Android", "iOS", "Windows"];
    return ScreenOrientationOriginal;
}(AwesomeCordovaNativePlugin));
var ScreenOrientation = new ScreenOrientationOriginal();
export { ScreenOrientation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL3BsdWdpbnMvc2NyZWVuLW9yaWVudGF0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sK0VBQWdFLE1BQU0sK0JBQStCLENBQUM7QUFDN0csT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7SUF3REsscUNBQTBCOzs7UUFDL0Q7O1dBRUc7UUFDSCxrQkFBWSxHQUFHO1lBQ2IsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLGtCQUFrQixFQUFFLG9CQUFvQjtZQUN4QyxpQkFBaUIsRUFBRSxtQkFBbUI7WUFDdEMsbUJBQW1CLEVBQUUscUJBQXFCO1lBQzFDLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLEdBQUcsRUFBRSxLQUFLO1NBQ1gsQ0FBQzs7O0lBV0Ysb0NBQVE7SUFZUixnQ0FBSSxhQUFDLFdBQW1CO0lBUXhCLGtDQUFNOzBCQU1OLG1DQUFJOzs7Ozs7Ozs7Ozs0QkEzR047RUEwRHVDLDBCQUEwQjtTQUFwRCxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBDb3Jkb3ZhUHJvcGVydHksIEF3ZXNvbWVDb3Jkb3ZhTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAYXdlc29tZS1jb3Jkb3ZhLXBsdWdpbnMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQG5hbWUgU2NyZWVuIE9yaWVudGF0aW9uXG4gKiBAcHJlbWllciBzY3JlZW4tb3JpZW50YXRpb25cbiAqIEBkZXNjcmlwdGlvblxuICogQ29yZG92YSBwbHVnaW4gdG8gc2V0L2xvY2sgdGhlIHNjcmVlbiBvcmllbnRhdGlvbiBpbiBhIGNvbW1vbiB3YXkuXG4gKlxuICogUmVxdWlyZXMgQ29yZG92YSBwbHVnaW46IGBjb3Jkb3ZhLXBsdWdpbi1zY3JlZW4tb3JpZW50YXRpb25gLiBGb3IgbW9yZSBpbmZvLCBwbGVhc2Ugc2VlIHRoZSBbU2NyZWVuIE9yaWVudGF0aW9uIHBsdWdpbiBkb2NzXShodHRwczovL2dpdGh1Yi5jb20vYXBhY2hlL2NvcmRvdmEtcGx1Z2luLXNjcmVlbi1vcmllbnRhdGlvbikuXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IFNjcmVlbk9yaWVudGF0aW9uIH0gZnJvbSAnQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL3NjcmVlbi1vcmllbnRhdGlvbi9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgc2NyZWVuT3JpZW50YXRpb246IFNjcmVlbk9yaWVudGF0aW9uKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKlxuICogLy8gZ2V0IGN1cnJlbnRcbiAqIGNvbnNvbGUubG9nKHRoaXMuc2NyZWVuT3JpZW50YXRpb24udHlwZSk7IC8vIGxvZ3MgdGhlIGN1cnJlbnQgb3JpZW50YXRpb24sIGV4YW1wbGU6ICdsYW5kc2NhcGUnXG4gKlxuICogLy8gc2V0IHRvIGxhbmRzY2FwZVxuICogdGhpcy5zY3JlZW5PcmllbnRhdGlvbi5sb2NrKHRoaXMuc2NyZWVuT3JpZW50YXRpb24uT1JJRU5UQVRJT05TLkxBTkRTQ0FQRSk7XG4gKlxuICogLy8gYWxsb3cgdXNlciByb3RhdGVcbiAqIHRoaXMuc2NyZWVuT3JpZW50YXRpb24udW5sb2NrKCk7XG4gKlxuICogLy8gZGV0ZWN0IG9yaWVudGF0aW9uIGNoYW5nZXNcbiAqIHRoaXMuc2NyZWVuT3JpZW50YXRpb24ub25DaGFuZ2UoKS5zdWJzY3JpYmUoXG4gKiAgICAoKSA9PiB7XG4gKiAgICAgICAgY29uc29sZS5sb2coXCJPcmllbnRhdGlvbiBDaGFuZ2VkXCIpO1xuICogICAgfVxuICogKTtcbiAqXG4gKiBgYGBcbiAqIEBhZHZhbmNlZFxuICpcbiAqIEFjY2VwdGVkIG9yaWVudGF0aW9uIHZhbHVlczpcbiAqXG4gKiB8IFZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgIHwgRGVzY3JpcHRpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IHBvcnRyYWl0LXByaW1hcnkgICAgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGluIHRoZSBwcmltYXJ5IHBvcnRyYWl0IG1vZGUuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IHBvcnRyYWl0LXNlY29uZGFyeSAgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGluIHRoZSBzZWNvbmRhcnkgcG9ydHJhaXQgbW9kZS4gICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IGxhbmRzY2FwZS1wcmltYXJ5ICAgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGluIHRoZSBwcmltYXJ5IGxhbmRzY2FwZSBtb2RlLiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IGxhbmRzY2FwZS1zZWNvbmRhcnkgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGluIHRoZSBzZWNvbmRhcnkgbGFuZHNjYXBlIG1vZGUuICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IHBvcnRyYWl0ICAgICAgICAgICAgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGVpdGhlciBwb3J0cmFpdC1wcmltYXJ5IG9yIHBvcnRyYWl0LXNlY29uZGFyeSAoc2Vuc29yKS4gICB8XG4gKiB8IGxhbmRzY2FwZSAgICAgICAgICAgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGVpdGhlciBsYW5kc2NhcGUtcHJpbWFyeSBvciBsYW5kc2NhcGUtc2Vjb25kYXJ5IChzZW5zb3IpLiB8XG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnU2NyZWVuT3JpZW50YXRpb24nLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1zY3JlZW4tb3JpZW50YXRpb24nLFxuICBwbHVnaW5SZWY6ICdzY3JlZW4ub3JpZW50YXRpb24nLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2FwYWNoZS9jb3Jkb3ZhLXBsdWdpbi1zY3JlZW4tb3JpZW50YXRpb24nLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdpT1MnLCAnV2luZG93cyddLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY3JlZW5PcmllbnRhdGlvbiBleHRlbmRzIEF3ZXNvbWVDb3Jkb3ZhTmF0aXZlUGx1Z2luIHtcbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIGVudW0gZm9yIHBvc3NpYmxlIG9yaWVudGF0aW9uc1xuICAgKi9cbiAgT1JJRU5UQVRJT05TID0ge1xuICAgIFBPUlRSQUlUX1BSSU1BUlk6ICdwb3J0cmFpdC1wcmltYXJ5JyxcbiAgICBQT1JUUkFJVF9TRUNPTkRBUlk6ICdwb3J0cmFpdC1zZWNvbmRhcnknLFxuICAgIExBTkRTQ0FQRV9QUklNQVJZOiAnbGFuZHNjYXBlLXByaW1hcnknLFxuICAgIExBTkRTQ0FQRV9TRUNPTkRBUlk6ICdsYW5kc2NhcGUtc2Vjb25kYXJ5JyxcbiAgICBQT1JUUkFJVDogJ3BvcnRyYWl0JyxcbiAgICBMQU5EU0NBUEU6ICdsYW5kc2NhcGUnLFxuICAgIEFOWTogJ2FueScsXG4gIH07XG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gb3JpZW50YXRpb24gY2hhbmdlIGV2ZW50XG4gICAqXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPHZvaWQ+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGV2ZW50T2JzZXJ2YWJsZTogdHJ1ZSxcbiAgICBldmVudDogJ29yaWVudGF0aW9uY2hhbmdlJyxcbiAgICBlbGVtZW50OiAnd2luZG93JyxcbiAgfSlcbiAgb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIExvY2sgdGhlIG9yaWVudGF0aW9uIHRvIHRoZSBwYXNzZWQgdmFsdWUuXG4gICAqIFNlZSBiZWxvdyBmb3IgYWNjZXB0ZWQgdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSBvcmllbnRhdGlvbiB7c3RyaW5nfSBUaGUgb3JpZW50YXRpb24gd2hpY2ggc2hvdWxkIGJlIGxvY2tlZC4gQWNjZXB0ZWQgdmFsdWVzIHNlZSB0YWJsZSBhYm92ZS5cbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKHsgb3RoZXJQcm9taXNlOiB0cnVlIH0pXG4gIGxvY2sob3JpZW50YXRpb246IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFVubG9jayBhbmQgYWxsb3cgYWxsIG9yaWVudGF0aW9ucy5cbiAgICovXG4gIEBDb3Jkb3ZhKHsgc3luYzogdHJ1ZSB9KVxuICB1bmxvY2soKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgb3JpZW50YXRpb24gb2YgdGhlIGRldmljZS5cbiAgICovXG4gIEBDb3Jkb3ZhUHJvcGVydHkoKVxuICB0eXBlOiBzdHJpbmc7XG59XG4iXX0=