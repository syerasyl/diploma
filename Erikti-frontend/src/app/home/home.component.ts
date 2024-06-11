import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  activeIndex = 0;
  intervalId: any;
  dots = new Array(5); // Assuming you have 5 slides


  startAutoSlide() {
    this.intervalId = setInterval(() => this.nextSlide(), 3000);
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.dots.length;
    this.updateSlider();
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.dots.length) % this.dots.length;
    this.updateSlider();
  }

  goToSlide(index: number) {
    this.activeIndex = index;
    this.updateSlider();
  }

  updateSlider() {
    const slider = document.querySelector('.slider .list') as HTMLElement;
    slider.style.left = `-${this.activeIndex * 1300}px`;

    clearInterval(this.intervalId);
    this.startAutoSlide();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateSlider();
  }

}
