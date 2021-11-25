import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  dburl = "http://localhost:8080/api/";
  weburl = "https://api.countrystatecity.in/v1/countries";
  apikey = "eTZiYVBsQXZRMFBYdE1McEhuZ1M3VG1PM0N2VGYyajdPb004OWFTaA==";

  public getAllLabs(): Observable<any> {
    return this.http.get<any>(this.dburl + "labs");
  }

  public createLab(lab): Observable<any> {
    return this.http.post<any>(this.dburl + "lab", lab);
  }

  public getLabById(id): Observable<any> {
    return this.http.get<any>(this.dburl + "lab/" + id);
  }

  public updateLab(lab, id): Observable<any> {
    return this.http.put<any>(this.dburl + "lab/" + id, lab);
  }

  public deleteLabById(id): Observable<any> {
    return this.http.delete<any>(this.dburl + "lab/" + id);
  }

  public getCountries(): Observable<any> {
    const headers = new HttpHeaders({
      "X-CSCAPI-KEY": this.apikey,
    });
    return this.http.get<any>(this.weburl, { headers: headers });
  }

  public getStates(country): Observable<any> {
    const headers = new HttpHeaders({
      "X-CSCAPI-KEY": this.apikey,
    });
    return this.http.get<any>(this.weburl + "/" + country + "/states", {
      headers: headers,
    });
  }

  public getCities(country, state): Observable<any> {
    const headers = new HttpHeaders({
      "X-CSCAPI-KEY": this.apikey,
    });
    return this.http.get<any>(
      this.weburl + "/" + country + "/states/" + state + "/cities",
      { headers: headers }
    );
  }

  constructor(private http: HttpClient) {}
}
