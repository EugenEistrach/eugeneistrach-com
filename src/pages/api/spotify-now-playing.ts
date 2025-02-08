import type { APIRoute } from "astro";

export const prerender = false;

// Utility to get Spotify access token
async function getAccessToken() {
  const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;
  const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
  const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  });

  return response.json();
}

export const GET: APIRoute = async () => {
  try {
    // Get fresh access token
    const { access_token } = await getAccessToken();

    // Fetch currently playing
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    let data;

    if (response.status === 204) {
      data = { isPlaying: false };
    } else {
      const spotifyData = await response.json();
      data = {
        isPlaying: spotifyData.is_playing,
        title: spotifyData.item.name,
        artist: spotifyData.item.artists
          .map((artist: any) => artist.name)
          .join(", "),
        albumArt: spotifyData.item.album.images[0].url,
        songUrl: spotifyData.item.external_urls.spotify,
        timestamp: new Date().toISOString(),
      };
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, max-age=5, s-maxage=5, stale-while-revalidate=10",
        "CDN-Cache-Control": "public, max-age=5, s-maxage=5",
        "Vercel-CDN-Cache-Control": "public, max-age=5, s-maxage=5",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Error fetching Spotify data",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
  }
};
