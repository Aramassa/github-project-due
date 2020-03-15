const GitHub = require("github-api");

interface Repository{
    listProjects(): Promise<any>;
}

interface Project{
    getProject(): Promise<any>;
    listProjectColumns(): Promise<any>;
    listProjectCards(): Promise<any>;
}

interface Issue{
    listIssues(options:any): Promise<any>;
    getIssue(issue:number): Promise<any>;
    editIssue(num: number, data: any): Promise<any>;
}

export class GithubApi{

    private client:any;

    private user:string;
    private repo:string;

    constructor(user:string, repo:string) {
        this.user = user;
        this.repo = repo;
        this.client = new GitHub({
            token: process.env['GITHUB_TOKEN'] || ""
        });
    }

    private async objIssue(): Promise<Issue>{
        return await this.client.getIssues(this.user, this.repo)
    }

    private async getRepo(): Promise<Repository>{
        return await this.client.getRepo(this.user, this.repo);
    }

    private async objProject(projectId:string): Promise<Project>{
        return await this.client.getProject(projectId);
    }

    public async getProject(projectId:string): Promise<any>{
        return (await (await this.objProject(projectId)).getProject()).data;
    }

    public async listProjects(){
        let repo = await this.getRepo();
        return (await repo.listProjects()).data;
    }

    /**
     *
     * @param id
     * Issue Data Example
     * data: {
            url: 'https://api.github.com/repos/Aramassa/github-project-due-test/issues/1',
            repository_url: 'https://api.github.com/repos/Aramassa/github-project-due-test',
            labels_url: 'https://api.github.com/repos/Aramassa/github-project-due-test/issues/1/labels{/name}',
            comments_url: 'https://api.github.com/repos/Aramassa/github-project-due-test/issues/1/comments',
            events_url: 'https://api.github.com/repos/Aramassa/github-project-due-test/issues/1/events',
            html_url: 'https://github.com/Aramassa/github-project-due-test/issues/1',
            id: 573480667,
            node_id: 'MDU6SXNzdWU1NzM0ODA2Njc=',
            number: 1,
            title: 'this is first issue',
            user: {
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
            labels: [],
            state: 'open',
            locked: false,
            assignee: {
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
            assignees: [ [Object] ],
            milestone: null,
            comments: 0,
            created_at: '2020-03-01T04:54:03Z',
            updated_at: '2020-03-01T04:54:03Z',
            closed_at: null,
            author_association: 'OWNER',
            body: 'hello.',
            closed_by: null
          }
     */
    public async getIssue(id:number): Promise<any>{
        let issue = await (await this.objIssue()).getIssue(id)
        return issue.data;
    }

    public async editIssue(num: number, data: any){
        await (await this.objIssue()).editIssue(num, data);
    }

    public async getRepoIssueList(options:any={}): Promise<any[]>{
        let issues = (await(await this.objIssue()).listIssues(options));
        return issues.data;
    }

    /**
     *
     * @param projectId
     * Card Data Example
     * {
          url: 'https://api.github.com/projects/columns/cards/33876980',
          project_url: 'https://api.github.com/projects/4038195',
          id: 33876980,
          node_id: 'MDExOlByb2plY3RDYXJkMzM4NzY5ODA=',
          note: null,
          archived: false,
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
          created_at: '2020-03-01T04:54:03Z',
          updated_at: '2020-03-01T12:32:07Z',
          column_url: 'https://api.github.com/projects/columns/8173732',
          content_url: 'https://api.github.com/repos/Aramassa/github-project-due-test/issues/1'
        }

     */
    public async listProjectCards(projectId: string): Promise<any[]>{
        let proj = await this.objProject(projectId);
        return await proj.listProjectCards()
    }

    public async listProjectColumns(projectId: string): Promise<any[]>{
        let proj = await this.objProject(projectId);
        return (await proj.listProjectColumns()).data;
    }
}

export class GithubAuth{
    private token:string;

}
