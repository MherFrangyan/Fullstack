import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from "../../../shared/service/positionsService";
import {Position} from "../../../shared/interface";
import {MaterialService, ModalInitial} from "../../../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef;
  @Input() categoryId: string;
  position: Position[] = [];
  loader = true;
  positionId: any = null;
  modal: ModalInitial;
  form: FormGroup;
  constructor(private positionService: PositionsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      cost: new FormControl(1,[Validators.required, Validators.min(1)])
    })
    console.log(this.categoryId,'categoryId');
    this.fetch()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  fetch() {
    this.loader = false;
    this.positionService.getData(this.categoryId).subscribe((position: Position[]) => {
      this.loader = true;
      this.position = position
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    })
    this.modal.open()
    MaterialService.updateInputValue()
  }

  showModal() {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: 1,
    })
    MaterialService.updateInputValue()
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }


  createPosition() {
    this.form.disable()
    const positionData: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    };
     const complated = () => {
       this.form.enable()
       this.modal.close()
       this.form.reset({name: '', cost: 1})
    }

    if (this.positionId) {
      positionData._id = this.positionId
      this.positionService.update(positionData).subscribe(
          res => {
            const idx = this.position.findIndex(id => id._id === res._id);
            this.position[idx] = res;
            MaterialService.toast('Position update')
          },
          err => MaterialService.toast(err.error.message),
          () => {
            complated()
          }
        )
    } else {
      this.positionService.create(positionData).subscribe(
        (position) => {
          MaterialService.toast('Position created')
          this.position.push(position)
        },
        err => {
          MaterialService.toast(err.error.message)
        },
        () =>{
          complated()
        }
      )
    }

  }

  onDelete(ev: Event, positionItem: Position) {
    ev.stopPropagation()
    const confirmDelete = window.confirm(`Want to remove this position ${positionItem.name}`)
    if (confirmDelete) {
      this.positionService.delete(positionItem._id).subscribe(
        res => {
          console.log(this.position,'position1');
          const idx = this.position.findIndex(el => el._id === positionItem._id)
          this.position.splice(idx, 1)
          console.log(this.position,'position2');
          MaterialService.toast(res.message)
        },
        err => MaterialService.toast(err.error.message)
      )
    }
  }
}
