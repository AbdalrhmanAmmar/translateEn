import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, OnInit , OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  SidebarToggleDirective,
  TooltipModule
} from '@coreui/angular-pro';

import { IconDirective } from '@coreui/icons-angular';
import { LanguageSwitcherComponent } from '../../../../components/shared/language-switcher/language-switcher.component';
import { UserStore } from '../../../../core/current-user/user-store';
import { AuthService } from '../../../../core/services/modules-services/auth.service';
import { interval, Subscription } from 'rxjs';

interface Activity {
  id: number;
  title: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  imports: [ContainerComponent ,HeaderNavComponent, TooltipModule, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, RouterLink, NgTemplateOutlet, BreadcrumbRouterComponent, DropdownComponent, DropdownToggleDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective, LanguageSwitcherComponent]
})
export class DefaultHeaderComponent extends HeaderComponent implements OnDestroy, OnInit {

  activitiesLog : Activity[] = [
    {
      id: 1,
      title: 'تم تسجيل الدخول',
      icon: 'cilUser',
      color: 'primary'
    },
    {
      id: 2,
      title: 'تم تحديث الملف الشخصي',
      icon: 'cilSettings',
      color: 'info'
    },
    {
      id: 3,
      title: 'تم تغيير كلمة المرور',
      icon: 'cilLockLocked',
      color: 'warning'
    }
  ];

  public newNotifications = [
    { id: 0, title: 'New user registered', icon: 'cilUserFollow', color: 'success' },
    { id: 1, title: 'User deleted', icon: 'cilUserUnfollow', color: 'danger' },
    { id: 2, title: 'Sales report is ready', icon: 'cilChartPie', color: 'info' },
    { id: 3, title: 'New client', icon: 'cilBasket', color: 'primary' },
    { id: 4, title: 'Server overloaded', icon: 'cilSpeedometer', color: 'warning' }
  ];

    public newStatus = [
    { id: 0, title: 'CPU Usage', value: 25, color: 'info', details: '348 Processes. 1/4 Cores.' },
    { id: 1, title: 'Memory Usage', value: 70, color: 'warning', details: '11444GB/16384MB' },
    { id: 2, title: 'SSD 1 Usage', value: 90, color: 'danger', details: '243GB/256GB' }
  ];

  public newTasks = [
    { id: 0, title: 'Upgrade NPM', value: 0, color: 'info' },
    { id: 1, title: 'ReactJS Version', value: 25, color: 'danger' },
    { id: 2, title: 'VueJS Version', value: 50, color: 'warning' },
    { id: 3, title: 'Add new layouts', value: 75, color: 'info' },
    { id: 4, title: 'Angular Version', value: 100, color: 'success' }
  ];

  public newMessages = [
    {
      id: 0,
      from: 'Jessica Williams',
      avatar: '7.jpg',
      status: 'success',
      title: 'Urgent: System Maintenance Tonight',
      time: 'Just now',
      link: 'apps/email/inbox/message',
      message: 'Attention team, we\'ll be conducting critical system maintenance tonight from 10 PM to 2 AM. Plan accordingly...'
    },
    {
      id: 1,
      from: 'Richard Johnson',
      avatar: '6.jpg',
      status: 'warning',
      title: 'Project Update: Milestone Achieved',
      time: '5 minutes ago',
      link: 'apps/email/inbox/message',
      message: 'Kudos on hitting sales targets last quarter! Let\'s keep the momentum. New goals, new victories ahead...'
    },
    {
      id: 2,
      from: 'Angela Rodriguez',
      avatar: '5.jpg',
      status: 'danger',
      title: 'Social Media Campaign Launch',
      time: '1:52 PM',
      link: 'apps/email/inbox/message',
      message: 'Exciting news! Our new social media campaign goes live tomorrow. Brace yourselves for engagement...'
    },
    {
      id: 3,
      from: 'Jane Lewis',
      avatar: '4.jpg',
      status: 'info',
      title: 'Inventory Checkpoint',
      time: '4:03 AM',
      link: 'apps/email/inbox/message',
      message: 'Team, it\'s time for our monthly inventory check. Accurate counts ensure smooth operations. Let\'s nail it...'
    },
    {
      id: 4,
      from: 'Ryan Miller',
      avatar: '3.jpg',
      status: 'info',
      title: 'Customer Feedback Results',
      time: '3 days ago',
      link: 'apps/email/inbox/message',
      message: 'Our latest customer feedback is in. Let\'s analyze and discuss improvements for an even better service...'
    }
  ];
  
  sidebarId = input('sidebar1');

   private readonly STORAGE_KEY = 'esnad-session-start';

  sessionStart!: number;
  sessionTime = '00:00:00';
  currentTime = '';
  private tickSub!: Subscription;

  readonly #colorModeService = inject(ColorModeService);
  readonly authService = inject(AuthService);
  readonly _Router = inject(Router);

  constructor() {
    super();
  }

  ngOnInit() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.sessionStart = Number(stored);
    } else {
      this.sessionStart = Date.now();
      localStorage.setItem(
        this.STORAGE_KEY,
        this.sessionStart.toString()
      );
    }

    this.updateTimes();
    this.tickSub = interval(1000).subscribe(() => this.updateTimes());
  }

  ngOnDestroy() {
    this.tickSub.unsubscribe();
  }

  private updateTimes() {
    const diff = Math.floor((Date.now() - this.sessionStart) / 1000);
    const h = Math.floor(diff / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((diff % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (diff % 60).toString().padStart(2, '0');
    this.sessionTime = `${h}:${m}:${s}`;

    const now = new Date();
    const hh = now.getHours();
    const mm = now.getMinutes().toString().padStart(2, '0');
    const ap = hh < 12 ? 'AM' : 'PM';
    const hr12 = ((hh + 11) % 12) + 1;
    this.currentTime = `${hr12}:${mm} ${ap}`;
  }

  Logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);

    this.authService.logoutUser().subscribe({
      next: () => {
        UserStore.clearUser();
        this._Router.navigate(['/login']);
      },
      error: () => {
        UserStore.clearUser();
        this._Router.navigate(['/login']);
      },
    });
  }

}
