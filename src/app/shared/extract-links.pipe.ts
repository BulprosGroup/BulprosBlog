import { Pipe, PipeTransform } from '@angular/core';

const URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const LINK_PATTERN = `<a href="@@url@@" target="_blank" rel="noopener, nofollow" class="bulpros-link">@@url@@</a>`;

@Pipe({
  name: 'extractLinks'
})
export class ExtractLinksPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.replace(URL_REGEX, (match) => LINK_PATTERN.replace(new RegExp('@@url@@', 'g'), match));
  }

}
