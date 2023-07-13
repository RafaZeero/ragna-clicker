import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ApiService } from '@shared/services';

@Component({
  standalone: true,
  selector: 'rag-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent implements OnInit {
  private readonly _api = inject(ApiService);
  private readonly _cd = inject(ChangeDetectorRef);

  public image!: string;

  public life = 100;

  public player = {
    damage: 5,
  };

  public ngOnInit(): void {
    this._api.getImage(1002).subscribe(data => {
      this.image = data;
      this._cd.detectChanges();
    });
  }

  public attack() {
    this.life -= this.player.damage;
  }
}
