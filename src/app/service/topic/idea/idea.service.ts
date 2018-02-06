import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class IdeaService {
  private ideaList: Idea[];
  constructor(private _http: HttpClient) { }
  private apiUrl = 'https://api.github.com/users/mralexgray/repos';

  async getIdeaList() {
    if (!this.ideaList) {
      this.ideaList = await this._http.get<Idea[]>(this.apiUrl).toPromise();
    }
    return this.ideaList;
  }
  getIdeaListTest() {
    return this._http.get(this.apiUrl);
  }
  addToIdeaList(newIdea: Idea) {
    // post to api & refresh ideaList
    this.ideaList.unshift(newIdea);
  }

  deleteIdea(index: number) {
    // post to api & refresh ideaList
    this.ideaList.splice(index, 1);
  }
}

export class Idea {
  id: number;
  name: string;
  full_name: string;
  created_at: Date;
}
