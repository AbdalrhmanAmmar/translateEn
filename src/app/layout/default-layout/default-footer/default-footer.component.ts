import { Component } from '@angular/core';
import { ColComponent, ContainerComponent, FooterComponent, FooterModule, RowComponent } from '@coreui/angular-pro';

@Component({
    selector: 'app-default-footer',
    imports: [FooterModule ],
    templateUrl: './default-footer.component.html',
    styleUrls: ['./default-footer.component.scss']
})
export class DefaultFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
