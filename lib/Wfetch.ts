// Wrapped fetch to throw 4XX and 5XX errors
export default async function WFetch(
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<Response> {
  const r = await fetch(input, init);
  if (!r.ok) {
    console.log(r.status);
    const errorStatus = r.status;
    const res = await r.json();
    const error: any = new Error(res.error.message);
    error.status = errorStatus;
    console.log("error", error);
    // throw new Error("Fetch failed with status code" + r.status);
    throw error;
  }
  return r;
}
