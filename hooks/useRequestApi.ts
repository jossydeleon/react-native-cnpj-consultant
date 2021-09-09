import axios from "axios";
import { useState } from "react";
import { ICNPJ } from "../types";

function useRequestApi() {
  //Local state
  const [data, setData] = useState<ICNPJ>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  /**
   * Make a request to the api, to get information
   * about the cnbj number provided by user
   * @param cnpj cnbj number
   */
  const makeCall = async (cnpj: string) => {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      const results = await axios.get<ICNPJ>(
        `https://public.fluxoresultados.com.br/v1/cnpj/${cnpj}`
      );

      const { status } = results.data;

      if (status === "OK") {
        setData(results.data);
      } else {
        setError(new Error("The CNPJ number does not exists"));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    makeCall,
  };
}

export default useRequestApi;
