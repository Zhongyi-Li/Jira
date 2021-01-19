import React from 'react'
import * as qs from 'qs'

import {SearchPanel} from './search-panel'
import {List} from './list'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from '../../utils'
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        parsonId: ''
    })
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const debounceParam = useDebounce(param,1500)
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async (response) => {
            if (response.ok) {
                setList(await   response.json())
            }
        })
    }, [debounceParam])
    useMount(()=>{
        fetch(`${apiUrl}/users`).then(async (response) => {
            console.log(response);
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })
    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}></List>
    </div>
}