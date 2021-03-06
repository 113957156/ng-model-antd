import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';


import { NgdsDataGrid} from './datagrid';
import { NgdsDataGridConfig, NgdsDataGridOption, NgdsDataGridTableOption,
 NgdsDataGridColumnOption, NgdsDataGridOpOption, NgdsDataGridOpBtnOption,
 NgdsDataGridModel, NgdsDataGridPageModel
} from './datagrid.config';

export { NgdsDataGrid} from './datagrid';
export {
	NgdsDataGridConfig, NgdsDataGridOption, NgdsDataGridTableOption,
	NgdsDataGridColumnOption, NgdsDataGridOpOption, NgdsDataGridOpBtnOption,
	NgdsDataGridModel, NgdsDataGridPageModel
} from './datagrid.config';

const NGB_TABSET_DIRECTIVES = [NgdsDataGrid];

@NgModule({ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule, FormsModule,NgZorroAntdModule] })
export class NgdsDataGridModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgdsDataGridModule, providers: [NgdsDataGridConfig] }; }
}
