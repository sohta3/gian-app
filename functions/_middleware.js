const cookieName = "ab-test-cookie";
const newHomepagePathName = "/test";

const abTest = async ({ request, next, env }) => {
  const url = new URL(request.url);
  if (url.pathname === "/about") {
    // if cookie ab-test-cookie=new then change the request to go to /test
    // if no cookie set, pass x% of traffic and set a cookie value to "control" or "test"

    let cookie = request.headers.get("cookie");
    // is cookie set?
    if (cookie && cookie.includes(`${NAME}=control`)) {
      url.pathname = "/control" + url.pathname;
    } else if (cookie && cookie.includes(`${NAME}=test`)) {
      url.pathname = "/test" + url.pathname;
    } else {
      const percentage = Math.floor(Math.random() * 100);
      let version = "control"; // default version
      url.pathname = "/control" + url.pathname;
      // change pathname and version name for 50% of traffic
      if (percentage < 50) {
        url.pathname = "/test" + url.pathname;
        version = "test";
      }
      // get the static file from ASSETS, and attach a cookie
      const asset = await env.ASSETS.fetch(url);
      let response = new Response(asset.body, asset);
      response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`);
      return response;
    }
  }
  return next();
};

export const onRequest = [abTest];
