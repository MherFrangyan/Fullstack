import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../shared/service/category.service";
import {of, Subscription, switchMap} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";
import {Category, Message} from "../../shared/interface";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  @ViewChild('input') inputRef: ElementRef;
  newCat = true;
  form: FormGroup;
  image: File;
  category: Category;
  imagePreview: any = '';
  unSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    })
    this.form.disable()

    this.activatedRoute.params.pipe(
      switchMap((param: Params) => {
        if (param['id']) {
          this.newCat = false;
          return this.categoryService.getById(param['id']);
        }
        return of(null)
      })
    ).subscribe(
      (category:Category) => {
        if (category) {
          this.category = category;
          this.form.patchValue({
            name: category.name
          })
          MaterialService.updateInputValue()
          this.imagePreview = category.imageSrc;
        }
        this.form.enable()
      },
      err => {
        MaterialService.toast(err.error.message)
        this.form.enable()
      }
    )

  }

  ngOnDestroy() {
    this.unSub ? this.unSub.unsubscribe() : '';
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(ev: any) {
    console.log(ev,'evvv');
    const file = ev.target.files[0]
    this.image = file;
    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit() {
    this.form.disable()
    let obs$;
    if (this.newCat) {
      obs$ = this.categoryService.creat(this.form.value.name, this.image)
    } else {
      obs$ = this.categoryService.update(this.category._id, this.form.value.name, this.image)
    }
    obs$.subscribe(
      (res: Category) => {
        this.category = res;
        MaterialService.toast('Changes saved')
        this.form.enable()
      },
      err => {
        MaterialService.toast(err.error.message)
        this.form.enable()
      },
    )
  }


  deleteCategory() {
    const confirmDelete = confirm('Are you sure you want to delete categories')

    if (confirmDelete) {
      this.unSub = this.categoryService.delete(this.category._id).subscribe(
        (res: Message) => {
          MaterialService.toast(res.message)
        },
        (err) => {
          MaterialService.toast(err.error.message)
        },
        () => {
          this.route.navigate(['/categories'])
        }
      )
    }
  }
}
