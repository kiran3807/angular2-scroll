import {
    Directive,
    ContentChildren,
    QueryList,
    AfterContentInit,
    ElementRef
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ScrollService } from './scroll.service';

@Directive({
    selector : '[scrollable]'
})
export class ScrollableDirective implements AfterContentInit {
    @ContentChildren('scrollTo')
    private _scrollableList: QueryList<any>;

    @ContentChildren('scrollTo',{ read : ElementRef })
    private _scrollableElementRefList: QueryList<ElementRef>;
    
    constructor(private _service: ScrollService) {
    }

    ngAfterContentInit() {
        let lists: QueryList<any>[] = [];
        
        lists.push(this._scrollableList);
        lists.push(this._scrollableElementRefList);
        this._service.init(lists);
        
        Observable.zip(
            this._scrollableList.changes,
            this._scrollableElementRefList.changes
        ).subscribe(newLists=> {
            this._service.init(newLists);
        });
    }
}
