import React from 'react'

interface User {
    //defining shape of user objects
    id: number;
    name: string;
}

const UsersPage = async () => {
    const res = await fetch(
        'https://jsonplaceholder.typicode.com/users', 
        //{ cache: 'no-store' } to avoid caching and get fresh data on every request
        //{ next: { revalidate: 10 } } revalidate data every 10 seconds, this is caching
        { cache: 'no-store' }
    );
    const users: User[] = await res.json();

    return (
        <>
            <h1>Users</h1>
            <p>{ new Date().toLocaleTimeString()}</p>
            <ul>
                {users.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
        </>
    )
}

export default UsersPage