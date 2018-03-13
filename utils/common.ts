
export namespace common{

    /**
     * 获取数组元素索引
     */
    export function getElementIndex(e:any,arr:Array<any>):number{
        for(let i:number = 0 ; i < arr.length ; i++){
            if(isAEqualB(e,arr[i])){
                return i
            }
        }
        return -1
    }

    /**
     * 从数组删除对应元素
     */
    export function removeElementFromArray(e:any,arr:Array<any>):any{
        let index:number = getElementIndex(e,arr)
        if(-1<index)
            return arr.splice(index,1)
        return null
    }

    /**
     * 从数组B中删除数组A中含有的元素
     */
    export function removeAFromB(a:Array<any>,b:Array<any>):void{
        for(let e of a){
            removeElementFromArray(e,b);
        }
    }

    /**
     * 获取类型
     */
    export function getType(e:any):string{
        let str:string = Object.prototype.toString.call(e).split(String.fromCharCode(0x20))[1];
        return str.substr(0,str.length-1);
    }

    /**
     * 判断a,b是否相等
     */
    export function isAEqualB(a:any,b:any):boolean{
        let typeA:string = getType(a)
        let typeB:string = getType(b)
        if(typeA === typeB){
            if('Object' === typeA){
                if(Object.keys(a).length !== Object.keys(b).length)
                    return false;
                for(let attr in a){
                    let t1 = a[attr] instanceof Object;
                    let t2 = b[attr] instanceof Object;
                    if(t1 && t2){
                        return isAEqualB(a[attr],b[attr]);
                    }else if(a[attr] !== b[attr]){
                        return false;
                    }
                }
                return true
            }else return a===b   
        }
        return false
    }

    /**
     * 获取一个固定长度的原始数组
     */
    export function getDefaultArray(len:number,defaultValue:any=0):Array<any>{
        return [...Array(len)].map(_=>defaultValue);
    }
}