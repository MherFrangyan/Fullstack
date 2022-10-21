import {ElementRef} from "@angular/core";

declare var M:any;

export interface ModalInitial {
  open?(): void,
  close?(): void,
  destroy?(): void,
}

export interface MaterialDatePicker extends ModalInitial {
  date?: Date
}
export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initializationButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateInputValue() {
    M.updateTextFields()
  }

  static initModal(elem: ElementRef): ModalInitial {
    return M.Modal.init(elem.nativeElement);
  }

  static initTooltip(el: ElementRef): ModalInitial {
    return M.Tooltip.init(el.nativeElement);
  }
  static initDatePicker(el: ElementRef, onClose: () => void) {
    return M.Datepicker.init(el.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose
    })
  }

  static initTapTarget(el: ElementRef): ModalInitial {
    return M.TapTarget.init(el.nativeElement)
  }
}
