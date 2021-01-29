import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
export interface candidate_data {

  id: number;
  name: string;
  department: string;
  joining_date: string;
}

const ELEMENT_DATA: candidate_data[] = [
  { "id": 11, "name": "Ash", "department": "Finance", "joining_date": "8/10/2016" },
  { "id": 12, "name": "John", "department": "HR", "joining_date": "18/1/2011" },
  { "id": 13, "name": "Zuri", "department": "Operations", "joining_date": "28/11/2019" },
  { "id": 14, "name": "Vish", "department": "Development", "joining_date": "7/7/2017" },
  { "id": 15, "name": "Barry", "department": "Operations", "joining_date": "19/8/2014" },
  { "id": 16, "name": "Ady", "department": "Finance", "joining_date": "5/10/2014" },
  { "id": 17, "name": "Gare", "department": "Development", "joining_date": "6/4/2014" },
  { "id": 18, "name": "Hola", "department": "Development", "joining_date": "8/12/2010" },
  { "id": 19, "name": "Ola", "department": "HR", "joining_date": "7/5/2011" },
  { "id": 20, "name": "Kim", "department": "Finance", "joining_date": "20/10/2010" }];

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  
  cloneOfELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
    this.cloneOfELEMENT_DATA = ELEMENT_DATA;
  }
  filters = {
    name: '',
    rem_dev_dep:false,
    sort_by:''

  }
  searchByName(val) {
    console.log(val);
    this.filters.name = val
    this.applyFilters();
  }

  removeDevDep(){
    this.filters.rem_dev_dep=true;
    this.applyFilters();

  }
  applyFilters() {
    this.dataSource = [...this.cloneOfELEMENT_DATA]
    for (let key in this.filters) {
      if (key == 'name' && this.filters[key]) {
        this.dataSource = this.dataSource.filter((data) => data.name.toLowerCase().search(this.filters[key].toLowerCase())>-1)
      }

      if (key == 'rem_dev_dep' && this.filters[key]) {
        this.dataSource = this.dataSource.filter((data) => data.department.toLowerCase() != 'development' )
      }

      if (key == 'sort_by' && this.filters[key] == 'sort_by_name') {
        this.dataSource =this.dataSource.sort((a, b) => (a.name < b.name ? -1 : 1));
        
      }

      if (key == 'sort_by' && this.filters[key]== 'sort_by_joining_date') {
        this.dataSource =this.dataSource.sort((a, b) => {
          return <any> new Date(a.joining_date) - <any> new Date(b.joining_date);
        })
        console.log("here");
        
      }
    }
  }

  unsetFilter(){
    this.dataSource = [...this.cloneOfELEMENT_DATA]
    this.filters= {
      name: '',
      rem_dev_dep:false,
      sort_by:''
    }
  }
  sortBy(val){
    this.filters.sort_by=val;
    this.applyFilters();
    console.log(this.filters)
  }
  displayedColumns: string[] = ['id', 'name', 'department', 'joining_date'];
  dataSource = ELEMENT_DATA;

}
