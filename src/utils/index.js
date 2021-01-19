import { useEffect, useState } from "react"

export const isFalse = (value)=> value===0 ? false : !value

export const cleanObject = (object)=>{
    const result = {...object}
    Object.keys(result).forEach(key=>{
        let value = result[key]
        if(isFalse(value)){
            delete result[key]
        }
    })
    return result
}
export const useMount = (callback)=>{
    useEffect(()=>{
       callback()
    },[])// eslint-disable-line react-hooks/exhaustive-deps
}
export const useDebounce=(param,delay)=>{
    console.log(param);
    const [debounceValue,setDebounceValue] = useState(param)
    useEffect(()=>{
        const timeout = setTimeout(()=>{ setDebounceValue(param)},delay)
        return ()=> {clearTimeout(timeout);}
    },[param,delay])
    return debounceValue
}

