import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AnalyticsData, OverviewPage} from "../interface";

@Injectable({providedIn: 'root'})
export class AnalyticsService {
  constructor(private http: HttpClient) {
  }

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>(`${environment.backend_base_url}/api/analytics/overview`)
  }

  getAnalytics(): Observable<AnalyticsData> {
    return this.http.get<AnalyticsData>(`${environment.backend_base_url}/api/analytics/analytics`)

  }


}
