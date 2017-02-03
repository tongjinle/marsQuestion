import * as _ from 'underscore';

interface CacheItem { username: string, token: string, expire: number };

export default class UserCache {
    private cache: CacheItem[];
    private CACHE_EXPIRE: number = 2 * 60 * 60 * 1000;


    constructor() {
        this.cache = [];
    }
    
    add(username: string):string {
        let token = this.genToken();
        let expire = this.genExpire();
        this.cache.push({ username, token, expire });
        return token;
    }

    remove(username: string) {
        this.cache = _.filter(this.cache, item => item.username != username);
    }

    // token是否合法
    // 1 是否存在
    // 2 是否过期
    isValid(token: string): boolean {
        let item = this.findToken(token);

        if (!item) { return false; }

        if (Date.now() > item.expire) { return false; }

        return true;
    }

    // 刷新token
    refresh(token: string): boolean {
        if(!this.isValid(token)){return false}

        let item = this.findToken(token);
        item.expire = this.genExpire();
        return true;
    }


    private genToken(): string {
        let len = 8 ;
        return Math.floor(Math.random()*Math.pow(36,len)).toString(36);
    }

    private findToken(token: string): CacheItem{
        return  _.find(this.cache, item => item.token == token);
    }

    private genExpire():number{
        return Date.now() + this.CACHE_EXPIRE;
    }

}
