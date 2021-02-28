import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '../../../services/service.index';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

  constructor(public loadingService: LoadingService) { }

}
