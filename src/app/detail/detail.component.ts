import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductItems } from '../shared/types/productItem';
import { BlogService } from '../../services/BlogService';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterOutlet, CurrencyPipe, NgIf],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  id = '';
  productItem: ProductItems = {
    id: 0,
    image: '',
    name: '',
    price: 0,
  };

  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    this.id = String(route.snapshot.paramMap.get('id'));
  }

    ngOnInit(): void {
    this.blogService.detailBlog(+this.id).subscribe(({ data}: any) => {
      this.productItem.id = data.id;
      this.productItem.image = 'assets/images/testsamba-og.jpg',
      this.productItem.name = data.title;
      this.productItem.price = data.body;
    });
  }
}