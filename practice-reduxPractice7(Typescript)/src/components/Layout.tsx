import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <>
        <Header />
        <main className='App px-8 w-full bg-white-400'>
            <Outlet />
        </main>
    </>
  )
}

export default Layout