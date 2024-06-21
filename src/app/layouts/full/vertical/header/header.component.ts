import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { navItems } from '../sidebar/sidebar-data';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrandingComponent } from '../sidebar/branding.component';
import { NgFor, NgIf } from '@angular/common';
import { CoreService } from '../../../../services/core.service';
import { MaterialModule } from '../../../../material.module';
import { BrowserTabManager } from '../../../../services/browser-tab-manager.service';

interface notifications {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface msgs {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface profiledd {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgScrollbarModule, TablerIconsModule, MaterialModule, BrandingComponent, NgFor, NgIf, TranslateModule ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();


  showFiller = false;

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: '/assets/images/flag/icon-flag-en.svg',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: '/assets/images/flag/icon-flag-en.svg',
    },
    {
      language: 'Español',
      code: 'es',
      icon: '/assets/images/flag/icon-flag-es.svg',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: '/assets/images/flag/icon-flag-fr.svg',
    },
    {
      language: 'German',
      code: 'de',
      icon: '/assets/images/flag/icon-flag-de.svg',
    },
  ];


  public selectedCompany: any = {
    name: 'Centric',
    code: '2',
    icon: '/assets/images/logos/centric_logo.png',
    iconCab: './assets/images/logos/centric_cab.png'
  };

  public selectedAgenciaId: string = ''


  public selectedBodegaId: string = ''


  public companias: any[] = [
    {
      name: 'Centric',
      code: '2',
      icon: '/assets/images/logos/centric_logo.png',
      iconCab: '/assets/images/logos/centric_cab.png',
    },
    {
      name: 'Casabaca',
      code: '1',
      icon: '/assets/images/logos/casabaca_logo.png',
      iconCab: '/assets/images/logos/casabaca_cab.png',
    },
    {
      name: 'Mansuera',
      code: '3',
      icon: '/assets/images/logos/mansuera_logo.png',
      iconCab: '/assets/images/logos/mansuera_cab.png',
    }
  ];

  constructor(
    private settings: CoreService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private tabManager: BrowserTabManager,
    private _router: Router,
  ) {
    translate.setDefaultLang('es');
    this.loadData()
  }
  options = this.settings.getOptions();


  setColor(code: string) {
    switch (code) {
      case '1':
        this.options.activeTheme = 'orange_theme';
        break;
      case '2':
        this.options.activeTheme = 'blue_theme';
        break;
      case '3':
        this.options.activeTheme = 'purple_theme';
        break;
      default:
        this.options.activeTheme = 'blue_theme';
        break;
    }
    //this.optionsChange.emit(this.options);
  }

  ngOnInit(): void{
  }




  changeCompany(company: any) {
    this.selectedAgenciaId = company.agenciaId;
    this.selectedBodegaId = company.bodegaId;
    this.selectedCompany = this.companias.find((item) => item.code == company.empresaId);
    this.saveData();
  }

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }



  saveData() {
    let data: any = {
      empresa: this.selectedCompany,
      agenciaId: this.selectedAgenciaId,
      bodegaId: this.selectedBodegaId
    }
    this.tabManager.setTabData(data);
    this.setColor(data.empresa.code);
    this._router.navigateByUrl('/');

  }

  loadData() {
    let tabData: any = this.tabManager.getTabData();
    if (!this.isEmptyObject(tabData)) {
      this.selectedAgenciaId = tabData.agenciaId;
      this.selectedBodegaId = tabData.bodegaId;
      this.selectedCompany = tabData.empresa;
      this.setColor(tabData.empresa?.code);
    }
  }



  private isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /**
   * Meotodo para ir atras
   */
  goHome(): void {
    this._router.navigateByUrl('/')
  }

  logout(){}

  notifications: notifications[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulate him',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'New message received',
      subtitle: 'Salma sent you new message',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'New Payment received',
      subtitle: 'Check your earnings',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'Jolly completed tasks',
      subtitle: 'Assign her new tasks',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulate him',
    },
  ];

  msgs: msgs[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Andrew McDownland',
      subtitle: 'Message blocked. Try Again',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'Christopher Jamil',
      subtitle: 'This message cannot be sent',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'Julia Roberts',
      subtitle: 'You are trying to reach location.',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'James Johnson',
      subtitle: 'Assign her new tasks',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Maria Rodriguez',
      subtitle: 'Congrats for your success',
    },
  ];

  profiledd: profiledd[] = [
    {
      id: 1,
      img: '/assets/images/svgs/icon-account.svg',
      title: 'My Profile',
      subtitle: 'Account Settings',
      link: '/',
    },
    {
      id: 2,
      img: '/assets/images/svgs/icon-inbox.svg',
      title: 'My Inbox',
      subtitle: 'Messages & Email',
      link: '/apps/email/inbox',
    },
    {
      id: 3,
      img: '/assets/images/svgs/icon-tasks.svg',
      title: 'My Tasks',
      subtitle: 'To-do and Daily Tasks',
      link: '/apps/taskboard',
    },
  ];

}

@Component({
  selector: 'search-dialog',
  standalone: true,
  imports: [RouterModule, MaterialModule, TablerIconsModule, FormsModule],
  templateUrl: 'search-dialog.component.html',
})
export class AppSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;

  navItemsData = navItems.filter((navitem) => navitem.displayName);

  // filtered = this.navItemsData.find((obj) => {
  //   return obj.displayName == this.searchinput;
  // });



}
