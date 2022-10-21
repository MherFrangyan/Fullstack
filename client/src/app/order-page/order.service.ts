import {Injectable} from "@angular/core";
import {OrderPosition, Position} from "../shared/interface";

@Injectable()
export class OrderService {

  list: OrderPosition[] = []
  price: number = 0;

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    })
    const orderPositionItem = this.list.find(p => p._id === position._id)

    if (orderPositionItem) {
      orderPositionItem.quantity += orderPosition.quantity
    } else {

      this.list.push(orderPosition)
    }

    this.mainCost()
  }

  remove(id: string) {
    const positionWithId = this.list.findIndex(p => p._id === id)
    this.list.splice(positionWithId, 1)
    this.mainCost()
  }

  clear() {
    this.list = [];
    this.price = 0;
  }

  private mainCost() {
    this.price = this.list.reduce((total, position) => {
      console.log(position, 'position');
      console.log(total, 'total');
      return total += position.quantity * position.cost
    }, 0)
  }
}
