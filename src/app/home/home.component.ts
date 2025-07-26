import { Component, DoCheck, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductItemComponent} from '../shared/product-item/productItem.component';
import { ProductItems } from '../shared/types/productItem';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../services/BlogService';
import { map, Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet, ProductItemComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  nameBtn = 'Click Me!';
  clickMessage = '';

  isVisible = true;

  getBlogApi: Subscription;

  products: ProductItems[] = [
    { 
      id: 1, 
      name: 'Samba OG', 
      price: 400000, 
      image: 'assets/images/testsamba-og.jpg', 
    },
    { 
      id: 2, 
      name: 'nike f1', 
      price: 500000, 
      image: 'assets/images/testsamba-og.jpg', 
    },
    { 
      id: 3, 
      name: 'addidas f2', 
      price: 600000, 
      image: 'assets/images/testsamba-og.jpg', 
    },
    { 
      id: 4,
      name: 'mlb f3', 
      price: 700000, 
      image: 'assets/images/testsamba-og.jpg',
    }
  ];

  constructor(private blogService: BlogService) { // có thể import sử dụng service, thành phần directive bất kì service nào bạn muốn
    console.log('Initalize Component');
    this.getBlogApi = new Subscription();
  }

  ngOnInit(): void { // làm nhiệm vụ tương tác với API, chạy sau khi template html đã hiển thị ra rồi sau đó fetch API hoặc làm hành động nào đó
    this.getBlogApi = this.blogService
      .getBlogs()
      .pipe(
        map(({ data }) => 
          data
            .map((item: any) => {
              return {
                ...item,
                name: item.title,
                price: Number(item.body),
                image: 'assets/images/testsamba-og.jpg',
              };
            })
            .filter(product => product.price > 300000)
          ),
        )
        .subscribe((res) => {
          this.products = res;
        });
  }
  
  ngOnDestroy(): void {
    if (this.getBlogApi){
      this.getBlogApi.unsubscribe();
      console.log('getBlogApi unsubscribed');
    }
  }

  // chức năng chính: tìm product có id bằng id truyền vào -> nếu có, thì xóa khỏi mảng products
  handleDelete = (id: number) => { 
    // findIndex: tìm vị trí phần tử có id khớp
    this.blogService.deleteBlog(id).subscribe(({ data}: any) => {
      if (data == 1){
        this.products = this.products.filter((item) => item.id !== id);
      }
    });
  };

  handleClickMe(): void {
    this.clickMessage = 'Click Me Hello World';
  }

  handleChangeVisible = () => {
    this.isVisible = false;
  }

  updateField(): void {
    console.log('Hello World');
  }
}

// ngOnChanges: sẽ cập nhật và chạy lại nếu props có sự thay đổi - Hàm này sử dụng rất tốt cho performance - Ưu tiên sử dụng hàm này
// ngDoCheck: Sẽ chạy lại nếu có bất kì thay đồi (state, content, DOM,...) - Hàm này sử dụng cho những trường hợp đặc biệt - Lưu ý nhớ Destroy khi ko sử dụng.
// ngDestroy: Realtime, API, Logic (timeout, interval,..)
// trước khi hàm nào được hủy sẽ kích hoạt OnDestroy
 