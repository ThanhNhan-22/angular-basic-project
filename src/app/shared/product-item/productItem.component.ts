import { Component, DoCheck, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { CurrencyPipe } from "../pipes/CurrencyPipe.pipe";
import { UppercasePipe } from "../pipes/UppercasePipe.pipe";
import { NgFor, NgIf } from "@angular/common";
import { ProductItems } from "../types/productItem";

@Component({
    selector: 'app-product-item',
    standalone: true,
    imports: [RouterOutlet, FormsModule, CurrencyPipe, UppercasePipe, NgFor, NgIf, RouterLink],
    templateUrl: './productItem.component.html',
    styleUrl: './productItem.component.css',
})
export class ProductItemComponent implements OnChanges {
    @Input() products: ProductItems[] = [];

    @Output() dataEvent = new EventEmitter<number>();

    get totalPrice(): string {
        const sum = this.products.reduce((total, item) => {
            return total + item.price;
        }, 0);

        return `Total Price ${sum}`;
    }

    ngOnChanges(changes: SimpleChanges): void { // changes: cho phép biết props hiện tại và trước đó sẽ chạy lại nếu props thay đổi 
        console.log(changes['products'].currentValue);
        console.log(changes['products'].previousValue);
    }

    handleDelete = (id: number) => {
        this.dataEvent.emit(id);
    };
}