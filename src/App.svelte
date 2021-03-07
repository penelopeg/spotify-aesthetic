<script>
  import { Router, Route, Link } from "svelte-routing";
  import { loggedIn } from "./stores";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import { getAccessToken, getUser } from "./utils";

  export let url = "";

  // TODO improve this logic, make use of refresh token
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("access_token") && urlParams.has("refresh_token")) {
    const token = {
      access: urlParams.get("access_token"),
      refresh: urlParams.get("refresh_token"),
    };
    window.localStorage.setItem("token", JSON.stringify(token));
  }

  const accessToken = getAccessToken();
  const user = getUser();

  if (accessToken) {
    if (!user) {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const userData = {
            name: data.display_name,
            id: data.id,
          };
          window.localStorage.setItem("user", JSON.stringify(userData));
          loggedIn.set(true);
        });
    } else {
      loggedIn.set(true);
    }
  } else {
    loggedIn.set(false);
  }
</script>

<Router {url}>
  <nav class="navbar navbar-inverse">
    <div class="container">
      <div class="navbar-header">
        <Link to="/" className="navbar-brand">#MyAesthetic</Link>
      </div>
      <div id="navbar" class="navbar">
        <ul class="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="content main">
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </main>
</Router>
