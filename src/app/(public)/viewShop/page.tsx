import ShopCard from "@/components/shared/shopCard";
import { shopApi } from "@/services/api";
import React from "react";

async function getShopData() {
  const shopData = await shopApi.getShopData();

  if (!shopData || shopData.res.error) {
    throw new Error("Failed to fetch data");
  }

  return shopData.res.data;
}

export default async function ShopPage() {
  const shopData = await getShopData();

  // console.log(shopData);
  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {Array.isArray(shopData) &&
        shopData.map((shop) => (
          <ShopCard
            key={shop.id}
            description={shop.description}
            image={shop.image}
            name={shop.name}
            phone={shop.phone}
            className=""
          />
        ))}
    </div>
  );
}
