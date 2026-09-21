import React from 'react'

interface User {
    //defining shape of user objects
    id: number;
    name: string;
    email: string;
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
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default UsersPage