export default function Login(){
    return(
    <div className="container">
        <form action="">
            <h3>Login</h3>
            <label htmlFor="username"> Username </label>
            <input type="text" placeholder="Email or Phone" id="username"/>

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password"/>
            <button>Log In</button>
        </form>
    </div>
    )
}