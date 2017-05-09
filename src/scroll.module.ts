import {
	NgModule
} from '@angular/core';

import { ScrollableDirective } from './scroll.component';
import { ScrollService } from './scroll.service';
import { EnvAdapter,
		 ADAPTER_TOKEN,
		 BrowserAdapter
} from './adapters';


export enum ScrollEnv {
	BROWSER,
	ANDROID,
	IPHONE
}
@NgModule({
	declarations : [ScrollableDirective],
	exports : [ScrollableDirective]
})
export class ScrollModule {
	constructor() {}
	
	public static forRoot(scrollEnv = ScrollEnv.BROWSER ) {
		let envAdapterClass: any;
		
		switch(scrollEnv) {
		case ScrollEnv.BROWSER:
			envAdapterClass = BrowserAdapter;
			break;
		}
		return {
			ngModule : ScrollModule,
			providers : [{ provide: ADAPTER_TOKEN, useClass: envAdapterClass },{ provide: ScrollService, useClass: ScrollService }]
		};
	}
}
