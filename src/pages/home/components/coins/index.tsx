import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import Card from "@/components/global/card";

import { Table } from "@/components/global/table";

import { getCoins } from "@/requests/api/coin";
import { QUERY_KEYS } from "@/requests/queryKeys";

import formatNumber from "@/utils/formatNumber";

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

  const columns = [
    {
      header: "Coin Name",
      className: "w-[20%]",
      cell: (item: ICoinProps) => (
        <div className="flex items-center gap-x-2">
          <img src={item.image} width={20} alt={item.name} />
          <p className="text-sm text-titr font-medium">
            {item.name} ({item.symbol.toUpperCase()})
          </p>
        </div>
      ),
      key: "coinInfo",
    },
    {
      header: "Coin Price",
      className: "w-[20%]",
      cell: (item: ICoinProps) => (
        <div className="flex items-center gap-x-1">
          $
          <p className="text-sm text-titrDark">
            {formatNumber(coins[item.id] ?? item.current_price, 0.01)}
          </p>
        </div>
      ),
      key: "coinPrice",
    },
    {
      header: "24%",
      className: "w-[20%]",
      cell: (item: ICoinProps) =>
        item.price_change_percentage_24h >= 0 ? (
          <p className="text-sm text-green-500">
            +{item.price_change_percentage_24h.toFixed(2)}% ⬈
          </p>
        ) : (
          <p className="text-sm text-red-500">
            {item.price_change_percentage_24h.toFixed(2)}% ⬊
          </p>
        ),
      key: "pricePercentage",
    },
    {
      header: "24H High",
      className: "w-[20%]",
      cell: (item: ICoinProps) => (
        <div className="flex items-center gap-x-1">
          $
          <p className="text-sm text-titrDark">
            {formatNumber(item.high_24h, 0.01)}
          </p>
        </div>
      ),
      key: "high24h",
    },
    {
      header: "24H Low",
      className: "w-[20%]",
      cell: (item: ICoinProps) => (
        <div className="flex items-center gap-x-1">
          $
          <p className="text-sm text-titrDark">
            {formatNumber(item.low_24h, 0.01)}
          </p>
        </div>
      ),
      key: "low24h",
    },
  ];

  console.log({ coins });
  console.log(data?.data);

  return (
    <Card title="Coin list">
      <Table<ICoinProps> items={data?.data ?? []} columns={columns} />
    </Card>
  );
};

export default Coins;
