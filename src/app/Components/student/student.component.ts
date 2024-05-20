import {
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
  inject,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { StudentService } from '../../Services/student.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Student } from '../../Interfaces/student';
import { StudentDatatableService } from '../../Services/student.datatable.service';
import {
  NgbdSortableHeader,
  SortEvent,
} from '../../Directives/sortable.directive';
import { FormsModule } from '@angular/forms';
import {
  NgbHighlight,
  NgbModal,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    HeaderComponent,
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbHighlight,
    NgbdSortableHeader,
    NgbPaginationModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [StudentDatatableService, DecimalPipe],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  students: any;
  id: number = 0;
  submitted: boolean = false;
  errorMessage: string = '';
  students$: Observable<Student[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;
  private modalService = inject(NgbModal);
  modal: any;

  addForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    nationalID: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _studentService: StudentService,
    public _studentDatatableService: StudentDatatableService
  ) {
    this.students$ = this._studentDatatableService.students$;
    this.total$ = this._studentDatatableService.total$;
  }

  ngOnInit(): void {
    this.LoadData();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }

  private LoadData() {
    this._studentService.GetAll().subscribe({
      next: (res: any) => {
        this.students = res.Data;
        this._studentDatatableService.initData(this.students);
        this.students$ = this._studentDatatableService.students$;
        this.total$ = this._studentDatatableService.total$;
      },
    });
  }

  AddFields() {
    this.errorMessage = '';
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    this._studentService.Add(this.addForm.value).subscribe({
      next: (res) => {
        if (res.Success) {
          this.LoadData();
          this.modal.close();
        } else {
          this.errorMessage = res.Message;
        }
      },
    });
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header: any) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this._studentDatatableService.sortColumn = column;
    this._studentDatatableService.sortDirection = direction;
  }

  open(content: TemplateRef<any>) {
    this.addForm.reset();
    this.modal = this.modalService.open(content);
  }

  // delete student
  DeleteField(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger mx-1',
        cancelButton: 'btn btn-secondary mx-1',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: `You will not be able to recover this student's data!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: '#d33',
        cancelButtonText: 'No, keep it',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this._studentService.Delete(id).subscribe({
            next: () => {
              this.LoadData();
              Swal.fire('Deleted!', 'Student has been deleted.', 'success');
            },
          });
        }

        if (result.isDismissed) {
          Swal.fire('Cancelled', 'Student has not been deleted.', 'error');
        }
      });
  }
}
