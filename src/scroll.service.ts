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

    private _getScrollData(findByElements: any, elements: QueryList<any>, instances: QueryList<any>) {
        let data: any[]
        if(findByElements) {
            data = [elements.map(element=>element.nativeElement), elements.toArray()];
        }else if(instances.first instanceof ElementRef) {
            data = [elements.map(element=>element.nativeElement), elements.toArray()];
        }else {
            data = [instances.toArray(), elements.toArray()];
        }
        return data;
    }
    public scroll(finder: callback, findByElements=false, context?: any): boolean {
        let filterData: any[],
        selectionData: any[],
        selection: any,
        found: boolean,
        index: number;

        [ filterData, selectionData ] = this._getScrollData(findByElements, this.scrollData.elements, this.scrollData.instances);
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
