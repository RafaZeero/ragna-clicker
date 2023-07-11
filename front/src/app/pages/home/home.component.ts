import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '@shared/services';

@Component({
  standalone: true,
  selector: 'rag-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent implements OnInit {
  private readonly _api = inject(ApiService);

  public ngOnInit(): void {
    console.log(this._api.ragnarok);
  }
}
