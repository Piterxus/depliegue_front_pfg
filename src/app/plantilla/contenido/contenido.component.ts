import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, Inject, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { TokenService } from 'src/app/services/auth/token.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit, AfterViewInit, OnChanges {
  name: string = this.capitalizeFirstLetter(localStorage.getItem('name') || 'Usuario');
  role = localStorage.getItem('role') || null;
  routeName: any = null;
  currentRoute: string = '';
  breadcrumb: string = '';
  @ViewChild('contenidoInternoRef') contenidoInternoRef!: ElementRef;
  showArrows: boolean = false;
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService, private route: ActivatedRoute, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document) { }
  logout() {

    this.tokenService.removeToken();

    this.router.navigate(['/login']);
  }
  private capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  checkOverflow() {
    const content = this.contenidoInternoRef.nativeElement;
    if (content.scrollHeight > content.clientHeight) {
      this.showArrows = true; // Mostrar flechas si el contenido desborda
    } else {
      this.showArrows = false; // Ocultar flechas si el contenido no desborda
    }
  }

  scrollUp() {
    this.contenidoInternoRef.nativeElement.scrollTop -= 50; // Cambia este valor según tus necesidades
  }

  scrollDown() {
    this.contenidoInternoRef.nativeElement.scrollTop += 50; // Cambia este valor según tus necesidades
  }

  ngOnInit(): void {
    this.routeName = this.route.snapshot.routeConfig?.path;
 
    if (this.routeName === 'panel') {
      this.routeName = 'Panel de control';
      this.currentRoute = 'Inicio';
    }
    if (this.routeName === 'perfil') {
      this.routeName = 'Configurar perfil';
      this.currentRoute = 'Inicio > Configurar perfil';
    }
    if (this.routeName === 'miembros') {
      this.routeName = 'Gestión miembros asociados';
      this.currentRoute = 'Inicio > Miembros';  
    }
    if (this.routeName === 'amarres-socio') {
      this.routeName = 'Gestión de amarres';
      this.currentRoute = 'Inicio > Amarres';
    }
    if (this.routeName === 'facturas') {
      this.routeName = 'Gestión de facturas';
      this.currentRoute = 'Inicio > Facturas';
    }
    if (this.routeName === 'formas-pago') {
      this.routeName = 'PAGOS';
      this.currentRoute = 'Inicio > Pagos';
    }
    if (this.routeName === 'embarcaciones-socio') {
      this.routeName = 'Embarcaciones';
      this.currentRoute = 'Inicio > Embarcaciones';
    }


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log('NAVIAGTION START');
      console.log('Ruta actual ->:', this.route.children[0].snapshot.data['breadcrumb']);
      this.breadcrumb = this.route.children[0].snapshot.data['breadcrumb'];
      console.log('Ruta actual bread:', this.breadcrumb);

      if (this.breadcrumb){
        // alert('Ruta actual ->:' + this.currentRoute + " > " + this.breadcrumb);
        this.currentRoute = this.currentRoute + " > " + this.breadcrumb;
        // this.breadcrumb = this.breadcrumb;
      }else{
       
        const lastIndex = this.currentRoute.lastIndexOf(' > ');
        if (lastIndex !== -1) {
          this.currentRoute=this.currentRoute.substring(0, lastIndex);
        }
      }

  
    });

   

    // Mostrar por consola la ruta actual
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   // this.currentRoute = this.router.url;
    //   // this.currentRoute = document.location.toString();

    //   if (this.document.location.href === 'http://localhost:4200/panel') {
    //     this.currentRoute = 'Inicio';
    //   }
   
    //   console.log('Ruta actual:', this.router.url);
    //   // this.cdr.detectChanges();
    // });
    console.log('Location', document.location.href);
  }

  ngAfterViewInit() {
    this.checkOverflow();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        this.checkOverflow(); // Llama a checkOverflow después de la navegación
      });
    });

    console.log('Location change newinit', document.location.href);
  }

  ngOnChanges() {
    if (document.location.href === 'http://localhost:4200/panel') {
      this.currentRoute = 'Inicio';
    }
    if (document.location.href === 'http://localhost:4200/miembros') {
      this.currentRoute = 'Inicio > miembros';
    }

    if (this.router.url.includes('/miembros/formulario?')) {
      this.currentRoute = 'Inicio > miembros > formulario';
    }



    console.log('Location change', document.location.href);
  }

  

}
