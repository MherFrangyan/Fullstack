import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Nav} from "../../interface";
import {MaterialService} from "../../classes/material.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('floating') floatingBtn: ElementRef;

  public navItems: Nav[] = [
    {link: '/overview', name: 'Обзор'},
    {link: '/analytics', name: 'Аналитика'},
    {link: '/history', name: 'История'},
    {link: '/order', name: 'Добавить заказ'},
    {link: '/categories', name: 'Ассортимент'},
  ]

  constructor(private auth: AuthService,
              private route: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    MaterialService.initializationButton(this.floatingBtn)
  }

  logAuth(ev: Event) {
    ev.preventDefault();
    this.auth.logAuth()
    this.route.navigate(['/login']);
  }

}
