import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {
    NgdsDataGridOption, NgdsPanelOption,
    NgdsDataSource,
    NgdsModel,
    NgdsDataGridModel,
    NgdsTabOption,
    DatagridDeepPropertyPipe,
    NgdsFormConfig,
    NgdsFormOption, NgdsFormInput, NgdsFormRadio, NgdsFormCheckbox, NgdsFormSelect, NgdsFormDatePicker,
    NgdsFormUmeditor, NgdsFormUploader, NgdsFormCompOption,
    NgdsForm, NgdsFormComp, NgdsDataGrid, NgdsDataGridColumnOption
} from '../../../../../src/index';
import { DatagridPropertyPipe, DatagridPropertyBadgePipe } from '../../shared/pipe/index';

// pageSize: number; //每页个数
// pageCount: number; //页面总数
// pageIndex: number;//当前页数
@Component({
    template: `
    <div>
     {{item.username}}
     <div>
        自定义组件
     </div>
    </div>
    `
})
export class DemoColumnComponent {
    elRef: ElementRef
    colOption:NgdsDataGridColumnOption;
    item:any;

    constructor(elRef: ElementRef) {
        this.elRef = elRef;
    }
}

class DemoDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsDataGridModel> {
        return new Promise<NgdsDataGridModel>((resolve, reject) => {
            let date = new Date();
            setTimeout(() => {
                resolve({
                    page: {
                        pageSize: 4,
                        pageCount: 10,
                        totalCount: 9
                    },
                    data: [
                        { 
                            key:1, username: "13999", name: "胡立波1", mobile: "13333333333", authStatus: 1, org: { name: 1 } ,
                            children:[
                                { key:9, username: "13999", name: "胡立波9", mobile: "13333333331", authStatus: 0 },
                                { key:10, username: "13999", name: "胡立波10", mobile: "13333333333", authStatus: 1 },
                                { key:11, username: "13999", name: "胡立波11", mobile: "13333333333", authStatus: 1 },
                            ]
                        },
                        { key:2, username: "13999", name: "胡立波2", mobile: "13333333331", authStatus: 0,disableEdit:true },
                        { key:3, username: "13999", name: "胡立波3", mobile: "13333333333", authStatus: 1,disableEdit:true },
                        { key:4, username: "13999", name: "胡立波4", mobile: "13333333333", authStatus: 1,disableEdit:true },
                        { key:5, username: "13999", name: "胡立波5", mobile: "13333333333", authStatus: 0,disableEdit:true },
                        { key:6, username: "13999", name: "胡立波6", mobile: "13333333333", authStatus: 1,disableEdit:true },
                        { key:7, username: "13999", name: "胡立波7", mobile: "13333333333", authStatus: 1,disableEdit:true },
                        { key:8, username: "13999", name: "胡立波8", mobile: "13333333333", authStatus: 1,disableEdit:true },
                    ]
                });
            }, 1000)

        });
    }
}
class AuthStatusDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve([
                { label: "全部", value: 0 },
                { label: "已认证", value: 1 },
                { label: "未认证", value: 2 }
            ]);
        });
    }
}

class SexDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve([
                { label: "男", value: 1 },
                { label: "女", value: 2 }
            ]);
        });
    }
}
class LikeDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve([
                { label: "游泳", value: 1 },
                { label: "下棋", value: 2 },
                { label: "编程", value: 3 },
                { label: "跑步", value: 4 }
            ]);
        });
    }
}
class SelectDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve([
                { label: "全部", value: "" },
                { label: "杭州", value: 1 },
                { label: "宁波", value: 2 },
                { label: "温州", value: 3 },
                { label: "上海", value: 4 }
            ]);
        });
    }
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    templateUrl: 'datagrid.component.html',
    styleUrls: ['datagrid.component.css'],
})
export class DataGridComponent implements OnInit {

    constructor(private datagridPropertyPipe: DatagridPropertyPipe,
        private datagridPropertyBadgePipe: DatagridPropertyBadgePipe,
        private datagridDeepPropertyPipe: DatagridDeepPropertyPipe) {
    }
    @ViewChild('myForm') myForm: NgdsForm;
    @ViewChild('myTable') myTable: NgdsDataGrid;

    panelOption: NgdsPanelOption = {
        crumbs: [
            {
                text: "专题资讯"
            },
            {
                text: "新增资讯"
            }
        ],
        buttons: [
            {
                text: '多选功能',
                action: (item) => {
                    this.option.table.showCheck = !this.option.table.showCheck;
                }
            },
            {
                text: '显示排序',
                action: (item) => {
                    this.option.table.columns[0].showSort = !this.option.table.columns[0].showSort;
                }
            }
        ]
    }

    tabOption: NgdsTabOption = {
        tabSource: new AuthStatusDataSource()
    }

    formOption: NgdsFormOption = {
        showSearch: true,
        column: 3,
        components: [
            [
                {
                    label: '店铺名称', property: "shopName", comp: NgdsFormInput, type: "text"
                },
                { label: '商品名称', property: "goodName", comp: NgdsFormInput, type: "password" }
            ],

        ]

    }

    option: NgdsDataGridOption = {
        dataSource: new DemoDataSource(),
        table: {
            showCheck: false,
            columns: [
                { text: '用户名', property: "username",canEdit:true,editFinish:(item:any)=>{
                    debugger
                }},
                { text: '姓名', property: "name",  },
                { text: '手机号', property: "mobile", },
                {
                    text: '认证状态',
                    property: "authStatus",
                    propertyPipe: this.datagridPropertyPipe,
                    badgePipe: (property: string, data: any): string => {
                        if (data[property] == 1) {
                            return "success";
                        } else {
                            return "error";
                        }
                    },
                    width: "130px"
                },
                {
                    text: '企业名称',
                    property: "org.name",
                    propertyPipe: [this.datagridDeepPropertyPipe, this.datagridPropertyPipe],
                    title: true,
                    overflow: true
                },
            ],
            op: {
                width: "220px",
                buttons: [
                    {
                        text: '选择框可用',
                        action: function (item) {
                            item.disabled = !item.disabled;
                        }
                    },
                    {
                        text: '删除',
                        hidden: (data) => {
                            if (data.mobile == "13333333331") {
                                return true;
                            }
                            return false;
                        },
                        action: function (item) {
                            alert(item);
                        }
                    }
                ],
                groupButtons: [
                    {
                        text: '用户管理',
                        hidden: (data) => {
                            if (data.mobile == "13333333331") {
                                return true;
                            }
                            return false;
                        },
                        buttons: [
                            {
                                text: "老师管理",
                                action: function (item) {
                                }
                            },
                            {
                                text: "学生管理",
                                hidden: (data) => {
                                    if (data.mobile == "13333333331") {
                                        return true;
                                    }
                                    return false;
                                },
                                action: function (item) {
                                }
                            },
                            {
                                text: "家长管理",
                                action: function (item) {
                                }
                            },
                            {
                                text: "园务管理",
                                action: function (item) {
                                }
                            }
                        ]
                    }
                ]
            }

        }
    }

    /**
     * Get the names OnInit
     */
    ngOnInit() {
    }

    tabSelect(data: any) {
        let value: any = this.myForm.getValue();
        this.myTable.search({ auth: data.value });
    }

    search(value: any) {
        debugger
        this.myTable.search(value);
    }

}
