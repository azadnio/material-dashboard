import { R } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  imports: [RouterOutlet],
  template: `
    <p>
      content works!
    </p>
    <router-outlet/>
  `,
  styles: ``,
})
export default class Content {

}
