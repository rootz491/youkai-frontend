'use client'

export default function Header() {
    return (
        <div className="navbar bg-base-100 shadow-lg">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Studio Youkai</a>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                Theme
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><button onClick={() => document.documentElement.setAttribute('data-theme', 'light')}>Light</button></li>
                <li><button onClick={() => document.documentElement.setAttribute('data-theme', 'dark')}>Dark</button></li>
                <li><button onClick={() => document.documentElement.setAttribute('data-theme', 'cupcake')}>Cupcake</button></li>
                <li><button onClick={() => document.documentElement.setAttribute('data-theme', 'cyberpunk')}>Cyberpunk</button></li>
              </ul>
            </div>
          </div>
        </div>
    )
}
