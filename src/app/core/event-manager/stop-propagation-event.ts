/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { EventManagerPlugin } from '@angular/platform-browser';

export class StopPropagationEventPlugin extends EventManagerPlugin {
  supports(eventName: string): boolean {
    return eventName.endsWith('.stop');
  }
  addEventListener(
    element: HTMLElement,
    eventName: string,
    handler: Function,
  ): Function {
    const originalEvent = eventName.split('.')[0];
    return this.manager.addEventListener(element, originalEvent, (e: Event) => {
      e.stopPropagation();
      handler(e);
    });
  }
}
