import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login', // Replace with your component selector
  templateUrl: './login.component.html', // Replace with your template URL
  styleUrls: ['./login.component.css'] // Replace with your styles URL
})
export class LoginComponent implements OnInit {
  backgroundColor = '#f1f3f7';
  private bubbleButton!: HTMLElement;
  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;
  products: any[] = [];
  
  
  ngOnInit() {
    // Simulated product data
    this.products = [
      { name: 'Men Slim Fit Checkered Slim Collar Casual Shirt', price: '\u20B91099', image: '../assets/product_images/shirt.webp' },
      { name: 'Allen Solly: Men Solid Polo Neck Pure Cotton Black T-Shirt',  price: '\u20B9899', image: '../assets/product_images/tshirt.webp'  },
      { name: 'SONATA :Volt Analog Watch - For Men 77085PP03 #JustHere',  price: '\u20B9499', image: '../assets/product_images/sonata.webp'  },
      { name: 'Royal viva: Applique Bollywood Lycra Blend Saree  (Pink)',  price: '\u20B9799', image: '../assets/product_images/saree.webp'  },
      { name: 'Lakmé Insta-Ready Kit Bronze  (Eyeconic Kajal, CC Cream, 30 g)',  price: '\u20B9449', image: '../assets/product_images/makeup.webp'  },
      { name: 'White Fashion: Women White Heels Sandal',  price: '\u20B9299', image: '../assets/product_images/heels.webp'  },
      { name: 'MSI Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home/4 GB Graphics)...', price: '\u20B951,990', image: '../assets/product_images/MSI.webp' },
      { name: 'Geek Robocook - 11 in 1 (5 Litre | NS Pot) Electric Pressure Cooker  (5 L, Black)',  price: '\u20B96,990', image: '../assets/product_images/kettle.webp'  },
      { name: 'Kadio International Analog 39 cm X 26 cm Wall Clock  (Brown, With Glass, Standard)',  price: '\u20B9849', image: '../assets/product_images/clock.webp'  }
      // Add more products
    ];

  }
}
