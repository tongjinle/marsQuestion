class RunCode {
    static run(code: string, checkerBody: string): {isPass:boolean,speed:number} {
        try {
            let fnBody = [code, 'return fn;'].join('\n');
            console.log({fnBody});
            let fn = Function(fnBody)();
            console.log({fn});
            let checker = Function(`
                function _checker(fn){
                    ${checkerBody}
                }
                return _checker;
            `)();
            console.log({checker});

            let t1 = Date.now();
            let isPass = checker(fn);
            let t2 = Date.now();
            let speed = t2 - t1;
            return {isPass,speed};
        }catch(e){
            console.log(e);
            return {isPass:false,speed:-1};
        }


    }
}

export default RunCode;