import { ElementRef,
	     Injectable,
		 OpaqueToken
	   } from '@angular/core';

/**
 * This interface is to be implemented by all
 * adapters wishing to provide scrolling
 * logic in different contexts such as
 * mobile
 */
export interface EnvAdapter {
	scrollTo(elementRef: ElementRef): boolean
}

export const ADAPTER_TOKEN = new OpaqueToken('adapter_token');

@Injectable()
export class BrowserAdapter implements EnvAdapter {

	constructor() {
	}
	scrollTo(target: ElementRef): boolean {
		let positions = target.nativeElement.getBoundingClientRect(),
		finalPosition: number,
		windowHeight: number;
		
		if(window && document) {
			/* cross browser way to get the inner window height */
			windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			/**
			 * first we get the absolute position of the element to be scrolled. then we scroll
			 * to the element. Then we scroll up some more to bring the complete element into
			 * the view
			 */
			finalPosition = (positions.top+window.scrollY)-(windowHeight/2);
			window.scrollTo(0, finalPosition);
			return true;
		}
		return false;
	}
}
