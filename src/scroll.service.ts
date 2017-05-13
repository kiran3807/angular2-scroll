import {
    Injectable,
    QueryList,
    ElementRef,
    Inject
} from '@angular/core';

import { EnvAdapter,
         ADAPTER_TOKEN
} from './adapters';

export type callback = (objects?: any, index?: number, objectArr?: any[])=>boolean

@Injectable()
export class ScrollService {
    private scrollData: any = {};
    
    constructor(@Inject(ADAPTER_TOKEN)private adapter: EnvAdapter){}
    
    public init(newLists: QueryList<any>[] ) {
        this.scrollData.instances = newLists[0];
        this.scrollData.elements = newLists[1];
    }

    private _getScrollData(elements: QueryList<any>, instances: QueryList<any>) {
		let filterData: any[] = [],
		data: any,
		elementsArr = elements.toArray();

		instances.forEach((instance, index)=> {
			data = {
				"instance" : instance instanceof ElementRef ? null : instance ,
				"nativeElement" : elementsArr[index]
			}
			filterData.push(data);
		});
		return [filterData, elementsArr];
    }
    public scroll(finder: callback, context?: any): boolean {
        let filterData: any[],
        selectionData: any[],
        selection: any,
        found: boolean,
        index: number;

        [ filterData, selectionData ] = this._getScrollData(this.scrollData.elements, this.scrollData.instances);
        if(!filterData || !selectionData) {
            return false;
        }
        for(index=0;index<filterData.length && !found;index++) {
            selection = filterData[index];
            found = finder(selection, index, filterData);
            if(found) {
                break;
            }
        }
        if(index >= filterData.length) {
            return false;
        }else {
            this.adapter.scrollTo(selectionData[index]);
        }
        return true
    }
    
}
