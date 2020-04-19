import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'highlight'
})

export class HighlightSearch implements PipeTransform {

  transform(value: string, args: string): any {
    if (args && value) {
      value = String(value); // make sure its a string
      const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
      if (startIndex !== -1) {
        const matchingString = value.substr(startIndex, args.length);
        return value.replace(matchingString, "<mark>" + matchingString + "</mark>");
      }
    }
    return value;
  }
}
