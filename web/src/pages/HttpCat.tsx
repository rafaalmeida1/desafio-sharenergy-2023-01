import axios from "axios";
import { useEffect, useState } from "react";

export function HttpCat() {
  const [httpCat, setHttpCat] = useState();

  useEffect(() => {
    async function getHTTPCat() {
      try {
        const response = await axios.get('http://localhost:3000/api/100');
        setHttpCat(response.data);
      }catch(err) {
        console.log(err);
      }
    }

    getHTTPCat()
  }, [])

  console.log(httpCat);

  return (
    <section className="mt-5 text-gray-100">
      <div className="grid-cols-cols-4">
        <img src={httpCat} alt="dev" />
      </div>
    </section>
  );
}
