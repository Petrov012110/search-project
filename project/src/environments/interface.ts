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
    html_url?: string
}

export interface IGitResponse {
    incomplete_results: boolean,
    items: IGitData[]
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
    continue: object,
    query : {
        search: IWikiData[]
    }
}