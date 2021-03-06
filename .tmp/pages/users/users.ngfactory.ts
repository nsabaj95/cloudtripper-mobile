/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/render/api';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/linker/element';
import * as import3 from '../../providers/users-service';
import * as import4 from './users';
import * as import5 from '@angular/core/src/linker/view_utils';
import * as import6 from '@angular/core/src/di/injector';
import * as import7 from '@angular/core/src/linker/view_type';
import * as import8 from '@angular/core/src/change_detection/change_detection';
import * as import9 from '@angular/http/src/http';
import * as import10 from 'ionic-angular/components/alert/alert';
import * as import11 from 'ionic-angular/navigation/nav-controller';
import * as import12 from 'ionic-angular/navigation/nav-params';
import * as import13 from 'ionic-angular/components/loading/loading';
import * as import14 from '@angular/core/src/metadata/view';
import * as import15 from '@angular/core/src/linker/component_factory';
import * as import16 from 'ionic-angular/components/toolbar/toolbar';
import * as import17 from 'ionic-angular/components/navbar/navbar';
import * as import18 from 'ionic-angular/components/button/button';
import * as import19 from 'ionic-angular/components/menu/menu-toggle';
import * as import20 from 'ionic-angular/components/toolbar/toolbar-item';
import * as import21 from '@angular/core/src/linker/query_list';
import * as import22 from 'ionic-angular/components/icon/icon';
import * as import23 from 'ionic-angular/components/toolbar/toolbar-title';
import * as import24 from 'ionic-angular/components/content/content';
import * as import25 from 'ionic-angular/components/refresher/refresher';
import * as import26 from 'ionic-angular/components/refresher/refresher-content';
import * as import27 from 'ionic-angular/components/list/list';
import * as import28 from '@angular/common/src/directives/ng_for';
import * as import29 from 'ionic-angular/components/infinite-scroll/infinite-scroll';
import * as import30 from 'ionic-angular/components/infinite-scroll/infinite-scroll-content';
import * as import31 from 'ionic-angular/config/config';
import * as import32 from '@angular/core/src/linker/element_ref';
import * as import33 from 'ionic-angular/navigation/view-controller';
import * as import34 from '../../node_modules/ionic-angular/components/navbar/navbar.ngfactory';
import * as import35 from 'ionic-angular/components/app/app';
import * as import36 from '../../node_modules/ionic-angular/components/button/button.ngfactory';
import * as import37 from 'ionic-angular/components/menu/menu-controller';
import * as import38 from '../../node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory';
import * as import39 from '../../node_modules/ionic-angular/components/content/content.ngfactory';
import * as import40 from 'ionic-angular/util/keyboard';
import * as import41 from '@angular/core/src/zone/ng_zone';
import * as import42 from 'ionic-angular/components/tabs/tabs';
import * as import43 from 'ionic-angular/gestures/gesture-controller';
import * as import44 from '../../node_modules/ionic-angular/components/refresher/refresher-content.ngfactory';
import * as import45 from '@angular/core/src/linker/template_ref';
import * as import46 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import47 from '../../node_modules/ionic-angular/components/infinite-scroll/infinite-scroll-content.ngfactory';
import * as import48 from '@angular/core/src/security';
import * as import49 from 'ionic-angular/components/item/item-sliding';
import * as import50 from 'ionic-angular/components/item/item';
import * as import51 from 'ionic-angular/components/avatar/avatar';
import * as import52 from '../../node_modules/ionic-angular/components/item/item-sliding.ngfactory';
import * as import53 from '../../node_modules/ionic-angular/components/item/item.ngfactory';
import * as import54 from 'ionic-angular/util/form';
var renderType_UsersPage_Host:import0.RenderComponentType = (null as any);
class _View_UsersPage_Host0 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _appEl_0:import2.AppElement;
  _UsersService_0_4:import3.UsersService;
  _UsersPage_0_5:import4.UsersPage;
  constructor(viewUtils:import5.ViewUtils,parentInjector:import6.Injector,declarationEl:import2.AppElement) {
    super(_View_UsersPage_Host0,renderType_UsersPage_Host,import7.ViewType.HOST,viewUtils,parentInjector,declarationEl,import8.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.selectOrCreateHostElement('ng-component',rootSelector,(null as any));
    this._appEl_0 = new import2.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = viewFactory_UsersPage0(this.viewUtils,this.injector(0),this._appEl_0);
    this._UsersService_0_4 = new import3.UsersService(this.parentInjector.get(import9.Http),this.parentInjector.get(import10.AlertController));
    this._UsersPage_0_5 = new import4.UsersPage(this.parentInjector.get(import11.NavController),this._UsersService_0_4,this.parentInjector.get(import12.NavParams),this.parentInjector.get(import13.LoadingController));
    this._appEl_0.initComponent(this._UsersPage_0_5,[],compView_0);
    compView_0.create(this._UsersPage_0_5,this.projectableNodes,(null as any));
    this.init([].concat([this._el_0]),[this._el_0],[],[]);
    return this._appEl_0;
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import3.UsersService) && (0 === requestNodeIndex))) { return this._UsersService_0_4; }
    if (((token === import4.UsersPage) && (0 === requestNodeIndex))) { return this._UsersPage_0_5; }
    return notFoundResult;
  }
}
function viewFactory_UsersPage_Host0(viewUtils:import5.ViewUtils,parentInjector:import6.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  if ((renderType_UsersPage_Host === (null as any))) { (renderType_UsersPage_Host = viewUtils.createRenderComponentType('',0,import14.ViewEncapsulation.None,[],{})); }
  return new _View_UsersPage_Host0(viewUtils,parentInjector,declarationEl);
}
export const UsersPageNgFactory:import15.ComponentFactory<import4.UsersPage> = new import15.ComponentFactory<import4.UsersPage>('ng-component',viewFactory_UsersPage_Host0,import4.UsersPage);
const styles_UsersPage:any[] = [];
var renderType_UsersPage:import0.RenderComponentType = (null as any);
class _View_UsersPage0 extends import1.AppView<import4.UsersPage> {
  _el_0:any;
  _Header_0_3:import16.Header;
  _text_1:any;
  _el_2:any;
  /*private*/ _appEl_2:import2.AppElement;
  _Navbar_2_4:import17.Navbar;
  _text_3:any;
  _el_4:any;
  /*private*/ _appEl_4:import2.AppElement;
  _Button_4_4:import18.Button;
  _MenuToggle_4_5:import19.MenuToggle;
  _ToolbarItem_4_6:import20.ToolbarItem;
  _query_Button_4_0:import21.QueryList<any>;
  _text_5:any;
  _el_6:any;
  _Icon_6_3:import22.Icon;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  /*private*/ _appEl_9:import2.AppElement;
  _ToolbarTitle_9_4:import23.ToolbarTitle;
  _text_10:any;
  _text_11:any;
  _text_12:any;
  _text_13:any;
  _text_14:any;
  _el_15:any;
  /*private*/ _appEl_15:import2.AppElement;
  _Content_15_4:import24.Content;
  _text_16:any;
  _el_17:any;
  _Refresher_17_3:import25.Refresher;
  _text_18:any;
  _el_19:any;
  /*private*/ _appEl_19:import2.AppElement;
  _RefresherContent_19_4:import26.RefresherContent;
  _text_20:any;
  _text_21:any;
  _el_22:any;
  _List_22_3:import27.List;
  _text_23:any;
  _anchor_24:any;
  /*private*/ _appEl_24:import2.AppElement;
  _TemplateRef_24_5:any;
  _NgFor_24_6:import28.NgFor;
  _text_25:any;
  _text_26:any;
  _el_27:any;
  _InfiniteScroll_27_3:import29.InfiniteScroll;
  _text_28:any;
  _el_29:any;
  /*private*/ _appEl_29:import2.AppElement;
  _InfiniteScrollContent_29_4:import30.InfiniteScrollContent;
  _text_30:any;
  _text_31:any;
  _text_32:any;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  /*private*/ _expr_6:any;
  /*private*/ _expr_7:any;
  /*private*/ _expr_9:any;
  /*private*/ _expr_10:any;
  /*private*/ _expr_11:any;
  /*private*/ _expr_12:any;
  /*private*/ _expr_14:any;
  constructor(viewUtils:import5.ViewUtils,parentInjector:import6.Injector,declarationEl:import2.AppElement) {
    super(_View_UsersPage0,renderType_UsersPage,import7.ViewType.COMPONENT,viewUtils,parentInjector,declarationEl,import8.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    const parentRenderNode:any = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
    this._el_0 = this.renderer.createElement(parentRenderNode,'ion-header',(null as any));
    this._Header_0_3 = new import16.Header(this.parentInjector.get(import31.Config),new import32.ElementRef(this._el_0),this.renderer,this.parentInjector.get(import33.ViewController,(null as any)));
    this._text_1 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_2 = this.renderer.createElement(this._el_0,'ion-navbar',(null as any));
    this.renderer.setElementAttribute(this._el_2,'class','toolbar');
    this._appEl_2 = new import2.AppElement(2,0,this,this._el_2);
    var compView_2:any = import34.viewFactory_Navbar0(this.viewUtils,this.injector(2),this._appEl_2);
    this._Navbar_2_4 = new import17.Navbar(this.parentInjector.get(import35.App),this.parentInjector.get(import33.ViewController,(null as any)),this.parentInjector.get(import11.NavController,(null as any)),this.parentInjector.get(import31.Config),new import32.ElementRef(this._el_2),this.renderer);
    this._appEl_2.initComponent(this._Navbar_2_4,[],compView_2);
    this._text_3 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_4 = this.renderer.createElement((null as any),'button',(null as any));
    this.renderer.setElementAttribute(this._el_4,'ion-button','');
    this.renderer.setElementAttribute(this._el_4,'menuToggle','');
    this._appEl_4 = new import2.AppElement(4,2,this,this._el_4);
    var compView_4:any = import36.viewFactory_Button0(this.viewUtils,this.injector(4),this._appEl_4);
    this._Button_4_4 = new import18.Button('','',this.parentInjector.get(import31.Config),new import32.ElementRef(this._el_4),this.renderer);
    this._MenuToggle_4_5 = new import19.MenuToggle(this.parentInjector.get(import37.MenuController),new import32.ElementRef(this._el_4),this.parentInjector.get(import33.ViewController,(null as any)),this._Navbar_2_4);
    this._ToolbarItem_4_6 = new import20.ToolbarItem(this.parentInjector.get(import31.Config),new import32.ElementRef(this._el_4),this.renderer,this.parentInjector.get(import16.Toolbar,(null as any)),this._Navbar_2_4);
    this._query_Button_4_0 = new import21.QueryList<any>();
    this._appEl_4.initComponent(this._Button_4_4,[],compView_4);
    this._text_5 = this.renderer.createText((null as any),'\n      ',(null as any));
    this._el_6 = this.renderer.createElement((null as any),'ion-icon',(null as any));
    this.renderer.setElementAttribute(this._el_6,'name','menu');
    this.renderer.setElementAttribute(this._el_6,'role','img');
    this._Icon_6_3 = new import22.Icon(this.parentInjector.get(import31.Config),new import32.ElementRef(this._el_6),this.renderer);
    this._text_7 = this.renderer.createText((null as any),'\n    ',(null as any));
      compView_4.create(this._Button_4_4,[[].concat([
        this._text_5,
        this._el_6,
        this._text_7
      ]
    )],(null as any));
    this._text_8 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_9 = this.renderer.createElement((null as any),'ion-title',(null as any));
    this._appEl_9 = new import2.AppElement(9,2,this,this._el_9);
    var compView_9:any = import38.viewFactory_ToolbarTitle0(this.viewUtils,this.injector(9),this._appEl_9);
    this._ToolbarTitle_9_4 = new import23.ToolbarTitle(this.parentInjector.get(import31.Config),new import32.ElementRef(this._el_9),this.renderer,this.parentInjector.get(import16.Toolbar,(null as any)),this._Navbar_2_4);
    this._appEl_9.initComponent(this._ToolbarTitle_9_4,[],compView_9);
    this._text_10 = this.renderer.createText((null as any),'Usuarios',(null as any));
    compView_9.create(this._ToolbarTitle_9_4,[[].concat([this._text_10])],(null as any));
    this._text_11 = this.renderer.createText((null as any),'\n  ',(null as any));
    compView_2.create(this._Navbar_2_4,[
      [].concat([this._el_4]),
      [],
      [],
      [].concat([
        this._text_3,
        this._text_8,
        this._el_9,
        this._text_11
      ]
      )
    ]
    ,(null as any));
    this._text_12 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._text_13 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_14 = this.renderer.createText(parentRenderNode,'\n\n',(null as any));
    this._el_15 = this.renderer.createElement(parentRenderNode,'ion-content',(null as any));
    this._appEl_15 = new import2.AppElement(15,(null as any),this,this._el_15);
    var compView_15:any = import39.viewFactory_Content0(this.viewUtils,this.injector(15),this._appEl_15);
    this._Content_15_4 = new import24.Content(this.parentInjector.get(import31.Config),new import32.ElementRef(this._el_15),this.renderer,this.parentInjector.get(import35.App),this.parentInjector.get(import40.Keyboard),this.parentInjector.get(import41.NgZone),this.parentInjector.get(import33.ViewController,(null as any)),this.parentInjector.get(import42.Tabs,(null as any)));
    this._appEl_15.initComponent(this._Content_15_4,[],compView_15);
    this._text_16 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_17 = this.renderer.createElement((null as any),'ion-refresher',(null as any));
    this._Refresher_17_3 = new import25.Refresher(this._Content_15_4,this.parentInjector.get(import41.NgZone),this.parentInjector.get(import43.GestureController));
    this._text_18 = this.renderer.createText(this._el_17,'\n    ',(null as any));
    this._el_19 = this.renderer.createElement(this._el_17,'ion-refresher-content',(null as any));
    this._appEl_19 = new import2.AppElement(19,17,this,this._el_19);
    var compView_19:any = import44.viewFactory_RefresherContent0(this.viewUtils,this.injector(19),this._appEl_19);
    this._RefresherContent_19_4 = new import26.RefresherContent(this._Refresher_17_3,this.parentInjector.get(import31.Config));
    this._appEl_19.initComponent(this._RefresherContent_19_4,[],compView_19);
    compView_19.create(this._RefresherContent_19_4,[],(null as any));
    this._text_20 = this.renderer.createText(this._el_17,'\n  ',(null as any));
    this._text_21 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_22 = this.renderer.createElement((null as any),'ion-list',(null as any));
    this._List_22_3 = new import27.List(this.parentInjector.get(import31.Config),new import32.ElementRef(this._el_22),this.renderer,this.parentInjector.get(import43.GestureController));
    this._text_23 = this.renderer.createText(this._el_22,'\n    ',(null as any));
    this._anchor_24 = this.renderer.createTemplateAnchor(this._el_22,(null as any));
    this._appEl_24 = new import2.AppElement(24,22,this,this._anchor_24);
    this._TemplateRef_24_5 = new import45.TemplateRef_(this._appEl_24,viewFactory_UsersPage1);
    this._NgFor_24_6 = new import28.NgFor(this._appEl_24.vcRef,this._TemplateRef_24_5,this.parentInjector.get(import46.IterableDiffers),this.ref);
    this._text_25 = this.renderer.createText(this._el_22,' \n  ',(null as any));
    this._text_26 = this.renderer.createText((null as any),'\n  \n  ',(null as any));
    this._el_27 = this.renderer.createElement((null as any),'ion-infinite-scroll',(null as any));
    this._InfiniteScroll_27_3 = new import29.InfiniteScroll(this._Content_15_4,this.parentInjector.get(import41.NgZone),new import32.ElementRef(this._el_27));
    this._text_28 = this.renderer.createText(this._el_27,'\n    ',(null as any));
    this._el_29 = this.renderer.createElement(this._el_27,'ion-infinite-scroll-content',(null as any));
    this._appEl_29 = new import2.AppElement(29,27,this,this._el_29);
    var compView_29:any = import47.viewFactory_InfiniteScrollContent0(this.viewUtils,this.injector(29),this._appEl_29);
    this._InfiniteScrollContent_29_4 = new import30.InfiniteScrollContent(this._InfiniteScroll_27_3,this.parentInjector.get(import31.Config));
    this._appEl_29.initComponent(this._InfiniteScrollContent_29_4,[],compView_29);
    compView_29.create(this._InfiniteScrollContent_29_4,[],(null as any));
    this._text_30 = this.renderer.createText(this._el_27,'\n  ',(null as any));
    this._text_31 = this.renderer.createText((null as any),'\n',(null as any));
    compView_15.create(this._Content_15_4,[
      [],
      [].concat([
        this._text_16,
        this._text_21,
        this._el_22,
        this._text_26,
        this._el_27,
        this._text_31
      ]
      ),
      [].concat([this._el_17])
    ]
    ,(null as any));
    this._text_32 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._expr_0 = import8.UNINITIALIZED;
    this._expr_1 = import8.UNINITIALIZED;
    var disposable_0:Function = this.renderer.listen(this._el_4,'click',this.eventHandler(this._handle_click_4_0.bind(this)));
    this._expr_3 = import8.UNINITIALIZED;
    this._expr_4 = import8.UNINITIALIZED;
    this._expr_5 = import8.UNINITIALIZED;
    this._expr_6 = import8.UNINITIALIZED;
    this._expr_7 = import8.UNINITIALIZED;
    var disposable_1:Function = this.renderer.listen(this._el_17,'ionRefresh',this.eventHandler(this._handle_ionRefresh_17_0.bind(this)));
    this._expr_9 = import8.UNINITIALIZED;
    this._expr_10 = import8.UNINITIALIZED;
    const subscription_0:any = this._Refresher_17_3.ionRefresh.subscribe(this.eventHandler(this._handle_ionRefresh_17_0.bind(this)));
    this._expr_11 = import8.UNINITIALIZED;
    this._expr_12 = import8.UNINITIALIZED;
    var disposable_2:Function = this.renderer.listen(this._el_27,'ionInfinite',this.eventHandler(this._handle_ionInfinite_27_0.bind(this)));
    const subscription_1:any = this._InfiniteScroll_27_3.ionInfinite.subscribe(this.eventHandler(this._handle_ionInfinite_27_0.bind(this)));
    this._expr_14 = import8.UNINITIALIZED;
    this.init([],[
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
      this._text_14,
      this._el_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._text_21,
      this._el_22,
      this._text_23,
      this._anchor_24,
      this._text_25,
      this._text_26,
      this._el_27,
      this._text_28,
      this._el_29,
      this._text_30,
      this._text_31,
      this._text_32
    ]
    ,[
      disposable_0,
      disposable_1,
      disposable_2
    ]
    ,[
      subscription_0,
      subscription_1
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import22.Icon) && (6 === requestNodeIndex))) { return this._Icon_6_3; }
    if (((token === import18.Button) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 7)))) { return this._Button_4_4; }
    if (((token === import19.MenuToggle) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 7)))) { return this._MenuToggle_4_5; }
    if (((token === import20.ToolbarItem) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 7)))) { return this._ToolbarItem_4_6; }
    if (((token === import23.ToolbarTitle) && ((9 <= requestNodeIndex) && (requestNodeIndex <= 10)))) { return this._ToolbarTitle_9_4; }
    if (((token === import17.Navbar) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 11)))) { return this._Navbar_2_4; }
    if (((token === import16.Header) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 13)))) { return this._Header_0_3; }
    if (((token === import26.RefresherContent) && (19 === requestNodeIndex))) { return this._RefresherContent_19_4; }
    if (((token === import25.Refresher) && ((17 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._Refresher_17_3; }
    if (((token === import45.TemplateRef) && (24 === requestNodeIndex))) { return this._TemplateRef_24_5; }
    if (((token === import28.NgFor) && (24 === requestNodeIndex))) { return this._NgFor_24_6; }
    if (((token === import27.List) && ((22 <= requestNodeIndex) && (requestNodeIndex <= 25)))) { return this._List_22_3; }
    if (((token === import30.InfiniteScrollContent) && (29 === requestNodeIndex))) { return this._InfiniteScrollContent_29_4; }
    if (((token === import29.InfiniteScroll) && ((27 <= requestNodeIndex) && (requestNodeIndex <= 30)))) { return this._InfiniteScroll_27_3; }
    if (((token === import24.Content) && ((15 <= requestNodeIndex) && (requestNodeIndex <= 31)))) { return this._Content_15_4; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    var changes:{[key: string]:import8.SimpleChange} = (null as any);
    const currVal_3:any = '';
    if (import5.checkBinding(throwOnChange,this._expr_3,currVal_3)) {
      this._MenuToggle_4_5.menuToggle = currVal_3;
      this._expr_3 = currVal_3;
    }
    const currVal_5:any = 'menu';
    if (import5.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this._Icon_6_3.name = currVal_5;
      this._expr_5 = currVal_5;
    }
    if (((this.numberOfChecks === 0) && !throwOnChange)) { this._Content_15_4.ngOnInit(); }
    if (((this.numberOfChecks === 0) && !throwOnChange)) { this._Refresher_17_3.ngOnInit(); }
    if (((this.numberOfChecks === 0) && !throwOnChange)) { this._RefresherContent_19_4.ngOnInit(); }
    changes = (null as any);
    const currVal_12:any = this.context.users;
    if (import5.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this._NgFor_24_6.ngForOf = currVal_12;
      if ((changes === (null as any))) { (changes = {}); }
      changes['ngForOf'] = new import8.SimpleChange(this._expr_12,currVal_12);
      this._expr_12 = currVal_12;
    }
    if ((changes !== (null as any))) { this._NgFor_24_6.ngOnChanges(changes); }
    if (!throwOnChange) { this._NgFor_24_6.ngDoCheck(); }
    if (((this.numberOfChecks === 0) && !throwOnChange)) { this._InfiniteScrollContent_29_4.ngOnInit(); }
    this.detectContentChildrenChanges(throwOnChange);
    if (!throwOnChange) {
      if (this._query_Button_4_0.dirty) {
        this._query_Button_4_0.reset([this._Button_4_4]);
        this._ToolbarItem_4_6._buttons = this._query_Button_4_0;
        this._query_Button_4_0.notifyOnChanges();
      }
      if ((this.numberOfChecks === 0)) { this._Button_4_4.ngAfterContentInit(); }
      if ((this.numberOfChecks === 0)) { this._InfiniteScroll_27_3.ngAfterContentInit(); }
    }
    const currVal_0:any = this._Navbar_2_4._hidden;
    if (import5.checkBinding(throwOnChange,this._expr_0,currVal_0)) {
      this.renderer.setElementProperty(this._el_2,'hidden',currVal_0);
      this._expr_0 = currVal_0;
    }
    const currVal_1:any = this._Navbar_2_4._sbPadding;
    if (import5.checkBinding(throwOnChange,this._expr_1,currVal_1)) {
      this.renderer.setElementClass(this._el_2,'statusbar-padding',currVal_1);
      this._expr_1 = currVal_1;
    }
    const currVal_4:any = this._MenuToggle_4_5.isHidden;
    if (import5.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this.renderer.setElementProperty(this._el_4,'hidden',currVal_4);
      this._expr_4 = currVal_4;
    }
    const currVal_6:any = this._Icon_6_3._hidden;
    if (import5.checkBinding(throwOnChange,this._expr_6,currVal_6)) {
      this.renderer.setElementClass(this._el_6,'hide',currVal_6);
      this._expr_6 = currVal_6;
    }
    const currVal_7:any = this._Content_15_4._sbPadding;
    if (import5.checkBinding(throwOnChange,this._expr_7,currVal_7)) {
      this.renderer.setElementClass(this._el_15,'statusbar-padding',currVal_7);
      this._expr_7 = currVal_7;
    }
    const currVal_9:any = (this._Refresher_17_3.state !== 'inactive');
    if (import5.checkBinding(throwOnChange,this._expr_9,currVal_9)) {
      this.renderer.setElementClass(this._el_17,'refresher-active',currVal_9);
      this._expr_9 = currVal_9;
    }
    const currVal_10:any = this._Refresher_17_3._top;
    if (import5.checkBinding(throwOnChange,this._expr_10,currVal_10)) {
      this.renderer.setElementStyle(this._el_17,'top',((this.viewUtils.sanitizer.sanitize(import48.SecurityContext.STYLE,currVal_10) == (null as any))? (null as any): this.viewUtils.sanitizer.sanitize(import48.SecurityContext.STYLE,currVal_10).toString()));
      this._expr_10 = currVal_10;
    }
    const currVal_11:any = this._RefresherContent_19_4.r.state;
    if (import5.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this.renderer.setElementAttribute(this._el_19,'state',((currVal_11 == (null as any))? (null as any): currVal_11.toString()));
      this._expr_11 = currVal_11;
    }
    const currVal_14:any = this._InfiniteScrollContent_29_4.inf.state;
    if (import5.checkBinding(throwOnChange,this._expr_14,currVal_14)) {
      this.renderer.setElementAttribute(this._el_29,'state',((currVal_14 == (null as any))? (null as any): currVal_14.toString()));
      this._expr_14 = currVal_14;
    }
    this.detectViewChildrenChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._Navbar_2_4.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._Icon_6_3.ngOnDestroy();
    this._Refresher_17_3.ngOnDestroy();
    this._InfiniteScroll_27_3.ngOnDestroy();
    this._Content_15_4.ngOnDestroy();
  }
  private _handle_click_4_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this._MenuToggle_4_5.toggle()) !== false);
    return (true && pd_0);
  }
  private _handle_ionRefresh_17_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.context.refreshUsers($event)) !== false);
    return (true && pd_0);
  }
  private _handle_ionInfinite_27_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.context.doInfinite($event)) !== false);
    return (true && pd_0);
  }
}
export function viewFactory_UsersPage0(viewUtils:import5.ViewUtils,parentInjector:import6.Injector,declarationEl:import2.AppElement):import1.AppView<import4.UsersPage> {
  if ((renderType_UsersPage === (null as any))) { (renderType_UsersPage = viewUtils.createRenderComponentType('/home/nicolas/projects/cloudtripper/cloudtripper-frontend/.tmp/pages/users/users.html',0,import14.ViewEncapsulation.None,styles_UsersPage,{})); }
  return new _View_UsersPage0(viewUtils,parentInjector,declarationEl);
}
class _View_UsersPage1 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _appEl_0:import2.AppElement;
  _ItemSliding_0_4:import49.ItemSliding;
  _query_Item_0_0:import21.QueryList<any>;
  _query_ItemOptions_0_1:import21.QueryList<any>;
  _text_1:any;
  _el_2:any;
  /*private*/ _appEl_2:import2.AppElement;
  _Item_2_4:import50.Item;
  _ItemContent_2_5:import50.ItemContent;
  _query_Label_2_0:import21.QueryList<any>;
  _query_Button_2_1:import21.QueryList<any>;
  _query_Icon_2_2:import21.QueryList<any>;
  _text_3:any;
  _el_4:any;
  _Avatar_4_3:import51.Avatar;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _text_11:any;
  _text_12:any;
  _el_13:any;
  _ItemOptions_13_3:import49.ItemOptions;
  _text_14:any;
  _el_15:any;
  /*private*/ _appEl_15:import2.AppElement;
  _Button_15_4:import18.Button;
  _text_16:any;
  _el_17:any;
  _Icon_17_3:import22.Icon;
  _text_18:any;
  _text_19:any;
  _text_20:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  constructor(viewUtils:import5.ViewUtils,parentInjector:import6.Injector,declarationEl:import2.AppElement) {
    super(_View_UsersPage1,renderType_UsersPage,import7.ViewType.EMBEDDED,viewUtils,parentInjector,declarationEl,import8.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.renderer.createElement((null as any),'ion-item-sliding',(null as any));
    this._appEl_0 = new import2.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = import52.viewFactory_ItemSliding0(this.viewUtils,this.injector(0),this._appEl_0);
    this._ItemSliding_0_4 = new import49.ItemSliding((<_View_UsersPage0>this.parent)._List_22_3,this.renderer,new import32.ElementRef(this._el_0),this.parent.parentInjector.get(import41.NgZone));
    this._query_Item_0_0 = new import21.QueryList<any>();
    this._query_ItemOptions_0_1 = new import21.QueryList<any>();
    this._appEl_0.initComponent(this._ItemSliding_0_4,[],compView_0);
    this._text_1 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_2 = this.renderer.createElement((null as any),'button',(null as any));
    this.renderer.setElementAttribute(this._el_2,'class','item item-block');
    this.renderer.setElementAttribute(this._el_2,'ion-item','');
    this._appEl_2 = new import2.AppElement(2,0,this,this._el_2);
    var compView_2:any = import53.viewFactory_Item0(this.viewUtils,this.injector(2),this._appEl_2);
    this._Item_2_4 = new import50.Item(this.parent.parentInjector.get(import54.Form),this.parent.parentInjector.get(import31.Config),new import32.ElementRef(this._el_2),this.renderer);
    this._ItemContent_2_5 = new import50.ItemContent();
    this._query_Label_2_0 = new import21.QueryList<any>();
    this._query_Button_2_1 = new import21.QueryList<any>();
    this._query_Icon_2_2 = new import21.QueryList<any>();
    this._appEl_2.initComponent(this._Item_2_4,[],compView_2);
    this._text_3 = this.renderer.createText((null as any),'\n      ',(null as any));
    this._el_4 = this.renderer.createElement((null as any),'ion-avatar',(null as any));
    this.renderer.setElementAttribute(this._el_4,'item-left','');
    this._Avatar_4_3 = new import51.Avatar();
    this._text_5 = this.renderer.createText(this._el_4,'\n          ',(null as any));
    this._el_6 = this.renderer.createElement(this._el_4,'img',(null as any));
    this.renderer.setElementAttribute(this._el_6,'src','img/avatar.png');
    this.renderer.setElementAttribute(this._el_6,'style','object-fit:cover;width:100%;');
    this._text_7 = this.renderer.createText(this._el_4,'\n        ',(null as any));
    this._text_8 = this.renderer.createText((null as any),'\n        ',(null as any));
    this._el_9 = this.renderer.createElement((null as any),'h2',(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'',(null as any));
    this._text_11 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._query_Label_2_0.reset([]);
    this._Item_2_4.contentLabel = this._query_Label_2_0.first;
    compView_2.create(this._Item_2_4,[
      [].concat([this._el_4]),
      [],
      [].concat([
        this._text_3,
        this._text_8,
        this._el_9,
        this._text_11
      ]
      ),
      [],
      []
    ]
    ,(null as any));
    this._text_12 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_13 = this.renderer.createElement((null as any),'ion-item-options',(null as any));
    this.renderer.setElementAttribute(this._el_13,'side','right');
    this._ItemOptions_13_3 = new import49.ItemOptions(new import32.ElementRef(this._el_13),this.renderer);
    this._text_14 = this.renderer.createText(this._el_13,'\n      ',(null as any));
    this._el_15 = this.renderer.createElement(this._el_13,'button',(null as any));
    this.renderer.setElementAttribute(this._el_15,'color','primary');
    this.renderer.setElementAttribute(this._el_15,'ion-button','');
    this._appEl_15 = new import2.AppElement(15,13,this,this._el_15);
    var compView_15:any = import36.viewFactory_Button0(this.viewUtils,this.injector(15),this._appEl_15);
    this._Button_15_4 = new import18.Button((null as any),'',this.parent.parentInjector.get(import31.Config),new import32.ElementRef(this._el_15),this.renderer);
    this._appEl_15.initComponent(this._Button_15_4,[],compView_15);
    this._text_16 = this.renderer.createText((null as any),'\n        ',(null as any));
    this._el_17 = this.renderer.createElement((null as any),'ion-icon',(null as any));
    this.renderer.setElementAttribute(this._el_17,'name','mail');
    this.renderer.setElementAttribute(this._el_17,'role','img');
    this._Icon_17_3 = new import22.Icon(this.parent.parentInjector.get(import31.Config),new import32.ElementRef(this._el_17),this.renderer);
    this._text_18 = this.renderer.createText((null as any),'\n        Mensajes\n      ',(null as any));
      compView_15.create(this._Button_15_4,[[].concat([
        this._text_16,
        this._el_17,
        this._text_18
      ]
    )],(null as any));
    this._text_19 = this.renderer.createText(this._el_13,'\n    ',(null as any));
    this._text_20 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._query_Item_0_0.reset([this._Item_2_4]);
    this._ItemSliding_0_4.item = this._query_Item_0_0.first;
    compView_0.create(this._ItemSliding_0_4,[
      [].concat([this._el_2]),
      [].concat([this._el_13])
    ]
    ,(null as any));
    var disposable_0:Function = this.renderer.listen(this._el_2,'click',this.eventHandler(this._handle_click_2_0.bind(this)));
    this._expr_1 = import8.UNINITIALIZED;
    this._expr_2 = import8.UNINITIALIZED;
    this._expr_3 = import8.UNINITIALIZED;
    this._expr_4 = import8.UNINITIALIZED;
    this._expr_5 = import8.UNINITIALIZED;
    this.init([].concat([this._el_0]),[
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
      this._el_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._text_19,
      this._text_20
    ]
    ,[disposable_0],[]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import51.Avatar) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 7)))) { return this._Avatar_4_3; }
    if (((token === import50.Item) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 11)))) { return this._Item_2_4; }
    if (((token === import50.ItemContent) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 11)))) { return this._ItemContent_2_5; }
    if (((token === import22.Icon) && (17 === requestNodeIndex))) { return this._Icon_17_3; }
    if (((token === import18.Button) && ((15 <= requestNodeIndex) && (requestNodeIndex <= 18)))) { return this._Button_15_4; }
    if (((token === import49.ItemOptions) && ((13 <= requestNodeIndex) && (requestNodeIndex <= 19)))) { return this._ItemOptions_13_3; }
    if (((token === import49.ItemSliding) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._ItemSliding_0_4; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    var changed:boolean = true;
    const currVal_2:any = 'right';
    if (import5.checkBinding(throwOnChange,this._expr_2,currVal_2)) {
      this._ItemOptions_13_3.side = currVal_2;
      this._expr_2 = currVal_2;
    }
    changed = false;
    const currVal_3:any = 'primary';
    if (import5.checkBinding(throwOnChange,this._expr_3,currVal_3)) {
      this._Button_15_4.color = currVal_3;
      changed = true;
      this._expr_3 = currVal_3;
    }
    if (changed) { this._appEl_15.componentView.markAsCheckOnce(); }
    const currVal_4:any = 'mail';
    if (import5.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this._Icon_17_3.name = currVal_4;
      this._expr_4 = currVal_4;
    }
    this.detectContentChildrenChanges(throwOnChange);
    if (!throwOnChange) {
      if (this._query_Button_2_1.dirty) {
        this._query_Button_2_1.reset([]);
        this._Item_2_4._buttons = this._query_Button_2_1;
        this._query_Button_2_1.notifyOnChanges();
      }
      if (this._query_Icon_2_2.dirty) {
        this._query_Icon_2_2.reset([]);
        this._Item_2_4._icons = this._query_Icon_2_2;
        this._query_Icon_2_2.notifyOnChanges();
      }
      if (this._query_ItemOptions_0_1.dirty) {
        this._query_ItemOptions_0_1.reset([this._ItemOptions_13_3]);
        this._ItemSliding_0_4._itemOptions = this._query_ItemOptions_0_1;
        this._query_ItemOptions_0_1.notifyOnChanges();
      }
      if ((this.numberOfChecks === 0)) { this._Item_2_4.ngAfterContentInit(); }
      if ((this.numberOfChecks === 0)) { this._Button_15_4.ngAfterContentInit(); }
    }
    const currVal_1:any = import5.interpolate(1,'',this.context.$implicit.username,'');
    if (import5.checkBinding(throwOnChange,this._expr_1,currVal_1)) {
      this.renderer.setText(this._text_10,currVal_1);
      this._expr_1 = currVal_1;
    }
    const currVal_5:any = this._Icon_17_3._hidden;
    if (import5.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this.renderer.setElementClass(this._el_17,'hide',currVal_5);
      this._expr_5 = currVal_5;
    }
    this.detectViewChildrenChanges(throwOnChange);
  }
  destroyInternal():void {
    this._Icon_17_3.ngOnDestroy();
  }
  private _handle_click_2_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.parent.context.showUser(this.context.$implicit)) !== false);
    return (true && pd_0);
  }
}
function viewFactory_UsersPage1(viewUtils:import5.ViewUtils,parentInjector:import6.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  return new _View_UsersPage1(viewUtils,parentInjector,declarationEl);
}