import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    //{ path: 'detail/:id', component: DetailComponent }, // - non-lazy: load thường - Angular tải sẵn (eager load) CreateComponent khi app khởi động 
    //{ path: 'create', component: CreateComponent } // - Nếu app có nhiều component -> thời gian load ban đầu sẽ lâu
    {
    path: 'detail/:id', // lazy load: Component chỉ được tải khi truy cập vào đường dẫn - giúp giảm tải thời gian khởi động của app -> tối ưu hiệu suất.
    loadComponent: () => 
      import('./detail/detail.component').then((m) => m.DetailComponent),
    },
    {
    path: 'create',
    loadComponent: () =>
      import('./create/create.component').then((m) => m.CreateComponent),
    },
];  
