import { useState } from 'react'
import { Outlet } from "react-router-dom"
import Header from "./Header"

function Layout({ onSearch }) {

  return (
    <div className="site-wrapper">
        <Header onSearch={onSearch} />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout
