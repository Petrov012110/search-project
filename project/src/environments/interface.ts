export interface IEniroment {
    clientId: string,
    production: boolean,
    client_secret: string
}

export interface ITwitchData {
    box_art_url?: string
    id?: string
    name?: string
}

export interface ITwitchResponse {
    data: ITwitchData[],
    pagination: object
}

export interface ITwitchToken {
    "access_token": string,
    "expires_in": number,
    "token_type": string
}

export interface IGitData {
    archive_url: string
    archived: boolean
    assignees_url: string
    blobs_url: string
    branches_url: string
    clone_url: string
    collaborators_url: string
    comments_url: string
    commits_url: string
    compare_url: string
    contents_url: string
    contributors_url: string
    created_at: string
    default_branch: string
    deployments_url: string
    description: string
    disabled: boolean
    downloads_url: string
    events_url: string
    fork: boolean
    forks: number
    forks_count: number
    forks_url: string
    full_name: string
    git_commits_url: string
    git_refs_url: string
    git_tags_url: string
    git_url: string
    has_downloads: boolean
    has_issues: boolean
    has_pages: boolean
    has_projects: boolean
    has_wiki: boolean
    homepage: string
    hooks_url: string
    html_url: string
    id: number
    issue_comment_url: string
    issue_events_url: string
    issues_url: string
    keys_url: string
    labels_url: string
    language: string
    languages_url: string
    license: null
    merges_url: string
    milestones_url: string
    mirror_url: null
    name: string
    node_id: string
    notifications_url: string
    open_issues: number
    open_issues_count: number
    owner: {
        avatar_url: string
        events_url: string
        followers_url: string
        following_url: string
        gists_url: string
        gravatar_id: string
        html_url: string
        id: number
        login: string
        node_id: string
        organizations_url: string
        received_events_url: string
        repos_url: string
        site_admin: boolean
        starred_url: string
        subscriptions_url: string
        type: string
        url: string
    }
    private: boolean
    pulls_url: string
    pushed_at: string
    releases_url: string
    score: number
    size: number
    ssh_url: string
    stargazers_count: number
    stargazers_url: string
    statuses_url: string
    subscribers_url: string
    subscription_url: string
    svn_url: string
    tags_url: string
    teams_url: string
    trees_url: string
    updated_at: string
    url: string
    watchers: number
    watchers_count: number
}

export interface IGitResponse {
    incomplete_results: boolean,
    items: IGitData[],
    total_count: number
}

export interface IWikiData {
    ns: number,
    pageid: number,
    size: number,
    snippet: string,
    timestamp: string,
    title: string,
    wordcount: number
}

export interface IWikiResponse {
    batchcomplete: string,
    continue: {
        continue: string,
        sroffset: number
    },
    query: {
        search: IWikiData[]
        searchinfo: {totalhits: number}
    }
}



export type TResourseData = {
    twitch: ITwitchData[],
    git: IGitData[],
    wiki: IWikiData[]
}

export interface ITable {
    name?: string,
    content?: string,
    resourse?: string
}

export enum ResoureseOfResponse {
    git = 0,
    wiki = 1,
    twitch = 2
}