<script>
  import { getUser } from "../utils";
  import { loggedIn } from "../stores";
  import Playlists from "../components/Playlists.svelte";

  const userData = getUser();

  let isLoggedIn;
  const unsubscribe = loggedIn.subscribe((value) => {
    isLoggedIn = value;
  });
</script>

<div class="container">
  <div id="login">
    {#if isLoggedIn && userData}
      <h1>Howdy, {userData.name}!</h1>
    {:else}
      <h1>Welcome,</h1>
      <a href="/login" class="btn btn-primary">Log in with Spotify</a>
    {/if}
  </div>
  {#if isLoggedIn}
    <Playlists />
  {/if}
</div>
