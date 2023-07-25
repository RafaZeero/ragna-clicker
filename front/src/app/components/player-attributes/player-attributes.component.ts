import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '@shared/services';
import { Attributes, AttributesAliases, Experience, AttributesList } from '@shared/models';
import { attributeMapping, attributesList, levelTypes } from '@shared/constants';
import { first, map, takeWhile } from 'rxjs';

@Component({
  selector: 'rag-player-attributes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-attributes.component.html',
  styleUrls: ['./player-attributes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerAttributesComponent {
  @Input({ required: true }) public mode: 'complete' | 'compact' = 'complete';

  private readonly _playerService = inject(PlayerService);

  public player$ = this._playerService.player$;
  public levelTypes: Array<keyof Experience> = levelTypes;
  public attributesList: ReadonlyArray<AttributesList> = attributesList;
  public totalDamage$ = this.player$.pipe(map(({ stats: { damage } }) => damage.base + damage.weapon + damage.skills));

  public addAttribute(attribute: keyof Attributes) {
    this.player$
      .pipe(
        // Map attribute to spend quantity
        map(player => player.attributes_to_spend),
        // Take while has attribute to spend
        takeWhile(attributesAvailableToSpend => attributesAvailableToSpend > 0),
        // Reduce one point for attribute used
        map(attributesAvailableToSpend => attributesAvailableToSpend - 1),
        first(),
      )
      .subscribe(() => {
        // Add attribute to player
        this._playerService.addOnePointToAttribute(attribute);
      });
  }

  public makeAttributeAlias(attribute: AttributesList): AttributesAliases {
    return attributeMapping[attribute];
  }
}
