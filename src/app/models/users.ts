export class Users {

  static userJson(obj: Object): any {
    return new Users(
      obj['login'],
      obj['id'],
      obj['node_id'],
      obj['avatar_url'],
      obj['gravatar_id'],
      obj['url'],
      obj['html_url'],
      obj['followers_url'],
      obj['following_url'],
      obj['gists_url'],
      obj['starred_url'],
      obj['subscriptions_url'],
      obj['organizations_url'],
      obj['repos_url'],
      obj['events_url'],
      obj['received_events_url'],
      obj['type'],
      obj['site_admin'],
      obj['score'],
    );
  }

  constructor(
    public login: string,
    public id: number,
    public node_id: string,
    public avatar_url: string,
    public gravatar_id: string,
    public url: string,
    public html_url: string,
    public followers_url: string,
    public following_url: string,
    public gists_url: string,
    public starred_url: string,
    public subscriptions_url: string,
    public organizations_url: string,
    public repos_url: string,
    public events_url: string,
    public received_events_url: string,
    public type: any,
    public site_admin: boolean,
    public score: number
  ) { }

  getType(): string {
    return `${this.type} / ${this.login}`;
  }
}
