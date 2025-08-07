import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import {
  ContainerComponent,
  INavData,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
} from '@coreui/angular-pro';

import { UserStore } from '../../../core/current-user/user-store';
import { SpinnerService } from '../../../core/services/helper-services/spinner.service';
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultAsideComponent } from './';
import { navItems } from './_nav';
import { Roles } from '../../../core/interfaces/iauth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    ContainerComponent,
    DefaultAsideComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective,
  ],
})
export class DefaultLayoutComponent implements OnInit {
  //!========> SpinnerService
  public readonly _SpinnerService = inject(SpinnerService);

  allNavs = [...navItems];
  navItems: INavData[] = [];

   ngOnInit(): void {

    const user = UserStore.getUser();
    const filteredNavs: INavData[] = [];

    this.allNavs.forEach(item => {
      const requiredRoles = item.attributes?.['Roles'] as string[] | undefined;
      if (!requiredRoles || requiredRoles.includes(user?.Role!) || user?.Role === Roles.Developer) {
        if (item.children) {
          item.children = item.children.filter(child => {
            const childRoles = child.attributes?.['Roles'] as string[] | undefined;
            return !childRoles || childRoles.includes(user?.Role!) || user?.Role === Roles.Developer;
          });

          if (item.children.length === 0 && item.url === undefined) {
            return; 
          }
        }

        filteredNavs.push(item);
      }
    });

    this.navItems = filteredNavs;
  }
}

