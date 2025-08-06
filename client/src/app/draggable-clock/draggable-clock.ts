import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draggable-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-clock.html',
  styleUrl: './draggable-clock.css'
})
export class DraggableClockComponent {
  hour = 7;
  minute = 0;
  isDragging = false;
  draggingHand: 'hour' | 'minute' | null = null;
  @Input() type = 'clock'; // 'arrival' or 'leave'
  


  hours = Array.from({ length: 12 }, (_, i) => i); // 0-11 for 12 hours

  @Output() timeChange = new EventEmitter<{ hour: number; minute: number, type:string }>();
  emitTimeChange() {
    this.timeChange.emit({ hour: this.hour, minute: this.minute, type: this.type });
  }

  get hourRotation() {
    return `rotate(${(this.hour % 12) * 30 + this.minute * 0.5}deg)`;
  }

  get minuteRotation() {
    return `rotate(${this.minute * 6}deg)`;
  }

  getHourNumberPosition(hour: number): string {
    const angle = (hour / 12) * 360;
    const radius = 51; // adjust based on your clock size
    const x = radius * Math.sin((angle * Math.PI) / 180);
    const y = -radius * Math.cos((angle * Math.PI) / 180);
    return `translate(${x}px, ${y}px)`;
  }

  onHourClick(hour: number) {
    this.hour = hour;
    this.minute = 0;
    this.emitTimeChange();
  }
  onMinClick(hour: number) {
    this.hour= hour;
    this.minute = 30;
    this.emitTimeChange();

  }

  // onMouseDown(event: MouseEvent) {
  //   const clockRect = (event.target as HTMLElement).getBoundingClientRect();
  //   const centerX = clockRect.left + clockRect.width / 2;
  //   const centerY = clockRect.top + clockRect.height / 2;
  //   const angle = this.getAngle(centerX, centerY, event.clientX, event.clientY);

  //   // Choose hand based on proximity to minute or hour
  //   this.draggingHand = angle % 30 < 15 ? 'hour' : 'minute';
  //   this.isDragging = true;
  // }

  // onMouseMove(event: MouseEvent) {
  //   if (!this.isDragging || !this.draggingHand) return;

  //   const clock = document.querySelector('.clock')!;
  //   const rect = clock.getBoundingClientRect();
  //   const centerX = rect.left + rect.width / 2;
  //   const centerY = rect.top + rect.height / 2;
  //   const angle = this.getAngle(centerX, centerY, event.clientX, event.clientY);

  //   if (this.draggingHand === 'minute') {
  //     const rawMin = Math.round(angle / 6) % 60;
  //     this.minute = rawMin < 15 || rawMin >= 45 ? 0 : 30; // snap to 0 or 30 minutes
  //   } else {
  //     this.hour = Math.round(angle / 30) % 12;
  //   }
  //   this.emitTimeChange();
  // }

  // onMouseUp() {
  //   this.isDragging = false;
  //   this.draggingHand = null;
  // }

  private getAngle(cx: number, cy: number, x: number, y: number): number {
    const dx = x - cx;
    const dy = y - cy;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return (angle + 360 + 90) % 360; // +90 to align 12 o'clock
  }

  

}