import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddUserPopupComponent } from '../add-user-popup/add-user-popup.component';

export interface Iusers {
  name: string;
  email: string;
  id: number;
  phone: string;
  username: string;
  website: string;
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  }
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
    street: string;
    suite: string;
    zipcode: string;
  };
}[]
export interface Icolumns { columnDef: string; header: string; cell: Function; }[]
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UsersListComponent implements OnInit, AfterViewInit, OnDestroy {
  search = '';
  usersData: Iusers[] = [];
  columns: Icolumns[] = [
    {
      columnDef: 'select',
      header: 'select',
      cell: (element: Iusers) => null,
    },
    {
      columnDef: 'username',
      header: 'username',
      cell: (element: Iusers) => `${element.username}`,
    },
    {
      columnDef: 'email',
      header: 'email',
      cell: (element: Iusers) => `${element.email}`,
    },
    {
      columnDef: 'address',
      header: 'address',
      cell: (element: Iusers) => element.address,
    },
    {
      columnDef: 'company',
      header: 'company',
      cell: (element: Iusers) => `${element.company.name}`,
    },
    {
      columnDef: 'actions',
      header: 'actions',
      cell: (element: Iusers) => null,
    }
  ];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Iusers>([]);
  selection = new SelectionModel<Iusers>(true, []);
  expandedElement: Iusers | null | undefined;
  $subscriptions: Subscription[] = [];
  currentSelectedUser: Iusers | undefined;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private userService: UsersService, public dialog: MatDialog) {
    // this.displayedColumns.push('select'); // to show check box column as first
    this.displayedColumns = this.columns.map((item: Icolumns) => item.header);
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Iusers): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserPopupComponent, {
      disableClose: true,
      data: {
        users: this.dataSource.data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.data = result;
    });
  }

  getUsers() {
    let getUserSubscription = this.userService.getAllUsers().subscribe((users: Iusers[]) => {
      if (users.length) {
        this.usersData = users;
        this.dataSource = new MatTableDataSource<Iusers>(this.usersData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, error => {
      console.error(error);
    });
    this.$subscriptions.push(getUserSubscription);
  }

  applyFilter() {
    let searchValue = this.search.trim(); // Remove whitespace
    searchValue = searchValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = searchValue;
  }

  onDelete(userId: number) {
    // this.userService.deleteUser(userId).subscribe((response) => {})
    this.dataSource.data = this.dataSource.data.filter((user) => userId !== user.id);
  }

  onAddUser(userData: Iusers) {
    userData = { ...userData, id: this.dataSource.data.length + 1 };
    this.dataSource.data.push(userData);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.$subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

}
