const useHttp = () => {
  const request = async (
    url,
    method = "GET",
    body = null,
    headers = { "Content-type": "application/json" }
  ) => {
    try {
      const data = await fetch(url, { method, headers, body });

      if (!data.ok) {
        throw new Error(`Could not fetch ${url}, status: ${data.status}`);
      }

      return await data.json();
    } catch (error) {
      throw error;
    }
  };

  return { request };
};

export default useHttp;
