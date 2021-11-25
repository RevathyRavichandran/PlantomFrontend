import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  dburl = "/api/";
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

  public getAddress(lat, lng): Observable<any> {
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD0QFV-2oAVVgMt924mDv0R-5uGjSMcc84`);
  }

  constructor(private http: HttpClient) {}
}
