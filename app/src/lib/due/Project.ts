export class Project{

    private id: string;
    private name: string;
    private body: string;

    /**
     *
     * @param id
     * @param name
     * @param body
     *
     * Example of library response
     * {
        owner_url: 'https://api.github.com/repos/Aramassa/github-project-due-test',
        url: 'https://api.github.com/projects/4038195',
        html_url: 'https://github.com/Aramassa/github-project-due-test/projects/1',
        columns_url: 'https://api.github.com/projects/4038195/columns',
        id: 4038195,
        node_id: 'MDc6UHJvamVjdDQwMzgxOTU=',
        name: 'Test Project 001',
        body: 'must not be deleted!!\r\n\r\nthis project used for test.',
        number: 1,
        state: 'open',
        creator: {
          login: 'Aramassa',
          id: 52207597,
          node_id: 'MDQ6VXNlcjUyMjA3NTk3',
          avatar_url: 'https://avatars2.githubusercontent.com/u/52207597?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/Aramassa',
          html_url: 'https://github.com/Aramassa',
          followers_url: 'https://api.github.com/users/Aramassa/followers',
          following_url: 'https://api.github.com/users/Aramassa/following{/other_user}',
          gists_url: 'https://api.github.com/users/Aramassa/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/Aramassa/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/Aramassa/subscriptions',
          organizations_url: 'https://api.github.com/users/Aramassa/orgs',
          repos_url: 'https://api.github.com/users/Aramassa/repos',
          events_url: 'https://api.github.com/users/Aramassa/events{/privacy}',
          received_events_url: 'https://api.github.com/users/Aramassa/received_events',
          type: 'User',
          site_admin: false
        },
        created_at: '2020-03-01T04:52:23Z',
        updated_at: '2020-03-01T04:52:54Z'
      },
     */
    constructor(id:string, name:string, body:string) {
        this.id = id;
        this.name = name;
        this.body = body;
    }

    public get debug_line():string{
        return `<${this.id}> ${this.name}`;
    }
}