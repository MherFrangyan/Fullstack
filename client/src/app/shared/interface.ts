import {Data} from "@angular/router";

export interface User {
  email: string,
  password: string
}

export interface Nav {
  link: string,
  name: string
}

export interface Category {
  name: string,
  imageSrc?: string,
  user?: string,
  _id?: string
}

export interface Message {
  message: string
}

export interface Position {
  category: string
  name: string
  cost?: number
  user?: string
  _id?: string
  quantity?: number
}

export interface Order {
  date?: Date
  order?: string
  list: OrderPosition[]
  _id?: string
}

export interface OrderPosition {
  name: string
  quantity: number
  cost: number
  _id?: string
}

export interface Filter {
  start?: Date
  end?: Data
  order?: number
}

export interface OverviewPage{
  gain: OverviewPageItem
  orders: OverviewPageItem
}

export interface OverviewPageItem{
  percent: number
  compare: number
  yesterday: number
  isHigher: boolean
}

export interface AnalyticsData{
  totalPrice: number,
  chart: ChartAnalytics[]
}

export interface ChartAnalytics {
  label: string
  gain: number
  order: number
}
