import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IPageInfo } from '@tsalliance/ngx-virtual-scroller';
import { Subject } from 'rxjs';
import { SCNGXInfiniteDataSource } from '../../../utils/datasource/infinite-datasource';

@Component({
  selector: 'scngx-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class SCNGXInfiniteListComponent implements OnInit, OnDestroy, OnChanges {
  private readonly _more: Subject<IPageInfo> = new Subject();

  @Input() public parentScroll: HTMLElement;
  @Input() public dataSource: SCNGXInfiniteDataSource<any>;
  @Input() public enableUnequalChildrenSizes: boolean;

  public viewPortItems: any[] = [];

  constructor() { }

  public ngOnInit(): void {
    this.dataSource?.connect(this._more.asObservable());
  }

  public ngOnChanges(changes: SimpleChanges): void {
      const previous = changes["dataSource"].previousValue as SCNGXInfiniteDataSource<any>;
      const current = changes["dataSource"].currentValue as SCNGXInfiniteDataSource<any>;

      console.log(previous, current)
      console.log(previous?.id != current?.id);


      if(previous?.id != current?.id) {
        previous?.disconnect();
        current?.connect(this._more.asObservable());
      }
  }

  public ngOnDestroy(): void {
      this.dataSource?.disconnect();
  }

  public vsUpdate(visibleItems: any[]) {
    this.viewPortItems = visibleItems;
  }

  public vsEnd(info: IPageInfo) {
    this._more.next(info);
  }

}