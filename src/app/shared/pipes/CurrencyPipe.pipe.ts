import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ // Pipe: chuyển đổi định dạng chữ
    name: 'currencyPipe',
    standalone: true,
})
export class CurrencyPipe implements PipeTransform {
    transform(value: number) {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value);
    }
}
