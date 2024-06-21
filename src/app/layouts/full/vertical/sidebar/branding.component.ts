import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from '../../../../services/core.service';
import { BrowserTabManager } from '../../../../services/browser-tab-manager.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding d-none d-lg-flex align-items-center">
      <a [routerLink]="['/']" class="d-flex">
        <img
          [src]="urlLogo"
          class="align-middle m-2"
          alt="logo"
          style="width: 200px;"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent implements OnInit{
  @Input() urlLogo: string;

  options = this.settings.getOptions();

  constructor(private settings: CoreService, private tabManager: BrowserTabManager) {

  }
  ngOnInit(): void {

  }


}
