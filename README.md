### SISTEMA PORTARIA
    Projeto Front-end do Sistema de Portaria da Sejus com uso das seguintes Tecnologias:
        -Angular 8
        -Bootstrap 4
        -Font awesome
        -Jquery
### Arquitetura do Sistema

```
material-dashboard-angular
├── CHANGELOG.md
├── LICENSE.md
├── README.md
├── angular-cli.json
├── documentation
├── e2e
├── karma.conf.js
├── package-lock.json
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.routing.ts
│   │   ├── filter.pipe.ts
│   │   ├── filter3.pipe.ts
│   │   ├── filter4.pipe.ts
│   │   ├── components
│   │   │   ├── components.module.ts
│   │   │   ├── alert.modal.service.ts
│   │   │   ├── footer
│   │   │   │   ├── footer.component.css
│   │   │   │   ├── footer.component.html
│   │   │   │   └── footer.component.ts
│   │   │   ├── navbar
│   │   │   │   ├── navbar.component.css
│   │   │   │   ├── navbar.component.html
│   │   │   │   └── navbar.component.ts
│   │   │   └── sidebar
│   │   │       ├── sidebar.component.css
│   │   │       ├── sidebar.component.html
│   │   │       └── sidebar.component.ts
│   │   ├── dashboard
│   │   │   ├── dashboard.component.css
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.ts
│   │   ├── guards
│   │   │   └── admin.guard.ts
│   │   │   └── auth.guard.ts
│   │   │   └── user.guard.ts
│   │   │   └── visitante-resolver.guard.ts
│   │   ├── helpers
│   │   │   └── error.intercepetor.ts
│   │   │   └── jwt.intercepetor.ts
│   │   ├── interfaces
│   │   │   └── black-list.ts
│   │   │   └── cad-visita.ts
│   │   │   └── cad-visitante.ts
│   │   │   └── lotacao.ts
│   │   │   └── serv.ts
│   │   │   └── token.ts
│   │   │   └── usuario.ts
│   │   │   └── usuarios.ts
│   │   │   └── visitantes.ts
│   │   │   └── visitas.ts
│   │   ├── layouts
│   │   │   └── admin-layout
│   │   │       ├── admin-layout.component.html
│   │   │       ├── admin-layout.component.scss
│   │   │       ├── admin-layout.component.ts
│   │   │       ├── admin-layout.module.ts
│   │   │       └── admin-layout.routing.ts
│   │   │       └── animations.ts
│   │   ├── login
│   │   │   ├── login.component.css
│   │   │   ├── login.component.html
│   │   │   └── login.component.ts
│   │   ├── services
│   │   │   └── auth.services.ts
│   │   │   └── usuario.services.ts
│   │   │   └── visita.services.ts
│   │   │   └── visitante.services.ts
│   │   ├── usuarios
│   │   │   ├── cadastro-usuarios
│   │   │   │    ├── cadastro-usuarios.component.scss
│   │   │   │    ├── cadastro-usuarios.component.hmtl
│   │   │   │    ├── cadastro-usuarios.component.ts
│   │   │   ├── usuarios.component.css
│   │   │   ├── usuarios.component.html
│   │   │   └── usuarios.component.ts
│   │   ├── visitantes
│   │   │   ├── visitantes.component.scss
│   │   │   ├── visitantes.component.html
│   │   │   └── visitantes.component.ts
│   │   ├── upgrade
│   │   │   ├── upgrade.component.css
│   │   │   ├── upgrade.component.html
│   │   │   ├── upgrade.component.spec.ts
│   │   │   └── upgrade.component.ts
│   │   └── user-profile
│   │       ├── user-profile.component.css
│   │       ├── user-profile.component.html
│   │       ├── user-profile.component.spec.ts
│   │       └── user-profile.component.ts
│   ├── assets
│   │   ├── css
│   │   │   └── demo.css
│   │   ├── img
│   │   └── scss
│   │       ├── core
│   │       └── material-dashboard.scss
│   ├── environments
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json
├── tslint.json
└── typings
```