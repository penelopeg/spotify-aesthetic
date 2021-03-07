<script>
  import { getAccessToken, getUser } from "../utils";

  const accessToken = getAccessToken();
  const userData = getUser();

  let playlists;
  const getPlaylists = async () => {
    if (userData) {
      // TODO paginate request until you get all playlists
      let limit = 50;
      let offset = 5;
      let url = `https://api.spotify.com/v1/users/${userData.id}/playlists?limit=${limit}&offset=${offset}`;
      playlists = fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json());
    } else {
      //bad luck
    }
  };
</script>

<div class="container">
  <div id="playlists">
    <h3>Generate my playlist aesthetic</h3>
    <div on:click={getPlaylists} class="btn btn-primary">make it prettyyyy</div>
  </div>

  {#if playlists}
    {#await playlists}
      <p>loading....</p>
    {:then data}
      {#if data.error}
        <p>Oh no! No data available :(</p>
      {:else}
        <div class="card-columns">
          {#each data.items as item}
            <div class="card">
              <img
                class="card-img-top"
                src={item.images[0].url}
                alt={item.name}
              />
              <div class="card-body">
                <h5 class="card-title">{item.name}</h5>
                <p class="card-text">{item.description}</p>
                <a href={item.external_urls.spotify} class="card-link">Listen</a
                >
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {:catch error}
      <p>Oh no! There was an error :(</p>
    {/await}
  {/if}
</div>
