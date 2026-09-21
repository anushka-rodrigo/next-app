import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <Link href="/users">User</Link> {/*client side navigation*/}
      {/*Not best way to put hyper link because rsrc downloaded again and again per page load*/}
      {/*<a href="/users">User</a>*/}
    </main>
  )
}
