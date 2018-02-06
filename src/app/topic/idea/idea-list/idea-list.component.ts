import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idea, IdeaService } from '../../../service/topic/idea/idea.service';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit {
  ideaList: Idea[];
  data: any;
  constructor(private _router: Router, private _ideaService: IdeaService) {}
  async ngOnInit() {
    this.ideaList = await this._ideaService.getIdeaList();
    await this._ideaService
      .getIdeaListTest()
      .subscribe(res => (this.data = res));
  }
  trackIdeaList(index: number) {
    return index;
  }
  toAdd() {
    this._router.navigateByUrl('/topic/idea/add');
    console.log(this.data);
  }
  doEdit() {
    console.log('edit');
  }
  doDelete(index: number): void {
    this._ideaService.deleteIdea(index);
  }
}
