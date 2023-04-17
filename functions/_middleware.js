const cookieName = "ab-test-cookie";

const abTest = async ({ request, next, env }) => {
  const url = new URL(request.url);
  if (url.pathname === "/about") {
    // if cookie ab-test-cookie=new then change the request to go to /test
    // if no cookie set, pass x% of traffic and set a cookie value to "control" or "test"

    let cookie = request.headers.get("cookie");
    // is cookie set?
    if (cookie && cookie.includes(`${cookieName}=control`)) {
      url.pathname = "/control" + url.pathname;
    } else if (cookie && cookie.includes(`${cookieName}=test`)) {
      url.pathname = "/test" + url.pathname;
    } else {
      const version = Math.random() < 0.5 ? "test" : "control"; // 50/50 split
      if (version === "control") {
        url.pathname = "/control" + url.pathname;
      } else {
        url.pathname = "/test" + url.pathname;
      }

      // get the static file from ASSETS, and attach a cookie
      const asset = await env.ASSETS.fetch(url);
      let response = new Response(asset.body, asset);
      response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`);
      return response;
    }
    return env.ASSETS.fetch(url);
  }
  return next();
};

export const onRequest = [abTest];
