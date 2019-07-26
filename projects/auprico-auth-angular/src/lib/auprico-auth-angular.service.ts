import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AupricoAuthAngularService {
private jwsHelper = require('jws');
    private loginUrl: string;
    public user: BehaviorSubject<MUser.BUser>;
    public userAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private http: HttpClient, private router: Router , private apollo: Apollo, private urlResolverService: UrlResolverService) {
        // set token if saved in local storage
        this.loginUrl = this.urlResolverService.apiUrlForPath(['api-token-auth/login/']);
        // this.logoutUrl = this.urlResolverService.apiUrlForPath(['mis/profile/logout/']);
        this.userAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
        this.user = new BehaviorSubject<MUser.BUser>(undefined);
        this.userAuthenticated.subscribe(isAuth => {
            if (isAuth) {
                // fetch user
                this.fetchLoggedInUser();
            } else {
                this.user.next(undefined);
            }
        });
    }

    login(username: string, password: string): Observable<boolean> {
        const headers = new HttpHeaders({Accept: 'application/json', 'Content-Type': 'application/json'})
        return this.http.post(this.loginUrl, JSON.stringify({username: username, password: password}),
            {headers: headers, withCredentials: true})
            .pipe(map((response: HttpResponse<any>) => {
                // login successful if there's a jwt token in the response
                const jsonResponse = response;
                if (jsonResponse) {
                    const token = jsonResponse['token'];
                    // check also for the seesionId cookie
                    // --> actually not possible http://stackoverflow.com/questions/21520890/http-response-set-cookie-not-accessible
                    if (token) {
                        // store jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('token', token);
                        // cookies are already stored by the browser with Set-Cookie header
                        // return true to indicate successful login
                        this.userAuthenticated.next(true);
                        return true;
                    }
                }
                this.userAuthenticated.next(false);
                // return false to indicate failed login
                return false;
            }));
    }

    logout() {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('token');
        this.userAuthenticated.next(false);
    }

    hasToken(): boolean {
        let token = localStorage.getItem('token');
        return token != null && token != "";
    }

    async tokenIsValid(): Promise<boolean> {
        let refreshUrl = this.urlResolverService.apiUrlForPath(['api-token-auth/refresh/']);
        let oldToken = localStorage.getItem('token');
        let headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});
        try {
            let res = <Observable<Object>>await this.http.post(refreshUrl, {token: oldToken, headers: headers}).toPromise();
            let token = res["token"];
            if (res && token) {
                localStorage.setItem('token', token);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    fetchLoggedInUser() {
        let token = localStorage.getItem('token');
        console.log('token in fetchLoggedInUser ', token)
        let decoded = this.jwsHelper.decode(token);
        let userId = decoded && decoded.payload.user_id;
        if (!userId) {
            console.error("No userId stored: error.");
            //return;
        }
        let query = gql`
        query loggedInUser($id: ID!) {
            user(id: $id) {
                ...userFragment
            }
        }
        ${ MUser.fragment }
        `;
        // avoid cache to retrieve always the update version of the authentication info
        this.apollo.query({
            query: query,
            variables: {id: pkToBase64("UserNode", userId)},
            fetchPolicy: "network-only"

        }).toPromise().then(
            res => {
                if (res.data) {
                    let parsed = parseAttr<MUser.BUser>(res.data, MUser.BUser, "user");
                    console.log('parsed user ', parsed)
                    this.user.next(parsed);
                } else {
                    this.user.next(undefined);
                }
            }).catch(
            error => {
                this.user.next(undefined);
                console.error(error);
            });
    }
}
