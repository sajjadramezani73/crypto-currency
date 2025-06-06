import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import Card from "@/components/global/card";

import { getCoins } from "@/requests/api/coin";
import { QUERY_KEYS } from "@/requests/queryKeys";

const Coins = () => {
  const latestPricesRef = useRef<Record<string, number>>({});
  const [coins, setCoins] = useState<Record<string, number>>({});

  useEffect(() => {
    const socket = new WebSocket(
      "wss://wss.coincap.io/prices?assets=bitcoin,tron,ethereum"
    );
    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      latestPricesRef.current = { ...latestPricesRef?.current, ...data };
    };
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins({ ...latestPricesRef.current });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const { data, isLoading } = useQuery({
    queryFn: () => getCoins(),
    queryKey: [QUERY_KEYS.coinList],
  });

  console.log({ isLoading });

  return (
    <Card title="Coin list">
      {data?.data?.map((coin) => {
        const livePrice = coins[coin.id];
        return (
          <tr key={coin.id}>
            <td>
              <img src={coin.image} width={24} /> {coin.name} (
              {coin.symbol.toUpperCase()})
            </td>
            <td>${livePrice || coin.current_price}</td>
            <td>{/* درصد تغییر یا چارت کوچیک */}</td>
          </tr>
        );
      })}
    </Card>
  );
};

export default Coins;
