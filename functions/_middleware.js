export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === 'licong.me') {
    url.hostname = 'www.licong.me';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
