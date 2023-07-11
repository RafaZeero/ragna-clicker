import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '@shared/services';

@Component({
  standalone: true,
  selector: 'rag-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent implements OnInit {
  private readonly _api = inject(ApiService);
  private readonly _domSanitizer = inject(DomSanitizer);

  public image!: any;

  public ngOnInit(): void {
    // console.log(this._api.ragnarok);

    // this._api.getMonster(1002).subscribe(console.log);
    this._api.getImage(1002).subscribe(data => {
      this.image = data;
    });
  }
}
