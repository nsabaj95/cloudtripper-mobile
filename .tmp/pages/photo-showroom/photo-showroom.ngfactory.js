/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/linker/element';
import * as import3 from './photo-showroom';
import * as import4 from '@angular/core/src/linker/view_utils';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/change_detection';
import * as import8 from 'ionic-angular/navigation/nav-controller';
import * as import9 from 'ionic-angular/navigation/nav-params';
import * as import10 from '@angular/platform-browser/src/security/dom_sanitization_service';
import * as import11 from '@angular/core/src/metadata/view';
import * as import12 from '@angular/core/src/linker/component_factory';
import * as import13 from 'ionic-angular/components/toolbar/toolbar';
import * as import14 from 'ionic-angular/components/navbar/navbar';
import * as import15 from 'ionic-angular/components/menu/menu-toggle';
import * as import16 from 'ionic-angular/components/toolbar/toolbar-item';
import * as import17 from '@angular/core/src/linker/query_list';
import * as import18 from 'ionic-angular/components/icon/icon';
import * as import19 from 'ionic-angular/components/toolbar/toolbar-title';
import * as import20 from 'ionic-angular/components/content/content';
import * as import21 from 'ionic-angular/components/slides/slides';
import * as import22 from '@angular/common/src/directives/ng_for';
import * as import23 from 'ionic-angular/config/config';
import * as import24 from '@angular/core/src/linker/element_ref';
import * as import25 from 'ionic-angular/navigation/view-controller';
import * as import26 from '../../node_modules/ionic-angular/components/navbar/navbar.ngfactory';
import * as import27 from 'ionic-angular/components/app/app';
import * as import28 from 'ionic-angular/components/menu/menu-controller';
import * as import29 from '../../node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory';
import * as import30 from '../../node_modules/ionic-angular/components/content/content.ngfactory';
import * as import31 from 'ionic-angular/util/keyboard';
import * as import32 from '@angular/core/src/zone/ng_zone';
import * as import33 from 'ionic-angular/components/tabs/tabs';
import * as import34 from '../../node_modules/ionic-angular/components/slides/slides.ngfactory';
import * as import35 from '@angular/core/src/linker/template_ref';
import * as import36 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import37 from '@angular/core/src/security';
var renderType_PhotoShowroomPage_Host = null;
var _View_PhotoShowroomPage_Host0 = (function (_super) {
    __extends(_View_PhotoShowroomPage_Host0, _super);
    function _View_PhotoShowroomPage_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_PhotoShowroomPage_Host0, renderType_PhotoShowroomPage_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_PhotoShowroomPage_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = this.selectOrCreateHostElement('ng-component', rootSelector, null);
        this._appEl_0 = new import2.AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_PhotoShowroomPage0(this.viewUtils, this.injector(0), this._appEl_0);
        this._PhotoShowroomPage_0_4 = new import3.PhotoShowroomPage(this.parentInjector.get(import8.NavController), this.parentInjector.get(import9.NavParams), this.parentInjector.get(import10.DomSanitizer));
        this._appEl_0.initComponent(this._PhotoShowroomPage_0_4, [], compView_0);
        compView_0.create(this._PhotoShowroomPage_0_4, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_PhotoShowroomPage_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import3.PhotoShowroomPage) && (0 === requestNodeIndex))) {
            return this._PhotoShowroomPage_0_4;
        }
        return notFoundResult;
    };
    return _View_PhotoShowroomPage_Host0;
}(import1.AppView));
function viewFactory_PhotoShowroomPage_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_PhotoShowroomPage_Host === null)) {
        (renderType_PhotoShowroomPage_Host = viewUtils.createRenderComponentType('', 0, import11.ViewEncapsulation.None, [], {}));
    }
    return new _View_PhotoShowroomPage_Host0(viewUtils, parentInjector, declarationEl);
}
export var PhotoShowroomPageNgFactory = new import12.ComponentFactory('ng-component', viewFactory_PhotoShowroomPage_Host0, import3.PhotoShowroomPage);
var styles_PhotoShowroomPage = [];
var renderType_PhotoShowroomPage = null;
var _View_PhotoShowroomPage0 = (function (_super) {
    __extends(_View_PhotoShowroomPage0, _super);
    function _View_PhotoShowroomPage0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_PhotoShowroomPage0, renderType_PhotoShowroomPage, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_PhotoShowroomPage0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._el_0 = this.renderer.createElement(parentRenderNode, 'ion-header', null);
        this._Header_0_3 = new import13.Header(this.parentInjector.get(import23.Config), new import24.ElementRef(this._el_0), this.renderer, this.parentInjector.get(import25.ViewController, null));
        this._text_1 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_2 = this.renderer.createElement(this._el_0, 'ion-navbar', null);
        this.renderer.setElementAttribute(this._el_2, 'class', 'toolbar');
        this._appEl_2 = new import2.AppElement(2, 0, this, this._el_2);
        var compView_2 = import26.viewFactory_Navbar0(this.viewUtils, this.injector(2), this._appEl_2);
        this._Navbar_2_4 = new import14.Navbar(this.parentInjector.get(import27.App), this.parentInjector.get(import25.ViewController, null), this.parentInjector.get(import8.NavController, null), this.parentInjector.get(import23.Config), new import24.ElementRef(this._el_2), this.renderer);
        this._appEl_2.initComponent(this._Navbar_2_4, [], compView_2);
        this._text_3 = this.renderer.createText(null, '\n    ', null);
        this._el_4 = this.renderer.createElement(null, 'button', null);
        this.renderer.setElementAttribute(this._el_4, 'menuToggle', '');
        this._MenuToggle_4_3 = new import15.MenuToggle(this.parentInjector.get(import28.MenuController), new import24.ElementRef(this._el_4), this.parentInjector.get(import25.ViewController, null), this._Navbar_2_4);
        this._ToolbarItem_4_4 = new import16.ToolbarItem(this.parentInjector.get(import23.Config), new import24.ElementRef(this._el_4), this.renderer, this.parentInjector.get(import13.Toolbar, null), this._Navbar_2_4);
        this._query_Button_4_0 = new import17.QueryList();
        this._text_5 = this.renderer.createText(this._el_4, '\n      ', null);
        this._el_6 = this.renderer.createElement(this._el_4, 'ion-icon', null);
        this.renderer.setElementAttribute(this._el_6, 'name', 'menu');
        this.renderer.setElementAttribute(this._el_6, 'role', 'img');
        this._Icon_6_3 = new import18.Icon(this.parentInjector.get(import23.Config), new import24.ElementRef(this._el_6), this.renderer);
        this._text_7 = this.renderer.createText(this._el_4, '\n    ', null);
        this._text_8 = this.renderer.createText(null, '\n    ', null);
        this._el_9 = this.renderer.createElement(null, 'ion-title', null);
        this._appEl_9 = new import2.AppElement(9, 2, this, this._el_9);
        var compView_9 = import29.viewFactory_ToolbarTitle0(this.viewUtils, this.injector(9), this._appEl_9);
        this._ToolbarTitle_9_4 = new import19.ToolbarTitle(this.parentInjector.get(import23.Config), new import24.ElementRef(this._el_9), this.renderer, this.parentInjector.get(import13.Toolbar, null), this._Navbar_2_4);
        this._appEl_9.initComponent(this._ToolbarTitle_9_4, [], compView_9);
        this._text_10 = this.renderer.createText(null, 'Photos', null);
        compView_9.create(this._ToolbarTitle_9_4, [[].concat([this._text_10])], null);
        this._text_11 = this.renderer.createText(null, '\n  ', null);
        compView_2.create(this._Navbar_2_4, [
            [].concat([this._el_4]),
            [],
            [],
            [].concat([
                this._text_3,
                this._text_8,
                this._el_9,
                this._text_11
            ])
        ], null);
        this._text_12 = this.renderer.createText(this._el_0, '\n', null);
        this._text_13 = this.renderer.createText(parentRenderNode, '\n\n', null);
        this._el_14 = this.renderer.createElement(parentRenderNode, 'ion-content', null);
        this._appEl_14 = new import2.AppElement(14, null, this, this._el_14);
        var compView_14 = import30.viewFactory_Content0(this.viewUtils, this.injector(14), this._appEl_14);
        this._Content_14_4 = new import20.Content(this.parentInjector.get(import23.Config), new import24.ElementRef(this._el_14), this.renderer, this.parentInjector.get(import27.App), this.parentInjector.get(import31.Keyboard), this.parentInjector.get(import32.NgZone), this.parentInjector.get(import25.ViewController, null), this.parentInjector.get(import33.Tabs, null));
        this._appEl_14.initComponent(this._Content_14_4, [], compView_14);
        this._text_15 = this.renderer.createText(null, '\n  ', null);
        this._el_16 = this.renderer.createElement(null, 'ion-content', null);
        this._appEl_16 = new import2.AppElement(16, 14, this, this._el_16);
        var compView_16 = import30.viewFactory_Content0(this.viewUtils, this.injector(16), this._appEl_16);
        this._Content_16_4 = new import20.Content(this.parentInjector.get(import23.Config), new import24.ElementRef(this._el_16), this.renderer, this.parentInjector.get(import27.App), this.parentInjector.get(import31.Keyboard), this.parentInjector.get(import32.NgZone), this.parentInjector.get(import25.ViewController, null), this.parentInjector.get(import33.Tabs, null));
        this._appEl_16.initComponent(this._Content_16_4, [], compView_16);
        this._text_17 = this.renderer.createText(null, '\n  ', null);
        this._el_18 = this.renderer.createElement(null, 'ion-slides', null);
        this._appEl_18 = new import2.AppElement(18, 16, this, this._el_18);
        var compView_18 = import34.viewFactory_Slides0(this.viewUtils, this.injector(18), this._appEl_18);
        this._Slides_18_4 = new import21.Slides(this.parentInjector.get(import23.Config), new import24.ElementRef(this._el_18), this.renderer);
        this._appEl_18.initComponent(this._Slides_18_4, [], compView_18);
        this._text_19 = this.renderer.createText(null, '\n    ', null);
        this._anchor_20 = this.renderer.createTemplateAnchor(null, null);
        this._appEl_20 = new import2.AppElement(20, 18, this, this._anchor_20);
        this._TemplateRef_20_5 = new import35.TemplateRef_(this._appEl_20, viewFactory_PhotoShowroomPage1);
        this._NgFor_20_6 = new import22.NgFor(this._appEl_20.vcRef, this._TemplateRef_20_5, this.parentInjector.get(import36.IterableDiffers), this.ref);
        this._text_21 = this.renderer.createText(null, '\n  ', null);
        compView_18.create(this._Slides_18_4, [[].concat([
                this._text_19,
                this._appEl_20,
                this._text_21
            ])], null);
        this._text_22 = this.renderer.createText(null, '\n', null);
        compView_16.create(this._Content_16_4, [
            [],
            [].concat([
                this._text_17,
                this._el_18,
                this._text_22
            ]),
            []
        ], null);
        this._text_23 = this.renderer.createText(null, '\n', null);
        compView_14.create(this._Content_14_4, [
            [],
            [].concat([
                this._text_15,
                this._el_16,
                this._text_23
            ]),
            []
        ], null);
        this._expr_0 = import7.UNINITIALIZED;
        this._expr_1 = import7.UNINITIALIZED;
        var disposable_0 = this.renderer.listen(this._el_4, 'click', this.eventHandler(this._handle_click_4_0.bind(this)));
        this._expr_3 = import7.UNINITIALIZED;
        this._expr_4 = import7.UNINITIALIZED;
        this._expr_5 = import7.UNINITIALIZED;
        this._expr_6 = import7.UNINITIALIZED;
        this._expr_7 = import7.UNINITIALIZED;
        this._expr_8 = import7.UNINITIALIZED;
        this._expr_9 = import7.UNINITIALIZED;
        this.init([], [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._text_8,
            this._el_9,
            this._text_10,
            this._text_11,
            this._text_12,
            this._text_13,
            this._el_14,
            this._text_15,
            this._el_16,
            this._text_17,
            this._el_18,
            this._text_19,
            this._anchor_20,
            this._text_21,
            this._text_22,
            this._text_23
        ], [disposable_0], []);
        return null;
    };
    _View_PhotoShowroomPage0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import18.Icon) && (6 === requestNodeIndex))) {
            return this._Icon_6_3;
        }
        if (((token === import15.MenuToggle) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 7)))) {
            return this._MenuToggle_4_3;
        }
        if (((token === import16.ToolbarItem) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 7)))) {
            return this._ToolbarItem_4_4;
        }
        if (((token === import19.ToolbarTitle) && ((9 <= requestNodeIndex) && (requestNodeIndex <= 10)))) {
            return this._ToolbarTitle_9_4;
        }
        if (((token === import14.Navbar) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 11)))) {
            return this._Navbar_2_4;
        }
        if (((token === import13.Header) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 12)))) {
            return this._Header_0_3;
        }
        if (((token === import35.TemplateRef) && (20 === requestNodeIndex))) {
            return this._TemplateRef_20_5;
        }
        if (((token === import22.NgFor) && (20 === requestNodeIndex))) {
            return this._NgFor_20_6;
        }
        if (((token === import21.Slides) && ((18 <= requestNodeIndex) && (requestNodeIndex <= 21)))) {
            return this._Slides_18_4;
        }
        if (((token === import20.Content) && ((16 <= requestNodeIndex) && (requestNodeIndex <= 22)))) {
            return this._Content_16_4;
        }
        if (((token === import20.Content) && ((14 <= requestNodeIndex) && (requestNodeIndex <= 23)))) {
            return this._Content_14_4;
        }
        return notFoundResult;
    };
    _View_PhotoShowroomPage0.prototype.detectChangesInternal = function (throwOnChange) {
        var changes = null;
        var currVal_3 = '';
        if (import4.checkBinding(throwOnChange, this._expr_3, currVal_3)) {
            this._MenuToggle_4_3.menuToggle = currVal_3;
            this._expr_3 = currVal_3;
        }
        var currVal_5 = 'menu';
        if (import4.checkBinding(throwOnChange, this._expr_5, currVal_5)) {
            this._Icon_6_3.name = currVal_5;
            this._expr_5 = currVal_5;
        }
        if (((this.numberOfChecks === 0) && !throwOnChange)) {
            this._Content_14_4.ngOnInit();
        }
        if (((this.numberOfChecks === 0) && !throwOnChange)) {
            this._Content_16_4.ngOnInit();
        }
        if (((this.numberOfChecks === 0) && !throwOnChange)) {
            this._Slides_18_4.ngOnInit();
        }
        changes = null;
        var currVal_9 = this.context.images;
        if (import4.checkBinding(throwOnChange, this._expr_9, currVal_9)) {
            this._NgFor_20_6.ngForOf = currVal_9;
            if ((changes === null)) {
                (changes = {});
            }
            changes['ngForOf'] = new import7.SimpleChange(this._expr_9, currVal_9);
            this._expr_9 = currVal_9;
        }
        if ((changes !== null)) {
            this._NgFor_20_6.ngOnChanges(changes);
        }
        if (!throwOnChange) {
            this._NgFor_20_6.ngDoCheck();
        }
        this.detectContentChildrenChanges(throwOnChange);
        if (!throwOnChange) {
            if (this._query_Button_4_0.dirty) {
                this._query_Button_4_0.reset([]);
                this._ToolbarItem_4_4._buttons = this._query_Button_4_0;
                this._query_Button_4_0.notifyOnChanges();
            }
        }
        var currVal_0 = this._Navbar_2_4._hidden;
        if (import4.checkBinding(throwOnChange, this._expr_0, currVal_0)) {
            this.renderer.setElementProperty(this._el_2, 'hidden', currVal_0);
            this._expr_0 = currVal_0;
        }
        var currVal_1 = this._Navbar_2_4._sbPadding;
        if (import4.checkBinding(throwOnChange, this._expr_1, currVal_1)) {
            this.renderer.setElementClass(this._el_2, 'statusbar-padding', currVal_1);
            this._expr_1 = currVal_1;
        }
        var currVal_4 = this._MenuToggle_4_3.isHidden;
        if (import4.checkBinding(throwOnChange, this._expr_4, currVal_4)) {
            this.renderer.setElementProperty(this._el_4, 'hidden', currVal_4);
            this._expr_4 = currVal_4;
        }
        var currVal_6 = this._Icon_6_3._hidden;
        if (import4.checkBinding(throwOnChange, this._expr_6, currVal_6)) {
            this.renderer.setElementClass(this._el_6, 'hide', currVal_6);
            this._expr_6 = currVal_6;
        }
        var currVal_7 = this._Content_14_4._sbPadding;
        if (import4.checkBinding(throwOnChange, this._expr_7, currVal_7)) {
            this.renderer.setElementClass(this._el_14, 'statusbar-padding', currVal_7);
            this._expr_7 = currVal_7;
        }
        var currVal_8 = this._Content_16_4._sbPadding;
        if (import4.checkBinding(throwOnChange, this._expr_8, currVal_8)) {
            this.renderer.setElementClass(this._el_16, 'statusbar-padding', currVal_8);
            this._expr_8 = currVal_8;
        }
        this.detectViewChildrenChanges(throwOnChange);
        if (!throwOnChange) {
            if ((this.numberOfChecks === 0)) {
                this._Navbar_2_4.ngAfterViewInit();
            }
        }
    };
    _View_PhotoShowroomPage0.prototype.destroyInternal = function () {
        this._Icon_6_3.ngOnDestroy();
        this._Content_16_4.ngOnDestroy();
        this._Content_14_4.ngOnDestroy();
    };
    _View_PhotoShowroomPage0.prototype._handle_click_4_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_0 = (this._MenuToggle_4_3.toggle() !== false);
        return (true && pd_0);
    };
    return _View_PhotoShowroomPage0;
}(import1.AppView));
export function viewFactory_PhotoShowroomPage0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_PhotoShowroomPage === null)) {
        (renderType_PhotoShowroomPage = viewUtils.createRenderComponentType('/home/nicolas/projects/cloudtripper/cloudtripper-frontend/.tmp/pages/photo-showroom/photo-showroom.html', 0, import11.ViewEncapsulation.None, styles_PhotoShowroomPage, {}));
    }
    return new _View_PhotoShowroomPage0(viewUtils, parentInjector, declarationEl);
}
var _View_PhotoShowroomPage1 = (function (_super) {
    __extends(_View_PhotoShowroomPage1, _super);
    function _View_PhotoShowroomPage1(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_PhotoShowroomPage1, renderType_PhotoShowroomPage, import6.ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_PhotoShowroomPage1.prototype.createInternal = function (rootSelector) {
        this._el_0 = this.renderer.createElement(null, 'ion-slide', null);
        this.renderer.setElementAttribute(this._el_0, 'style', 'background-color: black');
        this.renderer.setElementAttribute(this._el_0, 'zoom', '');
        this._appEl_0 = new import2.AppElement(0, null, this, this._el_0);
        var compView_0 = import34.viewFactory_Slide0(this.viewUtils, this.injector(0), this._appEl_0);
        this._Slide_0_4 = new import21.Slide(new import24.ElementRef(this._el_0), this.parent._Slides_18_4);
        this._appEl_0.initComponent(this._Slide_0_4, [], compView_0);
        this._text_1 = this.renderer.createText(null, '\n        ', null);
        this._el_2 = this.renderer.createElement(null, 'img', null);
        this._text_3 = this.renderer.createText(null, '\n    ', null);
        compView_0.create(this._Slide_0_4, [[].concat([
                this._text_1,
                this._el_2,
                this._text_3
            ])], null);
        this._expr_0 = import7.UNINITIALIZED;
        this._expr_2 = import7.UNINITIALIZED;
        var disposable_0 = this.renderer.listen(this._el_2, 'tap', this.eventHandler(this._handle_tap_2_0.bind(this)));
        this.init([].concat([this._el_0]), [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3
        ], [disposable_0], []);
        return null;
    };
    _View_PhotoShowroomPage1.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import21.Slide) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 3)))) {
            return this._Slide_0_4;
        }
        return notFoundResult;
    };
    _View_PhotoShowroomPage1.prototype.detectChangesInternal = function (throwOnChange) {
        var changed = true;
        changed = false;
        var currVal_0 = '';
        if (import4.checkBinding(throwOnChange, this._expr_0, currVal_0)) {
            this._Slide_0_4.zoom = currVal_0;
            changed = true;
            this._expr_0 = currVal_0;
        }
        if (changed) {
            this._appEl_0.componentView.markAsCheckOnce();
        }
        this.detectContentChildrenChanges(throwOnChange);
        var currVal_2 = this.context.$implicit;
        if (import4.checkBinding(throwOnChange, this._expr_2, currVal_2)) {
            this.renderer.setElementProperty(this._el_2, 'src', this.viewUtils.sanitizer.sanitize(import37.SecurityContext.URL, currVal_2));
            this._expr_2 = currVal_2;
        }
        this.detectViewChildrenChanges(throwOnChange);
    };
    _View_PhotoShowroomPage1.prototype.destroyInternal = function () {
        this._Slide_0_4.ngOnDestroy();
    };
    _View_PhotoShowroomPage1.prototype._handle_tap_2_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_0 = (this.parent.context.showPhoto(this.context.$implicit) !== false);
        return (true && pd_0);
    };
    return _View_PhotoShowroomPage1;
}(import1.AppView));
function viewFactory_PhotoShowroomPage1(viewUtils, parentInjector, declarationEl) {
    return new _View_PhotoShowroomPage1(viewUtils, parentInjector, declarationEl);
}
