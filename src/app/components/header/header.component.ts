import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
// If using an external .js file include this function
toggleMenu() {
  var menu = document.getElementById("menuBar");
  menu.classList.toggle("open");
}
}
