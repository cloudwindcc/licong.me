export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === 'licong.me') {
    url.hostname = 'www.licong.me';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  if (response.status === 404 || url.hostname.endsWith('.pages.dev')) {
    headers.set('X-Robots-Tag', 'noindex, follow');
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
